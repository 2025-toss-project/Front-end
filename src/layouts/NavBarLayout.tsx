import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const NavBarLayout = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

export default NavBarLayout;
