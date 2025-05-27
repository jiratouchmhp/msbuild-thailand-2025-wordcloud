import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

interface WordData {
  text: string;
  count: number;
  x: number;
  y: number;
  id: string;
}

let words: WordData[] = [];

const getRandomPosition = () => {
  return {
    x: Math.random() * 80 + 10, // 10% to 90% of container width
    y: Math.random() * 70 + 15, // 15% to 85% of container height
  };
};

const saveWordToServerMemory = (inputWord: String) => {
  const trimmedWord = inputWord.trim().toLowerCase();
  const existingWordIndex = words.findIndex(word => word.text.toLowerCase() === trimmedWord);
  if (existingWordIndex !== -1) {
    // Word exists, increment count
    words[existingWordIndex].count += 1;
  } else {
    // New word, add to array
    const newWord: WordData = {
      text: trimmedWord,
      count: 1,
      ...getRandomPosition(),
      id: Date.now().toString() + Math.random(),
    };
    words.push(newWord);
  }
}

const FRONTEND_URL = "http://localhost:3000";
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL
  }
});

app.use(cors({
  origin: FRONTEND_URL,
}));

app.get('/', (req, res) => {
  res.send('Welcome to the Microsoft Build Thailand 2025👋, API server is running ✨');
});

app.get('/api/words', (req, res) => {
  res.send(words);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('submitWord', (word) => {
    console.log('word: '+ word);
    saveWordToServerMemory(word);
    io.emit('updatedWordArray', words);
  });
});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});