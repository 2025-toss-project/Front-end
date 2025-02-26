import React from "react";
import {
  LucideChartPie,
  LucideCircleDollarSign,
  LucideHouse,
  LucideUserRound,
  LucideWallet,
} from "lucide-react";

// 기본색상으로 설정해둠 (각 페이지일때 색깔 변경해주세요)
const navbar = () => {
  return (
    <div className="border-lightest h-[70px] rounded-[20px] border-t">
      <div className="flex h-full items-center justify-between px-[20px]">
        <div className="flex-col justify-items-center">
          {/* <IconRecords className="text-second" /> */}
          <LucideWallet color="#aaa" strokeWidth={1.5} />
          <p className="text-[10px] text-second">소비기록</p>
        </div>
        <div className="flex-col justify-items-center">
          <LucideChartPie color="#aaa" strokeWidth={1.5} />
          <p className="text-[10px] text-second">통계</p>
        </div>
        <div className="flex-col justify-items-center">
          <LucideHouse color="#aaa" strokeWidth={1.5} />
          <p className="text-[10px] text-second">홈</p>
        </div>
        <div className="flex-col justify-items-center">
          <LucideCircleDollarSign color="#aaa" strokeWidth={1.5} />
          <p className="text-[10px] text-second">예산관리</p>
        </div>
        <div className="flex-col justify-items-center">
          <LucideUserRound color="#aaa" strokeWidth={1.5} />
          <p className="text-[10px] text-second">내정보</p>
        </div>
      </div>
    </div>
  );
};

export default navbar;
