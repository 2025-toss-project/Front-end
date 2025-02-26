import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Header from "../components/common/Header";

interface MainLayoutProps {
  title: string;
  bgColor?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  title,
  bgColor = "bg-white",
}) => {
  return (
    <div
      className={`relative flex min-h-screen flex-col ${bgColor} box-border`}
    >
      {/* 헤더 (상단 고정) */}
      <header className="fixed left-0 top-0 z-50 w-full">
        <Header title={title} bgcolor={bgColor} />
      </header>

      {/* 메인 컨텐츠 (헤더 & 네브바 높이만큼 padding 적용) */}
      <main className="flex w-full flex-grow justify-center px-6 py-16">
        <Outlet /> {/* 자식 라우트가 렌더링될 위치 */}
      </main>

      {/* 네브바 (하단 고정) */}
      <nav className="fixed bottom-0 left-0 z-50 w-full">
        <Navbar bgcolor={bgColor} />
      </nav>
    </div>
  );
};

export default MainLayout;
