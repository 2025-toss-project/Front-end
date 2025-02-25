import React from "react";
import { categoryList, CategoryProps } from "../constants/category";

const Category: React.FC<CategoryProps> = ({ text, icon }) => {
  return (
    <div className="drop-shadow-10 flex w-fit flex-shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-2 font-medium">
      {icon}
      <div>{text}</div>
    </div>
  );
};

const CategoryList: React.FC = () => {
  return (
    <div className="absolute top-12 z-10 flex max-w-[500px] gap-2 overflow-x-scroll py-2">
      {categoryList.map(({ text, icon }) => (
        <Category key={text} text={text} icon={icon} />
      ))}
    </div>
  );
};

export default CategoryList;
