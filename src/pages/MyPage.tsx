import React, { useEffect, useState } from "react";
import { userInfo as UserInfoType, fetchUserInfo } from "../apis/userInfo";
import { findType } from "../utils/findTypeOrCategory";
import ProfileUpdate from "../apis/ProfileUpdate";
import TypeTab from "../components/TypeTab";
import userStore from "../stores/user";

interface TypeTabProps {
  userData: UserInfoType | null;
}

const MyPage: React.FC = () => {
  const { userInfo, setUserInfo } = userStore();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const tabs = ["프로필", "성향"];

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { result } = await fetchUserInfo();
        setUserInfo(result);
      } catch (error) {
        console.error(error);
      }
    };
    if (!userInfo.email) getUserData();
  }, []);

  const userType = findType(userInfo?.type ?? "");

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
            {userInfo?.nickname}
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
        <ProfileUpdate userData={userInfo} />
      ) : (
        <TypeTab userData={userInfo} />
      )}
    </div>
  );
};

export default MyPage;
