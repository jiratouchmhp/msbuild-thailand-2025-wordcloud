import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.send('Welcome to the Microsoft Build Thailand 2025👋, API server is running ✨');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});