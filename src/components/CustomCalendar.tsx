import { LucidePlus, LucideTriangle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useCalendarInfo from "../stores/CalendarInfo";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";

interface CustomCalendarProps {
  onDateChange: (startDate: string, endDate: string) => void;
}

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
  calenderInfoDTOS: {
    year: number;
    month: number;
    day: number;
    datePrice: number;
  }[];
}

const CalendarBody: React.FC<CalendarBodyProps> = ({
  tripDate,
  setTripDate,
  selectedYear,
  selectedMonth,
  isSingleSelect,
  calenderInfoDTOS,
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
      // 단일 선택 모드에서는 startDate로 모두 설정, 같은 날짜 클릭 시 선택 해제
      setTripDate((prev) => ({
        startDate: prev.startDate === date ? "" : date,
        endDate: prev.startDate === date ? "" : date,
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

  // 날짜 렌더
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

      // calenderInfoDTOS에서 해당 날짜의 데이터 가져오기
      const dayRecord = calenderInfoDTOS?.find(
        (record) =>
          record.year === selectedYear &&
          record.month === selectedMonth &&
          record.day === day,
      );

      return (
        <div
          onClick={() => handleClickDate(currentDate)}
          className={`relative my-1 grid aspect-square w-full place-items-center text-center text-xs font-medium ${
            isInRange
              ? "bg-main text-white"
              : isStartDate || isEndDate
                ? "bg-white text-second-dark"
                : ""
          } ${isInRange && isStartDate ? "rounded-l-full" : ""} ${
            isInRange && isEndDate ? "rounded-r-full" : ""
          }`}
          key={index}
        >
          <span
            className={`relative z-20 h-5 w-5 text-center leading-5 ${isStartDate || isEndDate ? "text-white" : ""}`}
          >
            {day}
            {isSingleSelect && isStartDate && (
              <span className="absolute inset-0 -z-10 aspect-square h-full rounded-full bg-main"></span>
            )}
          </span>
          {/* 지출금액 표시할 곳 */}
          {isSingleSelect && dayRecord && (
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-red-500">
              {dayRecord.datePrice.toLocaleString()}
            </div>
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
    <div className={"grid h-fit w-full grid-cols-7 gap-y-3 pt-2"}>
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
          className="w-full text-center text-sm font-normal text-second"
        >
          {day}
        </div>
      ))}
    </div>
  );
};

const CustomCalendar: React.FC<CustomCalendarProps> = ({ onDateChange }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDate, _] = useState(new Date().getDate());
  const [isSingleSelect, setIsSingleSelect] = useState(true);
  const { totalPrice, calenderInfoDTOS = [] } = useCalendarInfo();
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러

  const [tripDate, setTripDate] = useState({
    startDate: `${String(selectedYear)}-${String(selectedMonth).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}`,
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

  const formatDate = (date: string) => {
    if (!date) return ""; // date가 비어있으면 빈 문자열 반환

    const [year, month, day] = date.split("-");

    if (!month || !day) return date;

    const formattedMonth = month.padStart(2, "0"); // 두 자릿수로 포맷팅
    const formattedDay = day.padStart(2, "0"); // 두 자릿수로 포맷팅

    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const prevTripDateRef = useRef(tripDate);

  useEffect(() => {
    const formattedStartDate = formatDate(tripDate.startDate);
    const formattedEndDate = formatDate(tripDate.endDate);

    if (
      prevTripDateRef.current.startDate !== formattedStartDate ||
      prevTripDateRef.current.endDate !== formattedEndDate
    ) {
      console.log("onDateChange :", formattedStartDate, formattedEndDate);
      onDateChange(formattedStartDate, formattedEndDate);
      prevTripDateRef.current = {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      };
    }
  }, [tripDate, onDateChange]);
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
            className="rounded-lg bg-main px-3 py-2 text-sm font-bold text-white"
          >
            {isSingleSelect ? "단일선택" : "기간선택"}
          </div>
        </div>
        <div className="flex items-center justify-between px-2 py-3">
          <div className="text-xl font-bold">
            {totalPrice.toLocaleString()} 원
          </div>
          <div onClick={() => moveToPage(PageUrls.ADD_PAY)}>
            <LucidePlus size={24} color="#333" />
          </div>
        </div>
        <DaysOfWeek />
        <CalendarBody
          tripDate={tripDate}
          setTripDate={setTripDate}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          isSingleSelect={isSingleSelect}
          calenderInfoDTOS={calenderInfoDTOS}
        />
      </div>
    </>
  );
};

export default CustomCalendar;
