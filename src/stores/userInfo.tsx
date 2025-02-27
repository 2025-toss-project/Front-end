import { create } from "zustand";
import { PayTypeProps } from "../constants/payType";
// userInfo 상태관리

interface UserInfo {
  id: string;
  email: string;
  nickname: string;
  type: string;
}

interface UserStore {
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useUserInfo = create<UserStore>((set) => ({
  userInfo: {
    id: "",
    email: "",
    nickname: "희연",
    type: "올인형",
  },
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
}));

export default useUserInfo;
