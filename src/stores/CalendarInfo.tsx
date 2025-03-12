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
  activeDate: string;
  setActiveDate: (year: number, month: number, day: number) => void;
  setDayData: (data: { totalPrice: number; calenderInfoDTOS: any[] }) => void;
  resetDayData: () => void;
}

const useCalendarInfo = create<CalendarInfoState>((set) => ({
  totalPrice: 0,
  calenderInfoDTOS: [], //
  activeDate: "",
  setActiveDate: (year, month, day) =>
    set(() => ({
      activeDate: `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    })),
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
