import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { findCategory } from "../../utils/findTypeOrCategory";
import { useEffect, useMemo, useState } from "react";
import { AnalyticsData } from "../../pages/StatisticPage";
import { ChartOptions } from "chart.js";

const BarChart: React.FC<{
  monthPay?: AnalyticsData[];
  prevPay?: AnalyticsData[];
  twoMonthsAgoPay?: AnalyticsData[];
}> = ({ monthPay = [], prevPay = [], twoMonthsAgoPay = [] }) => {
  // 창 크기에 따른 동적 dimensions 상태 추가
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.4,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.6,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const categories = useMemo(() => {
    const allCategories = [
      ...twoMonthsAgoPay.map((d) => d.category),
      ...prevPay.map((d) => d.category),
      ...monthPay.map((d) => d.category),
    ];
    return [...new Set(allCategories)];
  }, [monthPay, prevPay, twoMonthsAgoPay]);

  const getCategoryData = (category: string, data: AnalyticsData[]) => {
    return data.find((d) => d.category === category)?.price || 0;
  };

  const getMonthTotal = (monthData: AnalyticsData[]) => {
    return monthData.reduce((acc, cur) => acc + cur.price, 0);
  };

  const maxStackValue = Math.max(
    getMonthTotal(twoMonthsAgoPay),
    getMonthTotal(prevPay),
    getMonthTotal(monthPay),
  );

  const labels = [
    twoMonthsAgoPay[0]?.date,
    prevPay[0]?.date,
    monthPay[0]?.date,
  ].filter(Boolean);

  const data = {
    labels,
    datasets: categories.map((category) => ({
      label: category,
      data: [
        getCategoryData(category, twoMonthsAgoPay),
        getCategoryData(category, prevPay),
        getCategoryData(category, monthPay),
      ],
      backgroundColor: findCategory(category)?.border || "#ccc",
    })),
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          boxWidth: 10,
          padding: 10,
          boxHeight: 10,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        type: "category",
      },
      y: {
        stacked: true,
        type: "linear",
        min: 0,
        // 최대값의 105%로 설정해 위쪽에 여유 공간 확보
        max: maxStackValue * 1.05,
        ticks: {
          callback: (value) => 
            `${Number(value)}`, 
          font: { size: 10 },
        },
      },
    },
  };

  return (
    <Bar
      data={data}
      options={options}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default BarChart;
