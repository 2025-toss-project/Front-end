import React, { useState } from "react";
import useUserInfo from "../stores/userInfo";
import { findType } from "../utils/findTypeOrCategory";
import InputDefault from "../components/common/InputDefault";
import SelectAgeGroup from "../components/SelectAgeGroup";
import { SaveButton } from "../components/common/Buttons";
import { LucideLogOut } from "lucide-react";
import PayTypeSection from "../components/sections/PayTypeSection";

const ProfileTab = () => {
  const [selectedAge, setSelectedAge] = useState<string>("");

  return (
    <>
      <div className="flex flex-col py-5">
        <div className="text-lg font-bold">프로필 정보</div>
        <div className="text-sm">개인정보를 확인하고 수정할 수 있습니다.</div>
      </div>
      <div className="flex flex-col gap-2">
        <InputDefault placeholder="hong@mail.com" label="이메일" />
        <InputDefault placeholder="홍길동" label="닉네임" />
        <SelectAgeGroup
          selectedAge={selectedAge}
          setSelectedAge={setSelectedAge}
          style="mb-5"
        />
        <InputDefault placeholder="집 정보" label="집 정보" />
      </div>
      <SaveButton title="프로필 저장" />
      <div className="flex items-center justify-center gap-5 text-xs font-bold">
        로그아웃
        <LucideLogOut size={16} />
      </div>
    </>
  );
};

const TypeTab = () => {
  const [selectedPayType, setSelectedPayType] = useState<string>("");
  return (
    <>
      <div className="flex flex-col gap-5 rounded-lg border border-second-light px-3 py-7">
        <div className="flex flex-col">
          <div className="text-lg font-bold">소비성향 설정</div>
          <div className="text-sm">
            자신의 소비패턴과 가장 잘 맞는 유형을 선택하세요.
          </div>
        </div>
        <PayTypeSection
          selectedPayType={selectedPayType}
          setSelectedPayType={setSelectedPayType}
        />
      </div>
      <SaveButton title="저장하기" />
    </>
  );
};

const MyPage = () => {
  const { userInfo } = useUserInfo();
  const userType = findType(userInfo.type);
  const [selectedTap, setSelectedTap] = useState<number>(0);
  const tabs = ["프로필", "성향"];

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2 py-4">
        <div>{userType?.icon({ size: 48 })}</div>
        <div>
          <div className="text-sm">
            {userType?.discription}
            {!(userType?.type === "무소비형") && "하는"}
          </div>
          <div className="text-lg font-bold text-main">
            {userInfo.nickname}
            {" 님"}
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 py-2 text-sm">
        {tabs.map((tab, tabIdx) => (
          <div
            key={tab}
            onClick={() => setSelectedTap(tabIdx)}
            className={`grid w-full place-items-center rounded-lg border py-2 ${tabIdx === selectedTap ? "border-white bg-main text-white" : "border border-main bg-white"}`}
          >
            {tab}
          </div>
        ))}
        {/* <div className="grid w-full rounded-lg place-items-center">프로필</div>
        <div className="grid w-full rounded-lg place-items-center">성향</div> */}
      </div>
      {selectedTap === 0 ? <ProfileTab /> : <TypeTab />}
    </div>
  );
};

export default MyPage;
