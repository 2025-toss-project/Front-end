import React from "react";
import { Doughnut } from "react-chartjs-2";
import { findCategory } from "../../utils/findTypeOrCategory";
import { CategoryPay } from "../../pages/StatisticPage";

const DoughnutChart: React.FC<{ categoryPay: CategoryPay[] }> = ({
  categoryPay,
}) => {
  const labels = categoryPay
    .filter((item) => item.spendPrice > 0)
    .slice(0, 3)
    .map((item) => item.category);

  const data = {
    labels,
    datasets: [
      {
        data: [65, 59, 100],
        backgroundColor: [
          findCategory("식비")?.border,
          findCategory("교통")?.border,
          findCategory("쇼핑")?.border,
        ],
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
  };
  return <Doughnut data={data} options={options}></Doughnut>;
};

export default DoughnutChart;
