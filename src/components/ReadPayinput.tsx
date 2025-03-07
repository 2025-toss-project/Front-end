import React, { useEffect, useMemo, useState } from "react";
import InputDefault from "./common/InputDefault";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { usePlaceInfo } from "../stores/placeInfo";
import { useCategoryInfo } from "../stores/CategoryInfo";
import { useLocation } from "react-router-dom";
import useSpendingInfo, { ConsumptionInfo } from "../stores/spendingInfo";

interface ReadPayInputProps {
  toggle?: () => void; // 선택시 함수 전달
  isOpen?: boolean; // 오픈 상태 저장
}

const ReadPayInput: React.FC<ReadPayInputProps> = ({ toggle }) => {
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러
  const { selectPlace } = usePlaceInfo();
  const { spendingRecords } = useSpendingInfo();
  const { selectName } = useCategoryInfo();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  // id로 해당 항목 찾기
  const getConsumptionInfoById = (id: number) => {
    for (const dayData of spendingRecords) {
      const item = dayData.consumptionInfoList.find((info) => info.id === id);
      if (item) {
        return {
          ...item,
          day: dayData.day,
          month: dayData.month,
          year: dayData.year,
        };
      }
    }
    return null; // id에 해당하는 항목이 없을 경우 null 반환
  };

  // 해당 페이지에서만 데이터 사용하게 (상태저장 안함)
  const itemData = useMemo(() => {
    if (id) {
      return getConsumptionInfoById(Number(id));
    }
    return null;
  }, [id, spendingRecords]); // id나 spendingRecords가 변경될 때만 재계산

  // string -> number (가격 포맷팅)
  const formatPrice = (value: string): number => {
    const numericValue = parseInt(value.replace(/,/g, ""), 10);
    return isNaN(numericValue) ? 0 : numericValue;
  };

  return (
    <div>
      {/* 조건부 렌더링 item 있을 때만 */}
      {itemData && (
        <form className="flex flex-col gap-2 pt-3">
          <InputDefault
            label="금액"
            type="price"
            value={String(itemData.price)} // itemData의 price에 접근
            placeholder="금액을 입력하세요"
          />

          <InputDefault
            label="장소"
            placeholder="장소를 입력하세요"
            value={itemData.point_name}
            onClick={() => moveToPage(PageUrls.ADD_PAY_SEARCH_PLACE)}
          />

          <InputDefault
            label="내용"
            placeholder="지출내용을 입력하세요"
            value={itemData.details} // itemData의 details에 접근
          />

          <InputDefault
            label="날짜"
            type="date"
            placeholder="날짜를 입력하세요"
            value={`${itemData.year}-${String(itemData.month).padStart(2, "0")}-${String(itemData.day).padStart(2, "0")}`} // 날짜 포맷팅
          />

          <InputDefault
            label="카테고리"
            type="category"
            value={itemData.category}
            placeholder="미선택"
            isReadOnly={true}
            onClick={toggle}
          />
        </form>
      )}
    </div>
  );
};

export default ReadPayInput;
