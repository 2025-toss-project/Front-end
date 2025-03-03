import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import PageUrls from "../constants/PageUrls";

const useUpdatePageTitle = () => {
  const location = useLocation();

  return useMemo(() => {
    switch (location.pathname) {
      case PageUrls.BUDGET:
        return "목표 예산 관리";
      case PageUrls.BUDGET_SET:
        return "목표 예산 설정";
      case PageUrls.ADD_PAY:
      case PageUrls.ADD_PAY_SEARCH_PLACE:
      case PageUrls.ADD_PAY_SEARCH_PLACE_MAP:
        return "지출 내역 추가";
      case PageUrls.PAY_RECODE:
        return "지출 내역 리스트";
      case PageUrls.MY_PAGE:
        return "마이페이지";
      case PageUrls.PAY_DETAIL:
        return "지출내역 상세";
      case PageUrls.STATISTIC:
        return "통계";
      case PageUrls.SIGNUP:
        return "회원가입";
      default:
        return "PayRode";
    }
  }, [location.pathname]);
};

export default useUpdatePageTitle;
