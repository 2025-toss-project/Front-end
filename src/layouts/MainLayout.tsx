import React from "react";
import Navbar from "../components/Navbar";

const MainLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <div> 헤더들어갈 자리 </div>
      <main>{props.children}</main>
      <Navbar />
    </>
  );
};

export default MainLayout;
