// Zustand 상태 정의 (CalendarInfo.ts)
import { create } from "zustand";

export interface ConsumptionInfoByDate {
  year: number;
  month: number;
  day: number;
  datePrice: number;
  consumptionInfoList: {
    id: number;
    price: number;
    category: string;
    details: string;
    lat: number;
    lng: number;
    point_name: string;
  }[];
}

interface CalendarInfoState {
  totalPrice: number;
  consumptionInfoByDateDTOS: ConsumptionInfoByDate[];
  setDayData: (data: {
    totalPrice: number;
    consumptionInfoByDateDTOS: ConsumptionInfoByDate[];
  }) => void;
  resetDayData: () => void;
}

const useCalendarInfo = create<CalendarInfoState>((set) => ({
  totalPrice: 0,
  consumptionInfoByDateDTOS: [], //
  setDayData: (data) => set(data),
  resetDayData: () =>
    set({
      totalPrice: 0,
      consumptionInfoByDateDTOS: [],
    }),
}));

export default useCalendarInfo;
