
import { Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ScoreDisplayProps {
  score: number;
  round: number;
  totalRounds: number;
  className?: string;
}

const ScoreDisplay = ({
  score,
  round,
  totalRounds,
  className,
}: ScoreDisplayProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Round</p>
            <p className="text-2xl font-bold">{round} / {totalRounds}</p>
          </div>
          
          <div className="space-y-1 text-right">
            <div className="flex items-center justify-end gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <p className="text-sm font-medium text-muted-foreground">Score</p>
            </div>
            <p className="text-2xl font-bold text-primary animate-float">{score}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreDisplay;
