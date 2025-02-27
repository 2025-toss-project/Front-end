import React, { useEffect, useRef } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import "../assets/bubble.css";
import { findCategory } from "../utils/findTypeOrCategory";
import { formatPrice } from "../utils/formatPrice";

const MapBubble: React.FC<{
  position: { lat: number; lng: number };
  category: string;
  price: number;
  count: number;
}> = ({ position, category, price, count }) => {
  const bubbleCategory = findCategory(category);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bubbleRef.current) {
      const el = bubbleRef.current;
      el.style.setProperty("--border-color", bubbleCategory?.border ?? "");
      el.style.setProperty(
        "--background-color",
        bubbleCategory?.background ?? "",
      );
    }
  }, [bubbleCategory]);

  return (
    <CustomOverlayMap position={position}>
      <div
        ref={bubbleRef}
        style={{
          backgroundColor: bubbleCategory?.background,
          borderColor: bubbleCategory?.border,
        }}
        className={`bubble flex items-end gap-1 border text-sm`}
      >
        {bubbleCategory?.icon}
        <div>
          ₩{formatPrice(price)}
          <span className="text-[10px]">({count})</span>
        </div>
      </div>
    </CustomOverlayMap>
  );
};

export default MapBubble;
