import { Entity } from "./Entity"

export enum MoveState {
  MoveRight,
  MoveTop,
  MoveLeft,
  MoveBottom,
  Stay,
}

interface Axios {
  x: number
  y: number
}

export class MovedEntity extends Entity {
  speed: number
  moveState: MoveState
  spriteRight?: HTMLImageElement
  spriteLeft?: HTMLImageElement
  spriteTop?: HTMLImageElement
  spriteBottom?: HTMLImageElement
  hStep: number
  wStep: number
  shouldStop: boolean

  private currentSprite?: HTMLImageElement
  private frame: number
  private nextMove?: Axios

  constructor() {
    super();

    this.speed = 1
    this.frame = 0
    this.moveState = MoveState.Stay
    this.hStep = 80
    this.wStep = 80
    this.shouldStop = true
  }

  move() {
    if (!this.nextMove) return

    if (this.shouldStop && this.x === this.nextMove.x && this.y === this.nextMove.y) {
      this.nextMove = undefined
      this.moveState = MoveState.Stay
      return
    }

    // moveRight
    if (this.x < this.nextMove.x) {
      this.x = this.x + (1 * this.speed) 
      this.currentSprite = this.spriteRight
      return
    }

    // moveLeft
    if (this.x > this.nextMove.x) {
      this.x = this.x - (1 * this.speed) 
      this.currentSprite = this.spriteLeft
      return
    }

    // moveBottom
    if (this.y < this.nextMove.y) {
      this.y = this.y + (1 * this.speed)
      this.currentSprite = this.spriteBottom
      return
    }

    // moveTop
    if (this.y > this.nextMove.y) {
      this.y = this.y - (1 * this.speed)
      this.currentSprite = this.spriteTop
      return
    }
  }

  selectMoveState(state: MoveState) {
    if (this.moveState !== state) {
      this.frame = 0
    }

    this.shouldStop = false

    if (!this.nextMove) {
      this.moveState = state
      this.setNextMove()
      return
    }

    if (this.nextMove && this.x === this.nextMove.x && this.y === this.nextMove.y) {
      this.moveState = state
      this.setNextMove()
      return
    }
  }

  private setNextMove() {
    switch(this.moveState) {
      case(MoveState.MoveTop):
        this.nextMove = {x: this.x, y: this.y - this.hStep}
        break
      case(MoveState.MoveBottom):
      this.nextMove = {x: this.x, y: this.y + this.hStep}
        break
      case(MoveState.MoveLeft): 
        this.nextMove = {x: this.x - this.wStep, y: this.y}
        break
      case(MoveState.MoveRight):
        this.nextMove = {x: this.x + this.wStep, y: this.y}
        break
    }
  }

  getNextMove() {
    return this.nextMove;
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