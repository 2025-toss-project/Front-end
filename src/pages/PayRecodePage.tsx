import React, { useEffect, useState } from "react";
import CustomCalendar from "../components/CustomCalendar";
import { DropButton } from "../components/common/Buttons";
import PayList from "../components/PayList";
import SelectCategory from "../components/SelectCategory";
import { useCategoryInfo } from "../stores/CategoryInfo";
import { api } from "../utils/api";
import useCalendarInfo, { calenderInfoDTOS } from "../stores/CalendarInfo";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";

const PayRecodePage = () => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const [activeStartDate, setActiveDate] = useState(new Date()); // 캘린더 선택 날짜
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { selectName, isOpen, setIsOpen } = useCategoryInfo();
  const { totalPrice, setDayData } = useCalendarInfo();
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 해줌
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (startDate: string, endDate: string) => {
    if (startDate) {
      setStartDate(startDate);
    }
    if (endDate) {
      setEndDate(endDate);
    }
    // 범위 선택일경우
    if (startDate && endDate) {
      setActiveDate(new Date(endDate));
    } else if (startDate) {
      setActiveDate(new Date(startDate));
    }
  };

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setLoading(true);
        const formatActive = formatDate(activeStartDate);

        const res = await api.get(
          `consumption/calender?&currentDate=${formatActive}`,
        );

        console.log(res.data);

        // 데이터 저장
        setDayData({
          totalPrice: res.data.result.totalPrice,
          calenderInfoDTOS: res.data.result.calenderInfoDTOS,
        });
        console.log(totalPrice);
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
          title={selectName || "전체 항목"}
          toggle={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
        <SelectCategory classname={isOpen ? "block" : "hidden"} />
        <PayList startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
};

export default PayRecodePage;
