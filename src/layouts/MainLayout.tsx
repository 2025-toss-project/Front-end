import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header";

interface MainLayoutProps {
  bgColor?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ bgColor = "bg-white" }) => {
  return (
    <div
      className={`relative flex min-h-screen flex-col ${bgColor} box-border`}
    >
      {/* <Header title={title} bgcolor={bgColor} /> */}
      <Header bgcolor={bgColor} />

      <main className="flex w-full flex-grow justify-center px-6">
        <Outlet />
      </main>

      <Navbar bgcolor={bgColor} />
    </div>
  );
};

export default MainLayout;
