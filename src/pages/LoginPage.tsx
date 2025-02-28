import React from "react";
import IconNoPayType from "../assets/payTypeIcons/IconNoPayType";
import InputDefault from "../components/common/InputDefault";
import { SaveButton } from "../components/common/Buttons";

const Logo = () => {
  return (
    <div className="flex items-center justify-start gap-5 py-14">
      <IconNoPayType />
      <div className="text-3xl font-bold text-main">PayRoad</div>
    </div>
  );
};

const Inputs = () => {
  return (
    <div className="flex flex-col">
      <InputDefault placeholder="이메일" />
      <InputDefault placeholder="비밀번호" />
    </div>
  );
};

const LoginAndSignUp = () => {
  return (
    <div>
      <SaveButton title="로그인" style="mt-0 " />
      <div className="flex items-center justify-center gap-2">
        회원이 아니신가요?{" "}
        <span className="text-second underline underline-offset-2">
          회원가입
        </span>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div className="flex flex-col gap-10 px-6 py-10">
      <Logo />
      <Inputs />
      <LoginAndSignUp />
    </div>
  );
};

export default LoginPage;
