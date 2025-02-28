import React, { useState } from "react";

import AddPayInput from "../components/AddPayInput";
import SelectCategory from "../components/SelectCategory";
import { SaveButton } from "../components/common/Buttons";

const AddPayPage = () => {
  const [selectName, setSelectName] = useState(""); // 선택한 값 저장

  return (
    <div className="flex w-full flex-col">
      <AddPayInput />
      <SelectCategory
        selectName={selectName}
        setSelectName={() => setSelectName(selectName)}
      />
      <SaveButton title="저장하기" />
    </div>
  );
};

export default AddPayPage;
