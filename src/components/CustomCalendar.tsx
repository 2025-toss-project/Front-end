import { LucidePlus, LucideTriangle, LucideTriangleRight } from "lucide-react";
import React, { useState } from "react";
import CustomCalendar from "react-calendar";

// 캘린더 value 타입 정의
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = () => {
  // 캘린더 값 상태
  const [value, onChange] = useState<Value>(new Date());
  const calAmount: number = 10000; // 예제 값
  const Amount: string = `${calAmount.toLocaleString()}원`;

  // 캘린더 사이 들어갈 컴포넌트
  const CalendarHeader = () => {
    return (
      <div className="flex justify-between px-10 py-2">
        <p> {Amount} </p>
        <LucidePlus />
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col items-center py-2">
      <CustomCalendar
        value={value}
        onChange={onChange}
        className="rounded-lg pb-5"
        locale="ko"
        view="month"
        maxDetail="month"
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        formatMonthYear={(locale, date) =>
          date.toLocaleString("ko", { month: "long" })
        }
        showWeekNumbers={false}
        nextLabel={
          <LucideTriangle
            size={12}
            className="mr-2 rotate-90 hover:bg-second-light"
          />
        } // 다음 달 버튼
        prevLabel={
          <LucideTriangle
            size={12}
            className="90 ml-2 -rotate-90 hover:bg-second-light"
          />
        } // 이전 달 버튼
        next2Label={null} // >> 버튼 숨김
        prev2Label={null} // << 버튼 숨김
      />
      {/* 네비게이션과 날짜 사이에 금액 표시 (달리 방법이 없어서 absol로 구현) */}
      {calAmount > 0 && (
        <div className="absolute top-28 w-full text-left text-lg font-medium">
          <CalendarHeader />
        </div>
      )}
    </div>
  );
};

export default Calendar;
