import React from "react";
import { NAV_ITEMS } from "../../constants/NavItem";
import { useMovePage } from "../../hooks/useMovePage";
import { useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const { moveToPage } = useMovePage();
  const loctaion = useLocation();
  const handleClickNavbar = (url: string) => {
    moveToPage(url);
  };

  return (
    <nav className="border-lightest sticky inset-0 z-50 h-16 w-full rounded-2xl border-t">
      <div className="flex h-full items-center justify-between bg-white px-5">
        {NAV_ITEMS.map(({ icon: Icon, label, navId, url }, idx) => (
          <div
            onClick={() => handleClickNavbar(url)}
            key={navId}
            className="flex flex-col items-center"
          >
            <Icon
              color={loctaion.pathname === url ? "#333" : "#aaa"}
              strokeWidth={1.5}
            />
            <p
              className={`text-xs text-second ${location.pathname === url ? "text-second-dark" : "text-second"}`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
