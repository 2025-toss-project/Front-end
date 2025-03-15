import React, { useEffect, useState } from "react";
import { categoryList } from "../constants/category";
import useSpendingInfo, { ConsumptionInfoByDate } from "../stores/spendingInfo";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { api } from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { activeMonth, formatDateWithWeekday } from "../utils/formatFunc";
import useCalendarInfo from "../stores/CalendarInfo";
import useAddPayInfo from "../stores/addpayInfo";
import Loading from "./loading";
import { useCategoryInfo } from "../stores/categoryInfo";

interface PayDayProps {
  data: any; // 필요한 타입으로 수정
  onClick: () => void; // onClick 핸들러
}

// 아이콘 가져오기 ( {<IconFood/>} 이런식으로 반환됨)
const getIcon = (categoryText: string) => {
  return categoryList.find((category) => category.text === categoryText);
};

// 하루치 소비 리스트
const PayDay: React.FC<PayDayProps> = ({ data, onClick }) => {
  const categoryIcon = getIcon(data.category);
  return (
    <div onClick={onClick} className="flex w-full flex-col">
      <div className="flex flex-row items-center">
        {/* 카테고리 아이콘 */}
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-second-lighter">
          {categoryIcon?.icon({ size: 24 })}
        </div>
        {/* 지출 내용 */}
        <div className="flex max-w-44 flex-grow flex-col gap-1 p-3">
          <p className="text-sm"> {data.details} </p>
          <p className="text-xs text-second"> {data.locationName} </p>
        </div>
        {/* 지출 금액 */}
        <p className="ml-auto text-right text-base font-medium text-main">
          {data.price.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

interface PayListProps {
  startDate: string;
  endDate: string;
  validDates: string[];
}

// 전체 소비리스트
const PayList: React.FC<PayListProps> = ({
  startDate,
  endDate,
  validDates,
}) => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const [filteredRecords, setFilteredRecords] = useState<
    ConsumptionInfoByDate[]
  >([]);
  const { moveToPage } = useMovePage();
  const { setSpendingData, resetSpendingData } = useSpendingInfo();
  const { addpayInfo } = useAddPayInfo();
  const { activeDate } = useCalendarInfo();
  const { selectCategory, setSelectCategory } = useCategoryInfo();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const refresh = searchParams.get("refresh");

  // 소비 기록 클릭 시 상세 페이지로 이동
  const clickDetails = (id: number) => {
    // 페이지 이동 시 id를 URL 쿼리로 전달
    moveToPage(`${PageUrls.PAY_DETAIL}?id=${id}`);
  };

  useEffect(() => {
    // 새로고침시 파라미터 제거
    if (refresh) {
      searchParams.delete("refresh");
      navigate(`${location.pathname}?${searchParams.toString()}`, {
        replace: true,
      });
    }
  }, [refresh, navigate, location]);

  // activeDate 변경 시 카테고리 선택 초기화
  useEffect(() => {
    setSelectCategory("");
  }, [activeDate]);

  useEffect(() => {
    const ReadConsumption = async () => {
      try {
        setLoading(true);

        let effectiveStartDate = startDate || refresh;
        let effectiveEndDate = endDate || refresh;

        if (!effectiveStartDate || !effectiveEndDate) {
          const { startOfMonth, endOfMonth } = activeMonth(
            new Date(activeDate),
          );
          effectiveStartDate = startOfMonth;
          effectiveEndDate = endOfMonth;
        }

        if (!activeDate) {
          console.warn("activeDate가 없어서 API 호출을 중단합니다.");
          setLoading(false);
          return;
        }

        if (!effectiveStartDate || !effectiveEndDate) {
          console.warn("start, end, refresh 모두 없음 → 해당 월 전체 조회");
          setLoading(false);
          const { startOfMonth, endOfMonth } = activeMonth(
            new Date(activeDate),
          );
          effectiveStartDate = startOfMonth;
          effectiveEndDate = endOfMonth;
        }

        const params = {
          category: selectCategory || "",
          startDate: effectiveStartDate,
          endDate: effectiveEndDate,
        };
        const res = await api.get("consumption", { params });

        setSpendingData(res.data.result);
        const data = res.data.result.consumptionInfoByDateDTOS;

        const filtered = data
          .map((record: ConsumptionInfoByDate) => ({
            ...record,
            consumptionInfoList:
              selectCategory === "" // 선택된 카테고리가 없으면 필터링 없이 전체 유지
                ? record.consumptionInfoList
                : record.consumptionInfoList.filter(
                    (item) => item.category === selectCategory,
                  ),
          }))
          .filter(
            (record: ConsumptionInfoByDate) =>
              record.consumptionInfoList.length > 0,
          );

        setFilteredRecords(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    ReadConsumption();
  }, [startDate, endDate, refresh, selectCategory, activeDate, validDates]);

  return (
    <div className="flex w-full flex-col">
      {filteredRecords.length > 0 ? (
        filteredRecords.map((dayData) => (
          <div key={dayData.day} className="mb-5">
            <div className="flex flex-row justify-between py-5">
              <p className="text-sm text-second">
                {formatDateWithWeekday(
                  dayData.year,
                  dayData.month,
                  dayData.day,
                )}
              </p>
              <p className="text-base font-medium text-second-dark">
                {dayData.datePrice.toLocaleString()}원
              </p>
            </div>

            {dayData.consumptionInfoList.map((item) => (
              <PayDay
                key={item.id}
                data={item}
                onClick={() => clickDetails(item.id)}
              />
            ))}
          </div>
        ))
      ) : (
        <p className="py-4 text-center text-gray-500">소비 기록이 없습니다.</p>
      )}
    </div>
  );
};

export default PayList;
