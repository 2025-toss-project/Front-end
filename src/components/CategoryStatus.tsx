import { useState } from "react";
import MonthlyBudget from "../components/MonthlyBudget";
import BudgetStatus from "../components/BudgetStatus";
import IconFood from "../assets/categoryIcons/IconFood";
import IconEducation from "../assets/categoryIcons/IconEducation";
import IconHome from "../assets/categoryIcons/IconHome";
import IconEvent from "../assets/categoryIcons/IconEvent";
import IconTraffic from "../assets/categoryIcons/IconTraffic";
import IconSaving from "../assets/categoryIcons/IconSaving";
import IconCom from "../assets/categoryIcons/IconCom";
import IconHealth from "../assets/categoryIcons/IconHealth";
import IconEtc from "../assets/categoryIcons/IconEtc";
import IconShopping from "../assets/categoryIcons/IconShopping";
import IconHobby from "../assets/categoryIcons/IconHobby";

const categoryIcons: Record<string, React.FC> = {
  식비: IconFood,
  교육: IconEducation,
  주거: IconHome,
  문화생활: IconEvent,
  교통: IconTraffic,
  저축: IconSaving,
  통신: IconCom,
  경조사: IconEvent,
  건강: IconHealth,
  기타: IconEtc,
  쇼핑: IconShopping,
  취미: IconHobby,
};

interface Category {
  category: string;
  budgetPrice: number;
  spendPrice: number;
  percentage: number;
}

interface CategoryStatusProps {
  categoryBudgets: Category[];
}

// 카테고리 리스트 정렬
const CategoryStatus: React.FC<CategoryStatusProps> = ({ categoryBudgets }) => {
  // 퍼센티지 기준 내림차순 정렬 (높은 값이 먼저 오도록)
  const sortedBudgets = [...categoryBudgets].sort(
    (a, b) => b.percentage - a.percentage,
  );

  return (
    <div className="mb-5 gap-x-2.5 gap-y-2.5 rounded-2xl bg-white px-3 py-5 drop-shadow-10">
      <h3 className="text-lg font-bold">카테고리별 소비 현황</h3>
      <p className="pb-2.5 text-sm">
        예산 대비 사용량을 한눈에 보고 관리하세요.
      </p>

      {sortedBudgets.map(
        ({ category, budgetPrice, spendPrice, percentage }) => {
          const remainBudget = budgetPrice - spendPrice;
          const isOverBudget = remainBudget < 0;
          const isBudgetDepleted = remainBudget === 0;
          const IconComponent = categoryIcons[category] || IconEtc;

          return (
            <div
              key={category}
              className="mb-2.5 rounded-2xl bg-second-bg px-2 py-2.5"
            >
              <div className="flex items-center justify-between pb-2 mb-1">
                <div className="flex items-center space-x-2">
                  <div className="flex p-2 rounded-full bg-second-lighter">
                    <IconComponent />
                  </div>
                  <div className="text-sm font-medium">{category}</div>
                  <div className="text-xs font-medium">{percentage}%</div>
                </div>
                <div
                  className={`text-sm font-bold ${isOverBudget ? "text-main" : isBudgetDepleted ? "text-main" : ""}`}
                >
                  {isOverBudget
                    ? `${Math.abs(remainBudget).toLocaleString()}원 초과`
                    : isBudgetDepleted
                      ? "목표예산 소진"
                      : `${remainBudget.toLocaleString()}원 남음`}
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-second-light">
                <div
                  className={`h-2 rounded-full ${isOverBudget || isBudgetDepleted ? "bg-main" : "bg-marker-home"}`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>

              <div className="flex justify-between pt-2 pb-1 text-xs text-3">
                <span>{spendPrice.toLocaleString()}원 지출</span>
                <span>예산 {budgetPrice.toLocaleString()}원</span>
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};

export default CategoryStatus;
