import React, { useEffect, useState } from "react";
import { categoryList } from "../constants/category";
import CategorySection from "./sections/CategorySection";
import IconAll from "../assets/categoryIcons/IconAll";

interface CategoryProps {
  style: string;
  closeCategory: () => void;
  onSelectCategory: (category: string) => void;
}

const SelectCategory: React.FC<CategoryProps> = ({
  style,
  closeCategory,
  onSelectCategory,
}) => {
  return (
    <div
      className={`grid grid-flow-row grid-cols-4 justify-items-center gap-5 py-5 ${style}`}
    >
      {/* 카테고리 리스트 */}
      {categoryList.map((item) => (
        <CategorySection
          key={item.text}
          icon={item.icon({})}
          name={item.text}
          toggle={() => onSelectCategory(item.text)}
        />
      ))}

      {/* 전체항목 선택 (이걸 클릭하면 리스트가 펼쳐짐) */}
      <CategorySection
        icon={<IconAll />}
        name="전체항목"
        toggle={closeCategory}
      />
    </div>
  );
};

export default SelectCategory;
