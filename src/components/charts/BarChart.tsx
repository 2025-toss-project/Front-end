import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { findCategory } from "../../utils/findTypeOrCategory";

const BarChart = () => {
  const labels = ["1월", "2월", "3월"];

  const data = {
    labels,
    datasets: [
      {
        label: "식비",
        data: [65, 59, 100],
        backgroundColor: findCategory("식비")?.border,
      },
      {
        label: "교통",
        data: [45, 69, 60],
        backgroundColor: findCategory("교통")?.border,
      },
      {
        label: "쇼핑",
        data: [25, 39, 50],
        backgroundColor: findCategory("쇼핑")?.border,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          boxWidth: 20,
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return <Bar data={data} options={options} />;
};

export default BarChart;
