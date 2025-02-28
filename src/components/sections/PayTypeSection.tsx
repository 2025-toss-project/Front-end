import React from "react";
import { payTypeList } from "../../constants/payType";

const PayTypeSection: React.FC<{
  selectedPayType: string;
  setSelectedPayType: React.Dispatch<React.SetStateAction<string>>;
}> = ({ selectedPayType, setSelectedPayType }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {payTypeList.map((payType) => (
        <div
          key={payType.type}
          className={`flex flex-col items-center justify-center gap-2 rounded-md border py-4 ${selectedPayType === payType.type ? "border-main" : "border-second"}`}
          onClick={() => setSelectedPayType(payType.type)}
        >
          {payType.icon({ size: 40 })}
          <div className="font-bold">{payType.type}</div>
          <div className="text-xs">{payType.discription}</div>
        </div>
      ))}
    </div>
  );
};

export default PayTypeSection;
