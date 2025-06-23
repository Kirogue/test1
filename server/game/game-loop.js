const players = new Map();

function addPlayer(id) {
  players.set(id, { id, x: 0, y: 0, hp: 100 });
}

function removePlayer(id) {
  players.delete(id);
}

function updatePlayers() {
  for (const player of players.values()) {
    // Example: simple random movement
    player.x += Math.random() * 2 - 1;
    player.y += Math.random() * 2 - 1;
  }
}

function getState() {
  return Array.from(players.values());
}

function initGameLoop(io) {
  setInterval(() => {
    updatePlayers();
    io.emit('stateUpdate', getState());
  }, 1000 / 60);
}

module.exports = { initGameLoop, addPlayer, removePlayer };
