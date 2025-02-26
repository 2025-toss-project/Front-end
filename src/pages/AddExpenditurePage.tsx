import React from "react";

import AddPayInput from "../components/AddPayInput";
import MainLayout from "../layouts/MainLayout";
import SelectCategory from "../components/SelectCategory";

const AddExpenditurePage = () => {
  return (
    <div>
      <MainLayout>
        <AddPayInput />
        <SelectCategory />
      </MainLayout>
    </div>
  );
};

export default AddExpenditurePage;
