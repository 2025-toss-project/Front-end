import React, { useState } from "react";

import AddPayInput from "../components/AddPayInput";
import SelectCategory from "../components/SelectCategory";
import { SaveButton } from "../components/common/Buttons";
import { SearchPlaceProvider } from "../contexts/SearchPlaceContext";

const AddPayPage = () => {
  const [selectName, setSelectName] = useState(""); // 선택한 값 저장
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 체크

  return (
    <div className="flex w-full flex-col">
      <AddPayInput
        toggle={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
        selectName={selectName}
      />
      <SelectCategory
        classname={isOpen ? "block" : "hidden"}
        selectName={selectName}
        setSelectName={(name) => {
          setSelectName(name); // 선택한 값 저장
          setIsOpen(false); //
        }}
      />
      <SaveButton title="저장하기" />
    </div>
  );
};

export default AddPayPage;
