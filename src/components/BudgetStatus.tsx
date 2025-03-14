import React from "react";
import HalfCircleGauge from "./HalfCircleGauge";

interface BudgetStatusProps {
  totalBudget: number;
  totalSpend: number;
  totalPercentage: number;
}

const getDaysLeftInMonth = (): number => {
  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return lastDayOfMonth.getDate() - today.getDate();
};

const BudgetStatus: React.FC<BudgetStatusProps> = ({
  totalBudget,
  totalSpend,
  totalPercentage,
}) => {
  const daysLeft = getDaysLeftInMonth();

  // ✅ 예산 계산
  const remainBudget = totalBudget - totalSpend;
  const budgetPerDay = daysLeft > 0 ? remainBudget / daysLeft : remainBudget;
  const monthPercent = Math.min(
    totalBudget > 0 ? (totalSpend / totalBudget) * 100 : 0,
    100,
  );
  const isOverBudget = remainBudget < 0;

  return (
    <div className="p-4 mb-4 bg-white rounded-2xl drop-shadow-10">
      <p className="mb-1 text-lg font-bold">
        {isOverBudget ? (
          "목표 예산을 모두 사용했습니다."
        ) : (
          <>
            현재 예산의{" "}
            <span className="text-main">{Math.floor(monthPercent)}%</span>를
            사용했어요.
          </>
        )}
      </p>
      {(remainBudget ?? 0) > 0 && (
        <div className="flex flex-col text-sm">
          남은 기간 동안 하루에{" "}
          <span className="font-bold text-marker-home">
            {Math.floor(budgetPerDay).toLocaleString()} 원
          </span>
          을 사용할 수 있어요.
        </div>
      )}
      <div className="flex justify-center my-4">
        <HalfCircleGauge totalPercentage={monthPercent} size={220} />
      </div>
      <div className="flex justify-between mt-2">
        <div className="flex flex-col">
          <div className="text-sm">
            {/* 남은 금액 */}
            {isOverBudget ? `초과 금액` : `남은 금액`}
          </div>
          <div className="text-lg font-bold text-main">
            {isOverBudget
              ? `${Math.abs(remainBudget).toLocaleString()}원`
              : `${remainBudget.toLocaleString()}원`}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-sm">총 예산</div>
          <div className="text-lg font-bold text-marker-home">
            {totalBudget.toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetStatus;
