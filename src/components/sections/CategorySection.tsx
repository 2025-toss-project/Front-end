import React from "react";

interface CategoryProps {
  icon: React.ReactNode;
  name: string;
}

const CategorySection: React.FC<CategoryProps> = ({ icon, name }) => {
  return (
    <div className="x-[65px] y-[69px] flex flex-col items-center gap-[6px] p-[10px]">
      {icon}
      <p className="text-[12px] font-medium text-second-dark">{name}</p>
    </div>
  );
};

export default CategorySection;
