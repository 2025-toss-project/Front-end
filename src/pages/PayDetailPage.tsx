import React, { useState } from "react";

import AddPayInput from "../components/AddPayInput";
import SelectCategory from "../components/SelectCategory";
import { SaveButton } from "../components/common/Buttons";

const PayDetailPage = () => {
  const [selectName, setSelectName] = useState(""); // 선택한 값 저장

  return (
    <div className="flex w-full flex-col">
      <AddPayInput />
      <SelectCategory
        selectName={selectName}
        setSelectName={() => setSelectName(selectName)}
      />
      <SaveButton title="수정하기" />
    </div>
  );
};

export default PayDetailPage;
