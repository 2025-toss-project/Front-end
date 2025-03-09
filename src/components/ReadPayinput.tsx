import React, { useEffect, useMemo, useState } from "react";
import InputDefault from "./common/InputDefault";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { usePlaceInfo } from "../stores/placeInfo";
import { useCategoryInfo } from "../stores/CategoryInfo";
import { useLocation } from "react-router-dom";
import useSpendingInfo, { ConsumptionInfo } from "../stores/spendingInfo";
import useAddPayInfo from "../stores/addpayInfo";
import { CategoryProps } from "../constants/category";

interface ReadPayInputProps {
  toggle?: () => void; // 선택시 함수 전달
  isOpen?: boolean; // 오픈 상태 저장
}

const ReadPayInput: React.FC<ReadPayInputProps> = ({ toggle }) => {
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러
  const { spendingRecords } = useSpendingInfo();
  const { addpayInfo, setAddPayInfo } = useAddPayInfo();
  const { selectName, setSelectName } = useCategoryInfo();
  const { selectPlace, setSelectPlace, setPlaceInfo, placeInfo } =
    usePlaceInfo();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  // id로 해당 항목 찾기
  const getConsumptionInfoById = (id: number) => {
    for (const dayData of spendingRecords) {
      const item = dayData.consumptionInfoList.find((info) => info.id === id);
      if (item) {
        console.log("Item :", { ...item, day: dayData.day });
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

  // 해당 페이지에서만 데이터 사용하게 (상태저장 안함 )
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
  // 날짜 포맷팅 함수 (년-월-일 형식)
  const formatDate = (year: number, month: number, day: number): string => {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  // itemData 값이 변경되면 addpayInfo에 기본 값 설정
  useEffect(() => {
    if (itemData) {
      // itemData 값이 있을 때만 초기 값 설정
      setAddPayInfo("price", String(itemData.price));
      setAddPayInfo("detail", itemData.details);
      setAddPayInfo(
        "date",
        formatDate(itemData.year, itemData.month, itemData.day),
      );
      if (!selectName) setSelectName(itemData.category);
      if (!selectPlace) {
        setSelectPlace(itemData.point_name);
        setPlaceInfo(itemData.lat, itemData.lng);
      }
    }
  }, [itemData]);

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
            onChange={(value) => {
              const numericValue = formatPrice(value); // 숫자로 변환
              setAddPayInfo("price", String(numericValue)); // 숫자로 상태 업데이트
            }}
          />

          <InputDefault
            label="장소"
            placeholder="장소를 입력하세요"
            value={selectPlace || itemData.point_name}
            onClick={() => {
              const mode = itemData ? "edit" : "add"; // itemData가 있으면 수정 모드
              moveToPage(`${PageUrls.SEARCH_PLACE}?mode=${mode}&id=${id}`);
            }}
          />

          <InputDefault
            label="내용"
            placeholder="지출내용을 입력하세요"
            value={itemData.details} // itemData의 details에 접근
            onChange={(value) => setAddPayInfo("detail", value)}
          />

          <InputDefault
            label="날짜"
            type="date"
            placeholder="날짜를 입력하세요"
            value={addpayInfo.date}
            onChange={(value) => {
              setAddPayInfo("date", value);
            }}
          />

          <InputDefault
            label="카테고리"
            type="category"
            value={selectName || itemData.category}
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
