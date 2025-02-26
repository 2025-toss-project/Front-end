import React, { useEffect } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import "../assets/bubble.css";
import { categoryList, CategoryProps } from "../constants/category";

const MapBubble: React.FC<{
  position: { lat: number; lng: number };
  category: string;
  price: number;
  count: number;
}> = ({ position, category, price, count }) => {
  const findCategory: CategoryProps | undefined = categoryList.find(
    (item) => item.text === category,
  );

  useEffect(() => {
    console.log(findCategory);
  }, []);

  return (
    <CustomOverlayMap position={position}>
      <div
        className={`bubble flex gap-1 bg-${findCategory?.bgColor} border-${findCategory?.borderColor} after:border-${findCategory?.bgColor} before:border-${findCategory?.borderColor}`}
      >
        {findCategory?.icon}
        <div>
          ₩{price}
          <span>({count})</span>
        </div>
      </div>
    </CustomOverlayMap>
  );
};

export default MapBubble;
