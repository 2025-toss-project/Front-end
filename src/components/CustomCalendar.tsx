import React, { useState } from "react";
import CustomCalendar from "react-calendar";
import useSpendingInfo from "../stores/spendingInfo";
import { LucidePlus, LucideTriangle } from "lucide-react";
import useCalendarInfo from "../stores/CalendarInfo";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CustomCalendarProps {
  activeStartDate: Date | null;
  onActiveStartDateChange: (date: Date) => void;
  onSelectDateChange: (startDate: string, endDate: string) => void;
}

const Calendar: React.FC<CustomCalendarProps> = ({
  activeStartDate,
  onActiveStartDateChange,
  onSelectDateChange,
}) => {
  const curDate = new Date();
  const [value, setValue] = useState<Value>(curDate); // 초기값 현재 날짜
  const { totalPrice, consumptionInfoByDateDTOS } = useCalendarInfo();

  const handleDateChange = (selectedValue: Value) => {
    setValue(selectedValue);

    const formatDate = (date: Date | null) => {
      if (!date) return "";
      return date
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\. /g, "-")
        .replace(/\./g, "")
        .trim();
    };

    if (Array.isArray(selectedValue)) {
      const [start, end] = selectedValue;
      onSelectDateChange(formatDate(start), formatDate(end));
    } else {
      onSelectDateChange(formatDate(selectedValue), formatDate(selectedValue));
    }
  };

  // 캘린더 사이 들어갈 컴포넌트
  const CalendarHeader = () => {
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
        activeStartDate={activeStartDate || curDate} // 현재 활성화 날짜
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            onActiveStartDateChange(activeStartDate);
          }
        }}
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
        }
        prevLabel={
          <LucideTriangle
            size={12}
            className="90 ml-2 -rotate-90 hover:bg-second-light"
          />
        }
        next2Label={null}
        prev2Label={null}
        // 일일 소비 내역 렌더링
        tileContent={({ date }) => {
          const year = date.getFullYear().toString();
          const month = (date.getMonth() + 1).toString();
          const day = date.getDate().toString();

          if (
            !consumptionInfoByDateDTOS ||
            consumptionInfoByDateDTOS.length === 0
          ) {
            return null;
          }

          // 내 데이터에서 달력 날짜랑 같은 거 찾기
          const dayRecord = consumptionInfoByDateDTOS.find(
            (record) =>
              String(record.month) === month && String(record.day) === day,
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

      <div className="absolute top-28 w-full text-left text-lg font-medium">
        <CalendarHeader />
      </div>
    </div>
  );
};

export default Calendar;
