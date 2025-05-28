import { describe, it, expect, beforeEach } from '@jest/globals';

// Import the functions to test
// We'll need to re-export them from index.ts for direct testing
import { saveWordToServerMemory, getRandomPosition, resetWords, getWords } from './wordUtils';

describe('saveWordToServerMemory', () => {
  beforeEach(() => {
    resetWords();
  });

  it('adds a new word to the list', () => {
    saveWordToServerMemory('hello');
    const words = getWords();
    expect(words.length).toBe(1);
    expect(words[0].text).toBe('hello');
    expect(words[0].count).toBe(1);
  });

  it('increments count for existing word (case-insensitive)', () => {
    saveWordToServerMemory('Hello');
    saveWordToServerMemory('hello');
    const words = getWords();
    expect(words.length).toBe(1);
    expect(words[0].count).toBe(2);
  });

  it('trims and lowercases input', () => {
    saveWordToServerMemory('  TestWord  ');
    const words = getWords();
    expect(words[0].text).toBe('testword');
  });
});

describe('getRandomPosition', () => {
  it('returns x and y within expected ranges', () => {
    for (let i = 0; i < 10; i++) {
      const pos = getRandomPosition();
      expect(pos.x).toBeGreaterThanOrEqual(10);
      expect(pos.x).toBeLessThanOrEqual(90);
      expect(pos.y).toBeGreaterThanOrEqual(15);
      expect(pos.y).toBeLessThanOrEqual(85);
    }
  });
});
