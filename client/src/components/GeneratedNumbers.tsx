import { LottoBall } from "./LottoBall";
import { RecommendedNumbers } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface GeneratedNumbersProps {
  recommendedNumbers: RecommendedNumbers;
}

export function GeneratedNumbers({ recommendedNumbers }: GeneratedNumbersProps) {
  if (!recommendedNumbers || !recommendedNumbers.numbers) {
    return null;
  }

  return (
    <Card className="p-8 space-y-6 animate-in fade-in-0 zoom-in-95 duration-500" data-testid="generated-numbers">
      <div className="flex items-center justify-center gap-2">
        <Sparkles className="w-6 h-6 text-blue-600" />
        <h3 className="text-2xl font-bold">AI 추천 번호</h3>
        <Sparkles className="w-6 h-6 text-blue-600" />
      </div>

      <div className="flex items-center justify-center gap-3 flex-wrap">
        {recommendedNumbers.numbers.map((num, index) => (
          <div
            key={`${num}-${index}`}
            className="animate-in fade-in-0 zoom-in-95"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <LottoBall number={num} size="lg" context="generated" />
          </div>
        ))}
        
        {recommendedNumbers.bonusNumber && (
          <>
            <div className="flex items-center justify-center px-2">
              <span className="text-3xl font-bold text-muted-foreground">+</span>
            </div>
            <div
              className="animate-in fade-in-0 zoom-in-95"
              style={{ animationDelay: `${recommendedNumbers.numbers.length * 100}ms` }}
            >
              <LottoBall 
                number={recommendedNumbers.bonusNumber} 
                size="lg" 
                isBonus={true} 
                context="generated-bonus" 
              />
            </div>
          </>
        )}
      </div>

      <div className="text-center space-y-3 pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          생성 시간: {new Date(recommendedNumbers.generatedAt).toLocaleString("ko-KR")}
        </p>
        {recommendedNumbers.algorithm && (
          <p className="text-xs text-muted-foreground">
            알고리즘: {recommendedNumbers.algorithm}
          </p>
        )}
        
        <div className="pt-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            본 서비스는 과거 당첨 번호의 패턴을 분석하여 추천 번호를 제공합니다.<br />
            당첨을 보장하지 않으며, 참고용으로만 사용하시기 바랍니다.
          </p>
        </div>
      </div>
    </Card>
  );
}
