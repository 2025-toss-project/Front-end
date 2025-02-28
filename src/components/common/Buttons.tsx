import React from "react";

interface MainButtonProps {
  title: string;
  style?: string;
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
