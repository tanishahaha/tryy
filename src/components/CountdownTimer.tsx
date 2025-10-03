import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownTimer = () => {
  // Set your relationship start date here (example: June 4, 2025)
  const startDate = new Date('2025-06-04T00:00:00');

  const [timeElapsed, setTimeElapsed] = useState<TimeUnits>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-romantic rounded-xl p-3 sm:p-4 shadow-glow-pink min-w-[64px] sm:min-w-[80px]">
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">{label}</span>
    </div>
  );

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-romantic/10">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-6 sm:p-8 shadow-glow-lavender">
          <div className="text-center mb-6 sm:mb-8">
            <Heart className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 text-red-500 animate-heart-beat" fill="currentColor" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-romantic text-black mb-3">
              Our Love Story
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              We've been together for...
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <TimeUnit value={timeElapsed.days} label="Days" />
            <TimeUnit value={timeElapsed.hours} label="Hours" />
            <TimeUnit value={timeElapsed.minutes} label="Minutes" />
            <TimeUnit value={timeElapsed.seconds} label="Seconds" />
          </div>
          <p className="text-center mt-6 sm:mt-8 text-base sm:text-lg font-romantic text-red-500">
            And every second with you is a blessing! 💕
          </p>
        </Card>
      </div>
    </section>
  );
};
