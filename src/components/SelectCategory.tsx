import React, { useEffect, useState } from "react";
import { categoryList } from "../constants/category";
import CategorySection from "./sections/CategorySection";
import IconAll from "../assets/categoryIcons/IconAll";
import { useCategoryInfo } from "../stores/categoryInfo";

interface CategoryProps {
  classname: string;
}

const SelectCategory: React.FC<CategoryProps> = ({ classname }) => {
  const { selectCategory, isOpen, setIsOpen, setSelectCategory } =
    useCategoryInfo();

  const toggleAll = () => {
    setIsOpen(!isOpen); // 전체 카테고리 열고 닫기
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

      {/* 전체항목 선택 (이걸 클릭하면 리스트가 펼쳐짐) */}
      <CategorySection icon={<IconAll />} name="전체항목" toggle={toggleAll} />
    </div>
  );
};

export default SelectCategory;
