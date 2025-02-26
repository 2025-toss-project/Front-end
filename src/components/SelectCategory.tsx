import { LucideArrowUpNarrowWide } from "lucide-react";
import React from "react";
import CategorySection from "./sections/CategorySection";
import IconFood from "../assets/categoryIcons/IconFood";
import IconEducation from "../assets/categoryIcons/IconEducation";
import IconTraffic from "../assets/categoryIcons/IconTraffic";
import IconCom from "../assets/categoryIcons/IconCom";
import IconHealth from "../assets/categoryIcons/IconHealth";
import IconShopping from "../assets/categoryIcons/IconShopping";
import IconHobby from "../assets/categoryIcons/IconHobby";
import IconSaving from "../assets/categoryIcons/IconSaving";
import IconEvent from "../assets/categoryIcons/IconEvent";
import IconEtc from "../assets/categoryIcons/IconEtc";

const SelectCategory = () => {
  return (
    <div className="y-[354px] grid grid-flow-row grid-cols-4 gap-[10px] py-[12px] pb-[10px]">
      {/* TODO: 카테고리 map으로 동적 구현  */}
      <CategorySection icon={<IconFood size={28} />} name="식비" />
      <CategorySection icon={<IconEducation size={28} />} name="주거" />
      <CategorySection icon={<IconTraffic size={28} />} name="교통" />
      <CategorySection icon={<IconCom size={28} />} name="통신" />
      <CategorySection icon={<IconHealth size={28} />} name="건강" />
      <CategorySection icon={<IconShopping size={28} />} name="쇼핑" />
      <CategorySection icon={<IconEducation size={28} />} name="교육" />
      <CategorySection icon={<IconHobby size={28} />} name="문화생활" />
      <CategorySection icon={<IconSaving size={28} />} name="저축" />
      <CategorySection icon={<IconEvent size={28} />} name="경조사" />
      <CategorySection icon={<IconEtc size={28} />} name="기타" />
    </div>
  );
};

export default SelectCategory;
