import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Confetti from "react-confetti";

export const FinalSurprise = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize(); // Set initial size
    window.addEventListener("resize", updateSize);

    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 relative max-w-full overflow-hidden mx-auto">
      {/* Confetti animation */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={200}
          colors={['#F87171', '#EF4444', '#FB7185', '#F43F5E']} // Red-themed confetti
        />
      )}

      <div className="container mx-auto max-w-3xl sm:max-w-4xl relative z-10">
        <Card className="p-6 sm:p-10 md:p-12 text-center shadow-glow-pink bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl sm:rounded-3xl animate-scale-in max-w-full overflow-hidden">
          {/* Title */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-romantic text-white mb-4 animate-shimmer break-words">
            iloveeuuu
          </h2>

          {/* Subheading */}
          <p className="text-base sm:text-xl md:text-2xl font-romantic text-white mb-6 break-words">
            Happy Boyfriend's Day!
          </p>

          {/* Love Message */}
          <div className="space-y-4 text-sm sm:text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed break-words">
            <p>
              Thank you for being you, for loving me, and for making every day special.
            </p>
            <p className="text-base sm:text-lg md:text-xl font-romantic text-white pt-4">
              Here's to us, forever and always!
            </p>
          </div>

          {/* Animated Row of Red Hearts */}
          <div className="mt-6 sm:mt-8 flex justify-center flex-wrap gap-2 sm:gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className="text-red-500 animate-heart-beat"
                fill="currentColor"
                size={20}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};
