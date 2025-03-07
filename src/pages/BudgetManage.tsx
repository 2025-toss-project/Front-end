import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BudgetStatus from "../components/BudgetStatus";
import CategoryStatus from "../components/CategoryStatus";
import MonthlyBudget from "../components/MonthlyBudget";
import { fetchBudgetInfo, BudgetInfo } from "../stores/budgetInfo"; 

const BudgetManage = () => {
  const navigate = useNavigate();
  const [budgetData, setBudgetData] = useState<BudgetInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /*
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
// 여까지
*/

/*
// 더미데이터 사용시
  useEffect(() => {
    const loadBudgetData = async () => {
      const data = await fetchBudgetInfo(); // 더미 데이터 가져오기
      setBudgetData(data);
    };

    loadBudgetData();
  }, []);

  if (!budgetData) {
    return <div>Loading...</div>; // 데이터 로딩 중 표시
  }
// 여까지
*/  

  return (
    <div className="flex flex-col w-full h-full bg-second-bg">
      <div onClick={() => navigate("/budgetset")} className="cursor-pointer">
        <MonthlyBudget />
      </div>
      <BudgetStatus
  totalBudget={budgetData?.totalBudget ?? 0} // ✅ budgetData가 null이면 0
  totalSpend={budgetData?.totalSpend ?? 0}
  totalPercentage={budgetData?.totalPercentage ?? 0}
/>
<CategoryStatus
  categoryBudgets={budgetData?.budgetInfoList?.map(
    ({ category, budgetPrice, spendPrice, percentage }) => ({
      category,
      budgetPrice,
      spendPrice,
      percentage,
    })
  ) ?? []} // ✅ budgetData가 없으면 빈 배열([]) 반환
/>
    </div>
  );
};

export default BudgetManage;
