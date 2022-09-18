import { Shape } from "./shapes/shape";
import { CanvaMouseEvents } from "./canvasEvents/canvasMouseEvents";
import {
  CanvasEventListener,
  CanvasEventMap,
} from "./canvasEvents/canvasEvent.type";

export class CanvasState {
  readonly ctx: CanvasRenderingContext2D;
  readonly shapes: Shape[];

  #events: CanvaMouseEvents | undefined;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.shapes = [];
  }

  get canvas() {
    return this.ctx.canvas;
  }

  dispose() {
    this.#events?.dispose();
  }

  addShape(shape: Shape) {
    this.shapes.push(shape);
  }

  addShapes(shapes: Shape[]) {
    this.shapes.push(...shapes);
  }

  removeShape(shape: Shape) {
    const index = this.shapes.indexOf(shape);
    if (index !== -1) {
      this.shapes.splice(index, 1);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.forEach((shape) => shape.draw(this.ctx));
  }

  registerEventListeners(
    eventListeners: CanvasEventListener<keyof CanvasEventMap>[]
  ) {
    this.#events = new CanvaMouseEvents(this);
    this.#events.registerEventListeners(eventListeners);
  }
}
