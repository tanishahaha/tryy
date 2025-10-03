import { Card } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";

const letters = [
  {
    title: "My Dearest Love",
    content: "Every moment with you feels like a beautiful dream. Your smile lights up my world, and your laughter is my favorite melody. Thank you for being the most amazing person in my life.",
    icon: Heart,
  },
  {
    title: "Forever Grateful",
    content: "I'm so grateful for every second we spend together. You make ordinary days extraordinary, and you turn my fears into courage. I love you more than words can express.",
    icon: Sparkles,
  },
  {
    title: "You & Me",
    content: "Together, we've created countless beautiful memories. From late-night talks to silly adventures, every moment with you is precious. Here's to many more beautiful days ahead!",
    icon: Heart,
  },
];

export const LoveLetters = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* <h2 className="text-4xl md:text-5xl font-romantic text-gradient text-center mb-12 animate-heart-beat">
          Love Letters for You 💌
        </h2> */}
        <div className="grid md:grid-cols-3 gap-6">
          {letters.map((letter, index) => {
            const Icon = letter.icon;
            return (
              <Card
                key={index}
                className="p-6 shadow-glow-pink hover:shadow-glow-lavender transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="text-primary animate-heart-beat" fill="currentColor" size={24} />
                  <h3 className="text-xl font-romantic text-foreground">{letter.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{letter.content}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
