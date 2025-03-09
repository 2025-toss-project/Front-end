import React, { useEffect, useMemo } from "react";
import InputDefault from "./common/InputDefault";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { usePlaceInfo } from "../stores/placeInfo";
import { useCategoryInfo } from "../stores/CategoryInfo";
import { useLocation } from "react-router-dom";
import useSpendingInfo from "../stores/spendingInfo";
import useAddPayInfo from "../stores/addpayInfo";

interface PayInputProps {
  toggle?: () => void;
  isOpen?: boolean;
}

const PayInput: React.FC<PayInputProps> = ({ toggle }) => {
  const { moveToPage } = useMovePage();
  const { spendingRecords } = useSpendingInfo();
  const { addpayInfo, setAddPayInfo } = useAddPayInfo();
  const { selectName, setSelectName } = useCategoryInfo();
  const { selectPlace, setSelectPlace, setPlaceInfo } = usePlaceInfo();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const isEditMode = Boolean(id); // 수정 모드 여부 판단

  // 해당 ID에 대한 소비 기록 가져오기
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
    return null;
  };

  // useMemo를 사용하여 itemData 저장 (id 또는 spendingRecords 변경 시 재계산)
  const itemData = useMemo(
    () => (isEditMode ? getConsumptionInfoById(Number(id)) : null),
    [id, spendingRecords],
  );

  // string -> number 변환 함수
  const formatPrice = (value: string): number => {
    const numericValue = parseInt(value.replace(/,/g, ""), 10);
    return isNaN(numericValue) ? 0 : numericValue;
  };

  // 날짜 포맷팅 함수 (YYYY-MM-DD)
  const formatDate = (year: number, month: number, day: number): string => {
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  // itemData가 변경될 때 초기 값 설정 (읽기 모드)
  useEffect(() => {
    if (itemData) {
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
      <form className="flex flex-col gap-2 pt-3">
        <InputDefault
          label="금액"
          type="price"
          value={
            isEditMode
              ? String(itemData?.price || "")
              : String(addpayInfo.price) || ""
          }
          placeholder="금액을 입력하세요"
          onChange={(value) =>
            setAddPayInfo("price", String(formatPrice(value)))
          }
        />

        <InputDefault
          label="장소"
          placeholder="장소를 입력하세요"
          value={isEditMode ? itemData?.point_name || "" : selectPlace || ""}
          isReadOnly={true}
          onClick={() =>
            moveToPage(
              `${PageUrls.SEARCH_PLACE}?mode=${isEditMode ? "edit" : "add"}&id=${id || ""}`,
            )
          }
        />

        <InputDefault
          label="내용"
          placeholder="지출내용을 입력하세요"
          value={isEditMode ? itemData?.details || "" : addpayInfo.detail || ""}
          onChange={(value) => setAddPayInfo("detail", value)}
        />

        <InputDefault
          label="날짜"
          type="date"
          placeholder="날짜를 입력하세요"
          value={
            isEditMode
              ? formatDate(itemData?.year!, itemData?.month!, itemData?.day!)
              : addpayInfo.date || ""
          }
          onChange={(value) => setAddPayInfo("date", value)}
        />

        <InputDefault
          label="카테고리"
          type="category"
          value={isEditMode ? itemData?.category || "" : selectName || ""}
          placeholder="미선택"
          isReadOnly={true}
          onClick={toggle}
        />
      </form>
    </div>
  );
};

export default PayInput;
