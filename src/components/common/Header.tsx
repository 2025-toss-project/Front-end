import { LucideChevronLeft } from "lucide-react";
import React from "react";

interface HeaderProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  title: string;
}

const Header: React.FC<HeaderProps> = ({
  leftIcon = <LucideChevronLeft size={24} />,
  title,
  rightIcon = <div className="w-6 h-6" />, // h-6, w-6 → 24px
}) => {
  return (
    <div className="flex items-center justify-between h-16 px-3">
      {leftIcon}
      <p className="text-base font-medium">{title}</p>
      {rightIcon}
    </div>
  );
};

export default Header;
