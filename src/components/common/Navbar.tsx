import React from "react";
import { NAV_ITEMS } from "../../constants/NavItem";

const Navbar = () => {
  return (
    <div className="h-16 border-t border-lightest rounded-2xl">
      <div className="flex items-center justify-between h-full px-5">
        {NAV_ITEMS.map(({ icon: Icon, label }, index) => (
          <div key={index} className="flex flex-col items-center">
            <Icon color="#aaa" strokeWidth={1.5} />
            <p className="text-xs text-second">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
