import React from "react";

interface HalfCircleGaugeProps {
  /** 0 ~ 100 사이의 퍼센트 (이미 계산된 값) */
  totalPercentage: number;
  /** 게이지 전체 너비(px). 실제 표시 높이는 자동으로 절반이 됩니다. */
  size?: number;
  /** 게이지 두께(px) */
  strokeWidth?: number;
  /** 게이지가 채워질 색 */
  color?: string;
  /** 게이지 배경 색 */
  backgroundColor?: string;
  /** 텍스트 노출 여부 (선택) */
  showText?: boolean;
}

const HalfCircleGauge: React.FC<HalfCircleGaugeProps> = ({
  totalPercentage,
  size = 200,
  strokeWidth = 25,
  color = "#C80150",
  backgroundColor = "#d9d9d9",
  showText = true,
}) => {
  // 1) 0~100 범위로 클램프(clamp)
  const clamped = Math.max(0, Math.min(totalPercentage, 100));
  // 2) 0 ~ 1 사이로 변환
  const ratio = clamped / 100;

  // 3) 원 둘레 관련 계산
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // 4) 채워야 할 길이
  const filledLength = ratio/2 * circumference;

  return (
    <div
      className="overflow-hidden"
      style={{
        width: size,
        height: size / 2, // 반원만 보이게
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 배경 원 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={0}
          className="origin-center transform rotate-180"
        />

        {/* 채워진 원 (게이지 부분) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - filledLength}
          className="transition-all duration-500 origin-center transform rotate-180"
        />
      </svg>
    </div>
  );
};

export default HalfCircleGauge;
