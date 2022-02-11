import { Terrain } from "./Terrain"

const map = [
  '####################',
  '#..................#',
  '#......###.........#',
  '#.......#..........#',
  '#......###.........#',
  '#..................#',
  '####################'
]

export type TerrainItems = Record<string, Terrain>

export class TerrainGenerator {
  items?: TerrainItems
  bgColor: string
  canvas: HTMLCanvasElement

  constructor(items: TerrainItems, canvas: HTMLCanvasElement, bgColor: string) {
    this.items = items
    this.bgColor = bgColor
    this.canvas = canvas
  }

  draw(ctx: CanvasRenderingContext2D) {
    let x = 0;
    let y = 0;

    ctx.beginPath()
    ctx.fillStyle = this.bgColor
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.closePath()

    map.forEach(col => {

      col.split('').forEach(row => {
        const block = this.items?.[row]
        if (block) {
          block.x = x * block.w
          block.y = y * block.h
          block.draw(ctx)
        }
        x += 1
      })

      x = 0
      y += 1
    })
  }
}