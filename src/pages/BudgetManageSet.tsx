import React from "react";
import IconFood from "../assets/categoryIcons/IconFood";
import { SaveButton } from "../components/common/Buttons";

// 한달 예산 설정
const MonthlyBudgetSet: React.FC<{ monthBudget: number }> = ({
  monthBudget,
}) => {
  return (
    <div className="p-4 mb-4 bg-white rounded-2xl drop-shadow-10">
      <div className="font-bold test-lg">
        한달에 소비할 <span className="text-marker-home">예산</span>
      </div>
      <div className="text-sm">대략 한 달에 얼마를 사용할지 예상해보세요.</div>
      <div className="text-sm">예산은 언제든지 수정이 가능해요.</div>

      <div className="flex flex-col items-center pt-9">
        <div className="p-1 text-2xl font-bold border-b-2 border-second-lighter text-main">
          {monthBudget}{" "}
        </div>

        <div className="pt-3 text-sm">
          하루당
          <span className="text-sm font-bold text-[#006f6f]"> 20,000원 </span>씩
          소비가 가능해요.
        </div>
      </div>
    </div>
  );
};

//카테고리별 막대 그래프
const MonthlyBudgetBar: React.FC = () => {
  return (
    <>
      {/* 첫 번째 그래프 */}
      <div className="flex pt-2 gap-y-3">
        <div className="w-full rounded-2xl bg-[#f8f8f8] px-2 py-2.5">
          <div className="flex items-center justify-between pb-2 mb-1">
            <div className="flex items-center space-x-2">
              <div className="flex rounded-full bg-second-lighter">
                <IconFood />
              </div>
              <div className="text-sm font-medium">식비</div>
              <div className="text-xs font-medium">100%</div>
            </div>

            {/* 기존 div → input 으로 변경 */}
            <div className="flex">
              <input
                type="text"
                className="bg-[#f8f8f8] text-right text-sm font-bold focus:outline-none focus-visible:outline-none"
                defaultValue="000,000"
              />
              <span className="text-sm font-bold">원</span>
            </div>
          </div>

          {/* 막대바(사용률) */}
          <div className="w-full h-2 rounded-full bg-second-light">
            <div className="w-3/4 h-2 rounded-full bg-marker-home"></div>
          </div>
        </div>
      </div>
      {/* 두 번째 그래프 */}
      <div className="flex pt-2">
        <div className="w-full rounded-2xl bg-[#f8f8f8] px-2 py-2.5">
          <div className="flex items-center justify-between pb-2 mb-1">
            <div className="flex items-center space-x-2">
              <div className="flex rounded-full bg-second-lighter">
                <IconFood />
              </div>
              <div className="text-sm font-medium">식비</div>
              <div className="text-xs font-medium">100%</div>
            </div>
            <div className="text-sm font-bold">200,000원</div>
          </div>
          <div className="w-full h-2 rounded-full bg-second-light">
            <div className="w-3/4 h-2 rounded-full bg-marker-home"></div>
          </div>
        </div>
      </div>

      {/* 세 번째 그래프 */}
      <div className="flex pt-2">
        <div className="w-full rounded-2xl bg-[#f8f8f8] px-2 py-2.5">
          <div className="flex items-center justify-between pb-2 mb-1">
            <div className="flex items-center space-x-2">
              <div className="flex rounded-full bg-second-lighter">
                <IconFood />
              </div>
              <div className="text-sm font-medium">식비</div>
              <div className="text-xs font-medium">100%</div>
            </div>
            <div className="text-sm font-bold">200,000원</div>
          </div>
          <div className="w-full h-2 rounded-full bg-second-light">
            <div className="w-3/4 h-2 rounded-full bg-marker-home"></div>
          </div>
        </div>
      </div>

      {/* 네 번째 그래프 */}
      <div className="flex pt-2">
        <div className="w-full rounded-2xl bg-[#f8f8f8] px-2 py-2.5">
          <div className="flex items-center justify-between pb-2 mb-1">
            <div className="flex items-center space-x-2">
              <div className="flex rounded-full bg-second-lighter">
                <IconFood />
              </div>
              <div className="text-sm font-medium">식비</div>
              <div className="text-xs font-medium">100%</div>
            </div>
            <div className="text-sm font-bold">200,000원</div>
          </div>
          <div className="w-full h-2 rounded-full bg-second-light">
            <div className="w-3/4 h-2 rounded-full bg-marker-home"></div>
          </div>
        </div>
      </div>
    </>
  );
};

const MontglyBudgetCategory: React.FC = () => {
  return (
    <div className="p-4 mt-4 text-lg bg-white rounded-2xl drop-shadow-10">
      <div className="font-bold">
        카테고리별 소비 <span className="font-bold text-marker-home">예산</span>
      </div>
      <div className="flex text-sm">카테고리별 예산으로 더욱 정확하게,</div>
      <div className="flex text-sm">
        원하는 카테고리 예산을 설정할 수 있어요.
      </div>

      {/* 남은예산 표시 부분 */}
      <div className="flex flex-col items-end">
        <div className="flex flex-col items-end pb-2.5 pt-2.5 text-base">
          남은예산
          <div>
            <div className="text-base font-bold text-main"> 100,000원</div>
          </div>
        </div>
      </div>

      {/* 그래프 묶음 컴포넌트 삽입 */}
      <MonthlyBudgetBar />
    </div>
  );
};

const BudgetManageSet: React.FC = () => {
  const monthBudget = 600000;
  return (
    <div className="flex flex-col w-full h-full bg-second-bg">
      <div className="flex h-full flex-col bg-[#f8f8f8] py-5">
        {/* 상단 영역(한 달 예산) */}
        <MonthlyBudgetSet monthBudget={monthBudget} />

        {/* 카테고리별 예산 + 그래프 (중단 영역) */}
        <MontglyBudgetCategory />
      </div>

      {/* 저장 버튼 */}
      <SaveButton title="저장하기" />
    </div>
  );
};
export default BudgetManageSet;
