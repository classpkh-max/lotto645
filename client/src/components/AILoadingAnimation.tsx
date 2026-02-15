import { useEffect, useState } from "react";
import { Loader2, Brain, Sparkles } from "lucide-react";

interface AILoadingAnimationProps {
  onComplete?: () => void;
  duration?: number;
}

export function AILoadingAnimation({ onComplete, duration = 3000 }: AILoadingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    "과거 당첨번호 패턴을 분석 중입니다…",
    "AI가 최적의 번호 조합을 생성 중…",
    "추천 번호를 준비하고 있습니다…",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, duration / 50);

    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, duration / messages.length);

    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8 max-w-md w-full px-6">
        {/* AI Brain Icon with Animation */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <Brain className="w-20 h-20 text-primary/30" />
          </div>
          <Brain className="w-20 h-20 text-primary relative z-10" />
          <Sparkles className="w-8 h-8 text-primary absolute -top-2 -right-2 animate-pulse" />
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-3">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Loading Message */}
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
            <p className="text-sm font-medium text-foreground animate-pulse">
              {messages[currentMessage]}
            </p>
          </div>
        </div>

        {/* Progress Percentage */}
        <p className="text-2xl font-bold text-primary">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
