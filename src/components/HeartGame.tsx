import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}

export const HeartGame = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(30);
    generateHearts();
  };

  const generateHearts = () => {
    const newHearts: FloatingHeart[] = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 10,
      collected: false,
    }));
    setHearts(newHearts);
  };

  const collectHeart = (id: number) => {
    if (!gameActive) return;
    setHearts(hearts.map(h => h.id === id ? { ...h, collected: true } : h));
    setScore(score + 10);
    
    setTimeout(() => {
      setHearts(hearts.filter(h => h.id !== id));
    }, 300);
  };

  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const heartGenerator = setInterval(() => {
      if (hearts.length < 10) {
        const newHeart: FloatingHeart = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 10,
          collected: false,
        };
        setHearts(prev => [...prev, newHeart]);
      }
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(heartGenerator);
    };
  }, [gameActive, hearts.length]);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-8 shadow-glow-lavender">
        <h2 className="text-4xl md:text-5xl font-romantic text-red-500 text-center mb-8 animate-heart-beat">
          Collect My Hearts! 💕
        </h2>
          {!gameActive && timeLeft === 30 ? (
            <div className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                Click on the floating hearts to collect them!
              </p>
              <Button variant="romantic" size="lg" onClick={startGame}>
                Start Game
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="text-primary">Score: {score}</span>
                <span className="text-secondary-foreground">Time: {timeLeft}s</span>
              </div>
              
              <div className="relative h-96 bg-gradient-dreamy rounded-lg overflow-hidden border-2 border-primary/20">
                {hearts.map(heart => (
                  <button
                    key={heart.id}
                    onClick={() => collectHeart(heart.id)}
                    className={`absolute transition-all duration-300 ${
                      heart.collected ? 'scale-150 opacity-0' : 'scale-100 opacity-100 hover:scale-125'
                    }`}
                    style={{
                      left: `${heart.x}%`,
                      top: `${heart.y}%`,
                    }}
                  >
                    <Heart
                      className="text-primary animate-heart-beat cursor-pointer"
                      fill="currentColor"
                      size={32}
                    />
                  </button>
                ))}
              </div>

              {!gameActive && timeLeft === 0 && (
                <div className="text-center space-y-4 pt-4">
                  <p className="text-2xl font-romantic text-gradient">
                    Game Over! You collected {score} points! 💖
                  </p>
                  <Button variant="romantic" onClick={startGame}>
                    Play Again
                  </Button>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};
