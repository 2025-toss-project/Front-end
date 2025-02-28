import { useState } from "react";
import MonthlyBudget from "../components/MonthlyBudget";
import BudgetStatus from "../components/BudgetStatus";
import CategoryStatus from "../components/CategoryStatus";

const BudgetManage = () => {
  const [categoryBudgets, setCategoryBudgets] = useState([
    { category: "식비", budget: 200000, pay: 180000 },
    { category: "교육", budget: 100000, pay: 50000 },
    { category: "주거", budget: 300000, pay: 310000 },
    { category: "문화생활", budget: 150000, pay: 120000 },
    { category: "교통", budget: 80000, pay: 70000 },
    { category: "저축", budget: 200000, pay: 200000 },
    { category: "통신", budget: 50000, pay: 60000 },
    { category: "경조사", budget: 100000, pay: 150000 },
    { category: "건강", budget: 120000, pay: 100000 },
    { category: "기타", budget: 70000, pay: 50000 },
    { category: "쇼핑", budget: 90000, pay: 110000 },
    { category: "취미", budget: 60000, pay: 40000 },
  ]);

  return (
    <div className="flex flex-col w-full h-full bg-second-bg">
      {/* 1. 목표예산 설정 */}
      <MonthlyBudget />
      {/* 2. 현재 예산 사용 현황 */}
      <BudgetStatus />
      {/* 3. 카테고리별 소비 현황 */}
      <CategoryStatus categoryBudgets={categoryBudgets} />
    </div>
  );
};

export default BudgetManage;
