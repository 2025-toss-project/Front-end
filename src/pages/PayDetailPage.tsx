import React, { useState } from "react";

import SelectCategory from "../components/SelectCategory";
import { IconButton, SaveButton } from "../components/common/Buttons";
import { useCategoryInfo } from "../stores/CategoryInfo";
import ReadPayInput from "../components/ReadPayinput";
import useAddPayInfo from "../stores/addpayInfo";
import { api } from "../utils/api";
import { usePlaceInfo } from "../stores/placeInfo";
import { useLocation } from "react-router-dom";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { LucideTrash, LucideTrash2, LucideX } from "lucide-react";

const PayDetailPage = () => {
  const { isOpen, setIsOpen } = useCategoryInfo();
  const { addpayInfo, resetAddPayInfo } = useAddPayInfo();
  const { selectName } = useCategoryInfo();
  const { selectPlace, placeInfo } = usePlaceInfo();
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러

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
      moveToPage(PageUrls.PAY_RECODE);
    }
  };

  const handleClickDelete = async () => {
    if (!id) {
      alert("삭제할 항목이 없습니다.");
      return;
    }
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const res = await api.delete(`consumption/delete/${id}`);
      console.log("삭제 성공:", res.data);
    } catch (error) {
      console.error("삭제 실패:", error);
    } finally {
      resetAddPayInfo();
      moveToPage(PageUrls.PAY_RECODE);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col px-2">
        <div
          onClick={() => moveToPage(PageUrls.PAY_RECODE)}
          className="flex justify-end"
        >
          <LucideX />
        </div>
        <ReadPayInput toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        <SelectCategory classname={isOpen ? "block" : "hidden"} />
      </div>
      <div className="flex flex-row items-center gap-3">
        <SaveButton
          style={"flex-grow"}
          title="수정하기"
          onClick={handleClickUpdate}
        />
        <div
          onClick={handleClickDelete}
          className="flex h-12 w-12 items-center justify-center rounded-md border border-gray-500"
        >
          {" "}
          <LucideTrash2 size={26} color="#777" />{" "}
        </div>
      </div>
    </div>
  );
};

export default PayDetailPage;
