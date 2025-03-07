import { LucidePlus, LucideTriangle } from "lucide-react";
import React, { useEffect, useState } from "react";

interface CalendarBodyProps {
  tripDate: {
    startDate: string;
    endDate: string;
  };
  setTripDate: React.Dispatch<
    React.SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
  selectedYear: number;
  selectedMonth: number;
  isSingleSelect: boolean;
}

const CalendarBody: React.FC<CalendarBodyProps> = ({
  tripDate,
  setTripDate,
  selectedYear,
  selectedMonth,
  isSingleSelect,
}) => {
  const updateStartDate = (newStartDate: string) => {
    setTripDate((prev) => ({
      ...prev,
      startDate: newStartDate,
    }));
  };

  const updateEndDate = (newEndDate: string) => {
    setTripDate((prev) => ({
      ...prev,
      endDate: newEndDate,
    }));
  };

  const handleClickDate = (date: string) => {
    if (isSingleSelect) {
      // 단일 선택 모드에서는 startDate만 설정하고, 같은 날짜 클릭 시 선택 해제
      setTripDate((prev) => ({
        startDate: prev.startDate === date ? "" : date,
        endDate: "",
      }));
    } else {
      // 기간 선택 모드
      if (tripDate.startDate === "") {
        // 아무것도 선택되지 않은 상태
        updateStartDate(date);
      } else if (tripDate.endDate === "") {
        // 시작일만 선택된 상태 + 시작일보다 이전 날짜 선택
        if (new Date(date) < new Date(tripDate.startDate)) {
          updateEndDate(tripDate.startDate);
          updateStartDate(date);
        } else {
          // 시작일보다 이후 날짜 선택
          updateEndDate(date);
        }
      } else {
        // 시작일, 종료일 모두 선택된 상태 → 새로운 시작일 설정
        updateStartDate(date);
        updateEndDate("");
      }
    }
  };

  // 해당 달의 1일의 요일
  const firstDay = new Date(selectedYear, selectedMonth - 1, 1).getDay();

  // 해당 달의 마지막 날
  const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();

  const renderDays = () => {
    const daysOfMonth = [];
    for (let i = 0; i < firstDay; i++) {
      daysOfMonth.push(null);
    }
    for (let i = 1; i <= lastDay; i++) {
      daysOfMonth.push(i);
    }

    return daysOfMonth.map((day, index) => {
      if (day === null) return <div key={index} />;

      const currentDate = `${selectedYear}-${selectedMonth}-${day}`;

      // startDate와 endDate를 계산해서 색을 칠하기 위한 범위
      const isInRange =
        tripDate.startDate &&
        tripDate.endDate &&
        new Date(currentDate) >= new Date(tripDate.startDate) &&
        new Date(currentDate) <= new Date(tripDate.endDate);

      const isStartDate = currentDate === tripDate.startDate;
      const isEndDate = currentDate === tripDate.endDate;

      return (
        <div
          onClick={() => handleClickDate(currentDate)}
          className={`relative my-1 grid h-9 w-full place-items-center text-center text-xs font-medium ${
            isInRange ? "bg-main text-white" : ""
          } ${isInRange && isStartDate ? "rounded-l-full" : ""} ${isInRange && isEndDate ? "rounded-r-full" : ""}`}
          key={index}
        >
          <span
            className={`relative z-20 h-5 w-5 text-center leading-5 ${isStartDate || isEndDate ? "text-white" : ""}`}
          >
            {day}
            {isSingleSelect && isStartDate && (
              <span className="absolute inset-0 h-full rounded-full -z-10 aspect-square bg-main"></span>
            )}
          </span>
          {/* 지출금액 표시할 곳 */}
          {isSingleSelect && (
            <div className="h-3 text-[10px] text-[#FF4D4D]">{"11,000"}</div>
          )}
          {!isSingleSelect && (isStartDate || isEndDate) && (
            <div
              className={
                "absolute z-10 aspect-square h-full rounded-full bg-main text-white"
              }
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className={"grid h-fit w-full grid-cols-7 gap-y-1 pt-2"}>
      {renderDays()}
    </div>
  );
};

const DaysOfWeek: React.FC = () => {
  const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className="relative grid w-full grid-cols-7 place-items-center">
      {DAYS.map((day) => (
        <div
          key={day}
          className="w-full text-sm font-normal text-center text-second"
        >
          {day}
        </div>
      ))}
    </div>
  );
};

const CustomCalendar: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, _] = useState(new Date().getDate());
  const [isSingleSelect, setIsSingleSelect] = useState(true);

  const [tripDate, setTripDate] = useState({
    startDate: `${selectedYear}-${selectedMonth}-${selectedDate}`,
    endDate: "",
  });
  const handleClickArrow = (isLeft: boolean) => {
    if (isLeft) {
      if (selectedMonth === 1) {
        setSelectedYear((prev) => prev - 1);
        setSelectedMonth(12);
      } else {
        setSelectedMonth((prev) => prev - 1);
      }
    } else {
      // 오른쪽 화살표 클릭
      if (selectedMonth === 12) {
        setSelectedYear((prev) => prev + 1);
        setSelectedMonth(1);
      } else {
        setSelectedMonth((prev) => prev + 1);
      }
    }
  };
  const handleClickSelectBtn = () => {
    setTripDate({
      startDate: "",
      endDate: "",
    });
    setIsSingleSelect((prev) => !prev);
  };

  useEffect(() => {
    console.log(tripDate);
  }, [tripDate]);

  return (
    <>
      <div className={"w-full"}>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-5">
            <LucideTriangle
              size={12}
              style={{ transform: "rotate(-90deg)" }}
              onClick={() => handleClickArrow(true)}
            />
            <div className={"text-lg font-medium"}>
              {selectedYear}년 {selectedMonth}월
            </div>
            <LucideTriangle
              size={12}
              style={{ transform: "rotate(90deg)" }}
              onClick={() => handleClickArrow(false)}
            />
          </div>

          <div
            onClick={handleClickSelectBtn}
            className="px-3 py-2 text-sm font-bold text-white rounded-lg bg-main"
          >
            {isSingleSelect ? "단일선택" : "기간선택"}
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="text-xl font-bold">122,200원</div>
          <LucidePlus size={24} color="#333" />
        </div>
        <DaysOfWeek />
        <CalendarBody
          tripDate={tripDate}
          setTripDate={setTripDate}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          isSingleSelect={isSingleSelect}
        />
      </div>
    </>
  );
};

export default CustomCalendar;
