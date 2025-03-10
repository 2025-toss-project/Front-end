import React, { useEffect, useState } from "react";
import {
  userInfo as UserInfoType,
  updateProfileInfo,
} from "../stores/userInfo";
import InputDefault from "./common/InputDefault";
import SelectAgeGroup from "./SelectAgeGroup";
import { SaveButton } from "./common/Buttons";
import { LucideLogOut } from "lucide-react";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";

interface ProfileUpdateProps {
  userData: UserInfoType | null;
}

const ProfileUpdate: React.FC<ProfileUpdateProps> = ({ userData }) => {
  const { moveToPage } = useMovePage();
  const [email, setEmail] = useState<string>("");
  const [nickName, setNickname] = useState<string>("");
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [lat, setLat] = useState<number>(0);
  const [lan, setLan] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (userData) {
      setNickname(userData.nickName);
      setEmail(userData.email);
      setAgeGroup(userData.ageGroup);
      setLat(userData.home?.lat || 0);
      setLan(userData.home?.lan || 0);
      setType(userData.type);
    }
  }, [userData]);

  const handleSave = async () => {
    setMessage("");

    const updateProfileData = {
      email,
      nickName,
      type,
      home: {
        lat,
        lan,
      },
      ageGroup,
    };

    console.log(updateProfileData);

    try {
      await updateProfileInfo(updateProfileData);
      setMessage("프로필 업데이트 성공!");
    } catch (error) {
      console.error(error);
      setMessage("프로필 업데이트 실패!");
    }
  };

  if (!userData) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className="flex flex-col py-5">
        <div className="text-lg font-bold">프로필 정보</div>
        <div className="text-sm">개인정보를 확인하고 수정할 수 있습니다.</div>
      </div>

      <div className="flex flex-col gap-2">
        <InputDefault
          placeholder={email || "이메일"}
          label="이메일"
          value={email}
          onChange={(val) => setEmail(val)}
          isReadOnly
        />

        {/* 닉네임 입력 */}
        <InputDefault
          placeholder={nickName || "닉네임"}
          label="닉네임"
          value={nickName}
          onChange={(val) => setNickname(val)}
        />

        {/* 연령대 선택 */}
        <SelectAgeGroup
          selectedAge={ageGroup}
          setSelectedAge={setAgeGroup}
          style="mb-5"
        />

        <InputDefault
          label="집 정보"
          placeholder={lat !== 0 || lan !== 0 ? `(${lat}, ${lan})` : "집 정보"}
          isReadOnly
          onClick={() => moveToPage(PageUrls.SEARCH_LOCATION)}
        />
      </div>

      <SaveButton title="프로필 저장" onClick={handleSave} />

      {message && <div className="mt-2 text-sm">{message}</div>}

      <div className="mt-4 flex items-center justify-center gap-5 text-xs font-bold">
        로그아웃
        <LucideLogOut size={16} />
      </div>
    </>
  );
};

export default ProfileUpdate;
