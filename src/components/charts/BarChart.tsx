import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { findCategory } from "../../utils/findTypeOrCategory";
import { useEffect, useMemo } from "react";
import { AnalyticsData } from "../../pages/StatisticPage";

const BarChart: React.FC<{
  monthPay?: AnalyticsData[];
  prevPay?: AnalyticsData[];
  twoMonthsAgoPay?: AnalyticsData[];
}> = ({ monthPay = [], prevPay = [], twoMonthsAgoPay = [] }) => {
  const categories = useMemo(() => {
    const allCategories = [
      ...monthPay.map((d) => d.category),
      ...prevPay.map((d) => d.category),
      ...twoMonthsAgoPay.map((d) => d.category),
    ];
    return [...new Set(allCategories)];
  }, [monthPay, prevPay, twoMonthsAgoPay]);

  const getCategoryData = (category: string, data: AnalyticsData[]) => {
    return data.find((d) => d.category === category)?.price || 0;
  };

  const labels = [
    monthPay[0]?.date,
    prevPay[0]?.date,
    twoMonthsAgoPay[0]?.date,
  ].filter(Boolean);

  const data = {
    labels,
    datasets: categories.map((category) => ({
      label: category,
      data: [
        getCategoryData(category, monthPay),
        getCategoryData(category, prevPay),
        getCategoryData(category, twoMonthsAgoPay),
      ],
      backgroundColor: findCategory(category)?.border || "#ccc",
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          boxWidth: 20,
          padding: 20,
          boxHeight: 10,
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
