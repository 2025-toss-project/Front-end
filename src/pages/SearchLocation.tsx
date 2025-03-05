import DaumPostcodeEmbed from "react-daum-postcode";
import Header from "../components/common/Header";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";
import useSignupInfo from "../stores/signupInfo";

const SearchLocation = () => {
  const { moveToPage } = useMovePage();
  const { setSignupInfo } = useSignupInfo();

  const getCoordinates = async (address: string) => {
    const API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`;

    try {
      const response = await fetch(url, {
        headers: { Authorization: `KakaoAK ${API_KEY}` },
      });
      const data = await response.json();

      if (data.documents.length > 0) {
        const { x, y } = data.documents[0];
        setSignupInfo("location", address);
        setSignupInfo("home", { lat: parseFloat(y), lng: parseFloat(x) });
      } else {
        console.error("주소를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("좌표 변환 오류:", error);
    }
  };

  const onComplete = async (data: any) => {
    await getCoordinates(data.address);
    moveToPage(PageUrls.SIGNUP);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <Header />
      <DaumPostcodeEmbed style={{ height: "100%" }} onComplete={onComplete} />
    </div>
  );
};

export default SearchLocation;
