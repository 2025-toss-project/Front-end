import React from "react";
import InputDefault from "../components/common/InputDefault";
import PayTypeSection from "../components/sections/PayTypeSection";
import { SaveButton } from "../components/common/Buttons";
import SelectAgeGroup from "../components/SelectAgeGroup";
import { apiWithoutAuth } from "../utils/api";
import PageUrls from "../constants/PageUrls";
import { useMovePage } from "../hooks/useMovePage";
import useSignupInfo from "../stores/signupInfo";

export interface signupInfo {
  email: string;
  code: string;
  password: string;
  checkPassword: string;
  nickName: string;
  location: string;
  home: {
    lat: number;
    lng: number;
  };
  ageGroup: string;
  type: string;
}

const SignupInputs: React.FC<{
  signupInfo: signupInfo;
  handleInputChange: (key: keyof signupInfo, value: string) => void;
  setIsMailCertified: (value: boolean) => void;
}> = ({ signupInfo, handleInputChange, setIsMailCertified }) => {
  const { moveToPage } = useMovePage();
  const handleClickCetifyMail = async () => {
    if (!signupInfo.email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    try {
      const res = await apiWithoutAuth.post("/mail/send", {
        email: signupInfo.email,
      });
      console.log(res.data);
      alert("인증 메일이 발송되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickCheckMail = async () => {
    if (!signupInfo.email) {
      alert("인증번호를 입력해주세요.");
      return;
    }
    try {
      const res = await apiWithoutAuth.post("/mail/verify", {
        email: signupInfo.email,
        code: signupInfo.code,
      });
      console.log(res.data);

      if (res.data.result.check) {
        setIsMailCertified(true);
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
      <div className="flex items-end w-full gap-3">
        <InputDefault
          style="w-full"
          placeholder="이메일"
          type="email"
          value={signupInfo.email}
          onChange={(value) => handleInputChange("email", value)}
        />
        <div
          onClick={handleClickCetifyMail}
          className="grid w-16 h-10 gap-3 mb-5 font-medium text-white rounded-lg shrink-0 place-items-center bg-second-light"
        >
          전송
        </div>
      </div>
      <div className="flex items-end w-full gap-3">
        <InputDefault
          placeholder="이메일 인증번호"
          style="w-full"
          type="number"
          value={signupInfo.code}
          onChange={(value) => handleInputChange("code", value)}
        />
        <div
          onClick={handleClickCheckMail}
          className="grid w-16 h-10 gap-3 mb-5 font-medium text-white rounded-lg shrink-0 place-items-center bg-second-light"
        >
          확인
        </div>
      </div>
      <InputDefault
        placeholder="비밀번호"
        type="password"
        value={signupInfo.password}
        onChange={(value) => handleInputChange("password", value)}
      />
      <InputDefault
        placeholder="비밀번호 확인"
        type="password"
        value={signupInfo.checkPassword}
        onChange={(value) => handleInputChange("checkPassword", value)}
      />
      <InputDefault
        placeholder="닉네임"
        value={signupInfo.nickName}
        onChange={(value) => handleInputChange("nickName", value)}
      />
      <InputDefault
        placeholder="집 정보 입력"
        type="location"
        onClick={() => moveToPage(PageUrls.SEARCH_LOCATION)}
        value={signupInfo.location}
        isReadOnly
      />
    </>
  );
};

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

  const [isMailCertified, setIsMailCertified] = React.useState(false);

  const isSignupInfoComplete = Object.values(signupInfo).every((value) => {
    if (typeof value === "object" && value !== null) {
      return Object.values(value).every((nestedValue) => nestedValue !== 0);
    }
    return value !== "";
  });

  const handleClickSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signupInfo);
    if (isMailCertified === false) return alert("메일 인증을 해주세요.");
    if (!isSignupInfoComplete) return alert("모든 정보를 입력해주세요.");

    try {
      const res = await apiWithoutAuth.post("/members/join", {
        email: signupInfo.email,
        password: signupInfo.password,
        nickName: signupInfo.nickName,
        type: signupInfo.type,
        home: signupInfo.home,
        ageGroup: signupInfo.ageGroup,
      });
      console.log(res.data);
      moveToPage(PageUrls.HOME);
    } catch (error) {
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
          setIsMailCertified={setIsMailCertified}
        />
        <SelectAgeGroup
          selectedAge={signupInfo.ageGroup}
          setSelectedAge={(value: string) => setSignupInfo("ageGroup", value)}
        />
        <SelectPayType
          selectedPayType={signupInfo.type}
          setSelectedPayType={(value: string) => setSignupInfo("type", value)}
        />
        <SaveButton title="회원가입" />
      </form>
    </>
  );
};

export default SignupPage;
