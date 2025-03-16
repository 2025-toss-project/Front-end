import React, { useState } from "react";
import InputDefault from "../components/common/InputDefault";
import { SaveButton } from "../components/common/Buttons";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import { apiWithoutAuth } from "../utils/api";
import IconLogo from "../assets/IconLogo";

const Logo = () => {
  return (
    <div className="flex items-end justify-center py-14">
      <IconLogo width={80} />
      <div className="-translate-x-8 translate-y-2 text-end text-5xl font-bold text-main">
        ayRoad
      </div>
    </div>
  );
};

const Inputs: React.FC<{
  loginInfo: {
    email: string;
    password: string;
  };
  setLoginInfo: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
}> = ({ loginInfo, setLoginInfo }) => {
  return (
    <div className="flex flex-col">
      <InputDefault
        placeholder="이메일"
        type="email"
        value={loginInfo.email}
        onChange={(value) => setLoginInfo({ ...loginInfo, email: value })}
      />
      <InputDefault
        placeholder="비밀번호"
        type="password"
        value={loginInfo.password}
        onChange={(value) => setLoginInfo({ ...loginInfo, password: value })}
      />
    </div>
  );
};

const LoginAndSignUp: React.FC<{
  loginInfo: {
    email: string;
    password: string;
  };
  setLoginInfo: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
}> = ({ loginInfo, setLoginInfo }) => {
  const { moveToPage } = useMovePage();
  const handleClickLoginBtn = async () => {
    if (loginInfo.email === "" || loginInfo.password === "") return;

    try {
      const res = await apiWithoutAuth.post("/login", {
        email: loginInfo.email,
        password: loginInfo.password,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      moveToPage(PageUrls.HOME);
    } catch (error) {
      console.error(error);
      alert("정보를 다시 입력해주세요.");
      setLoginInfo({ email: "", password: "" });
    }
  };
  return (
    <div>
      <SaveButton title="로그인" style="mt-0 " onClick={handleClickLoginBtn} />
      <div className="flex items-center justify-center gap-2">
        회원이 아니신가요?
        <span
          onClick={() => moveToPage(PageUrls.SIGNUP)}
          className="text-second underline underline-offset-2"
        >
          회원가입
        </span>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  return (
    <div className="flex flex-col gap-10 px-6 py-10">
      <Logo />
      <Inputs loginInfo={loginInfo} setLoginInfo={setLoginInfo} />
      <LoginAndSignUp loginInfo={loginInfo} setLoginInfo={setLoginInfo} />
    </div>
  );
};

export default LoginPage;
