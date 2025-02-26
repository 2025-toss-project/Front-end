import React from "react";

interface MainButtonProps {
  title: string;
}

// 저장하기 버튼(todo: onclick submit)
export const SaveButton: React.FC<MainButtonProps> = ({ title }) => {
  return (
    <div className="flex justify-center">
      <button className="my-[20px] flex h-[48px] w-[324px] items-center justify-center rounded-[8px] bg-main px-4 text-[18px] font-medium text-white">
        {title}
      </button>
    </div>
  );
};
