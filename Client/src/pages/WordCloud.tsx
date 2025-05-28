import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { MessageSquare, Users, TrendingUp, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WordData {
  text: string;
  count: number;
  x: number;
  y: number;
  id: string;
}

interface WordCloudProps {
  words: WordData[];
  setWords: React.Dispatch<React.SetStateAction<WordData[]>>;
}

const WordCloud: React.FC<WordCloudProps> = ({ words, setWords }) => {
  const navigate = useNavigate();

  const getFontSize = (count: number) => {
    const baseSize = 16;
    const multiplier = Math.min(count * 0.5, 4); // Cap the multiplier at 4x
    return baseSize + (count - 1) * 8 + multiplier * 4;
  };

  const getOpacity = (count: number) => {
    return Math.min(0.7 + count * 0.1, 1);
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
      <main className="container mx-auto px-4 py-2 relative z-10">
        {/* Back Button */}
        <Button
          variant="outline"
          className="top-4 left-4 z-20 bg-gradient-to-r bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:text-white font-medium py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          onClick={() => navigate('/')}
        >
          {/* Simple left arrow using Lucide icon */}
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </Button>
        {/* Word Cloud Display */}
        <div className="relative mb-8 py-2">          
          {words.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Star className="text-white text-3xl" />
              </div>
              <div className="text-gray-700 text-xl mb-4">
                Be the first to contribute!
              </div>
              <div className="text-gray-500 text-sm">
                Submit a word to start building our community showcase
              </div>
            </div>
          ) : (
            <div className="relative min-h-[60vh] h-[60vh] md:min-h-[65vh] md:h-[65vh] bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex items-center justify-center">
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-6 h-6 bg-blue-500/20 rounded-lg transform rotate-12"></div>
              <div className="absolute top-4 right-4 w-4 h-4 bg-indigo-500/20 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-blue-600/20 transform skew-x-12"></div>
              
              {words.map((word, index) => (
                <div
                  key={word.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-110 animate-fade-in"
                  style={{
                    left: `${word.x}%`,
                    top: `${word.y}%`,
                    fontSize: `${getFontSize(word.count)}px`,
                    opacity: getOpacity(word.count),
                    color: `hsl(${210 + (index % 3) * 20}, 70%, ${Math.max(40, 60 - word.count * 5)}%)`,
                    fontWeight: Math.min(400 + word.count * 100, 700),
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    animationDelay: `${index * 0.1}s`,
                  }}
                  title={`"${word.text}" - submitted ${word.count} time${word.count > 1 ? 's' : ''}`}
                >
                  {word.text}
                  {word.count > 1 && (
                    <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full shadow-sm">
                      {word.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {words.length > 0 && (
          <div className="grid grid-cols-3 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            <Card className="text-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold mb-2">{words.length}</div>
              <div className="text-sm opacity-90">Unique Words</div>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold mb-2">
                {words.reduce((sum, word) => sum + word.count, 0)}
              </div>
              <div className="text-sm opacity-90">Total Contributions</div>
            </Card>
            <Card className="text-center p-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-0 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-bold mb-2">
                {Math.max(...words.map(word => word.count))}
              </div>
              <div className="text-sm opacity-90">Most Popular</div>
            </Card>
          </div>
        )}

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

export default WordCloud;
