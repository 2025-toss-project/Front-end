import { create } from "zustand";
import { signupInfo } from "../pages/SignupPage";

interface SignupInfoStore {
  signupInfo: signupInfo;
  setSignupInfo: (key: keyof signupInfo, value: string | object) => void;
  resetSignupInfo: () => void;
}

const useSignupInfo = create<SignupInfoStore>((set) => ({
  signupInfo: {
    email: "",
    code: "",
    password: "",
    checkPassword: "",
    nickName: "",
    location: "",
    home: {
      lat: 0,
      lng: 0,
    },
    ageGroup: "",
    type: "",
  },

  setSignupInfo: (key, value) => {
    set((prev) => ({
      signupInfo: {
        ...prev.signupInfo,
        [key]: value,
      },
    }));
  },
  resetSignupInfo: () => {
    set({
      signupInfo: {
        email: "",
        code: "",
        password: "",
        checkPassword: "",
        nickName: "",
        location: "",
        home: {
          lat: 0,
          lng: 0,
        },
        ageGroup: "",
        type: "",
      },
    });
  },
}));

export default useSignupInfo;
