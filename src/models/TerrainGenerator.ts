import { createImage } from "../utils/createImage"
import { Terrain } from "./Terrain"

const sprite = createImage('../assets/images/terrain.png')

export class TerrainGenerator {
  items: Map<string, Terrain>
  bgColor: string
  canvas: HTMLCanvasElement | null
  map: string[]

  constructor(canvas: HTMLCanvasElement | null, bgColor: string, map: string[]) {
    this.bgColor = bgColor
    this.canvas = canvas
    this.map = map

    this.items = new Map<string, Terrain>()
    this.fillItems()
  }

  fillItems() {
    let x = 0
    let y = 0
    let count = 0

    this.map.forEach(col => {

      col.split('').forEach(row => {
        if (row === '#') {
          const block = new Terrain()
          block.sprite = sprite
          block.w = 80
          block.h = 80
          block.x = x * block.w
          block.y = y * block.h
          count += 1
          this.items.set(`t${count}`, block)
        }

        x += 1
      })

      x = 0
      y += 1
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.canvas) return

    ctx.beginPath()
    ctx.fillStyle = this.bgColor
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.closePath()

    this.items.forEach(item => {
      item.draw(ctx)
    })
  }
}