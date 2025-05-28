import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { MessageSquare, Users, TrendingUp, Star, ChartScatter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WordData {
  text: string;
  count: number;
  x: number;
  y: number;
  id: string;
}

interface IndexProps {
  words: WordData[];
  setWords: React.Dispatch<React.SetStateAction<WordData[]>>;
  wsSubmitWord: (word: string) => void;
}

const Index: React.FC<IndexProps> = ({ words, setWords, wsSubmitWord }) => {
  const [inputWord, setInputWord] = useState('');
  const navigate = useNavigate();

  const getRandomPosition = () => {
    return {
      x: Math.random() * 80 + 10, // 10% to 90% of container width
      y: Math.random() * 70 + 15, // 15% to 85% of container height
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputWord.trim()) {
      toast({
        title: "Please enter a word",
        description: "The word field cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    const trimmedWord = inputWord.trim().toLowerCase();
    
    wsSubmitWord(trimmedWord);

    setInputWord('');
    toast({
      title: "Word submitted successfully!",
      description: `"${trimmedWord}" has been added to the showcase.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-blue-500/10 rounded-lg transform rotate-12 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-indigo-500/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-600/10 transform skew-x-12"></div>
        <div className="absolute top-1/2 right-10 w-10 h-10 bg-slate-400/10 rounded-lg transform rotate-45"></div>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Microsoft Build Thailand 2025
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  Word Showcase - Share Your Voice
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {words.length}
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <Users className="w-4 h-4" />
                words submitted
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-6 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Share Your Voice
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            After experiencing all the content from Microsoft Build 2025, we invite you to share words that inspired or motivated you.
          </p>
        </div>

        {/* Submission Form */}
        <Card className="mb-8 max-w-lg mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm relative overflow-hidden transform hover:scale-105 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
          <CardContent className="p-8 relative z-10">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Submit Your Word
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Enter your word..."
                  value={inputWord}
                  onChange={(e) => setInputWord(e.target.value)}
                  className="text-center text-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl py-3 transition-all duration-200"
                  maxLength={50}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Submit Word
              </Button>
              
              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                onClick={() => navigate('/wordCloud')}
              >
                <ChartScatter className="w-4 h-4 mr-2" />
                View Word Cloud
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Instructions */}
        <div className="text-center max-w-4xl mx-auto">
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <h3 className="font-bold text-xl mb-6 text-gray-900">
              How It Works
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
              <div className="space-y-3">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Submit words that represent your experience
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  Popular words grow larger in the showcase
                </p>
              </div>
              <div className="space-y-3">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Hover over words to see submission counts
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                  Watch our community showcase grow!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6" />
            <span className="text-2xl font-bold">Microsoft Community Showcase</span>
            <TrendingUp className="w-6 h-6" />
          </div>
          <p className="opacity-90">Powered by Microsoft TH • Built with GitHub Copilot</p>
          <div className="mt-4 text-sm opacity-75">
            Connecting voices, inspiring innovation
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
