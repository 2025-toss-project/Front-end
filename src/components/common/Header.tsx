import { LucideChevronLeft } from "lucide-react";
import React from "react";
import { useMovePage } from "../../hooks/useMovePage";
import useUpdatePageTitle from "../../hooks/useUpdatePageTitle";

interface HeaderProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  bgcolor?: string;
}

const Header: React.FC<HeaderProps> = ({
  leftIcon = <LucideChevronLeft size={24} />,

  bgcolor = "bg-white",
  rightIcon = <div className="h-6 w-6" />,
}) => {
  const { moveToBack } = useMovePage();
  const title = useUpdatePageTitle();

  return (
    <header
      className={`sticky inset-0 z-50 flex h-16 w-full items-center justify-between px-3 ${bgcolor}`}
    >
      <div onClick={moveToBack}>{leftIcon}</div>
      <p className="text-base font-medium">{title}</p>
      {rightIcon}
    </header>
  );
};

export default Header;
