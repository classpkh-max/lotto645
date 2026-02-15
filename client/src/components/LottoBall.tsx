import { getNumberColor } from "@shared/schema";

interface LottoBallProps {
  number: number;
  size?: "sm" | "md" | "lg";
  isBonus?: boolean;
  context?: string;
}

export function LottoBall({ number, size = "md", isBonus = false, context = "" }: LottoBallProps) {
  const color = getNumberColor(number);
  
  const sizeClasses = {
    sm: "w-10 h-10 text-base",
    md: "w-14 h-14 text-xl",
    lg: "w-16 h-16 text-2xl",
  };

  const colorMap: Record<string, { bg: string; text: string }> = {
    yellow: { bg: "bg-lotto-yellow", text: "text-gray-900" },
    blue: { bg: "bg-lotto-blue", text: "text-white" },
    red: { bg: "bg-lotto-red", text: "text-white" },
    gray: { bg: "bg-lotto-gray", text: "text-white" },
    green: { bg: "bg-lotto-green", text: "text-white" },
  };

  const { bg, text } = colorMap[color];
  
  const testId = context ? `lotto-ball-${context}-${number}` : `lotto-ball-${number}`;

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${bg}
        ${text}
        rounded-full
        flex
        items-center
        justify-center
        font-bold
        shadow-md
        ${isBonus ? "opacity-80 ring-2 ring-foreground/20" : ""}
      `}
      data-testid={testId}
    >
      {number}
    </div>
  );
}
