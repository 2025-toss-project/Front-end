import React, { useEffect, useState } from "react";
import { useCategoryInfo } from "../../stores/categoryInfo";
import useAddPayInfo from "../../stores/addpayInfo";

interface PayInputProps {
  label?: string;
  type?: string;
  placeholder: string;
  style?: string;
  isReadOnly?: boolean;
  onClick?: () => void;
  value?: string;
  onChange?: (value: string) => void;
}

const InputDefault: React.FC<PayInputProps> = ({
  label = "",
  type = "text",
  placeholder,
  style = "",
  isReadOnly = false,
  value = "",
  onClick,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const { selectCategory } = useCategoryInfo();
  const { setAddPayInfo } = useAddPayInfo();

  const formatPrice = (val: string) => {
    const num = Number(val.replace(/,/g, ""));
    return num.toLocaleString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;

    let newValue = e.target.value;

    switch (type) {
      case "price":
        newValue = newValue.replace(/[^0-9]/g, "");
        newValue = formatPrice(newValue);
        break;
      case "number":
        newValue = newValue.replace(/[^0-9]/g, "");
        break;
      case "category":
        break;
      default:
        break;
    }

    setInputValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    if (type === "category" && selectCategory) {
      setInputValue(selectCategory);
    } else if (type === "date" && !inputValue) {
      // date 타입일 경우, 값이 비어 있으면 오늘 날짜로 기본값 설정
      const today = new Date().toISOString().split("T")[0];
      setAddPayInfo("date", today);
    }
  }, [selectCategory, type, inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div onClick={onClick} className={`h-15 ${style}`}>
      <div className="mb-5 flex flex-col border-b py-3 focus-within:border-pink-500">
        <div className="flex gap-5">
          {label && <label className="w-20">{label}</label>}
          <input
            type={type === "date" ? "date" : type} // date 타입 처리
            placeholder={placeholder}
            readOnly={isReadOnly}
            value={inputValue}
            onChange={handleChange}
            onClick={(e) => isReadOnly && e.preventDefault()}
            className={`text-default w-full outline-none focus:outline-none focus:ring-0 ${style}`}
          />
        </div>
      </div>
    </div>
  );
};

export default InputDefault;
