import React, { useEffect, useState } from "react";

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
  const [inputType, setInputType] = useState(type);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (type === "date" && !value) {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 포맷
      setInputValue(today);
    } else {
      setInputValue(formatValue(value));
    }
  }, [value, type]);

  const formatValue = (val: string) => {
    if (type === "price" && val) {
      const num = Number(val.replace(/,/g, ""));
      return num.toLocaleString();
    }
    return val;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;

    let newValue = e.target.value;

    if (type === "price") {
      newValue = newValue.replace(/[^0-9]/g, "");
      newValue = formatValue(newValue);
    }

    if (type === "number") {
      newValue = newValue.replace(/[^0-9]/g, "");
    }

    setInputValue(newValue);
    onChange?.(newValue);
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
            className="text-default w-full outline-none focus:outline-none focus:ring-0"
          />
        </div>
      </div>
    </div>
  );
};

export default InputDefault;
