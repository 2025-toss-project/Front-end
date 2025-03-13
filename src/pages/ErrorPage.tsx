import React from "react";

import IconError from "../assets/IconError";
import { useMovePage } from "../hooks/useMovePage";
import PageUrls from "../constants/PageUrls";

const ErrorPage = () => {
  const { moveToPage } = useMovePage();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <IconError />
      <div className="mb-10 text-3xl font-bold text-main">404 ERROR</div>
      <div className="text-lg">죄송합니다. 페이지를 찾을 수 없습니다.</div>
      <div className="flex gap-10">
        <div
          onClick={() => {
            moveToPage(PageUrls.HOME);
          }}
          className="font-semibold underline underline-offset-4"
        >
          홈으로
        </div>
        <div
          onClick={() => {
            moveToPage(PageUrls.LOGIN);
          }}
          className="font-semibold underline underline-offset-4"
        >
          로그인
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
