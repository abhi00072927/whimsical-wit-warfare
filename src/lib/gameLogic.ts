
import { toast } from "@/components/ui/use-toast";
import { GameWord } from "@/data/gameData";

export const GAME_TIME = 60; // seconds
export const POINTS_FOR_CORRECT = 100;
export const TIME_BONUS_MULTIPLIER = 5;

export type GameStatus = 'ready' | 'playing' | 'gameover';

export interface GameState {
  currentRound: number;
  totalRounds: number;
  score: number;
  timeRemaining: number;
  currentWord: GameWord | null;
  revealedLetters: boolean[];
  status: GameStatus;
  hintUsed: boolean;
}

export const createInitialState = (rounds: number): GameState => ({
  currentRound: 0,
  totalRounds: rounds,
  score: 0,
  timeRemaining: GAME_TIME,
  currentWord: null,
  revealedLetters: [],
  status: 'ready',
  hintUsed: false,
});

export const checkGuess = (guess: string, word: string): boolean => {
  return guess.trim().toLowerCase() === word.toLowerCase();
};

export const calculateScore = (timeLeft: number, hintUsed: boolean): number => {
  const timeBonus = timeLeft * TIME_BONUS_MULTIPLIER;
  const hintPenalty = hintUsed ? 0.5 : 1; // 50% penalty for using hint
  
  return Math.floor((POINTS_FOR_CORRECT + timeBonus) * hintPenalty);
};

export const revealRandomLetter = (word: string, revealed: boolean[]): boolean[] => {
  // Find all indices that haven't been revealed yet (excluding spaces)
  const hiddenIndices = word.split('').map((char, idx) => 
    char !== ' ' && !revealed[idx] ? idx : -1
  ).filter(idx => idx !== -1);
  
  // If all letters are revealed, return the current state
  if (hiddenIndices.length === 0) return revealed;
  
  // Pick a random hidden letter
  const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
  
  // Reveal that letter
  const newRevealed = [...revealed];
  newRevealed[randomIndex] = true;
  
  return newRevealed;
};

export const displayFeedback = (correct: boolean, word?: string) => {
  if (correct) {
    toast({
      title: "Correct!",
      description: "Great job! You guessed it right!",
      className: "bg-green-500 text-white",
    });
  } else {
    toast({
      title: "Wrong!",
      description: word ? `The correct answer was "${word}"` : "Try again!",
      variant: "destructive",
    });
  }
};

export const getDisplayWord = (word: string, revealed: boolean[]): string => {
  return word
    .split('')
    .map((char, index) => {
      if (char === ' ') return ' '; // Always show spaces
      return revealed[index] ? char : '_';
    })
    .join('');
};
