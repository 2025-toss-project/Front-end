import React, { useState } from "react";

import SelectCategory from "../components/SelectCategory";
import { SaveButton } from "../components/common/Buttons";
import { useCategoryInfo } from "../stores/CategoryInfo";
import ReadPayInput from "../components/ReadPayinput";

const PayDetailPage = () => {
  const { isOpen, setIsOpen } = useCategoryInfo();

  return (
    <div className="flex w-full flex-col">
      <ReadPayInput toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      <SelectCategory classname={isOpen ? "block" : "hidden"} />
      <SaveButton title="수정하기" />
    </div>
  );
};

export default PayDetailPage;
