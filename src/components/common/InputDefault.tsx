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
  const [inputType, setInputType] = useState("type"); // 초기 타입 설정(문자열!)
  const [inputValue, setInputValue] = useState(value); // 입력값 상태 관리

  useEffect(() => {
    setInputValue(formatValue(value)); // 초기 값 설정 시 포맷 적용
  }, [value]);

  const formatValue = (val: string) => {
    if (type === "number" && val) {
      const num = Number(val.replace(/,/g, "")); // 쉼표 제거 후 숫자로 변환
      return num.toLocaleString(); // 쉼표 추가된 문자열 반환
    }
    return val; // 숫자가 아닐 경우 그대로 반환
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;

    let newValue = e.target.value;

    // 숫자에 쉼표달기
    if (type === "number") {
      newValue = newValue.replace(/[^0-9]/g, ""); // 숫자만 허용
      newValue = formatValue(newValue); // 숫자일 경우 쉼표 추가
    }

    setInputValue(newValue); // 상태 업데이트
  };

  return (
    <div onClick={onClick} className={`h-15 ${style}`}>
      <div className="mb-5 flex flex-col border-b py-3 focus-within:border-pink-500">
        <div className="flex gap-5">
          {label && <label className="w-20">{label}</label>}
          <input
            type={inputType}
            placeholder={placeholder}
            readOnly={isReadOnly}
            value={inputValue}
            onChange={handleChange}
            onClick={(e) => isReadOnly && e.preventDefault()}
            className="text-default outline-none focus:outline-none focus:ring-0"
            onFocus={() => type === "date" && setInputType("date")} // 누르면 달력 처럼
            onBlur={
              (e) => type === "date" && !e.target.value && setInputType("text") // 텍스트인 것처럼 보이게
            }
          />
        </div>
      </div>
    </div>
  );
};

export default InputDefault;
