
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Rocket } from "lucide-react";
import { GameWord } from "@/data/gameData";
import { cn } from "@/lib/utils";

interface GameCardProps {
  gameWord: GameWord;
  displayWord: string;
  onGuess: (guess: string) => void;
  onHint: () => void;
  hintUsed: boolean;
  isPlaying: boolean;
}

const GameCard = ({
  gameWord,
  displayWord,
  onGuess,
  onHint,
  hintUsed,
  isPlaying
}: GameCardProps) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guess.trim()) {
      onGuess(guess);
      setGuess("");
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg border-2 border-purple-200 animate-float">
      <CardHeader className="pb-3 text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Badge 
            variant="outline" 
            className="bg-accent text-accent-foreground font-semibold px-3 py-1"
          >
            {gameWord.category}
          </Badge>
          <Badge 
            variant={gameWord.difficulty === 'easy' ? 'default' : 
                   gameWord.difficulty === 'medium' ? 'secondary' : 'destructive'}
            className="font-semibold px-3 py-1"
          >
            {gameWord.difficulty.toUpperCase()}
          </Badge>
        </div>
        <p className="text-gray-500 text-sm">Guess this:</p>
        <div className="font-mono tracking-wider mt-2 text-2xl md:text-3xl font-bold">
          {displayWord.split('').map((char, index) => (
            <span 
              key={index} 
              className={cn(
                "inline-block px-1 min-w-6 mx-0.5 border-b-2 border-primary/70 text-center",
                char !== '_' && char !== ' ' && "text-primary animate-pop"
              )}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="bg-secondary/20 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Rocket className="h-5 w-5 text-secondary mt-0.5" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Clue:</h3>
              <p className="mt-1 text-base">{gameWord.clue}</p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <Input
              className="flex-grow text-lg"
              placeholder="Enter your guess..."
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={!isPlaying}
              autoComplete="off"
            />
            <Button 
              type="submit" 
              size="lg" 
              disabled={!isPlaying || !guess.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              Guess!
            </Button>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="justify-end pt-0">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2", 
            hintUsed ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-100"
          )}
          onClick={() => !hintUsed && onHint()}
          disabled={hintUsed || !isPlaying}
        >
          <Lightbulb className="h-4 w-4 text-yellow-500" />
          <span>{hintUsed ? "Hint Used" : "Use Hint"}</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GameCard;
