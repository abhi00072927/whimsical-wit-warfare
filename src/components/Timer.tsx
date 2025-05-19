
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TimerProps {
  initialTime: number;
  isRunning: boolean;
  onTimeUp: () => void;
}

const Timer = ({ initialTime, isRunning, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    setTimeLeft(initialTime);
    setProgress(100);
  }, [initialTime]);

  useEffect(() => {
    let timer: number | undefined;

    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress((newTime / initialTime) * 100);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      onTimeUp();
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, isRunning, initialTime, onTimeUp]);

  // Determine color based on time left
  const getColorClass = () => {
    if (progress > 60) return "bg-green-500";
    if (progress > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">Time Remaining</span>
        <span className={`font-mono text-lg ${timeLeft <= 10 ? "text-red-500 animate-pulse" : ""}`}>
          {timeLeft}s
        </span>
      </div>
      <Progress 
        value={progress} 
        className={cn("h-3 transition-all", getColorClass())} 
      />
    </div>
  );
};

export default Timer;
