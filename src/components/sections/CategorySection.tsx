import React from "react";

//
interface CategoryProps {
  icon: React.ReactNode;
  name: string;
  toggle: () => void;
}

const CategorySection: React.FC<CategoryProps> = ({ icon, name, toggle }) => {
  return (
    <div
      onClick={toggle}
      className="x-16 y-17 flex flex-col items-center gap-1.5"
    >
      {icon}
      <p className="text-[12px] font-medium text-second-dark">{name}</p>
    </div>
  );
};

export default CategorySection;
