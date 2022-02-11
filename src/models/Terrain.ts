import { Entity } from "./Entity";

export class Terrain extends Entity {
  sprite?: HTMLImageElement

  constructor() {
    super()
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.sprite) return

    ctx.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.w,
      this.h
    )
  }
}

