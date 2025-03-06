import { create } from "zustand";
import { paylistInfo } from "../pages/PayRecodePage";

interface PayListStore {
  payListInfo: paylistInfo;
  setPayListInfo: (key: keyof paylistInfo, value: string | object) => void;
  resetPayListInfo: () => void;
}

const usePayListInfo = create<PayListStore>((set) => ({
  payListInfo: {
    category: "식비",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  },

  setPayListInfo: (key, value) => {
    set((prev) => ({
      payListInfo: {
        ...prev.payListInfo,
        [key]: value,
      },
    }));
  },

  resetPayListInfo: () => {
    set({
      payListInfo: {
        category: "",
        startDate: "",
        endDate: "",
      },
    });
  },
}));

export default usePayListInfo;
