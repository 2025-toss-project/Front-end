import React, { useEffect, useState } from "react";
import CustomCalendar from "../components/CustomCalendar";
import { DropButton } from "../components/common/Buttons";
import PayList from "../components/PayList";
import SelectCategory from "../components/SelectCategory";
import { useCategoryInfo } from "../stores/CategoryInfo";
import { api } from "../utils/api";
import useCalendarInfo, { ConsumptionInfoByDate } from "../stores/CalendarInfo";

const PayRecodePage = () => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const [activeStartDate, setActiveDate] = useState(new Date()); // 캘린더 선택 날짜
  const [validDates, setValidDates] = useState<string[]>([]); // API 호출 가능한 날짜 리스트
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { selectName, isOpen, setIsOpen } = useCategoryInfo();
  const { totalPrice, setDayData } = useCalendarInfo();

  // 보고 있는 달력 상태 관리
  const handleActiveDateChange = (date: Date) => {
    setActiveDate(date); // 자식에서 받은 값으로 부모 상태 업데이트
  };

  // 캘린더 선택 날짜 상태 관리
  const handleSelectDateChange = (startDate: string, endDate: string) => {
    setStartDate(startDate);
    setEndDate(endDate);
    console.log("캘린더 날짜 선택:", startDate, endDate);
  };

  // 보고 있는 달력 전체 날짜 구하기
  const getStartAndEndDateOfMonth = (activeStartDate: Date) => {
    const startDate = new Date(activeStartDate);
    startDate.setDate(1); // 해당 월의 1일로 설정

    const endDate = new Date(activeStartDate);
    endDate.setMonth(endDate.getMonth() + 1); // 다음 달로 이동
    endDate.setDate(0); // 그 달의 마지막 날로 설정

    return {
      startDate: startDate.toISOString().split("T")[0], // 'YYYY-MM-DD' 형식
      endDate: endDate.toISOString().split("T")[0], // 'YYYY-MM-DD' 형식
    };
  };

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setLoading(true);
        const { startDate, endDate } =
          getStartAndEndDateOfMonth(activeStartDate);

        const res = await api.get(
          `consumption/calendar?currentDate=${activeStartDate}`,
        );

        console.log(res.data);

        // Zustand에 데이터 저장
        setDayData({
          totalPrice: res.data.totalPrice,
          consumptionInfoByDateDTOS: res.data.consumptionInfoByDateDTOS,
        });

        // datePrice가 0보다 큰 날짜만 필터링
        const validDays = res.data.consumptionInfoByDateDTOS
          .filter((day: ConsumptionInfoByDate) => day.datePrice > 0)
          .map(
            (day: ConsumptionInfoByDate) =>
              `${day.year}-${String(day.month).padStart(2, "0")}-${String(day.day).padStart(2, "0")}`,
          );

        setValidDates(validDays); // 상태 저장
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    //fetchCalendar();
  }, [activeStartDate, selectName]); // 카테고리 변경 시에도 API 호출

  return (
    <div className="flex w-full flex-col">
      <CustomCalendar
        activeStartDate={activeStartDate}
        onActiveStartDateChange={handleActiveDateChange}
        onSelectDateChange={handleSelectDateChange}
      />
      <div className="mt-5 flex w-full flex-col rounded-lg bg-white">
        {/* 드롭 클릭시 아래로 나오기  */}
        <DropButton
          title={selectName || "전체 항목"}
          toggle={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
        <SelectCategory classname={isOpen ? "block" : "hidden"} />
        <PayList
          startDate={startDate}
          endDate={endDate}
          validDates={validDates}
        />
      </div>
    </div>
  );
};

export default PayRecodePage;
