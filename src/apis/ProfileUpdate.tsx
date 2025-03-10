import React, { useEffect, useState } from "react";
import {
  updateProfileInfo,
  userInfo,
} from "../apis/userInfo";
import InputDefault from "../components/common/InputDefault";
import SelectAgeGroup from "../components/SelectAgeGroup";
import { SaveButton } from "../components/common/Buttons";
import { LucideLogOut } from "lucide-react";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import userStore from "../stores/user";
import Loading from "../components/loading";


const ProfileUpdate: React.FC<{ userData: userInfo }> = ({ userData }) => {
  const { moveToPage } = useMovePage();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // 컴포넌트 최상단에 선언
  const { setUserInfo } = userStore();
  const [originUserInfo, setOriginUserInfo] = useState(userData);


  const handlenicknameChange = (val: string) => {
    setOriginUserInfo((prev) => ({
      ...prev,
      nickname: val,
    }));
  };

  const handleAgeGroupChange = (val: string) => {
    setOriginUserInfo((prev) => ({
      ...prev,
      ageGroup: val,
    }));
  };

  const handleSave = async () => {
    setMessage("");

    try {
      await updateProfileInfo(originUserInfo);
      setMessage("프로필 업데이트 성공!");
      setUserInfo(originUserInfo);
    } catch (error) {
      console.error(error);
      setMessage("프로필 업데이트 실패!");
    } finally {
      setLoading(false); // API 요청 완료 후 로딩 상태 false로 설정
    }
  };

  if (!userData) {
    return <div className="flex items-center justify-center">실패</div>;
  }

  // home 표시 로직
  const renderHomePlaceholder = () => {
    if (typeof userData.home === "object") {
      const { lat, lng } = userData.home;
      if (lat !== 0 || lng !== 0) {
        return `(${lat}, ${lng})`;
      }
      return "집 정보";
    }
    return userData.home || "집 정보";
  };

  useEffect(() => {
    setOriginUserInfo(userData);
  }, [userData]);
  return (
    <>
      <div className="flex flex-col py-5">
        <div className="text-lg font-bold">프로필 정보</div>
        <div className="text-sm">개인정보를 확인하고 수정할 수 있습니다.</div>
      </div>

      <div className="flex flex-col gap-2">
        <InputDefault
          placeholder={originUserInfo.email || "이메일"}
          label="이메일"
          value={originUserInfo.email}
          onChange={() => {}} // readOnly라 onChange는 빈 함수
          isReadOnly
        />

        {/* 닉네임 입력 */}
        <InputDefault
          placeholder={originUserInfo.nickname || "닉네임"}
          label="닉네임"
          value={originUserInfo.nickname}
          onChange={handlenicknameChange}
        />

        {/* 연령대 선택 */}
        <SelectAgeGroup
          selectedAge={originUserInfo.ageGroup}
          setSelectedAge={handleAgeGroupChange}
          style="mb-5"
        />
  
        <InputDefault
          label="집 정보"
          placeholder={renderHomePlaceholder()}
          isReadOnly
          onClick={() => moveToPage(PageUrls.SEARCH_LOCATION)}
        />
      </div>

      <SaveButton title="프로필 저장" onClick={handleSave} />

      {message && <div className="mt-2 text-sm">{message}</div>}

      <div className="flex items-center justify-center gap-5 mt-4 text-xs font-bold">
        로그아웃
        <LucideLogOut size={16} />
      </div>
    </>
  );
};

export default ProfileUpdate;
