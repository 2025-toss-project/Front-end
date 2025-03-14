import React, { useEffect, useState } from "react";

import SelectCategory from "../components/SelectCategory";
import { SaveButton } from "../components/common/Buttons";
import { api } from "../utils/api";
import useAddPayInfo from "../stores/addpayInfo";
import { useCategoryInfo } from "../stores/categoryInfo";
import PageUrls from "../constants/PageUrls";
import { useMovePage } from "../hooks/useMovePage";
import PayInput from "../components/PayInput";
import { add } from "lodash";

export interface addpayInfo {
  price: number;
  detail: string;
  date: string;
  locationName: string;
  lat: number;
  lng: number;
}

const AddPayPage = () => {
  const { addpayInfo, setAddPayInfo, resetAddPayInfo } = useAddPayInfo();
  const { selectCategory, setSelectCategory, isOpen, setIsOpen } =
    useCategoryInfo();
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러

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
    if (!isAddpayInfoComplete) {
      console.log("입력 값", addpayInfo);
      console.log("입력 카테고리", selectCategory);
      return alert("모든 정보를 입력해주세요.");
    }

    try {
      const res = await api.post("/consumption/create", {
        price: Number(addpayInfo.price),
        detail: addpayInfo.detail,
        category: selectCategory,
        lat: Number(addpayInfo.lat),
        lng: Number(addpayInfo.lng),
        locationName: addpayInfo.locationName,
        date: addpayInfo.date,
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      moveToPage(`${PageUrls.PAY_RECODE}?refresh=${addpayInfo.date}`);
      resetAddPayInfo();
    }
  };

  return (
    <div className="flex w-full flex-col">
      <PayInput toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <SelectCategory classname={isOpen ? "block" : "hidden"} />
      <SaveButton title="저장하기" onClick={handleClickSubmit} />
    </div>
  );
};

export default AddPayPage;
