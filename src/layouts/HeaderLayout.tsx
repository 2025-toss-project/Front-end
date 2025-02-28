import React from "react";
import Header from "../components/common/Header";
import { Outlet } from "react-router-dom";

const HeaderLayout = () => {
  return (
    <>
      <header className="sticky inset-0 z-50 w-full">
        <Header title="회원가입" />
      </header>

      <Outlet />
    </>
  );
};

export default HeaderLayout;
