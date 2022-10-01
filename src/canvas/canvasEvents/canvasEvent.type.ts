import { Point } from "../../types";
import { Shape } from "../shapes/shape";

export type CanvasEventMap = {
  click: CanvasClickEvent;
  mousemove: CanvasMouseMoveEvent;
};

export type CanvasClickEvent = {
  point: Point;
  selectedShape?: Shape;
};

export type CanvasMouseMoveEvent = {
  point1: Point;
};

export type CanvasEventListenerFn<K extends keyof CanvasEventMap> = {
  (event: CanvasEventMap[K]): void;
};

export type CanvasEventListener<K extends keyof CanvasEventMap> = {
  type: K;
  listener(event: CanvasEventMap[K]): void;
};

export type SelectedShape = {
  shape: Shape;
  dragOffset: Point;
};
