import { create } from "zustand";

interface ConsumptionInfo {
  id: number;
  price: number;
  category: string;
  details: string;
  lat: number;
  lng: number;
  point_name: string;
}

interface ConsumptionInfoByDate {
  datePrice: number;
  consumptionInfoList: ConsumptionInfo[];
  month: number;
  day: number;
  year: number;
}

interface SpendingState {
  totalPrice: number;
  spendingRecords: ConsumptionInfoByDate[];
  setSpendingData: (data: {
    totalPrice: number;
    consumptionInfoByDateDTOS: ConsumptionInfoByDate[];
  }) => void;
  resetSpendingData: () => void;
}

const useSpendingInfo = create<SpendingState>((set) => ({
  totalPrice: 0,
  spendingRecords: [],
  setSpendingData: (data) =>
    set({
      totalPrice: data.totalPrice,
      spendingRecords: data.consumptionInfoByDateDTOS,
    }),
  resetSpendingData: () =>
    set({
      totalPrice: 0,
      spendingRecords: [],
    }),
}));

export default useSpendingInfo;
