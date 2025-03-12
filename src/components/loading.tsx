import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-solid rounded-full border-second border-t-transparent animate-spin"></div>
    </div>
  );
};

export default Loading;
