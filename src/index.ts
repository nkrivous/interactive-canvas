import { Shape } from "./canvas/shapes/shape";
import { CanvasState } from "./canvas/canvasState";
import { addAInfoBlock } from "./utils/addInfoBlock";
import {
  CanvasClickEvent,
  CanvasMouseMoveEvent,
} from "./canvas/canvasEvents/canvasEvent.type";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const canvasState = new CanvasState(canvas);

const shape1 = new Shape(10, 50, 100, 100, "red");
const shape2 = new Shape(150, 150, 100, 100, "blue");

canvasState.addShapes([shape1, shape2]);
canvasState.draw();

const onClick = ({ point }: CanvasClickEvent) => {
  let infoBlockEl = document.getElementById("infoBlockMouseClick");
  if (!infoBlockEl) {
    infoBlockEl = addAInfoBlock("infoBlockMouseClick", "Mouse Click");
    const aside = document.getElementById("info") as HTMLElement;
    aside.appendChild(infoBlockEl);
  }

  const infoBlockBodyEl = Array.from(infoBlockEl.children).find(
    (el) => el.className === "articleBody"
  ) as HTMLElement;
  infoBlockBodyEl.innerText = `Positioned at ${point[0]}, ${point[1]}`;
};

const onMouseMove = ({ point1 }: CanvasMouseMoveEvent) => {
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
};

canvasState.registerEventListeners([
  { type: "click", listener: onClick },
  { type: "mousemove", listener: onMouseMove },
]);
