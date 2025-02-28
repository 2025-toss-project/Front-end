//components/InputDefault.tsx
// 일반 입력 받는 재사용 컴포넌트

import React, { useState } from "react";

interface PayInputProps {
  label?: string;
  type?: string;
  placeholder: string;
  style?: string;
}

const InputDefault: React.FC<PayInputProps> = ({
  label = "",
  type = "text",
  placeholder,
  style = "",
}) => {
  const [inputType, setInputType] = useState("type"); // 초기 상태를 저장

  return (
    <div className={`h-15 ${style}`}>
      <div className="mb-5 flex flex-col border-b py-3 focus-within:border-pink-500">
        <div className="flex gap-5">
          {label && <label className="w-20"> {label} </label>}
          <input
            type={inputType}
            placeholder={placeholder}
            className="text-default outline-none focus:outline-none focus:ring-0"
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
