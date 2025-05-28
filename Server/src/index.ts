import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import serveStatic from 'serve-static';
import { join } from 'path';
import morgan from 'morgan';

const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";
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

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL
  }
});

app.use(cors({
  origin: FRONTEND_URL,
}));
app.use(morgan('dev'));

// overwrite config.json to provide API endpoint for frontend
app.get('/config.json', (req, res) => {
  res.type('application/json');
  res.send('{"API_ENDPOINT": "' + BACKEND_URL + '"}');
});

// Serve static files from the 'public' directory
app.use(serveStatic('public', { index: ['index.html'] }))

// API endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Microsoft Build Thailand 2025👋, API server is running ✨');
});

app.get('/api/words', (req, res) => {
  res.send(words);
});

// Serve index.html for all other GET requests (SPA fallback)
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/socket.io')) {
    return next();
  }
  res.sendFile(join(__dirname, '../public/index.html'));
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('WS: a user connected');
  
  socket.on('submitWord', (word) => {
    console.log('WS: received word ['+ word + '] from client');
    saveWordToServerMemory(word);
    io.emit('updatedWordArray', words);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});