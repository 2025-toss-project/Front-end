import { LucideArrowUpNarrowWide } from "lucide-react";
import React from "react";
import CategorySection from "./CategorySection";

const SelectCategory = () => {
  return (
    <div className="y-[354px] grid grid-flow-row grid-cols-4">
      <CategorySection name="식비" />
      <div>02</div>
      <div>03</div>
      <div>04</div>
    </div>
  );
};

export default SelectCategory;
