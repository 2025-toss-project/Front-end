import { create } from "zustand";

interface CalendarInfoByDate {
  datePrice: number;
  month: string;
  day: string;
  year: string;
}

interface CalendarInfoState {
  totalPrice: number;
  DayRecords: CalendarInfoByDate[];
  setDayData: (data: {
    totalPrice: number;
    CalendarInfoByDate: CalendarInfoByDate[];
  }) => void;
  resetDayData: () => void;
}

const useCalendarInfo = create<CalendarInfoState>((set) => ({
  totalPrice: 0,
  DayRecords: [],
  setDayData: (data) =>
    set({
      totalPrice: data.totalPrice,
      DayRecords: data.CalendarInfoByDate,
    }),
  resetDayData: () =>
    set({
      totalPrice: 0,
      DayRecords: [],
    }),
}));

export default useCalendarInfo;
