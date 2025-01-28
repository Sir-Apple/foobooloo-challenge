import { useState } from "react";
import { GameSetup, GameConfig } from "@/components/GameSetup";
import { GamePlay } from "@/components/GamePlay";
import { GameOver } from "@/components/GameOver";

type GameState = "setup" | "playing" | "over";

interface GameScore {
  correct: number;
  incorrect: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [finalScore, setFinalScore] = useState<GameScore | null>(null);

  const handleStartGame = (config: GameConfig) => {
    setGameConfig(config);
    setGameState("playing");
  };

  const handleGameEnd = (score: GameScore) => {
    setFinalScore(score);
    setGameState("over");
  };

  const handlePlayAgain = () => {
    setGameState("setup");
    setGameConfig(null);
    setFinalScore(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 relative overflow-hidden font-iceland">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMTBiOTgxMjAiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900/80"></div>
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-full"></div>
        {gameState === "setup" && <GameSetup onStartGame={handleStartGame} />}
        {gameState === "playing" && gameConfig && (
          <GamePlay duration={gameConfig.duration} onGameEnd={handleGameEnd} />
        )}
        {gameState === "over" && finalScore && (
          <GameOver score={finalScore} onPlayAgain={handlePlayAgain} />
        )}
      </div>
    </div>
  );
};

export default Index;