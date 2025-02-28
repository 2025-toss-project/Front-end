import { LucideArrowUpNarrowWide } from "lucide-react";
import React from "react";
import { categoryList } from "../constants/category";
import CategorySection from "./sections/CategorySection";

//   <CategorySection icon={<IconFood size={28} />} name="식비" />

const SelectCategory = () => {
  return (
    <div className="grid grid-flow-row grid-cols-4 gap-2.5 py-2 pb-2">
      {categoryList.map((item, index) => (
        <CategorySection key={index} icon={item.icon} name={item.text} />
      ))}
    </div>
  );
};

export default SelectCategory;
