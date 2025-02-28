import React, { ReactNode } from "react";

const Modal: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 mx-auto w-full min-w-[375px] max-w-[500px] overflow-hidden bg-black/60">
      <div className="grid h-full w-full grid-cols-[auto_1fr_auto] grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)] place-items-center overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default Modal;
