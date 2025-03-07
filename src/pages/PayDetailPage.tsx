import React, { useState } from "react";

import SelectCategory from "../components/SelectCategory";
import { SaveButton } from "../components/common/Buttons";
import { useCategoryInfo } from "../stores/CategoryInfo";
import ReadPayInput from "../components/ReadPayinput";
import useAddPayInfo from "../stores/addpayInfo";
import { api } from "../utils/api";
import { usePlaceInfo } from "../stores/placeInfo";
import { useLocation } from "react-router-dom";

const PayDetailPage = () => {
  const { isOpen, setIsOpen } = useCategoryInfo();
  const { addpayInfo, resetAddPayInfo } = useAddPayInfo();
  const { selectName } = useCategoryInfo();
  const { selectPlace, placeInfo } = usePlaceInfo();
  const [receivedId, setReceivedId] = useState<string | null>(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const isAddpayInfoComplete = Object.values(addpayInfo).every((value) => {
    if (typeof value === "object" && value !== null) {
      // 내부 객체가 있을 경우, 그 값들에 대해서 다시 검사
      return Object.values(value).every(
        (nestedValue) => nestedValue !== 0 && nestedValue !== "",
      );
    }
    // 빈 문자열도 유효하지 않게 체크
    return value !== "" && value !== 0;
  });

  const handleClickUpdate = async () => {
    console.log(addpayInfo);
    if (!isAddpayInfoComplete) return alert("모든 정보를 입력해주세요.");

    try {
      const res = await api.post("/consumption/update", {
        id: id,
        price: Number(addpayInfo.price),
        detail: addpayInfo.detail,
        category: selectName,
        lat: Number(placeInfo.lat),
        lng: Number(placeInfo.lng),
        locationName: selectPlace,
        date: addpayInfo.date,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      resetAddPayInfo();
    }
  };

  return (
    <div className="flex w-full flex-col">
      <ReadPayInput toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <SelectCategory classname={isOpen ? "block" : "hidden"} />
      <SaveButton title="수정하기" onClick={handleClickUpdate} />
    </div>
  );
};

export default PayDetailPage;
