import React from "react";

interface CategoryProps {
  icon?: string;
  name: string;
}

const CategorySection: React.FC<CategoryProps> = ({ icon, name }) => {
  return (
    <div className="x-[65px] y-[69px] flex flex-col items-center gap-[6px]">
      <div className="x-[28px] y-[28px]">아이콘</div>
      <p className="text-[12px] font-medium text-second-dark">{name}</p>
    </div>
  );
};

export default CategorySection;
