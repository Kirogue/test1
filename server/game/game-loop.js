const Player = require('./player');

const players = new Map();
const pendingActions = new Map();

function addPlayer(id) {
  players.set(id, new Player(id));
}

function removePlayer(id) {
  players.delete(id);
  pendingActions.delete(id);
}

function handleAction(id, action) {
  pendingActions.set(id, action);
}

function updatePlayers() {
  for (const [id, player] of players.entries()) {
    const action = pendingActions.get(id);
    if (action) {
      player.update(action);
      pendingActions.delete(id);
    }
    player.tick();
  }
}

function getState() {
  return Array.from(players.values()).map(p => ({
    id: p.id,
    x: p.x,
    y: p.y,
    hp: p.hp,
  }));
}

function initGameLoop(io) {
  setInterval(() => {
    updatePlayers();
    io.emit('stateUpdate', getState());
  }, 1000 / 60);
}

module.exports = { initGameLoop, addPlayer, removePlayer, handleAction };
