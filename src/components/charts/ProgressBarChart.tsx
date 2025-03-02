import React from "react";

const ProgressBarChart: React.FC<{ percentage: number }> = ({ percentage }) => {
  return (
    <div className="relative h-5 w-full rounded-full bg-second-light">
      <div
        className="h-full rounded-full rounded-r-none bg-main"
        style={{
          width: `${percentage}%`,
        }}
      ></div>
    </div>
  );
};

export default ProgressBarChart;
