import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { scrapeLatestLottoResult } from "./scraper";
import { generateAINumbers } from "./ai-generator";
import { lottoResultSchema, recommendedNumbersSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // 최신 로또 당첨 결과 조회
  app.get("/api/lotto/latest", async (req, res) => {
    try {
      // 캐시에서 먼저 확인
      let result = await storage.getLatestResult();

      // 캐시가 없으면 크롤링
      if (!result) {
        result = await scrapeLatestLottoResult();
        await storage.setLatestResult(result);
      }

      // 스키마 검증
      const validated = lottoResultSchema.parse(result);
      res.json(validated);
    } catch (error) {
      console.error("Error fetching latest lottery result:", error);
      res.status(500).json({ error: "Failed to fetch latest lottery result" });
    }
  });

  // 최신 결과 강제 새로고침
  app.post("/api/lotto/refresh", async (req, res) => {
    try {
      const result = await scrapeLatestLottoResult();
      await storage.setLatestResult(result);
      
      const validated = lottoResultSchema.parse(result);
      res.json(validated);
    } catch (error) {
      console.error("Error refreshing lottery result:", error);
      res.status(500).json({ error: "Failed to refresh lottery result" });
    }
  });

  // AI 번호 생성
  app.post("/api/lotto/generate", async (req, res) => {
    try {
      const numbers = generateAINumbers();
      
      // 생성 이력 저장
      await storage.addGeneratedNumbers(numbers);
      
      // 스키마 검증
      const validated = recommendedNumbersSchema.parse(numbers);
      res.json(validated);
    } catch (error) {
      console.error("Error generating numbers:", error);
      res.status(500).json({ error: "Failed to generate numbers" });
    }
  });

  // 생성 이력 조회 (선택적)
  app.get("/api/lotto/history", async (req, res) => {
    try {
      const history = await storage.getGeneratedHistory();
      res.json(history);
    } catch (error) {
      console.error("Error fetching history:", error);
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
