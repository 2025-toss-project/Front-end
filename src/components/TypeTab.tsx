import { userInfo as UserInfoType, fetchUserInfo } from "../apis/userInfo";
import React, { useState } from "react";
import PayTypeSection from "../components/sections/PayTypeSection";
import { SaveButton } from "../components/common/Buttons";
import { updateProfileInfo, userInfo } from "../apis/userInfo";
import userStore from "../stores/user";
import Loading from "./loading";

interface TypeTab {
  userData: UserInfoType | null;
}

const TypeTab: React.FC<{ userData: userInfo }> = ({ userData }) => {
  const [selectedPayType, setSelectedPayType] = useState<string>(
    userData?.type || "",
  );
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [originUserInfo, setOriginUserInfo] = useState(userData);
  const { setUserInfo } = userStore()
  
  const handleSave = async () => {
    setLoading(true);
    setMessage("");
  
    // merge된 객체를 만들어 전송
    const updatedData = {
      ...originUserInfo,
      type: selectedPayType,
    };
  

    try {
     
      await updateProfileInfo(updatedData);
      setUserInfo(updatedData);
      setMessage("프로필 업데이트 성공!");
    } catch (error) {
      console.error(error);
      setMessage("프로필 업데이트 실패!");
    } finally {
      setLoading(false);
    }
  };

    
  return (
    <>
      <div className="flex flex-col gap-5 px-3 border rounded-lg border-second-light py-7">
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
      <SaveButton title="프로필 저장" onClick={handleSave} />
    </>
  );
};

export default TypeTab;
