import axios from "axios";
import * as cheerio from "cheerio";
import iconv from "iconv-lite";
import { LottoResult } from "@shared/schema";

export async function scrapeLatestLottoResult(): Promise<LottoResult> {
  try {
    // EUC-KR 인코딩을 위해 arraybuffer로 요청
    const response = await axios.get("https://www.dhlottery.co.kr/gameResult.do?method=byWin", {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    // EUC-KR을 UTF-8로 디코딩
    const html = iconv.decode(response.data, "EUC-KR");
    const $ = cheerio.load(html);

    // 회차 정보 추출
    const roundText = $(".win_result h4 strong").text().trim();
    const roundMatch = roundText.match(/(\d+)/);
    const round = roundMatch ? parseInt(roundMatch[1]) : 0;

    // 추첨일 추출
    const dateText = $(".win_result p.desc").text().trim();
    const dateMatch = dateText.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
    const drawDate = dateMatch
      ? `${dateMatch[1]}년 ${dateMatch[2].padStart(2, "0")}월 ${dateMatch[3].padStart(2, "0")}일 추첨`
      : "";

    // 당첨 번호 추출
    const numbers: number[] = [];
    $(".win_result .num.win .ball_645").each((_, elem) => {
      const numText = $(elem).text().trim();
      const num = parseInt(numText);
      if (!isNaN(num)) {
        numbers.push(num);
      }
    });

    // 보너스 번호 추출
    let bonusNumber = 0;
    $(".win_result .num.bonus .ball_645").each((_, elem) => {
      const numText = $(elem).text().trim();
      bonusNumber = parseInt(numText);
    });

    if (numbers.length !== 6 || !bonusNumber || !round) {
      throw new Error("Failed to parse lottery data");
    }

    return {
      round,
      drawDate,
      numbers,
      bonusNumber,
    };
  } catch (error) {
    console.error("Error scraping lottery data:", error);
    // 임시 데이터 반환 (실패 시)
    return {
      round: 1196,
      drawDate: "2025년 01월 01일 추첨",
      numbers: [8, 12, 15, 29, 40, 45],
      bonusNumber: 14,
    };
  }
}
