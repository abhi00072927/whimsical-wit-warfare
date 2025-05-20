
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Gamepad2, Play, FileText, FileUp } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import Timer from '@/components/Timer';
import ScoreDisplay from '@/components/ScoreDisplay';
import GameCard from '@/components/GameCard';
import GameOver from '@/components/GameOver';
import { 
  getRandomGameWords, 
  GameWord 
} from '@/data/gameData';
import { 
  GameState, 
  createInitialState, 
  checkGuess, 
  calculateScore, 
  revealRandomLetter, 
  displayFeedback, 
  getDisplayWord, 
  GAME_TIME 
} from '@/lib/gameLogic';

const TOTAL_ROUNDS = 5;

const Index = () => {
  const { toast } = useToast();
  const [gameWords, setGameWords] = useState<GameWord[]>([]);
  const [gameState, setGameState] = useState<GameState>(createInitialState(TOTAL_ROUNDS));
  const [displayWord, setDisplayWord] = useState<string>('');
  
  // Prepare game with random words
  const prepareGame = useCallback(() => {
    const words = getRandomGameWords(TOTAL_ROUNDS);
    setGameWords(words);
    
    const initialState = createInitialState(TOTAL_ROUNDS);
    setGameState(initialState);
  }, []);
  
  // Start the game
  const startGame = useCallback(() => {
    if (gameWords.length === 0) {
      return;
    }
    
    const currentWord = gameWords[0];
    const revealedLetters = new Array(currentWord.word.length).fill(false);
    
    setGameState(prev => ({
      ...prev,
      status: 'playing',
      currentRound: 1,
      timeRemaining: GAME_TIME,
      currentWord: currentWord,
      revealedLetters: revealedLetters,
      hintUsed: false
    }));
    
    setDisplayWord(getDisplayWord(currentWord.word, revealedLetters));
  }, [gameWords]);
  
  // Initialize game on component mount
  useEffect(() => {
    prepareGame();
  }, [prepareGame]);
  
  // Handle guesses from the player
  const handleGuess = useCallback((guess: string) => {
    if (gameState.status !== 'playing' || !gameState.currentWord) return;
    
    const isCorrect = checkGuess(guess, gameState.currentWord.word);
    
    if (isCorrect) {
      // Calculate score based on time remaining and if hint was used
      const pointsEarned = calculateScore(
        gameState.timeRemaining, 
        gameState.hintUsed
      );
      
      displayFeedback(true);
      
      // Check if this was the last round
      if (gameState.currentRound >= gameState.totalRounds) {
        // Game over - player completed all rounds
        setGameState(prev => ({
          ...prev,
          score: prev.score + pointsEarned,
          status: 'gameover'
        }));
      } else {
        // Move to next round
        const nextRound = gameState.currentRound + 1;
        const nextWord = gameWords[nextRound - 1];
        const newRevealedLetters = new Array(nextWord.word.length).fill(false);
        
        setGameState(prev => ({
          ...prev,
          currentRound: nextRound,
          score: prev.score + pointsEarned,
          timeRemaining: GAME_TIME,
          currentWord: nextWord,
          revealedLetters: newRevealedLetters,
          hintUsed: false
        }));
        
        setDisplayWord(getDisplayWord(nextWord.word, newRevealedLetters));
        
        toast({
          title: "Next Round!",
          description: `Round ${nextRound} of ${gameState.totalRounds}`,
          className: "bg-green-500 text-white"
        });
      }
    } else {
      displayFeedback(false);
      
      // Penalize wrong guess by reducing time
      setGameState(prev => ({
        ...prev,
        timeRemaining: Math.max(prev.timeRemaining - 5, 0)
      }));
    }
  }, [gameState, gameWords, toast]);
  
  // Handle time up
  const handleTimeUp = useCallback(() => {
    if (!gameState.currentWord) return;
    
    toast({
      title: "Time's up!",
      description: `The word was: "${gameState.currentWord.word}"`,
      variant: "destructive"
    });
    
    // Check if this was the last round
    if (gameState.currentRound >= gameState.totalRounds) {
      // Game over - ran out of time on last round
      setGameState(prev => ({
        ...prev,
        status: 'gameover'
      }));
    } else {
      // Move to next round
      const nextRound = gameState.currentRound + 1;
      const nextWord = gameWords[nextRound - 1];
      const newRevealedLetters = new Array(nextWord.word.length).fill(false);
      
      setGameState(prev => ({
        ...prev,
        currentRound: nextRound,
        timeRemaining: GAME_TIME,
        currentWord: nextWord,
        revealedLetters: newRevealedLetters,
        hintUsed: false
      }));
      
      setDisplayWord(getDisplayWord(nextWord.word, newRevealedLetters));
    }
  }, [gameState.currentRound, gameState.currentWord, gameState.totalRounds, gameWords, toast]);
  
  // Handle hint usage
  const handleHint = useCallback(() => {
    if (
      gameState.status !== 'playing' || 
      !gameState.currentWord || 
      gameState.hintUsed
    ) return;
    
    const newRevealedLetters = revealRandomLetter(
      gameState.currentWord.word,
      gameState.revealedLetters
    );
    
    setGameState(prev => ({
      ...prev,
      revealedLetters: newRevealedLetters,
      hintUsed: true
    }));
    
    setDisplayWord(getDisplayWord(gameState.currentWord.word, newRevealedLetters));
    
    toast({
      title: "Hint Used!",
      description: "A letter has been revealed, but your score will be reduced.",
      className: "bg-yellow-500 text-white"
    });
  }, [gameState, toast]);
  
  // Update display word when revealed letters change
  useEffect(() => {
    if (gameState.currentWord && gameState.revealedLetters) {
      setDisplayWord(getDisplayWord(
        gameState.currentWord.word,
        gameState.revealedLetters
      ));
    }
  }, [gameState.currentWord, gameState.revealedLetters]);
  
  // Render the game UI based on status
  const renderGame = () => {
    switch (gameState.status) {
      case 'ready':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-5xl font-bold text-primary animate-bounce-slow">Word Giggles</h1>
              <p className="text-xl text-gray-600">
                Guess the funny words before time runs out!
              </p>
            </div>
            
            <div className="bg-purple-100 p-5 rounded-lg max-w-md">
              <h2 className="font-bold text-lg mb-2">How to Play:</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Guess the funny word or phrase from the clue</li>
                <li>Type your answer and click "Guess!"</li>
                <li>Use hints if you get stuck (affects your score)</li>
                <li>Complete {TOTAL_ROUNDS} rounds to win!</li>
              </ul>
            </div>
            
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-xl flex items-center gap-2"
              onClick={startGame}
            >
              <Play className="h-6 w-6" />
              Start Game
            </Button>
          </div>
        );
        
      case 'playing':
        return (
          <div className="max-w-4xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-3">
                <Timer 
                  initialTime={GAME_TIME} 
                  isRunning={gameState.status === 'playing'} 
                  onTimeUp={handleTimeUp} 
                />
              </div>
              
              <div className="md:col-span-3">
                <ScoreDisplay 
                  score={gameState.score} 
                  round={gameState.currentRound} 
                  totalRounds={gameState.totalRounds} 
                />
              </div>
            </div>
            
            {gameState.currentWord && (
              <GameCard 
                gameWord={gameState.currentWord} 
                displayWord={displayWord}
                onGuess={handleGuess}
                onHint={handleHint}
                hintUsed={gameState.hintUsed}
                isPlaying={gameState.status === 'playing'}
              />
            )}
          </div>
        );
        
      case 'gameover':
        return (
          <GameOver 
            score={gameState.score} 
            onRestart={() => {
              prepareGame();
              setTimeout(startGame, 100);
            }} 
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            {gameState.status !== 'ready' && (
              <>
                <Gamepad2 className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold text-primary">Word Giggles</h1>
              </>
            )}
          </div>

          {/* AGH International Import Export Heading */}
          <div className="flex items-center gap-2 bg-gradient-to-r from-accent to-secondary p-3 rounded-lg shadow-md">
            <div className="flex gap-1">
              <FileText className="h-6 w-6 text-primary-foreground" />
              <FileUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-primary-foreground">AGH</h2>
              <p className="text-sm text-white">International Import Export</p>
            </div>
          </div>
        </div>
        
        {renderGame()}
      </div>
    </div>
  );
};

export default Index;
