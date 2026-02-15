import { LottoBall } from "./LottoBall";
import { LottoResult } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LatestResultsProps {
  result?: LottoResult;
  isLoading?: boolean;
}

export function LatestResults({ result, isLoading }: LatestResultsProps) {
  if (isLoading) {
    return (
      <Card className="p-8 space-y-6">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-6 w-32 mx-auto" />
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="w-14 h-14 rounded-full" />
          ))}
        </div>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">당첨 결과를 불러올 수 없습니다.</p>
      </Card>
    );
  }

  return (
    <Card className="p-8 space-y-5" data-testid="latest-results">
      <div className="text-center space-y-0.5">
        <h2 className="text-[2.5rem] font-extrabold leading-tight">
          <span className="text-blue-600">{result.round}회</span> 당첨결과
        </h2>
        <p className="text-[0.95rem] text-gray-600 font-medium">
          ({result.drawDate})
        </p>
      </div>

      <div className="flex items-start justify-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            {result.numbers.map((num, index) => (
              <LottoBall key={`${num}-${index}`} number={num} size="md" context="latest" />
            ))}
          </div>
          <p className="text-sm text-gray-600 font-medium">당첨번호</p>
        </div>
        
        <div className="flex items-center h-14">
          <span className="text-3xl font-bold text-gray-400 px-2">+</span>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <LottoBall number={result.bonusNumber} size="md" isBonus context="latest-bonus" />
          <p className="text-sm text-gray-600 font-medium">보너스</p>
        </div>
      </div>
    </Card>
  );
}
