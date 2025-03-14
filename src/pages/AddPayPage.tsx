import React, { useEffect, useState } from "react";

import SelectCategory from "../components/SelectCategory";
import { SaveButton } from "../components/common/Buttons";
import { api } from "../utils/api";
import useAddPayInfo from "../stores/addpayInfo";
import PageUrls from "../constants/PageUrls";
import { useMovePage } from "../hooks/useMovePage";
import PayInput from "../components/PayInput";
import { useCategoryInfo } from "../stores/categoryInfo";
import { add } from "lodash";

export interface addpayInfo {
  price: number;
  details: string;
  date: string;
  locationName: string;
  lat: number;
  lng: number;
}

const AddPayPage = () => {
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러
  const { isOpen, setIsOpen } = useCategoryInfo();
  const { addpayInfo, resetAddPayInfo } = useAddPayInfo();
  const { selectCategory, setSelectCategory } = useCategoryInfo();

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

  // API 호출
  const handleClickSubmit = async () => {
    if (!isAddpayInfoComplete) {
      console.log("입력 값", addpayInfo);
      return alert("모든 정보를 입력해주세요.");
    }

    try {
      console.log(addpayInfo, "seok");
      const res = await api.post("/consumption/create", {
        price: Number(addpayInfo.price),
        details: addpayInfo.details,
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
      //setSelectCategory("");
    }
  };

  return (
    <div className="flex w-full flex-col">
      {/* 클릭 시 카테고리 리스트 열기  */}
      <PayInput toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      {/* 카테고리 선택 리스트 */}
      <SelectCategory classname={isOpen ? "block" : "hidden"} />
      {/* 인풋 값 create */}
      <SaveButton title="저장하기" onClick={handleClickSubmit} />
    </div>
  );
};

export default AddPayPage;
