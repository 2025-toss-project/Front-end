import React from "react";
import { Doughnut } from "react-chartjs-2";
import { findCategory } from "../../utils/findTypeOrCategory";
import { AnalyticsData } from "../../pages/StatisticPage";

const DoughnutChart: React.FC<{ categoryPay?: any }> = ({ categoryPay }) => {
  const categories = categoryPay?.analyicsInfoDTOS || [];
  const labels = categories.map((category: AnalyticsData) => category.category);

  const datas = {
    labels: labels,
    datasets: [
      {
        label: "지출 내역",
        data: categories.map((category: AnalyticsData) => category.price), // 가격 배열
        backgroundColor: categories.map(
          (category: AnalyticsData) =>
            findCategory(category.category)?.border || "#ccc",
        ),
        borderWidth: labels.length < 2 ? 0 : 2,
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

  return <Doughnut data={datas} options={options} />;
};

export default DoughnutChart;
