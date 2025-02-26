import { LucideChevronLeft, LucideTrash } from "lucide-react";
import React from "react";

interface HeaderProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  title: string;
}

const Header: React.FC<HeaderProps> = ({
  leftIcon = <LucideChevronLeft />,
  title,
  rightIcon = <div className="h-[24px] w-[24px]"></div>,
}) => {
  return (
    <div className="flex h-[64px] flex-row items-center justify-between px-[12px]">
      {leftIcon}
      <p className="text-[16px] font-medium"> {title} </p>
      {rightIcon}
    </div>
  );
};

export default Header;
