//components/InputDefault.tsx
// 일반 입력 받는 재사용 컴포넌트

import React from "react";

interface PayInputProps {
  label: string;
  type?: string;
  placeholder: string;
}

const InputDefault: React.FC<PayInputProps> = ({
  label,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="h-[60px]">
      <div className="flex flex-col py-3 mb-5 border-b">
        <div className="flex gap-5">
          <label> {label} </label>
          <input type={type} placeholder={placeholder} />
        </div>
      </div>
    </div>
  );
};

export default InputDefault;
