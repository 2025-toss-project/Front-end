import React, { useCallback, useState } from "react";
import CustomCalendar from "react-calendar";

// 캘린더 value 타입 정의
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// 캘린더 함수
const Calendar = () => {
  // 캘린더 값 상태
  const [value, onChange] = useState<Value>(new Date());

  // 캘린더 값 변경 함수
  const onChangeCalendar = useCallback(() => {
    onChange(value);
  }, [value]);

  return (
    <div>
      <CustomCalendar
        value={value}
        onChange={onChange}
        locale="ko"
        view="month"
        maxDetail="month"
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
        formatMonthYear={
          (locale, date) => date.toLocaleString("ko", { month: "long" }) // 월만 보이게
        }
        next2Label={null} // >> 버튼 숨김
        prev2Label={null} // << 버튼 숨김
      />
    </div>
  );
};

export default Calendar;
