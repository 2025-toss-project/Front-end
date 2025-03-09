import React, { useEffect, useState } from "react";
import { categoryList } from "../constants/category";
import useSpendingInfo from "../stores/spendingInfo";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { useCategoryInfo } from "../stores/CategoryInfo";
import { api } from "../utils/api";
import { useLocation } from "react-router-dom";

interface PayDayProps {
  data: any; // 필요한 타입으로 수정
  onClick: () => void; // onClick 핸들러
}

interface PayListProps {
  startDate: string;
  endDate: string;
  validDates: string[];
}

// 아이콘 가져오기 ( {<IconFood/>} 이런식으로 반환됨)
const getIcon = (categoryText: string) => {
  return categoryList.find((category) => category.text === categoryText);
};

// 날짜 포맷팅 (년도 추가 필요)
const formatDateWithWeekday = (month: number, day: number) => {
  const date = new Date(Number(2025), Number(month) - 1, Number(day)); // 월은 0부터 시작
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return `${day}일 ${weekdays[date.getDay()]}요일`;
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
          <p className="text-xs text-second"> {data.point_name} </p>
        </div>
        {/* 지출 금액 */}
        <p className="ml-auto text-right text-base font-medium text-main">
          {data.price.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

// 전체 소비리스트
const PayList: React.FC<PayListProps> = ({
  startDate,
  endDate,
  validDates,
}) => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const { moveToPage } = useMovePage();
  const { spendingRecords, setSpendingData } = useSpendingInfo();
  const { selectName } = useCategoryInfo();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const refresh = searchParams.get("refresh");

  // 소비 기록 클릭 시 상세 페이지로 이동
  const clickDetails = (id: number) => {
    console.log(id);
    // 페이지 이동 시 id를 URL 쿼리로 전달
    moveToPage(`${PageUrls.PAY_DETAIL}?id=${id}`);
  };

  useEffect(() => {
    const ReadConsumption = async () => {
      try {
        setLoading(true);
        // const hasValidDate = validDates.some(
        //   (date) => date >= startDate && date <= endDate,
        // );
        // if (!hasValidDate) {
        //   console.warn("소비 기록이 없는 기간이므로 API 호출을 하지 않습니다.");
        //   return; // API 호출 중단
        //

        if (!startDate || !endDate) {
          if (refresh) {
            console.warn("refresh 값 변경으로 실행", refresh);
          } else {
            console.warn("캘린더에서 날짜가 선택되지 않음 → API 호출 중단");
            return;
          }
        }

        // refresh 값이 있으면 날짜로 startDate와 endDate 설정
        const effectiveStartDate = startDate || refresh;
        const effectiveEndDate = endDate || refresh;

        if (!effectiveStartDate || !effectiveEndDate) {
          console.warn("유효한 날짜가 없으므로 API 호출을 중단합니다.");
          return;
        }
        const res = await api.get(
          `consumption?category="식비"&startDate=${effectiveStartDate}&endDate=${effectiveEndDate}`,
        );

        console.log(res.data);
        // 받아온 데이터 store 저장
        setSpendingData(res.data.result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    //ReadConsumption();
  }, [startDate, endDate, refresh]);

  return (
    <div className="flex w-full flex-col px-6">
      {spendingRecords.length > 0 ? (
        spendingRecords.map((dayData) => (
          <div key={dayData.day} className="mb-5">
            {/* 날짜 및 하루 총액 표시 */}
            <div className="flex flex-row justify-between py-5">
              <p className="text-sm text-second">
                {formatDateWithWeekday(dayData.month, dayData.day)}
              </p>
              <p className="text-base font-medium text-second-dark">
                {dayData.datePrice.toLocaleString()}원
              </p>
            </div>

            {/* 해당 날짜의 지출 목록 */}
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
        <p className="p-2 text-center text-gray-500">소비 기록이 없습니다.</p>
      )}
    </div>
  );
};

export default PayList;
