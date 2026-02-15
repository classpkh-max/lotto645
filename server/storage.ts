import { type LottoResult, type RecommendedNumbers } from "@shared/schema";

export interface IStorage {
  // 로또 결과 캐싱
  getLatestResult(): Promise<LottoResult | undefined>;
  setLatestResult(result: LottoResult): Promise<void>;
  
  // 생성된 번호 이력 (선택적)
  addGeneratedNumbers(numbers: RecommendedNumbers): Promise<void>;
  getGeneratedHistory(): Promise<RecommendedNumbers[]>;
}

export class MemStorage implements IStorage {
  private latestResult: LottoResult | undefined;
  private generatedHistory: RecommendedNumbers[] = [];

  constructor() {
    this.latestResult = undefined;
  }

  async getLatestResult(): Promise<LottoResult | undefined> {
    return this.latestResult;
  }

  async setLatestResult(result: LottoResult): Promise<void> {
    this.latestResult = result;
  }

  async addGeneratedNumbers(numbers: RecommendedNumbers): Promise<void> {
    this.generatedHistory.unshift(numbers);
    // 최대 100개까지만 저장
    if (this.generatedHistory.length > 100) {
      this.generatedHistory = this.generatedHistory.slice(0, 100);
    }
  }

  async getGeneratedHistory(): Promise<RecommendedNumbers[]> {
    return this.generatedHistory;
  }
}

export const storage = new MemStorage();
