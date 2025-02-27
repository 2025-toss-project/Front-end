import React from "react";
import IconFood from "../assets/categoryIcons/IconFood";

const BudgetManageSet = () => {
  return (
    <div className="flex h-full flex-col bg-[#f8f8f8] px-6 py-5">
      {/* 상단 */}
      <div className="mb-4 rounded-2xl bg-white p-4 drop-shadow-10">
        <div className="test-lg font-bold">
          한달에 소비할 <span className="text-marker-home">예산</span>{" "}
        </div>
        <div className="text-sm">
          대략 한 달에 얼마를 사용할지 예상해보세요.
        </div>
        <div className="text-sm">예산은 언제든지 수정이 가능해요.</div>
        <div className="border-b-4 border-second p-1 text-2xl font-bold text-main">
          600,000원
        </div>

        <div className="text-sm">
          하루당
          <span className="text-sm font-bold text-[#006f6f]"> 20,000원 </span>씩
          소비가 가능해요.
        </div>
      </div>
      {/* 하단 */}
      <div className="mb-4 rounded-2xl bg-white p-4 drop-shadow-10">
        <div>
          카테고리별 소비 <span className="text-marker-home">예산</span>{" "}
        </div>
        <div>카테고리별 예산으로 더욱 정확하게, </div>
        <div>원하는 카테고리 예산을 설정할 수 있어요.</div>
        <div>
          남은예산
          <div>
            <div> 100,000원</div>
          </div>
          {/* 하단 영역 카테고리별 그래프 시작 */}
          <div>
            <div className="mb-5 rounded-2xl bg-[#f8f8f8] px-2 py-2.5">
              <div className="mb-1 flex items-center justify-between pb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex rounded-full bg-second-lighter">
                    <IconFood />
                  </div>
                  <div className="text-sm font-medium">식비</div>
                  <div className="text-xs font-medium">100%</div>
                </div>

                <div className="text-sm font-bold">200,000원 남음</div>
              </div>

              {/* 막대바(사용률) */}
              <div className="h-2 w-full rounded-full bg-second-light">
                <div className="h-2 w-3/4 rounded-full bg-marker-home"></div>
              </div>

              <div className="text-3 flex justify-between pb-1 pt-2 text-xs">
                <span>220,000원 지출</span>
                <span>예산 200,000원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetManageSet;
