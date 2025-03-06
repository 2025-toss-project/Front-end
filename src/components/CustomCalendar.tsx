import { LucidePlus, LucideTriangle, LucideTriangleRight } from "lucide-react";
import React, { useState } from "react";
import CustomCalendar from "react-calendar";
import usePayListInfo from "../stores/payListInfo";
import useSpendingInfo from "../stores/spendingInfo";

// 캘린더 value 타입 정의
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = () => {
  const { setPayListInfo } = usePayListInfo();
  const { spendingRecords } = useSpendingInfo();
  const [value, setValue] = useState<Value>(new Date());

  // 날짜 선택 핸들러
  const handleDateChange = (selectedValue: Value) => {
    setValue(selectedValue);

    if (Array.isArray(selectedValue)) {
      // 날짜 범위 선택 시
      const [start, end] = selectedValue;
      const startDate = start ? start.toISOString().split("T")[0] : "";
      const endDate = end ? end.toISOString().split("T")[0] : "";
      setPayListInfo("startDate", startDate); // Zustand에 저장
      setPayListInfo("endDate", endDate); // Zustand에 저장
    } else {
      // 단일 날짜 선택 시
      const startDate = selectedValue
        ? selectedValue.toISOString().split("T")[0]
        : "";
      setPayListInfo("startDate", startDate); // START 값 저장
      setPayListInfo("endDate", startDate); // END는 null로 설정
    }
  };

  // 캘린더 사이 들어갈 컴포넌트
  const CalendarHeader = () => {
    const { totalPrice } = useSpendingInfo();

    return (
      <div className="flex w-full flex-row justify-between px-10 pt-3">
        <p className=""> {totalPrice.toLocaleString()}원 </p>
        <LucidePlus />
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col items-center py-2">
      <CustomCalendar
        value={value}
        onChange={handleDateChange}
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
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();

          // 내 데이터에서 달력 날짜랑 같은 거 찾기
          const dayRecord = spendingRecords.find(
            (record) => record.month === month && record.day === day,
          );

          return (
            <div className="flex h-full flex-col justify-between pt-2">
              {dayRecord && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-red-500">
                  {dayRecord.datePrice.toLocaleString()}
                </div>
              )}
            </div>
          );
        }}
      />

      {/* 네비게이션과 날짜 사이에 금액 표시 (달리 방법이 없어서 absol로 구현) */}
      <div className="absolute top-28 w-full text-left text-lg font-medium">
        <CalendarHeader />
      </div>
    </div>
  );
};

export default Calendar;
