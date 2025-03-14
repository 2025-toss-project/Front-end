import { useNavigate } from "react-router-dom";
import PageUrls from "../constants/PageUrls";

export const useMovePage = () => {
  const navigate = useNavigate();

  const moveToPage = (path: string, info?: any, replace?: boolean) => {
    navigate(path, {
      ...(info ? { state: info } : {}), // state가 있으면 추가
      ...(replace ? { replace } : {}), // replace가 true면 추가
    });
  };

  const moveToBack = () => {
    if (location.pathname === PageUrls.SIGNUP) {
      return navigate(PageUrls.LOGIN);
    }
    navigate(-1);
  };

  return { moveToPage, moveToBack };
};
