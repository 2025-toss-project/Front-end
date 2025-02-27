import React from "react";
import CustomCalendar from "../components/CustomCalendar";
import { DropButton } from "../components/common/Buttons";
import PayList from "../components/PayList";

const PayRecodePage = () => {
  return (
    <div className="flex w-full flex-col">
      <CustomCalendar />
      <div className="mt-5 flex w-full flex-col rounded-lg bg-white">
        <DropButton title="전체 내역" />
        <PayList />
      </div>
    </div>
  );
};

export default PayRecodePage;
