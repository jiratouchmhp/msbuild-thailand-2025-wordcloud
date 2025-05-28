import React, { useState, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import WordCloud from "./pages/WordCloud";
import { io, Socket } from "socket.io-client";

const queryClient = new QueryClient();

interface WordData {
  text: string;
  count: number;
  x: number;
  y: number;
  id: string;
}

interface AppConfig {
  API_ENDPOINT: string;
}

const App = () => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [words, setWords] = useState<WordData[]>([]);

  // Load words from server on initial load
  useEffect(() => {
    fetch("/config.json")
      .then((response) => response.json())
      .then((config) => {
        console.log(config.API_ENDPOINT);
        setConfig(config);
      });
  }, []);

  useEffect(() => {
    if (!config) return;
    fetch(`${config.API_ENDPOINT}/api/words`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: WordData[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setWords(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch words from server:", err);
      });
  }, [config]);

  // Keep socket instance in a ref to avoid re-connecting on re-renders
  const socketioRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!config) return;
    // Connect to Socket.IO server
    socketioRef.current = io(`${config.API_ENDPOINT}`, {
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
  }, [config]);

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
            <Route
              path="/"
              element={
                <Index
                  words={words}
                  setWords={setWords}
                  wsSubmitWord={wsSubmitWord}
                />
              }
            />
            <Route
              path="/wordCloud"
              element={<WordCloud words={words} setWords={setWords} />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
