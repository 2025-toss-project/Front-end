import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-second border-t-transparent"></div>
    </div>
  );
};

export default Loading;
