//components/InputDefault.tsx
// 일반 입력 받는 재사용 컴포넌트

import React, { useEffect, useState } from "react";

interface PayInputProps {
  label?: string;
  type?: string;
  placeholder: string;
  style?: string;
  isReadOnly?: boolean; // 읽기 전용 체크
  onClick?: () => void; // 이동할 페이지 핸들러
  value?: string; // 입력 값
}

const InputDefault: React.FC<PayInputProps> = ({
  label = "",
  type = "text",
  placeholder,
  style = "",
  isReadOnly = false,
  value = "",
  onClick,
}) => {
  const [inputType, setInputType] = useState("type"); // 초기 type 상태를 저장
  const [inputValue, setInputValue] = useState(value); // 초기 value 상태를 props 에서 받아옴

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue); // 내부 상태 업데이트
  };

  return (
    <div onClick={onClick} className={`h-15 ${style}`}>
      <div className="mb-5 flex flex-col border-b py-3 focus-within:border-pink-500">
        <div className="flex gap-5">
          {label && <label className="w-20"> {label} </label>}
          <input
            type={inputType}
            placeholder={placeholder}
            readOnly={isReadOnly}
            value={inputValue}
            onChange={handleChange}
            onClick={(e) => isReadOnly && e.preventDefault()}
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
