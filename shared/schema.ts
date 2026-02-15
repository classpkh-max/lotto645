import { z } from "zod";

// 로또 당첨 결과 스키마
export const lottoResultSchema = z.object({
  round: z.number(),
  drawDate: z.string(),
  numbers: z.array(z.number().min(1).max(45)).length(6),
  bonusNumber: z.number().min(1).max(45),
});

export type LottoResult = z.infer<typeof lottoResultSchema>;

// AI 추천 번호 스키마
export const recommendedNumbersSchema = z.object({
  numbers: z.array(z.number().min(1).max(45)).length(6),
  bonusNumber: z.number().min(1).max(45),
  generatedAt: z.string(),
  algorithm: z.string().optional(),
});

export type RecommendedNumbers = z.infer<typeof recommendedNumbersSchema>;

// 번호별 색상 매핑 함수
export function getNumberColor(num: number): string {
  if (num <= 10) return "yellow";
  if (num <= 20) return "blue";
  if (num <= 30) return "red";
  if (num <= 40) return "gray";
  return "green";
}
