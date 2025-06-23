const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const {
  initGameLoop,
  addPlayer,
  removePlayer,
  handleAction,
} = require('./game/game-loop');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve client files
app.use(express.static(path.join(__dirname, '../client')));

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);
  addPlayer(socket.id);

  socket.on('playerAction', (action) => {
    handleAction(socket.id, action);
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.id}`);
    removePlayer(socket.id);
  });
});

initGameLoop(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
