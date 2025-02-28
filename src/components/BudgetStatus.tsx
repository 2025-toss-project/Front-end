import React, { useEffect, useState } from "react";

interface BudgetData {
  totalBudget: number;
  totalSpend: number;
  totalPercentage: number;
}
const getDaysLeftInMonth = (): number => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return lastDayOfMonth.getDate() - today.getDate();
};

const BudgetStatus = () => {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const [remainingPerDay, setRemainingPerDay] = useState(0);
  const daysLeft = getDaysLeftInMonth();

  useEffect(() => {
    const fetchBudgetData = async () => {
      // API DATA
      const apiData = {
        totalBudget: 1200000,
        totalSpend: 120000,
        totalPercentage: 0
      };
      setBudgetData(apiData);

      // 하루 예산 계산 (남은 금액 ÷ 남은 일수)
      const remainingBudget = apiData.totalBudget - apiData.totalSpend;
      setRemainingPerDay(remainingBudget / daysLeft);
    };

    fetchBudgetData();
  }, []);

  if (!budgetData) return <div></div>; // 데이터 로딩 처리

  const { totalBudget, totalSpend, totalPercentage } = budgetData;
  const remainingBudget = totalBudget - totalSpend;

  return (
    <div className="p-4 mb-4 bg-white rounded-2xl drop-shadow-10">
      <p className="mb-1 text-lg font-bold">
        현재 예산의 <span className="text-main">{totalPercentage}%</span>를
        사용했어요
      </p>
      <div className="text-sm">
        남은 기간 동안 하루에
        <div>
          <span className="font-bold text-marker-home">
            {Math.floor(remainingPerDay).toLocaleString()}원
          </span>
          을 사용할 수 있어요.
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <div className="flex flex-col">
          <div className="text-sm">남은 금액</div>
          <div className="text-lg font-bold text-main">
            {remainingBudget.toLocaleString()}원
          </div>
        </div>

        <div className="flex flex-col">
          <div>총 예산</div>
          <div className="text-lg font-bold text-marker-home">
            {totalBudget.toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetStatus;
