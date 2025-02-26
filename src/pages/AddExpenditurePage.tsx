import React from "react";

import AddExpenditureInput from "../components/AddExpenditureInput";
import MainLayout from "../layouts/MainLayout";
import SelectCategory from "../components/SelectCategory";

const AddExpenditurePage = () => {
  return (
    <div>
      <MainLayout>
        <AddExpenditureInput />
        <SelectCategory />
      </MainLayout>
    </div>
  );
};

export default AddExpenditurePage;
