import React, { useEffect, useState } from "react";
import CustomCalendar from "../components/CustomCalendar";
import { DropButton } from "../components/common/Buttons";
import PayList from "../components/PayList";
import SelectCategory from "../components/SelectCategory";
import { useCategoryInfo } from "../stores/CategoryInfo";
import usePayListInfo from "../stores/payListInfo";
import { api } from "../utils/api";

export interface paylistInfo {
  category: string;
  startDate: string;
  endDate: string;
}

const PayRecodePage = () => {
  const { selectName, setSelectName, isOpen, setIsOpen } = useCategoryInfo();
  const { payListInfo } = usePayListInfo();

  useEffect(() => {
    const fetchPay = async () => {
      try {
        const res = await api.get(
          `cunsumtion?category=${payListInfo.category}&startDate=${payListInfo.startDate}&endDate=${payListInfo.endDate}`,
        );
      } catch (err) {
        console.error(err);
      }
    };
  });

  return (
    <div className="flex w-full flex-col">
      <CustomCalendar />
      <div className="mt-5 flex w-full flex-col rounded-lg bg-white">
        {/* 드롭 클릭시 아래로 나오기  */}
        <DropButton
          title={selectName || "전체 항목"}
          toggle={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
        <SelectCategory classname={isOpen ? "block" : "hidden"} />
        <PayList />
      </div>
    </div>
  );
};

export default PayRecodePage;
