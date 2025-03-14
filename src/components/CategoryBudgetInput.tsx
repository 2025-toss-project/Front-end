import React, { useState, useEffect, useRef } from "react";

interface CategoryBudgetInputProps {
  category: string;
  budgetPrice: number;
  onChangeCategoryBudget: (category: string, newPrice: number) => void;
}

const CategoryBudgetInput: React.FC<CategoryBudgetInputProps> = ({
  category,
  budgetPrice,
  onChangeCategoryBudget,
}) => {
  const [rawValue, setRawValue] = useState<string>(
    budgetPrice.toLocaleString(),
  );
  const inputRef = useRef<HTMLInputElement>(null); // input 요소 참조

  useEffect(() => {
    setRawValue(budgetPrice.toLocaleString());
  }, [budgetPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let onlyNums = e.target.value.replace(/\D/g, "");

    if (onlyNums !== "") {
      onlyNums = String(parseInt(onlyNums, 10)); // 앞의 0 제거
    } else {
      onlyNums = "0";
    }

    setRawValue(onlyNums);
    onChangeCategoryBudget(category, parseInt(onlyNums, 10));
  };

  const handleBlur = () => {
    const parsed = parseInt(rawValue.replace(/,/g, ""), 10);
    setRawValue(isNaN(parsed) ? "0" : parsed.toLocaleString());
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const length = e.target.value.length;
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(length, length); // 커서를 끝으로 이동
      }
    }, 0);
  };

  return (
    <input
      ref={inputRef} // input 요소 참조 연결
      type="text"
      maxLength={10}
      value={rawValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus} // 포커스 시 커서 이동
      className="border-0 bg-[#f8f8f8] text-right text-sm font-bold focus:outline-none"
    />
  );
};

export default CategoryBudgetInput;
