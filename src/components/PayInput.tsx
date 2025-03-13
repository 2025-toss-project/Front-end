import React, { useDeferredValue, useEffect, useState } from "react";
import InputDefault from "./common/InputDefault";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { useCategoryInfo } from "../stores/categoryInfo";
import { useLocation } from "react-router-dom";
import useAddPayInfo from "../stores/addpayInfo";
import { InputformatPrice, inputFormatPriceCheck } from "../utils/formatFunc";
import useLocationInfo from "../stores/locationInfo";
import { isElement } from "lodash";

interface payInfo {
  id: number;
  category: string;
  details: string;
  locationName: string;
  lat: number;
  lng: number;
  date: string;
  price: number;
}

interface PayInputProps {
  toggle?: () => void;
  isOpen?: boolean;
  itemData?: payInfo;
}

const PayInput: React.FC<PayInputProps> = ({ toggle, itemData }) => {
  const { moveToPage } = useMovePage();
  const { addpayInfo, setAddPayInfo, resetAddPayInfo } = useAddPayInfo();
  const { selectCategory, setSelectCategory } = useCategoryInfo();
  const { locationName, lat, lng } = useLocationInfo();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const isEditMode = Boolean(id); // 수정 모드 여부 판단

  useEffect(() => {
    if (itemData) {
      console.log("addpay", addpayInfo);
      console.log("itemData", itemData);
      console.log("locationName", locationName);
      // 부모에서 전달받은 데이터로 상태 초기화
      setAddPayInfo("price", String(itemData.price));
      setAddPayInfo("detail", itemData.details);
      setAddPayInfo("date", itemData.date);
      setAddPayInfo("lat", String(lat) || String(itemData.lat));
      setAddPayInfo("lng", String(lng) || String(itemData.lng));
      setAddPayInfo("locationName", locationName || itemData.locationName);
      setSelectCategory(itemData.category || "");
    }
  }, [itemData, locationName, lat, lng]);

  return (
    <div>
      <form className="flex flex-col gap-2 pt-3">
        <InputDefault
          label="금액"
          type="price"
          value={
            isEditMode
              ? inputFormatPriceCheck(itemData?.price || "")
              : inputFormatPriceCheck(addpayInfo.price) || ""
          }
          placeholder="금액을 입력하세요"
          onChange={(value) =>
            setAddPayInfo("price", String(InputformatPrice(value)))
          }
        />

        <InputDefault
          label="장소"
          placeholder="장소를 입력하세요"
          value={
            isEditMode
              ? itemData?.locationName || ""
              : addpayInfo.locationName || ""
          }
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
          value={isEditMode ? itemData?.date || "" : addpayInfo.date || ""}
          onChange={(value) => setAddPayInfo("date", value)}
        />

        <InputDefault
          label="카테고리"
          type="category"
          value={isEditMode ? itemData?.category : selectCategory || ""}
          placeholder="미선택"
          isReadOnly={true}
          onClick={toggle}
        />
      </form>
    </div>
  );
};

export default PayInput;
