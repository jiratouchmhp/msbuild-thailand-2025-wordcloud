export interface WordData {
  text: string;
  count: number;
  x: number;
  y: number;
  id: string;
}

let words: WordData[] = [];

export const getRandomPosition = () => {
  return {
    x: Math.random() * 80 + 10, // 10% to 90% of container width
    y: Math.random() * 70 + 15, // 15% to 85% of container height
  };
};

export const saveWordToServerMemory = (inputWord: string) => {
  const trimmedWord = inputWord.trim().toLowerCase();
  const existingWordIndex = words.findIndex(word => word.text.toLowerCase() === trimmedWord);
  if (existingWordIndex !== -1) {
    words[existingWordIndex].count += 1;
  } else {
    const newWord: WordData = {
      text: trimmedWord,
      count: 1,
      ...getRandomPosition(),
      id: Date.now().toString() + Math.random(),
    };
    words.push(newWord);
  }
};

export const resetWords = () => { words = []; };
export const getWords = () => words;
