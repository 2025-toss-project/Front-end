import { create } from "zustand";
import { signupInfo } from "../pages/SignupPage";

interface SignupInfoStore {
  signupInfo: signupInfo;
  setSignupInfo: (
    key: keyof signupInfo,
    value: string | object | boolean,
  ) => void;
  resetSignupInfo: () => void;
}

const useSignupInfo = create<SignupInfoStore>((set) => ({
  signupInfo: {
    email: "",
    code: "",
    password: "",
    checkPassword: "",
    nickname: "",
    home: {
      lat: 0,
      lng: 0,
      address: "",
    },
    ageGroup: "",
    type: "",
    isMailCertified: false,
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
        nickname: "",
        home: {
          lat: 0,
          lng: 0,
          address: "",
        },
        ageGroup: "",
        type: "",
        isMailCertified: false,
      },
    });
  },
}));

export default useSignupInfo;
