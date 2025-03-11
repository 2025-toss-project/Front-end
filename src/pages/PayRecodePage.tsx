import React, { useEffect, useState } from "react";
import CustomCalendar from "../components/CustomCalendar";
import { DropButton } from "../components/common/Buttons";
import PayList from "../components/PayList";
import SelectCategory from "../components/SelectCategory";
import { useCategoryInfo } from "../stores/categoryInfo";
import { api } from "../utils/api";
import useCalendarInfo, { calenderInfoDTOS } from "../stores/CalendarInfo";
import { useMovePage } from "../hooks/useMovePage";
import { formatDateToYMD } from "../utils/formatFunc";

const PayRecodePage = () => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const [activeStartDate, setActiveDate] = useState(new Date()); // 캘린더 선택 날짜
  const [validDates, setValidDates] = useState<string[]>([]); // 유효한 날짜
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { selectCategory, isOpen, setIsOpen } = useCategoryInfo();
  const { totalPrice, setDayData } = useCalendarInfo();

  const handleDateChange = (startDate: string, endDate: string) => {};

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setLoading(true);
        const formatActive = formatDateToYMD(activeStartDate);
        const params = {
          currentDate: formatActive,
        };
        const res = await api.get("consumption/calender", { params });
        console.log(res.data);

        // 데이터 저장
        setDayData({
          totalPrice: res.data.result.totalPrice,
          calenderInfoDTOS: res.data.result.calenderInfoDTOS,
        });

        // validDates 배열 업데이트
        const validDays = res.data.result.calenderInfoDTOS
          .filter((item: calenderInfoDTOS) => item.datePrice > 0)
          .map(
            (item: calenderInfoDTOS) =>
              `${item.year}-${String(item.month).padStart(2, "0")}-${String(item.day).padStart(2, "0")}`,
          );

        setValidDates(validDays); // 상태 저장
        console.log("Valid Dates:", validDays);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [activeStartDate]);

  return (
    <div className="flex w-full flex-col gap-2">
      <CustomCalendar onDateChange={handleDateChange} />
      <div className="mt-5 flex w-full flex-col rounded-lg bg-white">
        {/* 드롭 클릭시 아래로 나오기  */}
        <DropButton
          title={selectCategory || "전체 항목"}
          toggle={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
        <SelectCategory classname={isOpen ? "block" : "hidden"} />
        <PayList
          startDate={startDate}
          endDate={endDate}
          validDates={validDates}
          activeStartDate={activeStartDate}
        />
      </div>
    </div>
  );
};

export default PayRecodePage;
