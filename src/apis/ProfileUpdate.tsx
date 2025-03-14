import React, { useEffect, useState } from "react";
import { updateProfileInfo, userInfo } from "../apis/userInfo";
import InputDefault from "../components/common/InputDefault";
import SelectAgeGroup from "../components/SelectAgeGroup";
import { SaveButton } from "../components/common/Buttons";
import { LucideLogOut } from "lucide-react";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import userStore from "../stores/user";


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

  const initialHomeAddress = (() => {
    if (typeof userData.home === "object" && userData.home !== null) {
      return userData.home.address;
    }
    return typeof userData.home === "string" ? userData.home : "";
  })();

  const renderHomePlaceholder = (): string => {
    console.log(originUserInfo);
    if (
      typeof originUserInfo.home === "object" &&
      originUserInfo.home !== null
    ) {
      const { address, lat, lng } = originUserInfo.home as {
        address: string;
        lat: number;
        lng: number;
      };
      // 만약 업데이트된 주소(address)가 존재하고, 초기 값과 다르다면 업데이트된 주소를 반환
      if (address && address !== initialHomeAddress) {
        return address;
      }
      // 그렇지 않으면 초기값 또는 기본 텍스트를 반환
      return initialHomeAddress || "집 정보";
    }
    return typeof userData.home === "string" && userData.home
      ? userData.home
      : "집 정보";
  };

  useEffect(() => {
    setOriginUserInfo(userData);
  }, [userData]);

  // 로그 아웃 작업중

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("로그아웃 실패: 토큰이 없습니다.");
      }

      // 강제로 accessToken을 포함해서 로그아웃 요청 보내기
      await fetch("http://3.37.61.199:8080/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include", // 쿠키 포함 (필요할 경우)
      });

      // 로컬 스토리지에서 토큰 삭제
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // 로그인 페이지로 이동
      window.location.href = PageUrls.LOGIN;
    } catch (error) {
      alert("로그아웃 처리 중 오류가 발생했습니다.");
    }
  };

  // -----------------------------------------------------------

  return (
    <>
      <div className="flex flex-col py-5">
        <div className="text-lg font-bold">프로필 정보</div>
        <div className="text-sm">개인정보를 확인하고 수정할 수 있습니다.</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row py-3 mb-5 border-b gap-9">
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
        <div className="relative flex justify-center text-sm bottom-5">
          {message}
        </div>
      )}

      <div
        className="flex items-center justify-center gap-5 mt-0 mb-5 text-xs font-bold cursor-pointer"
        onClick={handleLogout} // 로그아웃 함수 연결
      >
        로그아웃
        <LucideLogOut size={16} />
      </div>
    </>
  );
};

export default ProfileUpdate;
