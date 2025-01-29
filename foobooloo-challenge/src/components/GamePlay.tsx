import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface GamePlayProps {
  duration: number;
  onGameEnd: (score: { correct: number; incorrect: number }) => void;
}

export function GamePlay({ duration, onGameEnd }: GamePlayProps) {
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(duration);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [usedNumbers, setUsedNumbers] = useState(new Set<number>());
  const { toast } = useToast();

  useEffect(() => {
    generateNewNumber();
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onGameEnd({ ...score }); // Ensure the latest score is passed
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [score]); // Depend on score to ensure the latest value is captured

  const generateNewNumber = () => {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 1000) + 1;
    } while (usedNumbers.has(newNumber));

    setUsedNumbers((prev) => new Set(prev).add(newNumber));
    setCurrentNumber(newNumber);
  };

  const checkAnswer = (userAnswer: string) => {
    const correctAnswer = calculateAnswer(currentNumber);
    return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
  };

  const calculateAnswer = (num: number): string => {
    let answer = "";
    if (num % 7 === 0) answer += "Foo";
    if (num % 11 === 0) answer += "Boo";
    if (num % 103 === 0) answer += "Loo";
    return answer || num.toString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = checkAnswer(answer);

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
    }));

    toast({
      title: isCorrect ? "Correct!" : "Incorrect!",
      description: isCorrect ? "Great job!" : `The correct answer was: ${calculateAnswer(currentNumber)}`,
      variant: isCorrect ? "default" : "destructive",
    });

    setAnswer("");
    generateNewNumber();
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 bg-gray-900/60 border-green-500/20 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="flex justify-between items-center text-gray-300">
        <div className="text-3xl font-bold">Time: {timeLeft}s</div>
        <div className="text-2xl">
          Score: {score.correct}/{score.correct + score.incorrect}
        </div>
      </div>

      <div className="text-center">
        <div className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 animate-number-pop mb-8">
          {currentNumber}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className="text-center text-2xl bg-gray-800/50 border-green-500/20 text-gray-100 placeholder:text-gray-500"
            autoFocus
          />
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-xl">
            Submit
          </Button>
        </form>
      </div>
    </Card>
  );
}
