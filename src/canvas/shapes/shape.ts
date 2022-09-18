export class Shape {
  constructor(
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    public fillColor: string = "rgba(0, 0, 0, 1)"
  ) {}

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  public contains(mx: number, my: number) {
    return (
      this.x <= mx &&
      this.x + this.w >= mx &&
      this.y <= my &&
      this.y + this.h >= my
    );
  }
}
