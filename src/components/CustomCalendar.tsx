import { LucidePlus, LucideTriangle, LucideTriangleRight } from "lucide-react";
import React, { useState } from "react";
import CustomCalendar from "react-calendar";
import { spendingData } from "../spendingData";

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
      <div className="flex w-full flex-row justify-between px-10 pt-3">
        <p className=""> {Amount} </p>
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
        // 일일 소비 내역 렌더링
        tileContent={({ date }) => {
          const year = date.getFullYear().toString();
          const month = (date.getMonth() + 1).toString();
          const day = date.getDate().toString();

          // 내 데이터에서 달력 날짜랑 같은 거 찾기
          const dayRecord = spendingData.records.find(
            (record) =>
              record.year === year &&
              record.month === month &&
              record.day === day,
          );

          return (
            <div className="flex h-full flex-col justify-between pt-2">
              {dayRecord && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-red-500">
                  {dayRecord.dailyTotal.toLocaleString()}
                </div>
              )}
            </div>
          );
        }}
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
