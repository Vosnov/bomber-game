import { Entity } from "./Entity"
import { Terrain } from "./Terrain"

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
  collisionItems: Map<string, Terrain>

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
    this.collisionItems = new Map()
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
      return
    }

    // moveLeft
    if (this.x > this.nextMove.x) {
      this.x = this.x - (1 * this.speed) 
      return
    }

    // moveBottom
    if (this.y < this.nextMove.y) {
      this.y = this.y + (1 * this.speed)
      return
    }

    // moveTop
    if (this.y > this.nextMove.y) {
      this.y = this.y - (1 * this.speed)
      return
    }
  }

  selectMoveState(state: MoveState) {
    if (this.moveState !== state) {
      this.frame = 0
    }

    this.shouldStop = false
    console.log(state)

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

    this.moveState = state
  }

  private setNextMove() {
    switch(this.moveState) {
      case(MoveState.MoveTop):
        this.nextMove = {x: this.x, y: this.y - this.hStep}
        this.currentSprite = this.spriteTop
        break
      case(MoveState.MoveBottom):
      this.nextMove = {x: this.x, y: this.y + this.hStep}
      this.currentSprite = this.spriteBottom
        break
      case(MoveState.MoveLeft): 
        this.nextMove = {x: this.x - this.wStep, y: this.y}
        this.currentSprite = this.spriteLeft
        break
      case(MoveState.MoveRight):
        this.nextMove = {x: this.x + this.wStep, y: this.y}
        this.currentSprite = this.spriteRight
        break
    }

    if (this.checkCollision()) {
      this.nextMove = undefined
      this.moveState = MoveState.Stay
    }
  }

  getNextMove() {
    return this.nextMove;
  }

  checkCollision() {
    let isCollision = false
    this.collisionItems.forEach(item => {
      if (!this.nextMove) return
      if (
        item.x >= this.nextMove.x + this.w ||
        item.x + item.w <= this.nextMove.x ||
        item.y >= this.nextMove.y + this.h ||
        item.y + item.h <= this.nextMove.y
      ) {
        return
      } else {
        isCollision = true
      }
    }) 
    return isCollision
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