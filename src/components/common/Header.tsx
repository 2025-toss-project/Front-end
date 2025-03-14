import { LucideChevronLeft } from "lucide-react";
import React from "react";
import { useMovePage } from "../../hooks/useMovePage";
import usePageUpdate from "../../hooks/usePageUpdate";

interface HeaderProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  leftIcon = <LucideChevronLeft size={24} />,
  rightIcon = <div className="h-6 w-6" />,
}) => {
  const { moveToBack } = useMovePage();
  const { title, pageColor, backButton } = usePageUpdate();
  return (
    <header
      className={`sticky inset-0 z-50 flex h-16 w-full items-center justify-between px-3 ${pageColor}`}
    >
      {backButton ? (
        <div onClick={moveToBack}>{leftIcon}</div>
      ) : (
        <div>{rightIcon}</div>
      )}
      <p className="text-base font-medium">{title}</p>
      {rightIcon}
    </header>
  );
};

export default Header;
