import React, { useState } from "react";
import { categoryList, CategoryProps } from "../constants/category";
import { ChevronDown } from "lucide-react";
import useClickOutside from "../hooks/useClickOutside";

const Category: React.FC<CategoryProps> = ({ text, icon }) => {
  return (
    <div className="flex w-fit flex-shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-2 font-medium drop-shadow-10">
      {icon}
      <div>{text}</div>
    </div>
  );
};

const CategoryList: React.FC = () => {
  return (
    <div className="flex gap-2 py-2 overflow-x-scroll w-svw">
      {categoryList.map(({ text, icon }) => (
        <Category key={text} text={text} icon={icon} />
      ))}
    </div>
  );
};

interface DropDownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDown: React.FC<DropDownProps> = ({ isOpen, setIsOpen }) => {
  const [type, setType] = useState<string>("모든사람");
  // 성향 리스트 넣을 부분
  const types: string[] = ["타입1", "타입2", "타입3", "타입4"];
  const dropdownRef = React.useRef<HTMLDivElement>(null!);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div
      ref={dropdownRef}
      onClick={() => setIsOpen(!isOpen)}
      className="relative flex h-fit items-center justify-center gap-1 rounded-lg bg-[#EEE] px-3 py-2 text-sm font-medium"
    >
      {type}
      <ChevronDown size={16} color="#666" strokeWidth={4} />
      <div
        className={`absolute right-0 top-9 ${isOpen ? "block" : "hidden"} w-full rounded-lg bg-white px-2 text-center drop-shadow-10`}
      >
        {types.map((type) => (
          <div
            key={type}
            onClick={() => setType(type)}
            className="py-2 border-b border-b-second last:border-none"
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

const MyProperty: React.FC<{ name: string; property: string }> = ({
  name,
  property,
}) => {
  return (
    <div className="rounded-full bg-white px-2 py-2.5">
      {name}님은 <span className="font-medium text-main">{property}</span>형!
    </div>
  );
};

const MapHeader: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  return (
    <div className="absolute z-10 flex flex-col max-w-full px-6 top-6">
      <CategoryList />
      <div className="flex items-center justify-between py-1">
        <MyProperty name="희연" property="플렉스" />
        <DropDown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />
      </div>
    </div>
  );
};

export default MapHeader;
