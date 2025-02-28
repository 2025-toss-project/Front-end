import React, { useEffect, useState } from "react";

interface BudgetData {
  totalBudget: number;
  totalSpend: number;
}

const getDaysLeftInMonth = (): number => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return lastDayOfMonth.getDate() - today.getDate();
};

const BudgetStatus = () => {
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null);
  const daysLeft = getDaysLeftInMonth();

  useEffect(() => {
    const fetchBudgetData = async () => {
      // 실제 API 연동 가능
      const apiData = {
        totalBudget: 240000,
        totalSpend: 120000,
      };
      setBudgetData(apiData);
    };

    fetchBudgetData();
  }, []);

  if (!budgetData) return <div>로딩 중...</div>;

  // 그래프
  
  const { totalBudget, totalSpend } = budgetData;
  const totalPercentage = Math.round((totalSpend / totalBudget) * 100);
  const remainBudget = totalBudget - totalSpend;
  const budgetPerDay = daysLeft > 0 ? remainBudget / daysLeft : remainBudget;

  return (
    <div className="p-4 mb-4 bg-white rounded-2xl drop-shadow-10">
      <p className="mb-1 text-lg font-bold">
        현재 예산의 <span className="text-main">{totalPercentage}%</span>를 사용했어요
      </p>
      <div className="flex flex-col text-sm">
        남은 기간 동안 하루에{" "}
        <div className="flex flex-row ">
        <span className="font-bold text-marker-home">
          {budgetPerDay.toLocaleString()} 원
        </span>
        을 사용할 수 있어요.
        </div>
      </div>
      
      <div className="flex justify-between mt-2">
        <div className="flex flex-col">
          <div className="text-sm">남은 금액</div>
          <div className="text-lg font-bold text-main">
            {remainBudget.toLocaleString()}원
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
