import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const NavBarLayout = () => {
  return (
    <div className="relative flex flex-col h-full">
      <Outlet />
      <Navbar />
    </div>
  );
};

export default NavBarLayout;
