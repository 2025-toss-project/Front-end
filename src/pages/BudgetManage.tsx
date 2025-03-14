import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BudgetStatus from "../components/BudgetStatus";
import CategoryStatus from "../components/CategoryStatus";
import MonthlyBudget from "../components/MonthlyBudget";
import { fetchBudgetInfo, BudgetInfo } from "../apis/BudgetInfo";
import Loading from "../components/loading";

const BudgetManage = () => {
  const navigate = useNavigate();
  const [budgetData, setBudgetData] = useState<BudgetInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //api 사용시
  useEffect(() => {
    const getBudgetData = async () => {
      try {
        setLoading(true);

        const data = await fetchBudgetInfo(); // ✅ API 호출
        setBudgetData(data.result);
      } catch (error) {
        console.error("예산 데이터 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    getBudgetData();
  }, []);

  const categoryBudgets =
    budgetData?.budgetInfoList?.map(
      ({ category, budgetPrice, spendPrice, percentage }) => ({
        category,
        budgetPrice,
        spendPrice,
        percentage,
      }),
    ) ?? [];

  const hasCategoryBudget = categoryBudgets.some(
    (item) => item.budgetPrice !== 0,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-second-bg">
      <div onClick={() => navigate("/budgetset")} className="cursor-pointer">
        <MonthlyBudget />
      </div>
      {(budgetData?.totalBudget ?? 0) > 0 && (
        <BudgetStatus
          totalBudget={budgetData?.totalBudget ?? 0}
          totalSpend={budgetData?.totalSpend ?? 0}
          totalPercentage={budgetData?.totalPercentage ?? 0}
        />
      )}
      {hasCategoryBudget && (
        <CategoryStatus categoryBudgets={categoryBudgets} />
      )}
    </div>
  );
};

export default BudgetManage;
