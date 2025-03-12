import React, { useEffect, useState } from "react";
import { categoryList } from "../constants/category";
import useSpendingInfo, { ConsumptionInfoByDate } from "../stores/spendingInfo";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { useCategoryInfo } from "../stores/categoryInfo";
import { api } from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import { activeMonth, formatDateWithWeekday } from "../utils/formatFunc";
import useCalendarInfo from "../stores/CalendarInfo";

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
    <div onClick={onClick} className="flex flex-col w-full">
      <div className="flex flex-row items-center">
        {/* 카테고리 아이콘 */}
        <div className="flex items-center justify-center flex-none w-10 h-10 rounded-full bg-second-lighter">
          {categoryIcon?.icon({ size: 24 })}
        </div>
        {/* 지출 내용 */}
        <div className="flex flex-col flex-grow gap-1 p-3 max-w-44">
          <p className="text-sm"> {data.details} </p>
          <p className="text-xs text-second"> {data.locationName} </p>
        </div>
        {/* 지출 금액 */}
        <p className="ml-auto text-base font-medium text-right text-main">
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
  const { selectCategory, setSelectCategory } = useCategoryInfo();
  const { activeDate } = useCalendarInfo();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const refresh = searchParams.get("refresh");

  // 소비 기록 클릭 시 상세 페이지로 이동
  const clickDetails = (id: number) => {
    console.log(id);
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

  useEffect(() => {
    const ReadConsumption = async () => {
      try {
        setLoading(true);

        let effectiveStartDate = startDate || refresh;
        let effectiveEndDate = endDate || refresh;

        if (!activeDate) {
          console.warn("activeDate가 없어서 API 호출을 중단합니다.");
          return;
        }

        if (!effectiveStartDate || !effectiveEndDate) {
          console.warn("start, end, refresh 모두 없음 → 해당 월 전체 조회");
          const { startOfMonth, endOfMonth } = activeMonth(
            new Date(activeDate),
          );
          effectiveStartDate = startOfMonth;
          effectiveEndDate = endOfMonth;
        }

        // 단일 선택 날짜일 때, 기록이 없으면 API 호출 중단
        if (!refresh) {
          if (effectiveStartDate === effectiveEndDate) {
            if (!validDates.includes(effectiveStartDate)) {
              console.warn("소비 기록이 없는 날짜 → API 호출 중단");
              return;
            }
          }
        }

        if (
          !refresh &&
          effectiveStartDate === effectiveEndDate &&
          !validDates.includes(effectiveStartDate)
        ) {
          console.warn("소비 기록이 없는 날짜 → API 호출 중단");
          return;
        }

        const params = {
          category: selectCategory,
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
        setSelectCategory("");
      }
    };
    ReadConsumption();
  }, [startDate, endDate, refresh, selectCategory, activeDate]);

  return (
    <div className="flex flex-col w-full">
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
