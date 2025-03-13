import React, { useCallback, useEffect, useRef, useState } from "react";
import CustomCalendar from "../components/CustomCalendar";
import { DropButton } from "../components/common/Buttons";
import PayList from "../components/PayList";
import SelectCategory from "../components/SelectCategory";
import { api } from "../utils/api";
import useCalendarInfo, { calenderInfoDTOS } from "../stores/CalendarInfo";

const PayRecodePage = () => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const [validDates, setValidDates] = useState<string[]>([]); // 소비 데이터가 있는 날짜 저장
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { activeDate, setDayData } = useCalendarInfo();
  const [category, setCategory] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 캘린더 변경(구간 변경)
  const handleDateChange = (startDate: string, endDate: string) => {
    if (startDate) {
      setStartDate(startDate);
    }
    if (endDate) {
      setEndDate(endDate);
    }
    // 범위 선택일경우
    if (startDate && endDate) {
      setStartDate(startDate);
      setEndDate(endDate);
    }
  };

  // 이전 activeDate 값을 저장하여 중복 요청 방지
  const prevActiveDate = useRef<string | null>(null);

  // API 호출 함수 최적화
  const fetchCalendar = useCallback(async () => {
    if (prevActiveDate.current === activeDate) return; // 동일한 값이면 API 호출 안함

    try {
      setLoading(true);
      if (!activeDate) {
        console.warn("activeDate 없으므로 호출 중단");
        return;
      } // activeDate 없으면 호출 중단

      prevActiveDate.current = activeDate; // 현재 activeDate를 저장
      const params = { currentDate: activeDate || "" };
      const res = await api.get("consumption/calender", { params });

      setDayData({
        totalPrice: res.data.result.totalPrice,
        calenderInfoDTOS: res.data.result.calenderInfoDTOS,
      });

      // 소비 있는 날짜 저장
      const validDays = res.data.result.calenderInfoDTOS
        .filter((item: calenderInfoDTOS) => item.datePrice > 0)
        .map(
          (item: calenderInfoDTOS) =>
            `${item.year}-${String(item.month).padStart(2, "0")}-${String(item.day).padStart(2, "0")}`,
        );

      setValidDates(validDays);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      //setSelectCategory("");
    }
  }, [activeDate, setDayData]); // useCallback으로 불필요한 재생성 방지

  // `activeDate` 변경될 때 API 호출
  useEffect(() => {
    fetchCalendar();
  }, [fetchCalendar]);

  // 카테고리 선택 처리
  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    //setAddPayInfo("category", selectedCategory);
    setIsOpen(false); // 선택 후 닫기
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <CustomCalendar onDateChange={handleDateChange} />
      <div className="mt-5 flex w-full flex-col rounded-lg bg-white">
        <DropButton
          title={category || "전체 항목"}
          toggle={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
        {isOpen && (
          <SelectCategory
            style={isOpen ? "block" : "hidden"}
            closeCategory={() => setIsOpen(false)}
            onSelectCategory={handleCategorySelect}
          />
        )}
        <PayList
          startDate={startDate}
          endDate={endDate}
          validDates={validDates}
          category={category}
        />
      </div>
    </div>
  );
};

export default PayRecodePage;
