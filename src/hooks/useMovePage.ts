import { useNavigate } from "react-router-dom";

export const useMovePage = () => {
  const navigate = useNavigate();

  const moveToPage = (path: string) => {
    navigate(path);
  };

  const moveToBack = () => {
    navigate(-1);
  };

  return { moveToPage, moveToBack };
};
