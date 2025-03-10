import { create } from "zustand";
import { userInfo } from "./userInfo";
interface userStore {
  userInfo: userInfo;
  setUserInfo: (userInfo: userInfo) => void;
}

const useMapInfo = create<userStore>((set) => ({
  userInfo: {
    nickName: "",
    email: "",
    type: "",
    ageGroup: "",
    home: {
      lat: 0,
      lan: 0,
    },
  },
  setUserInfo: () => {
    set((prev) => ({
      userInfo: {
        ...prev.userInfo,
      },
    }));
  },
}));
