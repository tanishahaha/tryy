import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import couplePhoto from "@/assets/couple-photo.jpg";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    question: "Our first date?",
    options: ["College", "Gorai", "Mall", "Cafee"],
    correctAnswer: 1,
  },
  {
    question: "Our go to food?",
    options: ["Burger", "Pizza", "Biryani", "Pani Puri"],
    correctAnswer: 3,
  },
  {
    question: "When did we became Unlabelled?",
    options: ["5th June", "19th June", "4th June", "6th June"],
    correctAnswer: 2,
  },
  {
    question: "Who are u to me?",
    options: ["stupidBAKRAA", "gentleBAKRAA", "bhondu bandar", "All of the above"],
    correctAnswer: 3,
  },
  {
    question: "How months are we in?",
    options: ["1 month", "2 month", "3 month", "4 month"],
    correctAnswer: 2,
  },
];

interface QuizGateProps {
  onComplete: () => void;
}

export const QuizGate = ({ onComplete }: QuizGateProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>(Array(5).fill(false));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;

    let newCorrectAnswers = [...correctAnswers];
    if (isCorrect) {
      newCorrectAnswers[currentQuestion] = true;
      setCorrectAnswers(newCorrectAnswers);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else if (newCorrectAnswers.every((a) => a)) {
        setTimeout(() => {
          onComplete();
        }, 5000);
      }
    }, 1500);
  };

  const allCorrect = correctAnswers.every((a) => a);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-romantic text-gradient mb-4 p-2 animate-heart-beat font-bold">
            My gentleBAKRAA!
          </h1>
          <p className="text-lg text-muted-foreground">
            Let's test ur memory heheheh...
          </p>
        </div>

        {/* Puzzle Image */}
        <div className="mb-8">
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-soft">
            <div className="absolute inset-0 grid grid-cols-5 gap-1 bg-muted/50 p-2">
              {correctAnswers.map((isCorrect, index) => (
                <div
                  key={index}
                  className="relative rounded-lg transition-all duration-500"
                  style={{
                    backgroundImage: `url(${couplePhoto})`,
                    backgroundSize: "500% 100%", // 5 columns
                    backgroundPosition: `${index * 25}% 50%`,
                    filter: isCorrect ? "none" : "blur(8px)",
                    opacity: isCorrect ? 1 : 0.3,
                  }}
                >
                  {isCorrect && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart
                        className="w-8 h-8 text-primary animate-heart-beat"
                        fill="currentColor"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {correctAnswers.map((isCorrect, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full transition-all ${
                  isCorrect ? "bg-primary animate-heart-beat" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quiz Card */}
        {!allCorrect ? (
          <Card className="p-8 shadow-glow-pink animate-scale-in">
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <h2 className="text-2xl font-romantic text-gradient mt-2">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      showResult
                        ? index === questions[currentQuestion].correctAnswer
                          ? "romantic"
                          : selectedAnswer === index
                          ? "destructive"
                          : "outline"
                        : "outline"
                    }
                    size="lg"
                    onClick={() => !showResult && handleAnswer(index)}
                    disabled={showResult}
                    className="text-left justify-start h-auto py-4 text-base"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-8 shadow-glow-lavender text-center animate-scale-in">
            <Heart
              className="w-16 h-16 mx-auto mb-4 text-primary animate-heart-beat"
              fill="currentColor"
            />
            <h2 className="text-3xl font-romantic text-gradient mb-2">
              Awww! You know us so well!
            </h2>
            <p className="text-lg text-muted-foreground">
              Aacha hua yaad hai tujhe nahi tho...
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};
