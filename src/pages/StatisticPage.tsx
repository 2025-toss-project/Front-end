import { LucideChevronRight } from "lucide-react";
import React, { ReactNode } from "react";
import { SaveButton } from "../components/common/Buttons";
import { categoryList } from "../constants/category";
import BarChart from "../components/charts/BarChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import BarGraph from "../components/BarGraph";

const BoxWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 px-4 py-5 bg-white rounded-2xl drop-shadow-10">
      {children}
    </div>
  );
};

const MonthPayBox = () => {
  return (
    <BoxWrapper>
      <div>이번 달 지출</div>
      <div className="flex items-center gap-2 text-xl font-medium">
        210,000원
        <LucideChevronRight size={24} color="#333" />
      </div>
      <div className="py-2.5">
        <BarGraph props={40} height="h-5" /> 
      </div>

      <div className="flex items-center justify-between">
        <div>남은예산</div>
        <div className="text-xl font-medium">100,000원</div>
      </div>
    </BoxWrapper>
  );
};

const PrevMonthPayBox = () => {
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
      <SaveButton title="예산 설정하러 가기" style="mb-0" />
    </BoxWrapper>
  );
};

const PayOfCategory = () => {
  return (
    <BoxWrapper>
      <div>카테고리 별 지출</div>
      <div className="py-5">
        <DoughnutChart />
      </div>
      <div className="flex flex-col gap-6 px-6 py-3 rounded-lg bg-second-bg">
        {categoryList.map((category) => (
          <div
            key={category.text}
            className="flex items-center gap-3 text-sm font-medium"
          >
            <div
              className="grid w-14 place-items-center rounded-lg py-1.5 text-white"
              style={{ backgroundColor: category.border }}
            >
              13%
            </div>
            <div className="font-normal">{category.text}</div>
            <div className="text-base text-right grow">100,000원</div>
          </div>
        ))}
      </div>
      <SaveButton title="카테고리 별 예산 설정하러 가기" style="mb-0" />
    </BoxWrapper>
  );
};

const StatisticPage = () => {
  return (
    <div className="flex flex-col w-full gap-5 py-6">
      <MonthPayBox />
      <PrevMonthPayBox />
      <PayOfCategory />
    </div>
  );
};

export default StatisticPage;
