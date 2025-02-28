import React, { useState } from "react";
import CustomCalendar from "../components/CustomCalendar";
import { DropButton } from "../components/common/Buttons";
import PayList from "../components/PayList";
import SelectCategory from "../components/SelectCategory";

const PayRecodePage = () => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 체크
  const [selectName, setSelectName] = useState(""); // 선택한 값 저장

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
        <SelectCategory
          classname={isOpen ? "block" : "hidden"}
          selectName={selectName}
          setSelectName={(name) => {
            setSelectName(name); // 선택한 값 저장
            setIsOpen(false); //
          }}
        />
        <PayList />
      </div>
    </div>
  );
};

export default PayRecodePage;
