import React, { useEffect, useState } from "react";
import { userInfo as UserInfoType, fetchUserInfo } from "../stores/userInfo";
import { findType } from "../utils/findTypeOrCategory";
import PayTypeSection from "../components/sections/PayTypeSection";
import { SaveButton } from "../components/common/Buttons";
import ProfileUpdate from "../components/ProfileUpdate";
import { LucideLogOut } from "lucide-react";

interface TypeTabProps {
  userData: UserInfoType | null;
}

const TypeTab: React.FC<TypeTabProps> = ({ userData }) => {
  const [selectedPayType, setSelectedPayType] = useState<string>(
    userData?.type || "",
  );

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

const MyPage: React.FC = () => {
  const [userData, setUserData] = useState<UserInfoType | null>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = ["프로필", "성향"];

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { result } = await fetchUserInfo();
        setUserData(result);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  const userType = findType(userData?.type ?? "");

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2 py-4">
        {userType?.icon && <div>{userType.icon({ size: 48 })}</div>}
        <div>
          <div className="text-sm">
            {userType?.discription}
            {!(userType?.type === "무소비형") && "하는"}
          </div>
          <div className="text-lg font-bold text-main">
            {userData?.nickName}
            {" 님"}
          </div>
        </div>
      </div>

      {/* 탭 영역 */}
      <div className="flex justify-between gap-2 py-2 text-sm">
        {tabs.map((tab, idx) => (
          <div
            key={tab}
            onClick={() => setSelectedTab(idx)}
            className={`grid w-full place-items-center rounded-lg border py-2 ${
              idx === selectedTab
                ? "border-white bg-main text-white"
                : "border border-main bg-white"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {selectedTab === 0 ? (
        <ProfileUpdate userData={userData} />
      ) : (
        <TypeTab userData={userData} />
      )}
    </div>
  );
};

export default MyPage;
