import React from "react";
import { Doughnut } from "react-chartjs-2";
import { findCategory } from "../../utils/findTypeOrCategory"; // 사용하지 않는다면 제거해도 됩니다.

const HalfDoughnutChart: React.FC = () => {
  // 0 ~ 1 사이의 랜덤 값 생성
  const num = Math.random();

  // 차트 데이터 구성
  const data = {
    labels: ["pink"], // 여기서는 단순 예시로 "pink" 만 사용합니다.
    datasets: [
      {
        data: [num, 1 - num],
        backgroundColor: ["#FF6384"],
        hoverBackgroundColor: ["#FF6384"],
      },
    ],
  };

  // 차트 옵션 설정
  const options: any = {
    responsive: true,
    legend: { display: false },
    elements: {
      center: {
        text: Math.round(num * 100) + "%",
        fontStyle: "Helvetica",
        sidePadding: 15,
      },
    },
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    animation: false,
    rotation: Math.PI,
    circumference: Math.PI,
  };

  return <Doughnut data={data} options={options} />;
};

export default HalfDoughnutChart;
