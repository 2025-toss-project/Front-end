import React, { useEffect } from "react";
import { categoryList } from "../constants/category";
import CategorySection from "./sections/CategorySection";
import { useCategoryInfo } from "../stores/categoryInfo";
import IconAll from "../assets/categoryIcons/IconAll";

interface CategoryProps {
  classname?: string;
}

const SelectCategory: React.FC<CategoryProps> = ({ classname }) => {
  const { setSelectCategory, setIsOpen } = useCategoryInfo();

  const newCategory = () => {
    return (
      <div>
        <CategorySection
          icon={<IconAll />}
          name="전체항목"
          toggle={() => {
            setSelectCategory("");
            setIsOpen(false);
          }}
        />
      </div>
    );
  };

  return (
    <div
      className={`grid grid-flow-row grid-cols-4 justify-items-center gap-5 py-5 ${classname}`}
    >
      {categoryList.map((item) => (
        <CategorySection
          key={item.text}
          icon={item.icon({})}
          name={item.text}
          toggle={() => {
            setSelectCategory(item.text);
            setIsOpen(false);
          }}
        />
      ))}

      {newCategory()}
    </div>
  );
};

export default SelectCategory;
