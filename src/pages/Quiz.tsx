import { useState } from "react";
import { quizQuestions, calculateQuizResult } from "@/lib/aiEngine";
import type { QuizResult } from "@/lib/aiEngine";
import { ChevronRight, RotateCcw, Share2 } from "lucide-react";

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [animating, setAnimating] = useState(false);

  const question = quizQuestions[currentQ];
  const progress = (currentQ / quizQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    setAnimating(true);
    setTimeout(() => {
      if (currentQ < quizQuestions.length - 1) {
        setCurrentQ(q => q + 1);
        setAnimating(false);
      } else {
        const res = calculateQuizResult(newAnswers);
        setResult(res);
        setAnimating(false);
      }
    }, 300);
  };

  const reset = () => {
    setAnswers({});
    setCurrentQ(0);
    setResult(null);
  };

  if (result) {
    return (
      <div className="page-bg min-h-screen pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-2xl w-full animate-fade-in-up">
          <div className={`glass-card rounded-3xl p-10 text-center bg-gradient-to-br ${result.color} border border-primary/20`}>
            <div className="text-7xl mb-6 animate-float">{result.icon}</div>
            <div className="tag-badge inline-flex mb-4">Your Style DNA</div>
            <h1 className="font-display text-5xl font-black gradient-text mb-4">{result.style}</h1>
            <p className="text-foreground/80 leading-relaxed mb-8 text-lg">{result.description}</p>

            <div className="grid sm:grid-cols-2 gap-6 text-left mb-8">
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold text-primary mb-3">👗 Your Signature Pieces</h3>
                <ul className="space-y-2">
                  {result.pieces.map((p, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <h3 className="font-semibold text-accent mb-3">⭐ Your Style Icons</h3>
                <ul className="space-y-2">
                  {result.celebrities.map((c, i) => (
                    <li key={i} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={reset} className="btn-primary flex items-center gap-2">
                <RotateCcw className="w-4 h-4" /> Retake Quiz
              </button>
              <button
                onClick={() => navigator.share?.({ title: `My style is ${result.style}!`, text: result.description })}
                className="btn-gold flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" /> Share Result
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg min-h-screen pt-24 pb-20 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="tag-badge inline-flex mb-4">🧠 Style Personality AI</div>
          <h1 className="font-display text-4xl sm:text-5xl font-black gradient-text mb-2">Fashion DNA Quiz</h1>
          <p className="text-muted-foreground">5 questions to discover your unique fashion personality</p>
        </div>

        {/* Progress */}
        <div className="glass-card rounded-2xl p-4 mb-6 animate-fade-in-up">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Question {currentQ + 1} of {quizQuestions.length}</span>
            <span className="gradient-text font-bold">{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className={`glass-card rounded-3xl p-8 transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}>
          <div className="text-center mb-8">
            <span className="text-5xl mb-4 block animate-float">{question.emoji}</span>
            <h2 className="font-display text-2xl font-bold">{question.question}</h2>
          </div>

          <div className="space-y-3">
            {question.options.map((option, i) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full text-left p-4 rounded-2xl border border-border hover:border-primary hover:bg-primary/10 transition-all duration-200 flex items-center justify-between group ${option.style}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-sm font-medium">{option.label}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>

          {/* Answered questions indicator */}
          <div className="flex gap-2 justify-center mt-8">
            {quizQuestions.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i < currentQ ? "w-6 bg-primary" : i === currentQ ? "w-6 bg-accent animate-pulse" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
