import { Point } from "../../types";

interface ShapeProps {
  x: number;
  y: number;
  fillColor: string;
}
export abstract class Shape {
  constructor(protected readonly props: ShapeProps) {}

  public get x() {
    return this.props.x;
  }

  public get y() {
    return this.props.y;
  }

  public setPosition(point: Point) {
    const [x, y] = point;
    this.props.x = x;
    this.props.y = y;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    throw new Error("Method not implemented.");
  }

  public contains(point: Point): boolean {
    throw new Error("Method not implemented.");
  }

  public toString(): string {
    return "Shape";
  }
}

interface RectangleShapeProps extends ShapeProps {
  width: number;
  height: number;
}

export class RectangleShape extends Shape {
  constructor(override props: RectangleShapeProps) {
    const { x, y, fillColor, ...rest } = props;
    super({ x, y, fillColor });
  }

  public get width() {
    return this.props.width;
  }

  public get height() {
    return this.props.height;
  }

  public override draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.props.fillColor;
    ctx.fillRect(this.x, this.y, this.width, this.props.height);
  }

  public override contains(point: Point) {
    const [mx, my] = point;
    return (
      this.x <= mx &&
      this.x + this.width >= mx &&
      this.y <= my &&
      this.y + this.height >= my
    );
  }

  public override toString(): string {
    return `{
      name: RectangleShape,
      fillColor: ${this.props.fillColor},
    }`;
  }
}
