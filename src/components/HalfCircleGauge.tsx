import React from "react";

interface HalfCircleGaugeProps {
  totalPercentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
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
  const clamped = Math.max(0, Math.min(totalPercentage, 100));
  const ratio = clamped / 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filledLength = ratio/2 * circumference;

  return (
    <div
      className="overflow-hidden"
      style={{
        width: size,
        height: size / 2, 
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
