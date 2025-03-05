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
    <nav className="sticky inset-0 z-50 h-16 w-full shrink-0 rounded-t-2xl border-t-[1px] border-t-second-lightest">
      <div className="flex items-center justify-between h-full px-5 bg-white rounded-t-2xl">
        {NAV_ITEMS.map(({ icon: Icon, label, navId, url }, idx) => (
          <div
            onClick={() => handleClickNavbar(url)}
            key={navId}
            className="flex flex-col items-center gap-0.5"
          >
            <Icon
              color={loctaion.pathname === url ? "#666" : "#aaa"}
              strokeWidth={1.5}
            />
            <p
              className={`text-xs text-second ${location.pathname === url ? "text-[#666]" : "text-second"}`}
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
