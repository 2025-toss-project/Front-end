import { useNavigate } from "react-router-dom";
import PageUrls from "../constants/PageUrls";
import useSignupInfo from "../stores/signupInfo";

export const useMovePage = () => {
  const navigate = useNavigate();
  const { resetSignupInfo } = useSignupInfo();

  const moveToPage = (path: string, info?: any, replace?: boolean) => {
    navigate(path, {
      ...(info ? { state: info } : {}), // state가 있으면 추가
      ...(replace ? { replace } : {}), // replace가 true면 추가
    });
  };

  const moveToBack = () => {
    if (location.pathname === PageUrls.SIGNUP) {
      resetSignupInfo();
      return navigate(PageUrls.LOGIN);
    }
    navigate(-1);
  };

  return { moveToPage, moveToBack };
};
