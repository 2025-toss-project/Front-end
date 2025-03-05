import React from "react";

interface BarGraphProps {
  props: number; // 0~100+ 범위(100 넘으면 100%로 제한)
}

const BarGraph: React.FC<BarGraphProps> = ({ props }) => {
  // percentage가 100을 넘으면 bar를 100%로 제한
  const limitedPercentage = Math.min(props, 100);

  // 100% 이상이면 색상 변경
  const barColor = props >= 100 ? "bg-main" : "bg-marker-home";

  return (
    <div className="w-full h-2 rounded-full bg-second-light">
      <div
        className={`h-2 rounded-full ${barColor}`}
        style={{ width: `${limitedPercentage}%` }}
      />
    </div>
  );
};

export default BarGraph;
