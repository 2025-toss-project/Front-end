import React from "react";
import { NAV_ITEMS } from "../../constants/NavItem";

interface NavbarProps {
  bgcolor?: string;
}

const Navbar: React.FC<NavbarProps> = ({ bgcolor = "bg-white" }) => {
  return (
    <div className="border-lightest h-16 rounded-2xl border-t">
      <div
        className={`${bgcolor} flex h-full items-center justify-between px-5`}
      >
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
