import React from "react";

import AddPayInput from "../components/AddPayInput";
import MainLayout from "../layouts/MainLayout";
import SelectCategory from "../components/SelectCategory";
import { SaveButton } from "../components/common/Buttons";

const AddPayPage = () => {
  return (
    <div className="flex w-full flex-col">
      <AddPayInput />
      <SelectCategory />
      <SaveButton title="저장하기" />
    </div>
  );
};

export default AddPayPage;
