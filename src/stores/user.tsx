import { create } from "zustand";
import { userInfo } from "../apis/userInfo";
interface userStore {
  userInfo: userInfo;
  setUserInfo: (userInfo: userInfo) => void;
}

const userStore = create<userStore>((set) => ({
  userInfo: {
    nickname: "",
    email: "",
    type: "",
    ageGroup: "",
    home: {
      lat: 0,
      lng: 0,
    },
  },
  setUserInfo: (updated) => {
    set(() => ({
      userInfo: updated,
    }));
  },
}));
export default userStore;