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
    <div>
      <div className="flex flex-col py-3 mb-5">
        <div className="flex gap-5">
          <label> {label} </label>
          <input type={type} placeholder={placeholder} />
        </div>
        <hr className="w-full border-second" />
      </div>
    </div>
  );
};

export default InputDefault;
