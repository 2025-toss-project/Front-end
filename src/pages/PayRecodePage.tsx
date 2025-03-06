import React, { useEffect, useState } from "react";
import CustomCalendar from "../components/CustomCalendar";
import { DropButton } from "../components/common/Buttons";
import PayList from "../components/PayList";
import SelectCategory from "../components/SelectCategory";
import { useCategoryInfo } from "../stores/CategoryInfo";
import usePayListInfo from "../stores/payListInfo";
import { api } from "../utils/api";

export interface paylistInfo {
  category: string;
  startDate: string;
  endDate: string;
}

const PayRecodePage = () => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 관리
  const { selectName, isOpen, setIsOpen } = useCategoryInfo();
  const { payListInfo } = usePayListInfo();
  const { totalPrice, spendingRecords, setSpendingData, resetSpendingData } =
    useSpendingStore();

  useEffect(() => {
    const fetchPay = async () => {
      try {
        setLoading(true);
        const res = await api.get(
          `cunsumtion?category=${payListInfo.category}&startDate=${payListInfo.startDate}&endDate=${payListInfo.endDate}`,
        );

        console.log(res.data);
        // 받아온 데이터 store 저장
        setSpendingData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // payListInfo 값이 있을 때만 실행
    if (payListInfo.startDate && payListInfo.endDate) {
      fetchPay();
    }
  }, [payListInfo]);

  if (loading) {
    console.log("loading....");
  }

  return (
    <div className="flex w-full flex-col">
      <CustomCalendar />
      <div className="mt-5 flex w-full flex-col rounded-lg bg-white">
        {/* 드롭 클릭시 아래로 나오기  */}
        <DropButton
          title={selectName || "전체 항목"}
          toggle={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
        <SelectCategory classname={isOpen ? "block" : "hidden"} />
        <PayList />
      </div>
    </div>
  );
};

export default PayRecodePage;
function useSpendingStore(): {
  totalPrice: any;
  spendingRecords: any;
  setSpendingData: any;
  resetSpendingData: any;
} {
  throw new Error("Function not implemented.");
}
