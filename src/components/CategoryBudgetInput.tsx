import React, { useState, useEffect } from "react";

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
  // 초기값도 쉼표가 포함된 문자열로 설정
  const [rawValue, setRawValue] = useState<string>(budgetPrice.toLocaleString());

  // 상위 budgetPrice 변경 시 쉼표 포함된 값으로 업데이트
  useEffect(() => {
    setRawValue(budgetPrice.toLocaleString());
  }, [budgetPrice]);

  // 입력 변경 핸들러 (빈 값이어도 "0" 유지)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/\D/g, ""); // 숫자만 유지

    if (onlyNums === "") {
      setRawValue("0"); // 빈 값 입력하면 즉시 "0" 표시
      onChangeCategoryBudget(category, 0);
    } else {
      setRawValue(onlyNums);
      const parsed = parseInt(onlyNums, 10);
      onChangeCategoryBudget(category, isNaN(parsed) ? 0 : parsed);
    }
  };

  // 포커스 아웃 시 쉼표 추가
  const handleBlur = () => {
    const parsed = parseInt(rawValue.replace(/,/g, ""), 10);
    setRawValue(isNaN(parsed) ? "0" : parsed.toLocaleString()); // NaN 방지
  };

  return (
    <input
      type="text"
      maxLength={10}
      value={rawValue}
      onChange={handleChange}
      onBlur={handleBlur}
      className="border-0 bg-[#f8f8f8] text-right text-sm font-bold focus:outline-none"
    />
  );
};

export default CategoryBudgetInput;
