import React from "react";

interface MainButtonProps {
  title: string;
}

// 저장하기 버튼(todo: onclick submit)
export const SaveButton: React.FC<MainButtonProps> = ({ title }) => {
  return (
    <button className="flex h-[48px] w-[324px] items-center justify-center justify-self-center rounded-[8px] bg-main px-4 text-white">
      {title}
    </button>
  );
};
