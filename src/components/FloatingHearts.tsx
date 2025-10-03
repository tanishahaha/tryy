import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface HeartProps {
  id: number;
  left: number;
  delay: number;
}

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartProps[]>([]);

  useEffect(() => {
    const initialHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float opacity-20"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animationDelay: `${heart.delay}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
        >
          <Heart
            className="text-primary"
            fill="currentColor"
            size={20 + Math.random() * 20}
          />
        </div>
      ))}
    </div>
  );
};
