import React, { useState, useEffect } from "react";
import IconFood from "../assets/categoryIcons/IconFood";
import { SaveButton } from "../components/common/Buttons";
import { categoryList } from "../constants/category";

// 전체 월 예산 기본값 (예: 1,000,000원)
const totalBudget = 1000000;

interface CategoryBudget {
  category: string;    // 카테고리 이름
  budgetPrice: number; // 카테고리별 예산 금액
  percentage: number;  // (카테고리 예산 / 전체 예산) * 100
}

// 더미 데이터 (실제 서버 호출 대신)
const dummyData: CategoryBudget[] = [
  { category: "식비",     budgetPrice: 150000, percentage: 15 },
  { category: "교통",     budgetPrice: 80000,  percentage: 8  },
  { category: "쇼핑", budgetPrice: 200000, percentage: 20 },
  { category: "건강", budgetPrice: 50000,  percentage: 5  },
  { category: "주거",     budgetPrice: 150000, percentage: 15 },
  { category: "통신",     budgetPrice: 80000,  percentage: 8  },
  { category: "건강", budgetPrice: 200000, percentage: 20 },
  { category: "교육", budgetPrice: 50000,  percentage: 5  },
  { category: "문화생활",     budgetPrice: 150000, percentage: 15 },
  { category: "저축",     budgetPrice: 0,  percentage: 0  },
  { category: "경조사", budgetPrice: 0, percentage: 0 },
  { category: "기타", budgetPrice: 50000,  percentage: 5  },
  
  
];

// 한달 예산 설정
const MonthlyBudgetSet: React.FC<{
  monthBudget: number;
  setMonthBudget: (value: number) => void;
}> = ({ monthBudget, setMonthBudget }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/,/g, "");
    const num = Number(cleaned);
    setMonthBudget(cleaned === "" ? 0 : isNaN(num) ? totalBudget : num);
  };

  return (
    <div className="p-4 mb-4 bg-white rounded-2xl drop-shadow-10">
      <div className="text-lg font-bold">
        한달에 소비할 <span className="text-marker-home">예산</span>
      </div>
      <div className="text-sm">대략 한 달에 얼마를 사용할지 예상해보세요.</div>
      <div className="text-sm">예산은 언제든지 수정이 가능해요.</div>

      <div className="flex flex-col items-center pt-9">
        <div className="flex flex-row items-center text-2xl font-bold text-main">
          <input
            maxLength={11}
            type="text"
            // 0이면 빈 문자열, 아니면 쉼표로 표시
            value={monthBudget === 0 ? "" : monthBudget.toLocaleString()}
            onChange={handleChange}
            // 입력 길이에 맞춰 너비 증가
            style={{
              width: `${(monthBudget === 0 ? 1 : monthBudget.toString().length) + 2}ch`,
            }}
            className="p-1 text-2xl font-bold text-center border-b-2 border-second-lighter text-main focus:outline-none"
          />
          <span className="ml-1 text-2xl font-bold text-main">원</span>
        </div>
        <div className="pt-3 text-sm">
          하루당
          <span className="text-sm font-bold text-[#006f6f]">
            {" " + Math.round(monthBudget / 30).toLocaleString()}원{" "}
          </span>
          씩 소비가 가능해요.
        </div>
      </div>
    </div>
  );
};

