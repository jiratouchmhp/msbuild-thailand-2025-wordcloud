import React, { useState, useEffect, useRef } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import WordCloud from './pages/WordCloud';
import { io, Socket } from "socket.io-client";

const queryClient = new QueryClient();

interface WordData {
  text: string;
  count: number;
  x: number;
  y: number;
  id: string;
}

const SOCKET_URL = "http://localhost:5000";

const App = () => {
  const [words, setWords] = useState<WordData[]>([]);

  // Load words from localStorage on mount
  useEffect(() => {
    const savedWords = localStorage.getItem('showcaseWords');
    if (savedWords) {
      setWords(JSON.parse(savedWords));
    }
  }, []);

  // Save words to localStorage whenever words change
  useEffect(() => {
    localStorage.setItem('showcaseWords', JSON.stringify(words));
  }, [words]);

  // Keep socket instance in a ref to avoid re-connecting on re-renders
  const socketioRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to Socket.IO server
    socketioRef.current = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    // Example: Listen for a test event
    socketioRef.current.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });
    
    socketioRef.current.on("updatedWordArray", (words) => {
      console.log("word array:", JSON.stringify(words));
      setWords(words);
    });

    // Clean up on unmount
    return () => {
      socketioRef.current?.disconnect();
    };
  }, []);

  const wsSubmitWord = (word: String) => {
    if (socketioRef.current && socketioRef.current.connected) {
      socketioRef.current.emit("submitWord", word);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index words={words} setWords={setWords} wsSubmitWord={wsSubmitWord} />} />
            <Route path="/wordCloud" element={<WordCloud words={words} setWords={setWords} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
