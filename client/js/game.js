import { updateHUD } from './ui.js';

const socket = io();
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let players = [];

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
