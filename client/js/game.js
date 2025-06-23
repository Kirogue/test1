import { updateHUD } from './ui.js';

const socket = io();
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let players = [];
const speed = 5;

window.addEventListener('keydown', (e) => {
  let dx = 0;
  let dy = 0;
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
      dy = -speed;
      break;
    case 'ArrowDown':
    case 's':
      dy = speed;
      break;
    case 'ArrowLeft':
    case 'a':
      dx = -speed;
      break;
    case 'ArrowRight':
    case 'd':
      dx = speed;
      break;
    default:
      return;
  }
  socket.emit('playerAction', { type: 'move', dx, dy });
});

socket.on('stateUpdate', (state) => {
  players = state;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of players) {
    ctx.fillStyle = 'red';
    ctx.fillRect(p.x + canvas.width / 2, p.y + canvas.height / 2, 20, 20);
  }
  updateHUD(players);
  requestAnimationFrame(draw);
}

draw();
