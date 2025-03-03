import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header";
import usePageUpdate from "../hooks/usePageUpdate";

const MainLayout: React.FC = () => {
  const { pageColor } = usePageUpdate();
  return (
    <div
      className={`relative flex min-h-screen flex-col ${pageColor} box-border`}
    >
      <Header />
      <main className="flex w-full flex-grow justify-center px-6">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default MainLayout;
