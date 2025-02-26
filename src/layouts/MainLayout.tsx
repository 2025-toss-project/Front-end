import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header title="지출 내역 추가" />
      <main>{props.children}</main>
      <Navbar />
    </>
  );
};

export default MainLayout;
