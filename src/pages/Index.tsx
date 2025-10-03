import { useState, useRef } from "react";
import { QuizGate } from "@/components/QuizGate";
import { FloatingHearts } from "@/components/FloatingHearts";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { CountdownTimer } from "@/components/CountdownTimer";
import { FinalSurprise } from "@/components/FinalSurprise";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import audioo from "@/assets/audioo.mp3";
import bgImage from "@/assets/bg.jpg"; // background image

const Index = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  // Persistent audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioo);
      audioRef.current.loop = true;
    }

    if (musicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setMusicPlaying(!musicPlaying);
  };

  if (!quizCompleted) {
    return (
      <>
        <FloatingHearts />
        <QuizGate onComplete={() => setQuizCompleted(true)} />
      </>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Static Blurred Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Dark overlay for readability */}
      <div className="fixed inset-0 bg-black/40"></div>

      {/* Content Layer */}
      <div className="relative z-10 pt-safe-top pb-safe-bottom">
        <FloatingHearts />

        {/* Music Toggle Button */}
        <Button
          variant="romantic"
          size="icon"
          className="fixed top-3 right-3 md:top-4 md:right-4 z-50 shadow-glow-pink w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
          onClick={toggleMusic}
          aria-label={musicPlaying ? "Pause Music" : "Play Music"}
        >
          <Music
            className={
              musicPlaying
                ? "animate-spin w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
                : "w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
            }
          />
        </Button>

        {/* Photo Carousel */}
        <section className="px-4 sm:px-6 md:px-8 mb-12">
          <PhotoCarousel />
        </section>

        {/* Countdown Timer */}
        <section className="px-4 sm:px-6 md:px-8 mb-12">
          <CountdownTimer />
        </section>

        {/* Final Surprise */}
        <section className="px-4 sm:px-6 md:px-8 mb-12">
          <FinalSurprise />
        </section>
      </div>
    </div>
  );
};

export default Index;
