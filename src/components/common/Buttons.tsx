import React from "react";

interface MainButtonProps {
  title: string;
}

// 저장하기 버튼 (TODO: onclick submit)
export const SaveButton: React.FC<MainButtonProps> = ({ title }) => {
  return (
    <div className="flex justify-center px-4">
      <button className="flex items-center justify-center w-full h-12 my-5 text-lg font-medium text-white rounded-lg bg-main">
        {title}
      </button>
    </div>
  );
};
