import { Entity } from "./Entity"

export enum MoveState {
  MoveRight,
  MoveTop,
  MoveLeft,
  MoveBottom,
  Stay,
}

export class MovedEntity extends Entity {
  speed: number
  moveState: MoveState
  spriteRight?: HTMLImageElement
  spriteLeft?: HTMLImageElement
  spriteTop?: HTMLImageElement
  spriteBottom?: HTMLImageElement

  private currentSprite?: HTMLImageElement
  private frame: number

  constructor() {
    super();

    this.speed = 1
    this.frame = 0
    this.moveState = MoveState.Stay
  }

  move() {
    switch(this.moveState) {
      case(MoveState.MoveTop):
        this.y = this.y - (1 * this.speed)
        this.currentSprite = this.spriteTop
        break
      case(MoveState.MoveBottom):
        this.y = this.y + (1 * this.speed)
        this.currentSprite = this.spriteBottom
        break
      case(MoveState.MoveLeft): 
        this.x = this.x - (1 * this.speed) 
        this.currentSprite = this.spriteLeft
        break
      case(MoveState.MoveRight):
        this.x = this.x + (1 * this.speed) 
        this.currentSprite = this.spriteRight
        break
    }
  }

  selectMoveState(state: MoveState) {
    if (this.moveState !== state) {
      this.frame = 0
    }

    this.moveState = state
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.moveState === MoveState.Stay) {
      if (!this.spriteBottom) return
      
      ctx.drawImage(
        this.spriteBottom,
        0,
        0,
        this.w,
        this.h,
        this.x,
        this.y,
        this.w,
        this.h
      );
      return
    }

    if (!this.currentSprite) return

    this.frame = this.frame + 1

    if (this.frame >= this.currentSprite.width / this.w) {
      this.frame = 0
    }

    ctx.drawImage(
      this.currentSprite,
      this.w * this.frame,
      0,
      this.w,
      this.h,
      this.x,
      this.y,
      this.w,
      this.h
    );
  }
}