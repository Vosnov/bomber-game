import { Game } from "../models/Game";
import { MovedEntity } from "../models/MovedEntity";
import { TerrainGenerator } from "../models/TerrainGenerator";
import { createImage } from "../utils/createImage";

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');

if (canvas) {
  canvas.width = 1600
  canvas. height = 560
}

const map = [
  '####################',
  '#..................#',
  '#......###.........#',
  '#.......#..........#',
  '#......###.........#',
  '#..................#',
  '####################'
]

const player = new MovedEntity();

player.speed = 10
player.x = 90
player.y = 80
player.w = 60
player.h = 80
player.spriteRight = createImage('../assets/images/player_walk_right.png')
player.spriteLeft = createImage('../assets/images/player_walk_left.png')
player.spriteTop = createImage('../assets/images/player_walk_top.png')
player.spriteBottom = createImage('../assets/images/player_walk_bottom.png')

const terrainGenerator = new TerrainGenerator(canvas, '#55960e', map)

const game = new Game({
  canvas,
  player,
  terrainGenerator,
})

game.start()