// 카테고리별 막대 그래프
const MonthlyBudgetBar: React.FC<{
  categoryBudgets: CategoryBudget[];
  onChangeCategoryBudget: (category: string, newPrice: number) => void;
}> = ({ categoryBudgets, onChangeCategoryBudget }) => {
  return (
    <>
      {categoryList.map((cat, i) => {
        // 현재 카테고리에 해당하는 예산 데이터 찾기
        const data = categoryBudgets.find((c) => c.category === cat.text);
        // 없으면 기본값
        const budgetPrice = data?.budgetPrice ?? 0;
        const percentage = data?.percentage ?? 0;

        // 예산 입력 변경 시
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          // 숫자 이외 제거
          const val = Number(e.target.value.replace(/\D/g, ""));
          onChangeCategoryBudget(cat.text, isNaN(val) ? 0 : val);
        };

        return (
          <div key={i} className="flex pt-2 gap-y-3">
            <div className="w-full rounded-2xl bg-[#f8f8f8] px-2 py-2.5">
              <div className="flex items-center justify-between pb-2 mb-1">
                <div className="z-20 flex items-center space-x-2">
                  <div className="flex rounded-full bg-second-lighter">{cat.icon}</div>
                  <div className="text-sm font-medium shrink-0">{cat.text}</div>
                  {/* 퍼센티지 표시 (소수점 반올림) */}
                  <div className="text-xs font-medium">{Math.round(percentage)}%</div>
                </div>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="inline-block bg-[#f8f8f8] text-right text-sm font-bold focus:outline-none focus-visible:outline-none"
                    // 0이면 빈 문자열 표시
                    value={budgetPrice === 0 ? "0" : budgetPrice.toString()}
                    onChange={handleInputChange}
                  />
                  <span className="text-sm font-bold">원</span>
                </div>
              </div>
              {/* 막대 그래프: 퍼센티지에 따라 길이 변경 */}
              <div className="w-full h-2 rounded-full bg-second-light">
                <div
                  className="h-2 rounded-full bg-marker-home"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const BudgetManageSet: React.FC = () => {
  const [monthBudget, setMonthBudget] = useState<number>(totalBudget);
  const [categoryBudgets, setCategoryBudgets] = useState<CategoryBudget[]>([]);

  // (핵심) 카테고리별 예산 변경 시 → 퍼센티지 재계산 + 남은 예산 자동 변경
  const handleCategoryBudgetChange = (category: string, newPrice: number) => {
    setCategoryBudgets((prev) =>
      prev.map((item) => {
        if (item.category === category) {
          // 새 퍼센티지 계산
          const newPercentage = monthBudget ? (newPrice / monthBudget) * 100 : 0;
          return { ...item, budgetPrice: newPrice, percentage: newPercentage };
        }
        return item;
      })
    );
  };

  // 더미 데이터로 초기화
  useEffect(() => {
    setCategoryBudgets(dummyData);
  }, []);

  // 사용된 예산 (카테고리별 합)
  const used = categoryBudgets.reduce((sum, c) => sum + c.budgetPrice, 0);
  // 남은 예산
  const remain = Math.max(0, monthBudget - used);

  return (
    <div className="flex flex-col w-full h-full bg-second-bg">
      <div className="flex h-full flex-col bg-[#f8f8f8] py-5">
        {/* 월 전체 예산 입력 */}
        <MonthlyBudgetSet monthBudget={monthBudget} setMonthBudget={setMonthBudget} />
        
        {/* 카테고리별 예산 설정 */}
        <div className="p-4 mt-4 text-lg bg-white rounded-2xl drop-shadow-10">
          <div className="font-bold">
            카테고리별 소비 <span className="font-bold text-marker-home">예산</span>
          </div>
          <div className="flex text-sm">카테고리별 예산으로 더욱 정확하게,</div>
          <div className="flex text-sm">원하는 카테고리 예산을 설정할 수 있어요.</div>

          {/* 남은예산 표시 */}
          <div className="flex flex-col items-end">
            <div className="flex flex-col items-end pb-2.5 pt-2.5 text-base">
              남은예산
              <div>
                <div className="text-base font-bold text-main">
                  {remain.toLocaleString()}원
                </div>
              </div>
            </div>
          </div>

          {/* 카테고리별 그래프 */}
          <MonthlyBudgetBar
            categoryBudgets={categoryBudgets}
            onChangeCategoryBudget={handleCategoryBudgetChange}
          />
        </div>
      </div>
      <SaveButton title="저장하기" />
    </div>
  );
};

export default BudgetManageSet;
