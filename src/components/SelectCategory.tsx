import React, { useEffect, useState } from "react";
import { categoryList } from "../constants/category";
import CategorySection from "./sections/CategorySection";
import IconAll from "../assets/categoryIcons/IconAll";
import { useCategoryInfo } from "../stores/categoryInfo";

interface CategoryProps {
  classname: string;
}

const SelectCategory: React.FC<CategoryProps> = ({ classname }) => {
  const { isOpen, setIsOpen, setSelectCategory } = useCategoryInfo();

  const toggleAll = () => {
    setSelectCategory("");
    setIsOpen(false); // 리스트닫기
  };

  const handleCategorySelect = (category: string) => {
    setSelectCategory(category);
    setIsOpen(false); // 카테고리 선택 후 리스트 닫힘
  };

  return (
    <div
      className={`grid grid-flow-row grid-cols-4 justify-items-center gap-5 py-5 ${classname}`}
    >
      {/* 카테고리 리스트 */}
      {categoryList.map((item) => (
        <CategorySection
          key={item.text}
          icon={item.icon({})}
          name={item.text}
          toggle={() => handleCategorySelect(item.text)}
        />
      ))}

      <CategorySection
        icon={<IconAll />}
        name={"전체항목"}
        toggle={() => toggleAll()}
      />
    </div>
  );
};

export default SelectCategory;
