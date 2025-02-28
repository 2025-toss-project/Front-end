import { LucideChevronLeft } from "lucide-react";
import React from "react";
import { useMovePage } from "../../hooks/useMovePage";

interface HeaderProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  bgcolor?: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({
  leftIcon = <LucideChevronLeft size={24} />,
  title,
  bgcolor = "bg-white",
  rightIcon = <div className="h-6 w-6" />,
}) => {
  const { moveToBack } = useMovePage();
  return (
    <div className={`flex h-16 items-center justify-between px-3 ${bgcolor}`}>
      <div onClick={moveToBack}>{leftIcon}</div>
      <p className="text-base font-medium">{title}</p>
      {rightIcon}
    </div>
  );
};

export default Header;
