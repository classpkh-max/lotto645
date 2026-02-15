import { RecommendedNumbers } from "@shared/schema";

// 패턴 기반 로또 번호 생성 함수
export function generateAINumbers(): RecommendedNumbers {
  const MAX_ATTEMPTS = 10000;
  let attempts = 0;
  let validNumbers: number[] = [];

  // 패턴 조건을 만족할 때까지 반복
  while (attempts < MAX_ATTEMPTS) {
    attempts++;
    
    // 1~45 범위에서 중복 없이 6개 선택
    const numbers = generateRandomNumbers(6);
    
    // 패턴 검증
    if (isValidPattern(numbers)) {
      validNumbers = numbers;
      break;
    }
  }

  // 만약 조건을 만족하는 번호를 찾지 못했다면 기본값 사용
  if (validNumbers.length === 0) {
    validNumbers = [5, 12, 18, 25, 33, 42];
  }

  // 오름차순 정렬
  validNumbers.sort((a, b) => a - b);

  // 보너스 번호 생성 (이미 선택된 6개 제외)
  const bonusNumber = generateBonusNumber(validNumbers);

  return {
    numbers: validNumbers,
    bonusNumber,
    generatedAt: new Date().toISOString(),
    algorithm: "패턴 분석 (총합·홀짝·저고 구간)",
  };
}

// 중복 없이 랜덤 번호 생성
function generateRandomNumbers(count: number): number[] {
  const numbers: number[] = [];
  while (numbers.length < count) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(num)) {
      numbers.push(num);
    }
  }
  return numbers;
}

// 패턴 검증 함수
function isValidPattern(numbers: number[]): boolean {
  // 1. 총합 범위 검증 (110~170)
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  if (sum < 110 || sum > 170) {
    return false;
  }

  // 2. 홀짝 비율 검증 (3:3 또는 4:2)
  const oddCount = numbers.filter((n) => n % 2 === 1).length;
  const evenCount = 6 - oddCount;
  const validOddEven = 
    (oddCount === 3 && evenCount === 3) || 
    (oddCount === 4 && evenCount === 2) ||
    (oddCount === 2 && evenCount === 4);
  
  if (!validOddEven) {
    return false;
  }

  // 3. 저/고 구간 비율 검증
  // 저: 1~22, 고: 23~45
  const lowCount = numbers.filter((n) => n <= 22).length;
  const highCount = 6 - lowCount;
  const validLoHi = 
    (lowCount === 3 && highCount === 3) || 
    (lowCount === 2 && highCount === 4) ||
    (lowCount === 4 && highCount === 2);
  
  if (!validLoHi) {
    return false;
  }

  return true;
}

// 보너스 번호 생성 (기존 6개 번호 제외)
function generateBonusNumber(selectedNumbers: number[]): number {
  let bonus = 0;
  while (bonus === 0 || selectedNumbers.includes(bonus)) {
    bonus = Math.floor(Math.random() * 45) + 1;
  }
  return bonus;
}
