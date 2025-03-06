import React, { useEffect } from "react";
import { categoryList } from "../constants/category";
import CategorySection from "./sections/CategorySection";
import { useCategoryInfo } from "../stores/CategoryInfo";
import useAddPayInfo from "../stores/addpayInfo";

interface CategoryProps {
  classname?: string;
}

const SelectCategory: React.FC<CategoryProps> = ({ classname }) => {
  const { setSelectName, setIsOpen } = useCategoryInfo();
  const { selectName } = useCategoryInfo();

  useEffect(() => {
    console.log("selectName:", selectName);
  }, [selectName]);

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
            setIsOpen(false);
          }}
        />
      ))}
    </div>
  );
};

export default SelectCategory;
