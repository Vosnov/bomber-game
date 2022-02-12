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
  collisionItems: Map<string, Terrain>

  private currentSprite?: HTMLImageElement
  private frame: number
  private nextPosition?: Axios
  private prevPosition: Axios

  constructor() {
    super();

    this.speed = 1
    this.frame = 0
    this.moveState = MoveState.Stay
    this.hStep = 80
    this.wStep = 80
    this.collisionItems = new Map()

    this.prevPosition = {x: 0, y: 0}
  }

  checkShouldStop() {
    if (this.prevPosition.x === this.x && this.prevPosition.y === this.y) {
      this.moveState = MoveState.Stay
    }

    this.prevPosition.x = this.x
    this.prevPosition.y = this.y
  }

  move() {
    if (!this.nextPosition) return

    if (this.x === this.nextPosition.x && this.y === this.nextPosition.y) {
      this.nextPosition = undefined
      return
    }

    // moveRight
    if (this.x < this.nextPosition.x) {
      this.x = this.x + (1 * this.speed) 
      return
    }

    // moveLeft
    if (this.x > this.nextPosition.x) {
      this.x = this.x - (1 * this.speed) 
      return
    }

    // moveBottom
    if (this.y < this.nextPosition.y) {
      this.y = this.y + (1 * this.speed)
      return
    }

    // moveTop
    if (this.y > this.nextPosition.y) {
      this.y = this.y - (1 * this.speed)
      return
    }
  }

  selectMoveState(state: MoveState) {
    if (this.moveState !== state) {
      this.frame = 0
    }

    console.log(state)

    if (!this.nextPosition) {
      this.moveState = state
      this.setNextMove()
      return
    }

    if (this.nextPosition && this.x === this.nextPosition.x && this.y === this.nextPosition.y) {
      this.moveState = state
      this.setNextMove()
      return
    }

    this.moveState = state
  }

  private setNextMove() {
    switch(this.moveState) {
      case(MoveState.MoveTop):
        this.nextPosition = {x: this.x, y: this.y - this.hStep}
        this.currentSprite = this.spriteTop
        break
      case(MoveState.MoveBottom):
      this.nextPosition = {x: this.x, y: this.y + this.hStep}
      this.currentSprite = this.spriteBottom
        break
      case(MoveState.MoveLeft): 
        this.nextPosition = {x: this.x - this.wStep, y: this.y}
        this.currentSprite = this.spriteLeft
        break
      case(MoveState.MoveRight):
        this.nextPosition = {x: this.x + this.wStep, y: this.y}
        this.currentSprite = this.spriteRight
        break
    }

    if (this.checkCollision()) {
      this.nextPosition = undefined
      this.moveState = MoveState.Stay
    }
  }

  getNextMove() {
    return this.nextPosition;
  }

  checkCollision() {
    let isCollision = false
    this.collisionItems.forEach(item => {
      if (!this.nextPosition) return
      if (
        item.x >= this.nextPosition.x + this.w ||
        item.x + item.w <= this.nextPosition.x ||
        item.y >= this.nextPosition.y + this.h ||
        item.y + item.h <= this.nextPosition.y
      ) {
        return
      } else {
        isCollision = true
      }
    }) 
    return isCollision
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.checkShouldStop()
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