import { useNavigate } from "react-router-dom";

export const useMovePage = () => {
  const navigate = useNavigate();

  const moveToPage = (path: string, info?: any) => {
    navigate(path, info ? { state: info } : undefined);
  };

  const moveToMyPage = (path: string, info?: any) => {
    navigate(path, info ? { state: info } : undefined);
  };

  const moveToBack = () => {
    navigate(-1);
  };

  return { moveToPage, moveToBack, moveToMyPage };
};
