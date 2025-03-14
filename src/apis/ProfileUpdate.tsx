import React, { useEffect, useState } from "react";
import { updateProfileInfo, userInfo } from "../apis/userInfo";
import InputDefault from "../components/common/InputDefault";
import SelectAgeGroup from "../components/SelectAgeGroup";
import { SaveButton } from "../components/common/Buttons";
import { LucideLogOut } from "lucide-react";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import userStore from "../stores/user";
import { api } from "../utils/api";

const ProfileUpdate: React.FC<{ userData: userInfo }> = ({ userData }) => {
  const { moveToPage } = useMovePage();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { userInfo, setUserInfo } = userStore();
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
    setMessage("프로필 저장중...");

    try {
      await updateProfileInfo(originUserInfo);
      setMessage("프로필 업데이트 완료");
      setUserInfo(originUserInfo);
      setTimeout(() => {
        setMessage("");
      }, 1000);
    } catch (error) {
      setMessage("프로필 업데이트 실패!");
    } finally {
      setLoading(false); 
    }
  };

  if (!userData) {
    return <div className="flex items-center justify-center">실패</div>;
  }

  useEffect(() => {
    setOriginUserInfo(userData);
  }, [userData]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("로그아웃 실패: 토큰이 없습니다.");
      }

      await api.post("/logout");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // 로그인 페이지로 이동
      window.location.href = PageUrls.LOGIN;
    } catch (error) {
      alert("로그아웃 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className="flex flex-col py-5">
        <div className="text-lg font-bold">프로필 정보</div>
        <div className="text-sm">개인정보를 확인하고 수정할 수 있습니다.</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="mb-5 flex flex-row gap-9 border-b py-3">
          <div>이메일</div>{" "}
          <span className="text-second">{originUserInfo.email} </span>
        </div>

        {/* 닉네임 입력 */}
        <InputDefault
          placeholder={originUserInfo.nickname || "닉네임"}
          label="닉네임"
          value={originUserInfo.nickname}
          onChange={handlenicknameChange}
          style="text-black placeholder-black"
        />

        {/* 연령대 선택 */}
        <SelectAgeGroup
          selectedAge={originUserInfo.ageGroup}
          setSelectedAge={handleAgeGroupChange}
          style="mb-5"
        />

        <InputDefault
          label="집 정보"
          placeholder={originUserInfo.home.address}
          isReadOnly
          onClick={() =>
            moveToPage(PageUrls.SEARCH_LOCATION, { prevPage: "mypage" })
          }
          style="text-black placeholder-black"
        />
      </div>

      <SaveButton title="프로필 저장" onClick={handleSave} />

      {message && (
        <div className="relative bottom-5 flex justify-center text-sm">
          {message}
        </div>
      )}

      <div
        className="mb-5 mt-0 flex cursor-pointer items-center justify-center gap-5 text-xs font-bold"
        onClick={handleLogout}
      >
        로그아웃
        <LucideLogOut size={16} />
      </div>
    </>
  );
};

export default ProfileUpdate;
