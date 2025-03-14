import DaumPostcodeEmbed from "react-daum-postcode";
import Header from "../components/common/Header";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import useSignupInfo from "../stores/signupInfo";
import { useLocation } from "react-router-dom";
import userStore from "../stores/user";

const SearchLocation = () => {
  const { moveToPage } = useMovePage();
  const { setSignupInfo } = useSignupInfo();
  const { setUserInfo } = userStore();
  const location = useLocation();

  const getCoordinates = async (address: string) => {
    const API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;

    try {
      const response = await fetch(url, {
        headers: { Authorization: `KakaoAK ${API_KEY}` },
      });
      const data = await response.json();

      if (data.documents && data.documents.length > 0) {
        const { x, y } = data.documents[0];
        if (location.state && location.state.prevPage === "mypage") {
          // 업데이트할 때 선택된 주소(address)를 명시적으로 넣어 최신화합니다.
          const currentUserInfo = userStore.getState().userInfo;
          setUserInfo({
            ...currentUserInfo,
            home: { lat: parseFloat(y), lng: parseFloat(x), address: address },
          });
        } else if (location.state && location.state.prevPage === "signup") {
          setSignupInfo("home", {
            lat: parseFloat(y),
            lng: parseFloat(x),
            address: address,
          });
        }
      } else {
        console.error("주소를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("좌표 변환 오류:", error);
    }
  };

  const onComplete = async (data: any) => {
    await getCoordinates(data.address);
    if (location.state && location.state.prevPage === "mypage") {
      moveToPage(PageUrls.MY_PAGE);
    } else if (location.state && location.state.prevPage === "signup") {
      moveToPage(PageUrls.SIGNUP);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header />
      <DaumPostcodeEmbed style={{ height: "100%" }} onComplete={onComplete} />
    </div>
  );
};

export default SearchLocation;
