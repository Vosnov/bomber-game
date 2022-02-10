import { MovedEntity, MoveState } from "../models/MovedEntity";
import { createImage } from "../utils/createImage";

const canvas = document.querySelector<HTMLCanvasElement>('#canvas');

if (canvas) {
  canvas.width = 600
  canvas. height = 600
}

const ctx = canvas?.getContext('2d');
const anim = new Image();
anim.src = './assets/images/player_walk_right.png';
const player = new MovedEntity();

const start = () => {
  if (!ctx) return
  if (!canvas) return
  player.speed = 10
  player.w = 60
  player.h = anim.height
  player.spriteRight = createImage('../assets/images/player_walk_right.png')
  player.spriteLeft = createImage('../assets/images/player_walk_left.png')
  player.spriteTop = createImage('../assets/images/player_walk_top.png')
  player.spriteBottom = createImage('../assets/images/player_walk_bottom.png')
  console.log(player)
  player.draw(ctx)

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    player.move()
    player.draw(ctx)
    ctx.drawImage(anim, 0, 300)
  }, 1000 / 6)
}
start()

const keysSet = new Set()
window.addEventListener('keypress', (e) => {
  if (e.key === 'd') {
    keysSet.add(e.key)
    player.selectMoveState(MoveState.MoveRight)
  }
  if (e.key === 'a') {
    keysSet.add(e.key)
    player.selectMoveState(MoveState.MoveLeft)
  }
  if (e.key === 's') {
    keysSet.add(e.key)
    player.selectMoveState(MoveState.MoveBottom)
  }
  if (e.key === 'w') {
    keysSet.add(e.key)
    player.selectMoveState(MoveState.MoveTop)
  }
})
window.addEventListener('keyup', (e) => {
  const keys = ['d', 'a', 's', 'w']

  if (keys.includes(e.key)) {
    keysSet.delete(e.key)
  }

  if (keysSet.size === 0) {
    player.selectMoveState(MoveState.Stay)
  }
})