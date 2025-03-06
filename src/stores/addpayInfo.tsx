import { create } from "zustand";
import { addpayInfo } from "../pages/AddPayPage";

interface AddPayInfoStore {
  addpayInfo: addpayInfo;
  setAddPayInfo: (key: keyof addpayInfo, value: string) => void;
  resetAddPayInfo: () => void;
}

const useAddPayInfo = create<AddPayInfoStore>((set) => ({
  addpayInfo: {
    price: "",
    detail: "",
    date: "",
  },

  setAddPayInfo: (key, value) => {
    set((prev) => ({
      addpayInfo: {
        ...prev.addpayInfo,
        [key]: value,
      },
    }));
  },

  resetAddPayInfo: () => {
    set({
      addpayInfo: {
        price: "",
        detail: "",
        date: "",
      },
    });
  },
}));

export default useAddPayInfo;
