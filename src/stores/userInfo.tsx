// stores/userInfo.ts
import { api } from "../utils/api"; // axios 인스턴스 가져오기

// 유저 홈 정보(위도, 경도)
export interface userInfoAd {
  lan: number;
  lat: number;
}

// 유저 정보(서버 GET)
export interface userInfo {
  nickname: string;
  email: string;
  type: string;
  ageGroup: string;
  home: userInfoAd;
}

// GET
export const fetchUserInfo = async (): Promise<{ result: userInfo }> => {
  try {
    const response = await api.get("/members/info");
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    throw error;
  }
};


export interface ProfileUpdateDTO {
  nickname: string;
  ageGroup: string;
  home: userInfoAd;
}

export interface UpdateProfilePayroad {
  profileUpdateDTOList: ProfileUpdateDTO[];
}

// POST
export const updateProfileInfo = async (
  updateProfileData: UpdateProfilePayroad
): Promise<any> => {
  try {
    const response = await api.post("/members/update", updateProfileData);
    return response.data;
  } catch (error) {
    console.error("프로필 업데이트 요청 중 오류 발생:", error);
    throw error;
  }
};

export default fetchUserInfo;
