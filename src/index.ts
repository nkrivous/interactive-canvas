import { RectangleShape } from "./canvas/shapes/shape";
import { CanvasState } from "./canvas/canvasState";
import { addAInfoBlock } from "./utils/addInfoBlock";
import {
  CanvasClickEvent,
  CanvasMouseMoveEvent,
} from "./canvas/canvasEvents/canvasEvent.type";

(function main() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const canvasState = new CanvasState(canvas);

  setCanvasSize(canvas, canvasState);
  subscribeOnScreenResize(canvas, canvasState);

  const shape1 = new RectangleShape({
    x: 10,
    y: 50,
    width: 100,
    height: 100,
    fillColor: "red",
  });
  const shape2 = new RectangleShape({
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fillColor: "blue",
  });

  canvasState.addShapes([shape1, shape2]);
  canvasState.draw();
  canvasState.registerEventListeners([
    { type: "click", listener: onClick },
    { type: "mousemove", listener: onMouseMove },
  ]);
})();

function subscribeOnScreenResize(
  canvas: HTMLCanvasElement,
  canvasState: CanvasState
) {
  window.addEventListener("resize", () => {
    setCanvasSize(canvas, canvasState);
  });
}

function setCanvasSize(canvas: HTMLCanvasElement, canvasState: CanvasState) {
  const rect = canvas.parentElement?.getBoundingClientRect();
  canvas.width = rect?.width || 600;
  canvas.height = rect?.height || 400;
  canvasState.draw();
}

function onClick({ point, selectedShape }: CanvasClickEvent) {
  let infoBlockEl = document.getElementById("infoBlockMouseClick");
  if (!infoBlockEl) {
    infoBlockEl = addAInfoBlock("infoBlockMouseClick", "Mouse Click");
    const aside = document.getElementById("info") as HTMLElement;
    aside.appendChild(infoBlockEl);
  }

  const infoBlockBodyEl = Array.from(infoBlockEl.children).find(
    (el) => el.className === "articleBody"
  ) as HTMLElement;
  infoBlockBodyEl.innerText = `Positioned at ${point[0]}, ${point[1]}\nShape: ${selectedShape}`;
}

function onMouseMove({ point1 }: CanvasMouseMoveEvent) {
  let infoBlockEl = document.getElementById("infoBlockMouseMove");
  if (!infoBlockEl) {
    infoBlockEl = addAInfoBlock("infoBlockMouseMove", "Mouse Move");
    const aside = document.getElementById("info") as HTMLElement;
    aside.appendChild(infoBlockEl);
  }

  const infoBlockBodyEl = Array.from(infoBlockEl.children).find(
    (el) => el.className === "articleBody"
  ) as HTMLElement;
  infoBlockBodyEl.innerText = `Positioned at ${point1[0]}, ${point1[1]}`;
}
