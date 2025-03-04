import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MonthlyBudget from "../components/MonthlyBudget";
import BudgetStatus from "../components/BudgetStatus";
import CategoryStatus from "../components/CategoryStatus";

const BudgetManage = () => {
  const navigate = useNavigate();

  const [categoryBudgets, setCategoryBudgets] = useState([
    { category: "식비", budget: 180000, pay: 180000 },
    { category: "교육", budget: 60000, pay: 50000 },
    { category: "주거", budget: 320000, pay: 310000 },
    { category: "문화생활", budget: 150000, pay: 120000 },
    { category: "교통", budget: 50000, pay: 70000 },
    { category: "저축", budget: 10, pay: 0 },
    { category: "통신", budget: 10, pay: 0 },
    { category: "경조사", budget: 10, pay: 150000 },
    { category: "건강", budget: 10, pay: 0 },
    { category: "기타", budget: 10, pay: 0 },
    { category: "쇼핑", budget: 10, pay: 0 },
    { category: "취미", budget: 10, pay: 0 },
  ]);

  return (
    <div className="flex flex-col w-full h-full bg-second-bg">
      <div onClick={() => navigate("/budgetset")} className="cursor-pointer">
        <MonthlyBudget />
      </div>
      <BudgetStatus />
      <CategoryStatus
        categoryBudgets={categoryBudgets.map(({ category, budget, pay }) => ({
          category,
          budgetPrice: budget,
          spendPrice: pay,
          percentage: Math.round((pay / budget) * 100), // 비율 계산
        }))}
      />
    </div>
  );
};

export default BudgetManage;
