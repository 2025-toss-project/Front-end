import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageUrls from "../constants/PageUrls";

const usePageUpdate = () => {
  const location = useLocation();
  const [pageColor, setPageColor] = useState<string>("bg-white");
  const [title, setTitle] = useState<string>("PayRode");
  const [backButton, setBackButton] = useState<boolean>(false);

  useEffect(() => {
    // 페이지 색상
    switch (location.pathname) {
      case PageUrls.BUDGET:
      case PageUrls.BUDGET_SET:
      case PageUrls.STATISTIC:
        setPageColor("bg-second-bg");
        break;
      default:
        setPageColor("bg-white");
    }

    // 페이지 타이틀
    switch (location.pathname) {
      case PageUrls.BUDGET:
        setTitle("목표 예산 관리");
        break;
      case PageUrls.BUDGET_SET:
        setTitle("목표 예산 설정");
        break;
      case PageUrls.ADD_PAY:
        setTitle("지출 내역 추가");
        break;
      case PageUrls.SEARCH_PLACE:
      case PageUrls.SEARCH_PLACE_MAP:
        setTitle("지출 장소 검색");
        break;
      case PageUrls.PAY_RECODE:
        setTitle("지출 내역 리스트");
        break;
      case PageUrls.MY_PAGE:
        setTitle("마이페이지");
        break;
      case PageUrls.PAY_DETAIL:
        setTitle("지출내역 상세");
        break;
      case PageUrls.STATISTIC:
        setTitle("통계");
        break;
      case PageUrls.SIGNUP:
        setTitle("회원가입");
        break;
      default:
        setTitle("PayRode");
    }

    // 뒤로가기 버튼
    switch (location.pathname) {
      case PageUrls.ADD_PAY:
      case PageUrls.SEARCH_PLACE:
      case PageUrls.SEARCH_PLACE_MAP:
      case PageUrls.BUDGET_SET:
      case PageUrls.SIGNUP:
      case PageUrls.SEARCH_LOCATION:
        setBackButton(true);
        break;
      default:
        setBackButton(false);
        break;
    }
  }, [location.pathname]);

  return { pageColor, title, backButton };
};

export default usePageUpdate;
