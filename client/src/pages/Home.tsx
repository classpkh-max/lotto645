import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { LottoBall } from "@/components/LottoBall";
import { LatestResults } from "@/components/LatestResults";
import { GeneratedNumbers } from "@/components/GeneratedNumbers";
import { AILoadingAnimation } from "@/components/AILoadingAnimation";
import { LottoResult, RecommendedNumbers } from "@shared/schema";
import { Sparkles, RefreshCw } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNumbers, setGeneratedNumbers] = useState<RecommendedNumbers | null>(null);

  const { data: latestResult, isLoading: isLoadingResult } = useQuery<LottoResult>({
    queryKey: ["/api/lotto/latest"],
  });

  const generateMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/lotto/generate");
      const data: RecommendedNumbers = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setGeneratedNumbers(data);
    },
  });

  const handleGenerateNumbers = () => {
    setIsGenerating(true);
  };

  const handleAnimationComplete = () => {
    generateMutation.mutate();
    setIsGenerating(false);
  };

  const handleRefreshResults = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/lotto/latest"] });
  };

  return (
    <div className="min-h-screen bg-background">
      {isGenerating && (
        <AILoadingAnimation onComplete={handleAnimationComplete} duration={2500} />
      )}

      <div className="container max-w-5xl mx-auto px-4 py-8 space-y-8">

        <div className="ad-slot ad-slot-top" data-testid="ad-slot-top">
          <div className="text-center py-8 px-4 border-2 border-dashed border-border/40 rounded-lg bg-muted/20">
            <p className="text-xs text-muted-foreground">광고 영역 (Google AdSense 코드가 여기 들어갑니다)</p>
          </div>
        </div>

        <div className="text-center space-y-6 py-16 bg-background rounded-xl">
          <div className="space-y-4">
            <h3 className="text-4xl md:text-5xl font-bold text-blue-600">
              AI 로또 번호 추출기
            </h3>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              과거 1등 당첨 빅데이터 분석을 통한 AI엔진 기반 로또 번호 생성
            </p>
          </div>

          <Button
            size="lg"
            onClick={handleGenerateNumbers}
            disabled={generateMutation.isPending || isGenerating}
            data-testid="button-generate-numbers"
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 text-lg h-auto font-semibold"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            <span>AI 번호 추출</span>
          </Button>
          
          <p className="text-sm text-muted-foreground">
            버튼을 클릭하여 AI 추천 번호를 받아보세요
          </p>
        </div>

        {generatedNumbers && (
          <div className="animate-in fade-in-0 slide-in-from-top-4 duration-700">
            <GeneratedNumbers recommendedNumbers={generatedNumbers} />
          </div>
        )}

        <div className="ad-slot ad-slot-middle" data-testid="ad-slot-middle">
          <div className="text-center py-8 px-4 border-2 border-dashed border-border/40 rounded-lg bg-muted/20">
            <p className="text-xs text-muted-foreground">광고 영역 (Google AdSense 코드가 여기 들어갑니다)</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold">최근 당첨번호</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshResults}
              disabled={isLoadingResult}
              data-testid="button-refresh-results"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingResult ? "animate-spin" : ""}`} />
              새로고침
            </Button>
          </div>
          
          <LatestResults result={latestResult} isLoading={isLoadingResult} />
        </div>

        <div className="ad-slot ad-slot-bottom" data-testid="ad-slot-bottom">
          <div className="text-center py-8 px-4 border-2 border-dashed border-border/40 rounded-lg bg-muted/20">
            <p className="text-xs text-muted-foreground">광고 영역 (Google AdSense 코드가 여기 들어갑니다)</p>
          </div>
        </div>

        <footer className="text-center space-y-3 py-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground">
            본 서비스는 과거 당첨 번호의 패턴을 분석하여 추천 번호를 제공합니다.
          </p>
          <p className="text-sm text-muted-foreground">
            당첨을 보장하지 않으며, 참고용으로만 사용하시기 바랍니다.
          </p>
        </footer>
      </div>
    </div>
  );
}
