import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface GameSetupProps {
  onStartGame: (config: GameConfig) => void;
}

export interface GameConfig {
  gameName: string;
  authorName: string;
  duration: number;
}

export function GameSetup({ onStartGame }: GameSetupProps) {
  const [gameName, setGameName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [duration, setDuration] = useState(60);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartGame({ gameName, authorName, duration });
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6 bg-gray-900/60 border-green-500/20 backdrop-blur-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="space-y-2 text-center relative">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
          FooBooLoo
        </h1>
        <p className="text-gray-400 text-xl">Set up your game</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative">
        <div className="space-y-2">
          <Label htmlFor="gameName" className="text-gray-300 text-lg">Game Name</Label>
          <Input
            id="gameName"
            required
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            placeholder="Enter a unique game name"
            className="bg-gray-800/50 border-green-500/20 text-gray-100 placeholder:text-gray-500 text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="authorName" className="text-gray-300 text-lg">Your Name</Label>
          <Input
            id="authorName"
            required
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Enter your name"
            className="bg-gray-800/50 border-green-500/20 text-gray-100 placeholder:text-gray-500 text-lg"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-gray-300 text-lg">Game Duration (seconds)</Label>
          <Input
            id="duration"
            type="number"
            min={30}
            max={300}
            required
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="bg-gray-800/50 border-green-500/20 text-gray-100 text-lg"
          />
        </div>

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white text-lg">
          Start Game
        </Button>
      </form>

      <div className="space-y-4 bg-gray-800/50 p-4 rounded-lg border border-green-500/20">
        <h2 className="font-semibold text-gray-300 text-xl">Game Rules:</h2>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-400">
          <li>Numbers divisible by 7 become "Foo"</li>
          <li>Numbers divisible by 11 become "Boo"</li>
          <li>Numbers divisible by 103 become "Loo"</li>
          <li>Combinations stack (e.g., FooBoo for numbers divisible by both 7 and 11)</li>
        </ul>
      </div>
    </Card>
  );
}