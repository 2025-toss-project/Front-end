import React, { useEffect, useState } from "react";
import { categoryList, CategoryProps } from "../../constants/category";
import { ChevronDown } from "lucide-react";
import useClickOutside from "../../hooks/useClickOutside";
import { payTypeList, PayTypeProps } from "../../constants/payType";
import useUserInfo from "../../stores/userInfo";
import { findType } from "../../utils/findTypeOrCategory";
import IconMyPay from "../../assets/payTypeIcons/IconMyPay";
import useMapInfo from "../../stores/mapInfo";
import { api } from "../../utils/api";

const Category: React.FC<CategoryProps> = ({ text, icon }) => {
  const { setUserSelect, userSelect } = useMapInfo();
  const handleClickCategory = (text: string) => {
    if (userSelect.category === text) setUserSelect({ category: "" });
    else setUserSelect({ category: text });
  };

  return (
    <div
      onClick={() => {
        handleClickCategory(text);
      }}
      className={`flex w-fit flex-shrink-0 items-center gap-1 rounded-full border bg-white px-2.5 py-2 font-medium drop-shadow-10 ${userSelect.category === text ? "border-main" : "border-white"}`}
    >
      {icon({})}
      <div>{text}</div>
    </div>
  );
};

const CategoryList: React.FC = () => {
  return (
    <div className="flex w-[calc(100vw-24px)] max-w-[476px] gap-2 overflow-x-scroll py-2 pr-6">
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
  const dropdownRef = React.useRef<HTMLDivElement>(null!);
  const myPay = {
    type: "나의 소비",
    icon: (props: { size?: number }) => <IconMyPay {...props} />,
  };
  const { userSelect, setUserSelect } = useMapInfo();
  const types = [myPay, ...payTypeList];
  const selectedType = findType(userSelect.type) || myPay;

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div
      ref={dropdownRef}
      onClick={() => setIsOpen(!isOpen)}
      className="relative flex h-fit w-[134px] items-center justify-between gap-1 rounded-lg bg-[#EEE] px-3 py-2 text-sm font-medium"
    >
      <div className="flex items-center gap-1">
        {selectedType.icon({ size: 20 })}
        {userSelect.type}
      </div>
      <ChevronDown size={16} color="#666" strokeWidth={4} />
      <div
        className={`absolute right-0 top-9 ${isOpen ? "block" : "hidden"} w-full rounded-lg bg-white px-2 text-center drop-shadow-10`}
      >
        {types.map((type) => (
          <div
            key={type.type}
            onClick={() => setUserSelect({ type: type.type })}
            className={`flex gap-1 border-b border-b-second py-2 last:border-none ${selectedType.type === type.type ? "font-bold text-main" : ""}`}
          >
            {type.icon({ size: 20 })}
            {type.type}
          </div>
        ))}
      </div>
    </div>
  );
};

const MyProperty = () => {
  const [userInfo, setUserInfo] = useState({
    nickname: "",
    email: "",
    type: "",
    ageGroup: "",
    home: {
      lng: 0,
      lat: 0,
    },
  });

  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const res = await api.get("/members/info");
        setUserInfo(res.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    getMyInfo();
  }, []);

  const typeInfo: PayTypeProps = findType(userInfo.type) || {
    type: "",
    discription: "",
    icon: () => <></>,
  };
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-2 drop-shadow-10">
      {typeInfo.icon({ size: 20 })}
      <div>
        {userInfo.nickname}님은
        <span className="font-medium text-main"> {userInfo.type}</span>!
      </div>
    </div>
  );
};

const MapHeader: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  return (
    <div className="z-10 flex max-w-full flex-col">
      <CategoryList />
      <div className="flex items-center justify-between py-1">
        <MyProperty />
        <DropDown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />
      </div>
    </div>
  );
};

export default MapHeader;
