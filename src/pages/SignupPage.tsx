import React, { useState } from "react";
import InputDefault from "../components/common/InputDefault";
import { payTypeList } from "../constants/payType";
import PayTypeSection from "../components/sections/PayTypeSection";
import { SaveButton } from "../components/common/Buttons";

const SignupInputs = () => {
  return (
    <>
      <InputDefault placeholder="이메일" />
      <div className="flex w-full items-end gap-3">
        <InputDefault placeholder="이메일 인증번호" style="w-full" />
        <div className="mb-5 grid h-10 w-16 shrink-0 place-items-center gap-3 rounded-lg bg-second-light font-medium text-white">
          확인
        </div>
      </div>
      <InputDefault placeholder="비밀번호" />
      <InputDefault placeholder="비밀번호 확인" />
      <InputDefault placeholder="닉네임" />
      <InputDefault placeholder="집 정보 입력" />
    </>
  );
};

const AgeGroup: React.FC<{
  selectedAge: string;
  setSelectedAge: React.Dispatch<React.SetStateAction<string>>;
}> = ({ selectedAge, setSelectedAge }) => {
  const ageGroups = ["10대", "20대", "30대", "40대", "50대~"];

  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm">연령대</div>
      <div className="z-10 flex min-w-[calc(100vw-24px)] gap-3 overflow-x-scroll pr-6">
        {ageGroups.map((age) => (
          <div
            key={age}
            onClick={() => {
              setSelectedAge(age);
            }}
            className={`${selectedAge === age ? "border-main text-main" : "border-second text-second"} shrink-0 rounded-full border px-5 py-2`}
          >
            {age}
          </div>
        ))}
      </div>
    </div>
  );
};

const SelectPayType: React.FC<{
  selectedPayType: string;
  setSelectedPayType: React.Dispatch<React.SetStateAction<string>>;
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
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedPayType, setSelectedPayType] = useState<string>("");

  return (
    <div className="flex flex-col gap-5 px-6 py-5 pt-16">
      <SignupInputs />
      <AgeGroup selectedAge={selectedAge} setSelectedAge={setSelectedAge} />
      <SelectPayType
        selectedPayType={selectedPayType}
        setSelectedPayType={setSelectedPayType}
      />
      <SaveButton title="회원가입" />
    </div>
  );
};

export default SignupPage;
