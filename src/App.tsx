import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import WordCloud from './pages/WordCloud';

const queryClient = new QueryClient();

interface WordData {
  text: string;
  count: number;
  x: number;
  y: number;
  id: string;
}

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

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index words={words} setWords={setWords} />} />
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
