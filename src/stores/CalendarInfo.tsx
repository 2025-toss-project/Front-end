// Zustand 상태 정의 (CalendarInfo.ts)
import { create } from "zustand";

export interface calenderInfoDTOS {
  year: number;
  month: number;
  day: number;
  datePrice: number;
}

interface CalendarInfoState {
  totalPrice: number;
  calenderInfoDTOS: calenderInfoDTOS[];
  setDayData: (data: { totalPrice: number; calenderInfoDTOS: any[] }) => void;
  resetDayData: () => void;
}

const useCalendarInfo = create<CalendarInfoState>((set) => ({
  totalPrice: 0,
  calenderInfoDTOS: [], //
  setDayData: (data) =>
    set(() => ({
      totalPrice: data.totalPrice,
      calenderInfoDTOS: data.calenderInfoDTOS,
    })),
  resetDayData: () =>
    set({
      totalPrice: 0,
      calenderInfoDTOS: [],
    }),
}));

export default useCalendarInfo;
