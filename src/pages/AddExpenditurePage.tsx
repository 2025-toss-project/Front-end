import React from "react";

import AddPayInput from "../components/AddPayInput";
import MainLayout from "../layouts/MainLayout";
import SelectCategory from "../components/SelectCategory";
import { SaveButton } from "../components/common/Buttons";

const AddExpenditurePage = () => {
  return (
    <div className="flex flex-col">
      <MainLayout>
        <AddPayInput />
        <SelectCategory />
        <SaveButton title="저장하기" />
      </MainLayout>
    </div>
  );
};

export default AddExpenditurePage;
