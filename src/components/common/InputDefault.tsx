//components/InputDefault.tsx
// 일반 입력 받는 재사용 컴포넌트

import React, { useState } from "react";

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
  const [inputType, setInputType] = useState("type"); // 초기 상태를 저장

  return (
    <div className="h-[60px]">
      <div className="flex flex-col py-3 mb-5 border-b">
        <div className="flex gap-5">
          <label className="w-[60px]"> {label} </label>
          <input
            type={inputType}
            placeholder={placeholder}
            className="text-default"
            onFocus={() => type === "date" && setInputType("date")} // 클릭하면 date로 변경
            onBlur={(e) =>
              type === "date" && !e.target.value && setInputType("text")
            } // 값이 없으면 다시 text로
          />
        </div>
      </div>
    </div>
  );
};

export default InputDefault;
