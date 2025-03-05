import { LucidePlus, LucideTriangle } from "lucide-react";
import React, { useState } from "react";
import CustomCalendar from "react-calendar";
import { spendingData } from "../spendingData";

// 캘린더 value 타입 정의
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const Calendar = () => {
  // 캘린더 값 상태
  const [value, setValue] = useState<Value>(new Date());
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date | [Date, Date]>(
    new Date(),
  );

  const formatDay = (date: Date): string => {
    const day = date.getDate();
    return day < 10 ? `0${day}` : `${day}`;
  };

  const dateChangeHandler = (value: Value) => {
    if (Array.isArray(value) && value[0] && value[1]) {
      setStartDate(formatDay(value[0]));
      setEndDate(formatDay(value[1]));
    }
    setValue(value);
  };

  const calAmount: number = 10000; // 예제 값
  const Amount: string = `${calAmount.toLocaleString()}원`;

  const CalendarHeader = () => {
    return (
      <div className="flex w-full flex-row justify-between px-10 pt-3">
        <p> {Amount} </p>
        <LucidePlus />
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col items-center py-2">
      <CustomCalendar
        value={value}
        selectRange={true}
        onChange={dateChangeHandler}
        className="rounded-lg pb-5"
        locale="ko"
        view="month"
        maxDetail="month"
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        formatDay={(locale, date) => formatDay(date)}
        formatMonthYear={(locale, date) =>
          `${date.toLocaleString("ko", { month: "long" })}`
        }
        showWeekNumbers={false}
        nextLabel={
          <LucideTriangle
            size={12}
            className="mr-2 rotate-90 hover:bg-second-light"
          />
        }
        prevLabel={
          <LucideTriangle
            size={12}
            className="ml-2 -rotate-90 hover:bg-second-light"
          />
        }
        next2Label={null}
        prev2Label={null}
        tileClassName={({ date }) => {
          if (
            selectedDates instanceof Date &&
            date.toDateString() === selectedDates.toDateString()
          ) {
            return "single-selected"; // 단일 선택 스타일
          }

          if (
            Array.isArray(selectedDates) &&
            selectedDates.length === 2 &&
            date >= selectedDates[0] &&
            date <= selectedDates[1]
          ) {
            return "range-selected"; // 범위 선택 스타일
          }

          return "";
        }}
        tileContent={({ date }) => {
          const year = date.getFullYear().toString();
          const month = (date.getMonth() + 1).toString();
          const day = date.getDate().toString();

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
      {calAmount > 0 && (
        <div className="absolute top-28 w-full text-left text-lg font-medium">
          <CalendarHeader />
        </div>
      )}
    </div>
  );
};

export default Calendar;
