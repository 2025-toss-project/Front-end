import { LucideArrowUpNarrowWide } from "lucide-react";
import React, { useState } from "react";
import { categoryList } from "../constants/category";
import CategorySection from "./sections/CategorySection";

//   <CategorySection icon={<IconFood size={28} />} name="식비" />

interface CategoryProps {
  classname?: string;
  selectName: string;
  selectIcon: React.ReactNode;
  setSelectName: (name: string) => void;
  setSelectIcon: (name: React.ReactNode) => void;
}

const SelectCategory: React.FC<CategoryProps> = ({
  classname,
  setSelectName,
  setSelectIcon,
}) => {
  return (
    <div
      className={`grid grid-flow-row grid-cols-4 justify-items-center gap-5 py-5 ${classname}`}
    >
      {categoryList.map((item, index) => (
        <CategorySection
          key={index}
          icon={item.icon}
          name={item.text}
          toggle={() => {
            setSelectName(item.text);
            setSelectIcon(item.icon);
          }}
        />
      ))}
    </div>
  );
};

export default SelectCategory;
