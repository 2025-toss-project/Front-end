import React, { useEffect, useState } from "react";
import CustomCalendar from "../components/CustomCalendar";
import { DropButton } from "../components/common/Buttons";
import PayList from "../components/PayList";
import SelectCategory from "../components/SelectCategory";
import { useCategoryInfo } from "../stores/categoryInfo";
import { api } from "../utils/api";
import useCalendarInfo, { calenderInfoDTOS } from "../stores/CalendarInfo";

const PayRecodePage = () => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const [validDates, setValidDates] = useState<string[]>([]); // 소비 데이터가 있는 날짜 저장
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { selectCategory, isOpen, setIsOpen } = useCategoryInfo();
  const { activeDate, setDayData } = useCalendarInfo();

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

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setLoading(true);
        const formatActive = activeDate || "";
        const params = {
          currentDate: formatActive,
        };
        const res = await api.get("consumption/calender", { params });
        console.log(res.data);

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

        setValidDates(validDays); // 상태 저장
        console.log("Valid Dates:", validDays);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [activeDate]);

  return (
    <div className="flex w-full flex-col gap-2">
      <CustomCalendar onDateChange={handleDateChange} />
      <div className="mt-5 flex w-full flex-col rounded-lg bg-white">
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
        />
      </div>
    </div>
  );
};

export default PayRecodePage;
