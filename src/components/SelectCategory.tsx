import React from "react";
import { categoryList } from "../constants/category";
import CategorySection from "./sections/CategorySection";

interface CategoryProps {
  classname?: string;
  selectName?: string;
  setSelectName: (name: string) => void;
}

const SelectCategory: React.FC<CategoryProps> = ({
  classname,
  setSelectName,
}) => {
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
            setSelectName(item.text);
          }}
        />
      ))}
    </div>
  );
};

export default SelectCategory;
