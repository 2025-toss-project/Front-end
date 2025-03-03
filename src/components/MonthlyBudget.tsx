import { ChevronRight } from "lucide-react";

const MonthlyBudget = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 mt-5 mb-4 bg-white border 1px rounded-2xl border-second-light">
      <div>
        <h2 className="text-lg font-bold">목표예산 설정</h2>
        <p className="text-xs">목표예산을 설정하여 체계적으로 관리하세요.</p>
      </div>
      <ChevronRight className="w-5 h-5" />
    </div>
  );
};
export default MonthlyBudget;
