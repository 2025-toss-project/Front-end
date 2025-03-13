import { LucideChevronRight } from "lucide-react";
import React, { ReactNode, use, useEffect, useState } from "react";
import { SaveButton } from "../components/common/Buttons";
import BarChart from "../components/charts/BarChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import BarGraph from "../components/BarGraph";
import { api } from "../utils/api";
import { formatPrice } from "../utils/formatFunc";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { findCategory } from "../utils/findTypeOrCategory";

export interface AnalyticsData {
  category: string;
  price: number;
  percentage: number;
  date: string;
}

const BoxWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 px-4 py-5 bg-white rounded-2xl drop-shadow-10">
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
        <BarGraph
          props={Math.abs(Math.floor((monthPay / restBudget) * 100))}
          height="h-5"
        />
      </div>

      <div className="flex items-center justify-between">
        {restBudget < 0 ? (
          <div className="text-main">초과예산</div>
        ) : (
          <div>남은예산</div>
        )}
        <div className="text-xl font-medium">
          {formatPrice(Math.abs(restBudget))}원
        </div>
      </div>
    </BoxWrapper>
  );
};

const PrevMonthPayBox: React.FC<{
  monthPay: any;
  prevPay: any;
  twoMonthsAgoPay: any;
}> = ({ monthPay, prevPay, twoMonthsAgoPay }) => {
  const { moveToPage } = useMovePage();

  const sumItem = (data: any) => {
    if (!data || !data.analyicsInfoDTOS) return 0;
    return data.analyicsInfoDTOS.reduce(
      (sum: number, item: any) => sum + (item.price || 0),
      0
    );
  };

  const monthTotal = sumItem(monthPay);
  const prevTotal = sumItem(prevPay);
  const diff = monthTotal - prevTotal; // 양수이면 지난 달보다 더 쓴 경우
  
  useEffect(() => {
    console.log("monthPay : ", monthPay);
    console.log("prevPay : ", prevPay);
  }, [monthPay, prevPay]);
  return (
    <BoxWrapper>
      <div>지난 달보다</div>
      <div className="flex items-center justify-between">
        <div className="text-xl font-medium text-main">
        {formatPrice(Math.abs(diff))} 원
        </div>
        <div>{diff > 0 ? "더 쓰고 있어요" : "덜 쓰고 있어요"}</div>
      </div>
      <div className="py-5">
        <BarChart
          monthPay={monthPay.analyicsInfoDTOS}
          prevPay={prevPay.analyicsInfoDTOS}
          twoMonthsAgoPay={twoMonthsAgoPay.analyicsInfoDTOS}
        />
      </div>
      <SaveButton
        title="지출 내역 보러가기"
        style="mb-0"
        onClick={() => moveToPage(PageUrls.PAY_RECODE)}
      />
    </BoxWrapper>
  );
};

const PayOfCategory: React.FC<{ categoryPay: any }> = ({ categoryPay }) => {
  const { moveToPage } = useMovePage();
  const sortedCategoryPay = categoryPay.analyicsInfoDTOS.sort(
    (a: AnalyticsData, b: AnalyticsData) => b.price - a.price,
  );

  const totalPay = sortedCategoryPay.reduce(
    (acc: number, cur: AnalyticsData) => {
      return (acc += cur.price);
    },
    0,
  );

  return (
    <BoxWrapper>
      <div>카테고리 별 지출</div>
      <div className="py-5">
        <DoughnutChart categoryPay={categoryPay} />
      </div>
      <div className="flex flex-col gap-6 px-6 py-3 rounded-lg bg-second-bg">
        {sortedCategoryPay.map((pay: AnalyticsData) => (
          <div
            key={pay.category}
            className="flex items-center gap-3 text-sm font-medium"
          >
            <div
              className="grid w-14 place-items-center rounded-lg py-1.5 text-white"
              style={{ backgroundColor: findCategory(pay.category)!.border }}
            >
              {Math.floor((pay.price / totalPay) * 100)}%
            </div>
            <div className="font-normal">{pay.category}</div>
            <div className="text-base text-right grow">{pay.price}원</div>
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

interface CategoryPay {
  id: number;
  category: string;
  budgetPrice: number;
  spendPrice: number;
  percentage: number;
}

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
  const [analyticsData, setAnalyticsData] = useState();
  const getAnalytics = async () => {
    try {
      const res = await api.get("/analytics");
      return res.data.result;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const getBudget = async () => {
    try {
      const res = await api.get("/budget");
      return res.data.result;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  useEffect(() => {
    const getInfos = async () => {
      const results = await Promise.allSettled([getAnalytics(), getBudget()]);

      const analyticsResult = results[0];
      const budgetResult = results[1];

      if (analyticsResult.status === "fulfilled") {
        setAnalyticsData(analyticsResult.value);
      } else {
        console.error(analyticsResult.reason);
      }

      if (budgetResult.status === "fulfilled") {
        setBudgetData(budgetResult.value);
      } else {
        console.error(budgetResult.reason);
      }
    };
    getInfos();
  }, []);

  return (
    <div className="flex flex-col w-full gap-5 py-6">
      <MonthPayBox
        monthPay={budgetData.totalSpend}
        restBudget={budgetData.totalBudget - budgetData.totalSpend}
      />
      {analyticsData && (
        <PrevMonthPayBox
          twoMonthsAgoPay={analyticsData[2] || []}
          monthPay={analyticsData[0] || []}
          prevPay={analyticsData[1] || []}
        />
      )}
      {analyticsData && <PayOfCategory categoryPay={analyticsData[0] || []} />}
    </div>
  );
};

export default StatisticPage;
