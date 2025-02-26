import React from "react";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header";

const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header title="지출 내역 추가" />
      <main className="flex flex-grow flex-col">{props.children}</main>
      <Navbar />
    </div>
  );
};

export default MainLayout;
