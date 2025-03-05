import React, { useState } from "react";

import AddPayInput from "../components/AddPayInput";
import SelectCategory from "../components/SelectCategory";
import { SaveButton } from "../components/common/Buttons";
import { api } from "../utils/api";
import useAddPayInfo from "../stores/addpayInfo";
import { useCategoryInfo } from "../stores/CategoryInfo";
import { usePlaceInfo } from "../stores/placeInfo";

export interface addpayInfo {
  price: string;
  detail: string;
  category: string;
  place: {
    lat: number;
    lng: number;
  };
  locationName: string;
  date: string;
}

const AddPayPage = () => {
  const { addpayInfo, setAddPayInfo, resetAddPayInfo } = useAddPayInfo();
  const { selectName, setSelectName, isOpen, setIsOpen } = useCategoryInfo();
  const { placeInfo } = usePlaceInfo();

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

  const handleClickSubmit = async () => {
    if (!isAddpayInfoComplete) return alert("모든 정보를 입력해주세요.");

    try {
      const res = await api.post("/consumption/create", {
        price: addpayInfo.price,
        detail: addpayInfo.detail,
        category: addpayInfo.category,
        lat: placeInfo.lat,
        lng: placeInfo.lng,
        locationName: addpayInfo.locationName,
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
      <AddPayInput
        toggle={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        selectName={selectName}
      />
      <SelectCategory classname={isOpen ? "block" : "hidden"} />
      <SaveButton title="저장하기" onClick={handleClickSubmit} />
    </div>
  );
};

export default AddPayPage;
