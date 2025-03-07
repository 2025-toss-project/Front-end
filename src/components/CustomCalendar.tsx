import React, { useState } from "react";
import CustomCalendar from "react-calendar";
import usePayListInfo from "../stores/payListInfo";
import useSpendingInfo from "../stores/spendingInfo";
import { LucideTriangle } from "lucide-react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CustomCalendarProps {
  activeStartDate: Date | null;
  onActiveStartDateChange: (date: Date) => void;
}

const Calendar: React.FC<CustomCalendarProps> = ({
  activeStartDate,
  onActiveStartDateChange,
}) => {
  const { setPayListInfo } = usePayListInfo();
  const { spendingRecords } = useSpendingInfo();
  const curDate = new Date();
  const [value, setValue] = useState<Value>(curDate); // 초기값 현재 날짜

  const handleDateChange = (selectedValue: Value) => {
    setValue(selectedValue);

    if (Array.isArray(selectedValue)) {
      const [start, end] = selectedValue;
      const startDate = start ? start.toISOString().split("T")[0] : "";
      const endDate = end ? end.toISOString().split("T")[0] : "";
      setPayListInfo("startDate", startDate);
      setPayListInfo("endDate", endDate);
    } else {
      const startDate = selectedValue
        ? selectedValue.toISOString().split("T")[0]
        : "";
      setPayListInfo("startDate", startDate);
      setPayListInfo("endDate", startDate);
    }
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
      />
    </div>
  );
};

export default Calendar;
