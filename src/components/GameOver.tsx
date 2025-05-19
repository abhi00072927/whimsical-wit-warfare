
import { Button } from "@/components/ui/button";
import { Trophy, Award, PartyPopper, ArrowRight } from "lucide-react";

interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver = ({ score, onRestart }: GameOverProps) => {
  // Generate a funny message based on score
  const getFunnyMessage = () => {
    if (score >= 1000) return "Word Wizard Extraordinaire!";
    if (score >= 700) return "Vocabulary Virtuoso!";
    if (score >= 400) return "Decent Word Detective!";
    if (score >= 200) return "Wordplay Wannabe!";
    return "Word Novice... Keep Practicing!";
  };

  const getMessage = getFunnyMessage();
  const AwardIcon = score >= 700 ? Trophy : score >= 300 ? Award : PartyPopper;

  return (
    <div className="text-center space-y-6 bg-gradient-to-b from-purple-50 to-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
      <div className="flex justify-center">
        <div className="rounded-full bg-primary/10 p-4 animate-bounce-slow">
          <AwardIcon className="h-12 w-12 text-primary" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold">Game Over!</h2>
      
      <div className="space-y-2">
        <p className="text-gray-500">Your final score</p>
        <p className="text-5xl font-bold text-primary animate-pulse">{score}</p>
      </div>
      
      <div className="p-3 bg-accent/20 rounded-lg">
        <p className="font-medium text-lg">{getMessage}</p>
      </div>
      
      <Button 
        onClick={onRestart}
        className="bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-full text-lg font-medium flex items-center justify-center gap-2 w-full"
      >
        Play Again
        <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default GameOver;
