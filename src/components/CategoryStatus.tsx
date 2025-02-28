import React from "react";
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

// 카테고리별 아이콘 매핑
const categoryIcons: Record<string, React.FC> = {
  "식비": IconFood,
  "교육": IconEducation,
  "주거": IconHome,
  "문화생활": IconEvent,
  "교통": IconTraffic,
  "저축": IconSaving,
  "통신": IconCom,
  "경조사": IconEvent,
  "건강": IconHealth,
  "기타": IconEtc,
  "쇼핑": IconShopping,
  "취미": IconHobby,
};

interface Category {
  category: string;
  budget: number;
  pay: number;
}

interface CategoryStatusProps {
  categoryBudgets: Category[];
}

const CategoryStatus: React.FC<CategoryStatusProps> = ({ categoryBudgets }) => {
  return (
    <div className="gap-y-2.5 gap-x-2.5 rounded-2xl bg-white px-3 py-5 drop-shadow-10 mb-5">
      <div className="">
        <h3 className="text-lg font-bold">카테고리별 소비 현황</h3>
        <p className="pb-2.5 text-sm">
          예산 대비 사용량을 한눈에 보고 관리하세요.
        </p>
      </div>

      {/* ✅ 모든 카테고리를 반복 렌더링 */}
      {categoryBudgets.map(({ category, budget, pay }) => {
        const remainBudget = budget - pay;
        const payPercent = Math.min((pay / budget) * 100, 100);
        const isOverBudget = remainBudget < 0;

        // 해당 카테고리에 맞는 아이콘 선택 (기본값은 IconEtc)
        const IconComponent = categoryIcons[category] || IconEtc;

        return (
          <div key={category} className="bg-second-bg mb-2.5 rounded-2xl px-2 py-2.5">
            <div className="flex items-center justify-between pb-2 mb-1">
              <div className="flex items-center space-x-2">
                <div className="flex p-2 rounded-full bg-second-lighter">
                  <IconComponent />
                </div>
                <div className="text-sm font-medium">{category}</div>
                <div className="text-xs font-medium">{payPercent.toFixed(0)}%</div>
              </div>

              <div className={`text-sm font-bold ${isOverBudget ? "text-red-500" : ""}`}>
                {isOverBudget
                  ? `${Math.abs(remainBudget).toLocaleString()}원 초과`
                  : `${remainBudget.toLocaleString()}원 남음`}
              </div>
            </div>

            {/* ✅ 막대바 (사용률) */}
            <div className="w-full h-2 rounded-full bg-second-light">
              <div
                className={`h-2 rounded-full ${
                  isOverBudget ? "bg-main" : "bg-marker-home"
                }`}
                style={{ width: `${payPercent}%` }}
              ></div>
            </div>

            <div className="flex justify-between pt-2 pb-1 text-xs text-3">
              <span>{pay.toLocaleString()}원 지출</span>
              <span>예산 {budget.toLocaleString()}원</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryStatus;
