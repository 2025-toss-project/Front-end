import React, { useEffect, useState } from "react";
import { spendingData } from "../spendingData";
import { categoryList } from "../constants/category";
import { api } from "../utils/api";
import { useCategoryInfo } from "../stores/CategoryInfo";
import usePayListInfo from "../stores/payListInfo";

// 아이콘 가져오기 ( {<IconFood/>} 이런식으로 반환됨)
const getIcon = (categoryText: string) => {
  return categoryList.find((category) => category.text === categoryText);
};

// 날짜 포맷팅
const formatDateWithWeekday = (year: string, month: string, day: string) => {
  const date = new Date(Number(year), Number(month) - 1, Number(day)); // 월은 0부터 시작
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return `${day}일 ${weekdays[date.getDay()]}요일`;
};

// 하루치 소비 리스트
const PayDay: React.FC<{ data: any }> = ({ data }) => {
  const categoryIcon = getIcon(data.category);
  return (
    <div className="flex w-full flex-col">
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
const PayList = () => {
  const [spendingRecords, setSpendingRecords] = useState<any[]>([]); // 데이터를 저장할 상태
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const [error, setError] = useState<string>(""); // 에러 상태 관리

  return (
    <div className="flex w-full flex-col px-6">
      {spendingData.records.map((dayData, index) => (
        <div key={dayData.day} className="mb-5">
          {/* 날짜 및 하루 총액 표시 */}
          <div className="flex flex-row justify-between py-5">
            <p className="text-sm text-second">
              {formatDateWithWeekday(dayData.year, dayData.month, dayData.day)}
            </p>
            <p className="text-base font-medium text-second-dark">
              {dayData.dailyTotal.toLocaleString()}원
            </p>
          </div>

          {/* 해당 날짜의 지출 목록 */}
          {dayData.details.map((item) => (
            <PayDay key={item.id} data={item} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PayList;
