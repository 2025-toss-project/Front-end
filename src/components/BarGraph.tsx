interface BarGraphProps {
  props: number; // 0~100 범위 값
  height?: string; // 높이 지정 (기본값: h-2)
}

const BarGraph: React.FC<BarGraphProps> = ({ props, height = "h-2" }) => {
  const limitedPercentage = Math.min(props, 100);
  const barColor = props >= 100 ? "bg-main" : "bg-marker-home";

  return (
    <div className={`w-full ${height} rounded-full bg-second-light`}>
      <div
        className={`rounded-full ${barColor} ${height}`}
        style={{ width: `${limitedPercentage}%` }}
      />
    </div>
  );
};

export default BarGraph;
