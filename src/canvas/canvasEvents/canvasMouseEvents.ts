import { CanvasState } from "../canvasState";
import {
  CanvasEventListener,
  CanvasEventListenerFn,
  CanvasEventMap,
  SelectedShape,
} from "./canvasEvent.type";
import { Point } from "../../types";

export class CanvaMouseEvents {
  #state: CanvasState;
  #eventListeners: CanvasEventListener<keyof CanvasEventMap>[] = [];

  #selectedShape: SelectedShape | undefined;
  #dragging: boolean = false;

  constructor(state: CanvasState) {
    this.#state = state;
  }

  readonly #eventListenersMap = {
    click: [
      {
        type: "mousedown",
        listener: this.#onMouseDown.bind(this),
      },
      { type: "mouseup", listener: this.#onMouseUp.bind(this) },
    ],
    mousemove: [{ type: "mousemove", listener: this.#onMouseMove.bind(this) }],
  };

  registerEventListeners(
    eventListeners: CanvasEventListener<keyof CanvasEventMap>[]
  ) {
    const eventTypes = eventListeners.map(
      (eventListener) => eventListener.type
    );

    const uniqueEventTypes = [...new Set(eventTypes)];

    uniqueEventTypes.forEach((type) => {
      const eventListeners = this.#eventListenersMap[type];
      eventListeners.forEach((event) => {
        this.#state.canvas.addEventListener(event.type, event.listener as any);
      });
    });

    eventListeners.forEach((x) => this.addEventListener(x.type, x.listener));
  }

  dispose() {
    this.#state.canvas.removeEventListener("mouseup", this.#onMouseUp);
    this.#state.canvas.removeEventListener("mousedown", this.#onMouseDown);
    this.#state.canvas.removeEventListener("mousemove", this.#onMouseMove);
  }

  addEventListener<K extends keyof CanvasEventMap>(
    type: K,
    listener: CanvasEventListenerFn<K>
  ) {
    this.#eventListeners.push({ type, listener });
  }

  #onMouseDown(e: MouseEvent) {
    const point = this.#getMousePosition(e);
    const [x, y] = point;

    if (this.#selectedShape) {
      this.#selectedShape = undefined;
    }

    let shapes = this.#state.shapes;
    for (let i = shapes.length - 1; i >= 0; i--) {
      let shape = shapes[i];
      if (shape.contains(point)) {
        this.#selectedShape = {
          shape,
          dragOffset: [x - shape.x, y - shape.y],
        };
        this.#dragging = true;

        break;
      }
    }

    this.#eventListeners
      .filter(
        (event): event is CanvasEventListener<"click"> => event.type === "click"
      )
      .forEach((event) =>
        event.listener({
          point: [x, y],
          selectedShape: this.#selectedShape?.shape,
        })
      );
  }

  #onMouseUp(e: MouseEvent) {
    this.#dragging = false;
  }

  #onMouseMove(e: MouseEvent) {
    const [x, y] = this.#getMousePosition(e);
    if (e.buttons !== 1) {
      this.#dragging = false;
      this.#selectedShape = undefined;
    }

    if (this.#dragging && this.#selectedShape) {
      const dx = x - this.#selectedShape.dragOffset[0];
      const dy = y - this.#selectedShape.dragOffset[1];
      this.#selectedShape.shape.setPosition([dx, dy]);
      this.#state.draw();
    }

    this.#eventListeners
      .filter(
        (event): event is CanvasEventListener<"mousemove"> =>
          event.type === "mousemove"
      )
      .forEach((event) => event.listener({ point1: [x, y] }));
  }

  #getMousePosition(e: MouseEvent): Point {
    return [e.offsetX, e.offsetY];
  }
}
