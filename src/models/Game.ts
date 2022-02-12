import { MovedEntity, MoveState } from "./MovedEntity"
import { TerrainGenerator } from "./TerrainGenerator"

export interface GameDto {
  canvas: HTMLCanvasElement | null
  player: MovedEntity
  terrainGenerator: TerrainGenerator
}

export class Game {
  canvas: HTMLCanvasElement
  player: MovedEntity
  ctx?: CanvasRenderingContext2D
  terrainGenerator: TerrainGenerator

  constructor(dto: GameDto) {
    this.canvas = dto.canvas || new HTMLCanvasElement()
    this.player = dto.player
    this.terrainGenerator = dto.terrainGenerator
    const ctx = this.canvas.getContext('2d')

    if (ctx) this.ctx = ctx
  }

  start() {
    this.keyListeners()
    this.fillTerrainCollisions()
    console.log(this.player.collisionItems)
    setInterval(() => {
      if (!this.ctx) return
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.terrainGenerator.draw(this.ctx)
      this.player.move()
      this.player.draw(this.ctx)
    }, 1000 / 6)
  }

  fillTerrainCollisions() {
    this.player.collisionItems = this.terrainGenerator.items
  }

  keyListeners() {
    const keysSet = new Set()
    window.addEventListener('keypress', (e) => {
      if (e.key === 'd') {
        keysSet.add(e.key)
        this.player.selectMoveState(MoveState.MoveRight)
      }
      if (e.key === 'a') {
        keysSet.add(e.key)
        this.player.selectMoveState(MoveState.MoveLeft)
      }
      if (e.key === 's') {
        keysSet.add(e.key)
        this.player.selectMoveState(MoveState.MoveBottom)
      }
      if (e.key === 'w') {
        keysSet.add(e.key)
        this.player.selectMoveState(MoveState.MoveTop)
      }
    })
  }
}