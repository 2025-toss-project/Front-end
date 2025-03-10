import { LucideChevronRight } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import { SaveButton } from "../components/common/Buttons";
import { categoryList } from "../constants/category";
import BarChart from "../components/charts/BarChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import BarGraph from "../components/BarGraph";
import { api } from "../utils/api";
import { formatPrice } from "../utils/formatFunc";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { findCategory } from "../utils/findTypeOrCategory";

const BoxWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-white px-4 py-5 drop-shadow-10">
      {children}
    </div>
  );
};

const MonthPayBox: React.FC<{ monthPay: number; restBudget: number }> = ({
  monthPay,
  restBudget,
}) => {
  const { moveToPage } = useMovePage();
  return (
    <BoxWrapper>
      <div>이번 달 지출</div>
      <div
        onClick={() => moveToPage(PageUrls.PAY_RECODE)}
        className="flex items-center gap-2 text-xl font-medium"
      >
        {formatPrice(monthPay)}원
        <LucideChevronRight size={24} color="#333" />
      </div>
      <div className="py-2.5">
        <BarGraph props={40} height="h-5" />
      </div>

      <div className="flex items-center justify-between">
        <div>남은예산</div>
        <div className="text-xl font-medium">{formatPrice(restBudget)}원</div>
      </div>
    </BoxWrapper>
  );
};

const PrevMonthPayBox = () => {
  const { moveToPage } = useMovePage();
  return (
    <BoxWrapper>
      <div>지난 달보다</div>
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium text-main">200,000원</div>
        <div>더 쓰고 있어요</div>
      </div>
      <div className="py-5">
        <BarChart />
      </div>
      <SaveButton
        title="지출 내역 보러가기"
        style="mb-0"
        onClick={() => moveToPage(PageUrls.PAY_RECODE)}
      />
    </BoxWrapper>
  );
};

export interface CategoryPay {
  id: number;
  category: string;
  budgetPrice: number;
  spendPrice: number;
  percentage: number;
}

const PayOfCategory: React.FC<{ categoryPay: CategoryPay[] }> = ({
  categoryPay,
}) => {
  const { moveToPage } = useMovePage();
  const sortedCategoryPay = categoryPay.sort(
    (a: CategoryPay, b: CategoryPay) => b.spendPrice - a.spendPrice,
  );

  return (
    <BoxWrapper>
      <div>카테고리 별 지출</div>
      <div className="py-5">
        <DoughnutChart categoryPay={sortedCategoryPay} />
      </div>
      <div className="flex flex-col gap-6 rounded-lg bg-second-bg px-6 py-3">
        {sortedCategoryPay.map((pay) => (
          <div
            key={pay.category}
            className="flex items-center gap-3 text-sm font-medium"
          >
            <div
              className="grid w-14 place-items-center rounded-lg py-1.5 text-white"
              style={{ backgroundColor: findCategory(pay.category)!.border }}
            >
              {pay.percentage}%
            </div>
            <div className="font-normal">{pay.category}</div>
            <div className="grow text-right text-base">{pay.spendPrice}원</div>
          </div>
        ))}
      </div>
      <SaveButton
        onClick={() => {
          moveToPage(PageUrls.BUDGET_SET);
        }}
        title="카테고리 별 예산 설정하러 가기"
        style="mb-0"
      />
    </BoxWrapper>
  );
};

interface BudgetData {
  totalId: number;
  totalBudget: number;
  totalSpend: number;
  totalPercentage: number;
  budgetInfoList: CategoryPay[];
}

const StatisticPage = () => {
  const [budgetData, setBudgetData] = useState<BudgetData>({
    totalId: 0,
    totalBudget: 0,
    totalSpend: 0,
    totalPercentage: 0,
    budgetInfoList: [],
  });
  const getBudget = async () => {
    try {
      const res = await api.get("/budget");
      console.log(res.data.result);
      setBudgetData(res.data.result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getBudget();
  }, []);
  return (
    <div className="flex w-full flex-col gap-5 py-6">
      <MonthPayBox
        monthPay={budgetData.totalSpend}
        restBudget={budgetData.totalBudget - budgetData.totalSpend}
      />
      <PrevMonthPayBox />
      <PayOfCategory categoryPay={[...budgetData.budgetInfoList]} />
    </div>
  );
};

export default StatisticPage;
