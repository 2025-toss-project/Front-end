import {
  ChevronLeft,
  ChevronRight,
  LucideAArrowDown,
  LucideForkKnife,
} from "lucide-react";
import React from "react";

const BudgetManage = () => {
  return (
    <div className="flex flex-col h-full px-6 py-5 bg-second-lighter">
      {/* 1. 목표예산 설정 */}
      <div className="flex items-center justify-between px-4 py-3 mb-4 border rounded-2xl border-second-light">
        <div>
          <h2 className="text-lg font-bold">목표예산 설정</h2>
          <p className="text-xs text-second">
            목표예산을 설정하여 체계적으로 관리하세요.
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-second" />
      </div>

      {/* 2. 현재 예산 사용 현황 */}
      <div className="p-4 mb-4 border rounded-2xl border-second-light">
        <p className="mb-1 text-lg font-semibold">
          현재 예산의 <span className="text-main">60%</span>를 사용했어요
        </p>
        <div className="mb-2 text-sm">
          남은 기간 동안 하루에
          <div>
            <span>15,000원</span>을 사용할 수 있어요.
          </div>
        </div>
        <div className="flex items-center justify-center w-full h-24 rounded-md bg-second-light">
          원형 그래프 자리
        </div>
      </div>

      {/* 3. 카테고리별 소비 현황 */}
      <div className="p-4 border rounded-2xl border-second-light">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-main">카테고리별 소비 현황</h3>
          <p className="text-sm text-second">
            예산 대비 사용량을 한눈에 보고 관리하세요.
          </p>
        </div>

        {/* 예: 식비 카테고리 */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <LucideForkKnife/>
              <span className="text-sm font-medium text-marker-food">식비</span>
            </div>
            <span className="text-sm font-medium text-marker-food">100%</span>
          </div>
          <p className="mb-1 text-xs text-main">20,000원 초과</p>
          {/* 막대바(사용률) */}
          <div className="w-full h-2 mb-2 rounded-full bg-marker-food-light">
            <div className="w-3/4 h-2 rounded-full bg-marker-food"></div>
          </div>
          <div className="flex justify-between text-xs text-second">
            <span>220,000원 지출</span>
            <span>예산 200,000원</span>
          </div>
        </div>

        {/* 필요하다면 다른 카테고리들도 동일하게 반복 */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <LucideForkKnife className="w-4 h-4 text-marker-food" />
              <span className="text-sm font-medium text-marker-food">식비</span>
            </div>
            <span className="text-sm font-medium text-marker-food">100%</span>
          </div>
          <p className="mb-1 text-xs text-second">200,000원 남음</p>
          {/* 막대바(사용률) */}
          <div className="w-full h-2 mb-2 rounded-full bg-marker-food-light">
            <div className="w-full h-2 rounded-full bg-marker-food"></div>
          </div>
          <div className="flex justify-between text-xs text-second">
            <span>16,200원 지출</span>
            <span>예산 16,200원</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetManage;
