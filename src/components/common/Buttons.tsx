import { LucideChevronDown } from "lucide-react";
import React, { useState } from "react";

interface MainButtonProps {
  title: string;
  style?: string;
}

interface DropButtonProps {
  title: string;
  isOpen: boolean; // 부모에서 받은 상태값
  toggle: () => void; // 상태 변경 함수
  icon?: React.ReactNode;
}

interface AddressButtonProps {
  title: string;
}

// 저장하기 버튼 (TODO: onclick submit)
export const SaveButton: React.FC<MainButtonProps> = ({ title, style }) => {
  return (
    <div className="flex w-full justify-center">
      <button
        className={`my-5 flex h-12 w-full items-center justify-center rounded-lg bg-main text-lg font-medium text-white ${style}`}
      >
        {title}
      </button>
    </div>
  );
};

export const DropButton: React.FC<DropButtonProps> = ({
  title,
  isOpen,
  toggle,
}) => {
  return (
    <div
      onClick={toggle}
      className="m-3 flex h-7 w-24 flex-row items-center justify-center gap-1 rounded-sm bg-second-lighter"
    >
      <p className="text-sm">{title}</p>
      <LucideChevronDown
        size={18}
        className={isOpen ? "rotate-180" : "rotate-0"}
      />
    </div>
  );
};

export const AddressButton: React.FC<AddressButtonProps> = ({ title }) => {
  return (
    <div className="m-1 inline-block rounded-md border border-second px-2 py-0.5">
      <p className="text-base text-sm font-light text-second"> {title}</p>
    </div>
  );
};
