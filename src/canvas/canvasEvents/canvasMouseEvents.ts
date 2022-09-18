import { CanvasState } from "../canvasState";
import { Shape } from "../shapes/shape";
import {
  CanvasEventListener,
  CanvasEventListenerFn,
  CanvasEventMap,
} from "./canvasEvent.type";

export class CanvaMouseEvents {
  #state: CanvasState;
  #eventListeners: CanvasEventListener<keyof CanvasEventMap>[] = [];

  #selectedShape: SelectedShape | undefined;

  constructor(state: CanvasState) {
    this.#state = state;
  }

  registerEventListeners(
    eventListeners: CanvasEventListener<keyof CanvasEventMap>[]
  ) {
    const hasClickEventListener = eventListeners.some(
      (x) => x.type === "click"
    );
    if (hasClickEventListener) {
      this.#state.canvas.addEventListener("mousedown", this.#onMouseDown);
    }

    const hasMouseMoveEventListener = eventListeners.some(
      (x) => x.type === "mousemove"
    );
    if (hasMouseMoveEventListener) {
      this.#state.canvas.addEventListener("mousemove", this.#onMouseMove);
    }

    eventListeners.forEach((x) => this.addEventListener(x.type, x.listener));
  }

  dispose() {
    this.#state.canvas.removeEventListener("mousedown", this.#onMouseDown);
    this.#state.canvas.removeEventListener("mousemove", this.#onMouseMove);
  }

  addEventListener<K extends keyof CanvasEventMap>(
    type: K,
    listener: CanvasEventListenerFn<K>
  ) {
    this.#eventListeners.push({ type, listener });
  }

  #onMouseDown = (e: MouseEvent) => {
    const [x, y] = this.#getMousePosition(e);
    this.#eventListeners
      .filter(
        (event): event is CanvasEventListener<"click"> => event.type === "click"
      )
      .forEach((event) => event.listener({ point: [x, y] }));

    if (this.#selectedShape) {
      this.#selectedShape = undefined;
    }

    var shapes = this.#state.shapes;
    for (let i = shapes.length - 1; i >= 0; i--) {
      if (shapes[i].contains(x, y)) {
        this.#selectedShape = {
          shape: shapes[i],
          offset: [x - shapes[i].x, y - shapes[i].y],
        };

        this.#state.removeShape(shapes[i]);
        this.#state.draw();

        return;
      }
    }
  };

  #onMouseMove = (e: MouseEvent) => {
    const [x, y] = this.#getMousePosition(e);
    this.#eventListeners
      .filter(
        (event): event is CanvasEventListener<"mousemove"> =>
          event.type === "mousemove"
      )
      .forEach((event) => event.listener({ point1: [x, y] }));
  };
  #onMouseUp = (e: MouseEvent) => {};
  #onMouseLeave = (e: MouseEvent) => {};

  #getMousePosition(e: MouseEvent) {
    let dx, dy;
    dx = e.offsetX;
    dy = e.offsetY;

    return [dx, dy];
  }
}

type SelectedShape = {
  shape: Shape;
  offset: [number, number];
};
