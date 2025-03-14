import React, { useEffect } from "react";
import InputDefault from "../components/common/InputDefault";
import PayTypeSection from "../components/sections/PayTypeSection";
import { SaveButton } from "../components/common/Buttons";
import SelectAgeGroup from "../components/SelectAgeGroup";
import { apiWithoutAuth } from "../utils/api";
import PageUrls from "../constants/PageUrls";
import { useMovePage } from "../hooks/useMovePage";
import useSignupInfo from "../stores/signupInfo";
import axios from "axios";

export interface signupInfo {
  email: string;
  code: string;
  password: string;
  checkPassword: string;
  nickname: string;
  home: {
    lat: number;
    lng: number;
    address: string;
  };
  ageGroup: string;
  type: string;
  isMailCertified: boolean;
}

// 회원가입 입력, 인증 로직
const SignupInputs: React.FC<{
  signupInfo: signupInfo;
  handleInputChange: (key: keyof signupInfo, value: string) => void;
  setSignupInfo: (
    key: keyof signupInfo,
    value: string | object | boolean,
  ) => void;
}> = ({ signupInfo, handleInputChange, setSignupInfo }) => {
  const { moveToPage } = useMovePage();
  const [emailError, setEmailError] = React.useState("");
  const [countdown, setCountdown] = React.useState(0);
  const [emailSent, setEmailSent] = React.useState(false);
  const [isSendingEmail, setIsSendingEmail] = React.useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(signupInfo.email);

  // 비밀번호 조건
  const password = signupInfo.password;
  const checkPassword = signupInfo.checkPassword;
  const hasMinLength = password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  // 이메일 인증번호 타이머
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  React.useEffect(() => {
    if (countdown <= 0) return;
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdown]);

  const handleClickCetifyMail = async () => {
    if (signupInfo.isMailCertified) return; // 이미 인증 완료된 경우 클릭 불가
    if (!signupInfo.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (!isEmailValid) {
      setEmailError("이메일 형식이 올바르지 않습니다.");
      return;
    }
    setEmailError("");
    setIsSendingEmail(true);
    try {
      const res = await apiWithoutAuth.post("/mail/send", {
        email: signupInfo.email,
      });

      alert("인증 메일이 발송되었습니다.");
      setCountdown(180);
      setEmailSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleClickCheckMail = async () => {
    if (signupInfo.isMailCertified || !signupInfo.email) return;
    if (!signupInfo.email || !signupInfo.code) {
      alert("인증번호를 입력해주세요.");
      return;
    }
    try {
      const res = await apiWithoutAuth.post("/mail/verify", {
        email: signupInfo.email,
        code: signupInfo.code,
      });
      if (res.data.result.check) {
        setSignupInfo("isMailCertified", true);
        alert("인증되었습니다.");
      } else {
        alert("인증에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("인증에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="relative gap-y-0">
        <div className="flex w-full items-end gap-3">
          <InputDefault
            style={`w-full ${signupInfo.isMailCertified ? "pointer-events-none" : ""}`}
            placeholder="이메일"
            type="email"
            value={signupInfo.email}
            onChange={(value) => {
              if (signupInfo.isMailCertified) return;
              handleInputChange("email", value);
              setEmailError("");
            }}
            isReadOnly={signupInfo.isMailCertified}
          />
          <div
            onClick={
              signupInfo.isMailCertified ? undefined : handleClickCetifyMail
            }
            className={`mb-5 grid h-10 w-16 shrink-0 place-items-center gap-3 rounded-lg font-medium text-white ${
              signupInfo.isMailCertified
                ? "cursor-not-allowed bg-second-light"
                : isEmailValid
                  ? "bg-main"
                  : "bg-second-light"
            }`}
          >
            {emailSent ? "재전송" : "전송"}
          </div>
        </div>
        {emailError && <div className="text-xs text-main">{emailError}</div>}
        {isSendingEmail && (
          <div className="absolute bottom-0 text-xs text-main">
            이메일 전송중...
          </div>
        )}
      </div>
      <div className="relative gap-y-0">
        <div className="flex w-full items-end gap-3">
          <InputDefault
            placeholder="이메일 인증번호"
            style={`w-full ${signupInfo.isMailCertified ? "pointer-events-none" : ""}`}
            type="number"
            value={signupInfo.code}
            onChange={(value) => {
              if (signupInfo.isMailCertified) return;
              handleInputChange("code", value);
            }}
            isReadOnly={signupInfo.isMailCertified}
          />
          <div
            onClick={
              signupInfo.isMailCertified ? undefined : handleClickCheckMail
            }
            className={`mb-5 grid h-10 w-16 shrink-0 ${
              signupInfo.isMailCertified
                ? "cursor-not-allowed"
                : "cursor-pointer"
            } place-items-center gap-3 rounded-lg font-medium text-white ${
              signupInfo.isMailCertified
                ? "bg-second-light"
                : countdown > 0
                  ? "bg-main"
                  : "bg-second-light"
            }`}
          >
            확인
          </div>
        </div>
        {!signupInfo.isMailCertified && countdown > 0 && (
          <div className="absolute bottom-0 text-xs text-main">
            남은 시간 : {formatTime(countdown)}
          </div>
        )}
      </div>

      <div className="relative flex flex-col">
        <InputDefault
          placeholder="비밀번호"
          type="password"
          value={signupInfo.password}
          onChange={(value) => handleInputChange("password", value)}
        />
        <div className="absolute bottom-0 flex gap-2 text-xs">
          <div className={hasMinLength ? "text-marker-home" : "text-main"}>
            {hasMinLength ? "✓" : "✗"} 8글자 이상
          </div>
          <div className={hasLetter ? "text-marker-home" : "text-main"}>
            {hasLetter ? "✓" : "✗"} 영문 포함
          </div>
          <div className={hasSpecial ? "text-marker-home" : "text-main"}>
            {hasSpecial ? "✓" : "✗"} 특수문자 포함
          </div>
        </div>
      </div>
      <div className="relative gap-y-0">
        <InputDefault
          placeholder="비밀번호 확인"
          type="password"
          value={signupInfo.checkPassword}
          onChange={(value) => handleInputChange("checkPassword", value)}
        />
        {signupInfo.checkPassword && password !== checkPassword && (
          <div className="absolute bottom-0 text-xs text-main">
            비밀번호가 일치하지 않습니다.
          </div>
        )}
      </div>
      <InputDefault
        placeholder="닉네임"
        value={signupInfo.nickname}
        onChange={(value) => handleInputChange("nickname", value)}
      />
      <InputDefault
        placeholder="집 정보 입력"
        type="location"
        onClick={() =>
          moveToPage(PageUrls.SEARCH_LOCATION, { prevPage: "signup" })
        }
        value={signupInfo.home.address}
        isReadOnly
      />
    </>
  );
};

// 소비성향(소비패턴) 설정
const SelectPayType: React.FC<{
  selectedPayType: string;
  setSelectedPayType: (value: string) => void;
}> = ({ selectedPayType, setSelectedPayType }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm">소비성향 설정</div>
      <div className="text-sm text-second">
        자신의 소비패턴과 가장 잘 맞는 유형을 선택하세요.
      </div>
      <PayTypeSection
        selectedPayType={selectedPayType}
        setSelectedPayType={setSelectedPayType}
      />
    </div>
  );
};

const SignupPage = () => {
  const { signupInfo, setSignupInfo, resetSignupInfo } = useSignupInfo();
  const { moveToPage } = useMovePage();

  const isSignupInfoComplete = Object.values(signupInfo).every((value) => {
    if (typeof value === "object" && value !== null) {
      return Object.values(value).every((nestedValue) => nestedValue !== 0);
    }
    return value !== "";
  });

  const handleClickSignup = async () => {
    if (!signupInfo.isMailCertified) return alert("메일 인증을 해주세요.");
    if (!isSignupInfoComplete) return alert("모든 정보를 입력해주세요.");

    try {
      const res = await apiWithoutAuth.post("/members/join", {
        email: signupInfo.email,
        password: signupInfo.password,
        nickname: signupInfo.nickname,
        type: signupInfo.type,
        home: {
          lng: signupInfo.home.lng,
          lat: signupInfo.home.lat,
          address: signupInfo.home.address,
        },
        ageGroup: signupInfo.ageGroup,
      });
      alert("회원가입이 완료되었습니다!");
      moveToPage(PageUrls.LOGIN);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data.message);
      }
      console.error(error);
    } finally {
      resetSignupInfo();
    }
  };

  return (
    <>
      <form
        onSubmit={handleClickSignup}
        className="flex flex-col gap-5 px-6 py-5"
      >
        <SignupInputs
          signupInfo={signupInfo}
          handleInputChange={setSignupInfo}
          setSignupInfo={setSignupInfo}
        />
        <SelectAgeGroup
          selectedAge={signupInfo.ageGroup}
          setSelectedAge={(value: string) => setSignupInfo("ageGroup", value)}
        />
        <SelectPayType
          selectedPayType={signupInfo.type}
          setSelectedPayType={(value: string) => setSignupInfo("type", value)}
        />
        <SaveButton title="회원가입" onClick={handleClickSignup} />
      </form>
    </>
  );
};

export default SignupPage;
