import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface GameOverProps {
  score: {
    correct: number;
    incorrect: number;
  };
  onPlayAgain: () => void;
}

export function GameOver({ score, onPlayAgain }: GameOverProps) {
  const totalAnswers = score.correct + score.incorrect;
  const accuracy = totalAnswers > 0 ? Math.round((score.correct / totalAnswers) * 100) : 0;

  return (
    <Card className="w-full max-w-md p-6 space-y-6 bg-gray-900/60 border-green-500/20 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="space-y-2 text-center relative">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
          Game Over!
        </h1>
        <p className="text-gray-400 text-xl">Here's how you did:</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/20">
            <div className="text-5xl font-bold text-green-400">{score.correct}</div>
            <div className="text-lg text-gray-400">Correct</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/20">
            <div className="text-5xl font-bold text-red-400">{score.incorrect}</div>
            <div className="text-lg text-gray-400">Incorrect</div>
          </div>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-lg border border-green-500/20 text-center">
          <div className="text-5xl font-bold text-emerald-400">{accuracy}%</div>
          <div className="text-lg text-gray-400">Accuracy</div>
        </div>
      </div>

      <Button onClick={onPlayAgain} className="w-full bg-green-600 hover:bg-green-700 text-white text-xl">
        Play Again
      </Button>
    </Card>
  );
}