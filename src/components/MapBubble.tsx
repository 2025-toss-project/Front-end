import React, { useEffect, useRef } from "react";
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
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bubbleRef.current) {
      const el = bubbleRef.current;
      el.style.setProperty("--border-color", findCategory?.border ?? "");
      el.style.setProperty(
        "--background-color",
        findCategory?.background ?? "",
      );
    }
  }, [findCategory]);

  return (
    <CustomOverlayMap position={position}>
      <div
        ref={bubbleRef}
        style={{
          backgroundColor: findCategory?.background,
          borderColor: findCategory?.border,
        }}
        className={`bubble flex items-end gap-1 border text-sm`}
      >
        {findCategory?.icon}
        <div>
          ₩{price}
          <span className="text-[10px]">({count})</span>
        </div>
      </div>
    </CustomOverlayMap>
  );
};

export default MapBubble;
