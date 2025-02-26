import { ChevronRight } from "lucide-react";
import IconFood from "../assets/categoryIcons/IconFood";
import IconEvent from "../assets/categoryIcons/IconEvent";

const BudgetManage = () => {
  return (
    <div className="flex h-full flex-col bg-[#f8f8f8] px-6 py-5">
      <div className="flex h-16 w-full items-center justify-center">
        목표예산관리
      </div>
      {/* 1. 목표예산 설정 */}
      <div className="1px mb-4 mt-5 flex items-center justify-between rounded-2xl border border-second-light bg-white px-4 py-3">
        <div>
          <h2 className="text-lg font-bold">목표예산 설정</h2>
          <p className="text-xs">목표예산을 설정하여 체계적으로 관리하세요.</p>
        </div>
        <ChevronRight className="h-5 w-5" />
      </div>

      {/* 2. 현재 예산 사용 현황 */}
      <div className="mb-4 rounded-2xl bg-white p-4 drop-shadow-10">
        <p className="mb-1 text-lg font-bold">
          현재 예산의 <span className="text-main">60%</span>를 사용했어요
        </p>
        <div className="text-sm">
          남은 기간 동안 하루에
          <div>
            <span className="font-bold text-marker-home">15,000원</span>을
            사용할 수 있어요.
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-sm">남은 금액</div>
            <div className="text-lg font-bold text-main">15,000원</div>
          </div>

          <div className="flex flex-col">
            <div>총 예산</div>
            <div className="text-lg font-bold text-marker-home">200,000원</div>
          </div>
        </div>
      </div>

      {/* 3. 카테고리별 소비 현황 */}
      <div className="gap-x gap-x-2.5 rounded-2xl bg-white px-3 py-5 drop-shadow-10">
        <div className="mb-4">
          <h3 className="text-lg font-bold">카테고리별 소비 현황</h3>
          <p className="pb-2.5 text-sm">
            예산 대비 사용량을 한눈에 보고 관리하세요.
          </p>
        </div>

        {/* 예: 식비 카테고리 */}
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

        {/* ////초과 예시 */}

        <div className="mb-5 rounded-2xl bg-[#f8f8f8] px-2 py-2.5">
          <div className="mb-1 flex items-center justify-between pb-2">
            <div className="flex items-center space-x-2">
              <div className="flex rounded-full bg-second-lighter">
                <IconEvent />
              </div>
              <div className="text-sm font-medium">경조사</div>
              <div className="text-xs font-medium">100%</div>
            </div>

            <div className="text-sm font-bold">200,000원 초과</div>
          </div>

          {/* 막대바(사용률) */}
          <div className="h-2 w-full rounded-full bg-second-light">
            <div className="h-2 rounded-full bg-main"></div>
          </div>

          <div className="text-3 flex justify-between pb-1 pt-2 text-xs">
            <span>220,000원 지출</span>
            <span>예산 200,000원</span>
          </div>
        </div>

        {/*  */}

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
  );
};

export default BudgetManage;
