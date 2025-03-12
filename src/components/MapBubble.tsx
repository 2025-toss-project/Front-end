import React, { useEffect, useRef } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import { findCategory } from "../utils/findTypeOrCategory";
import { formatPrice } from "../utils/formatFunc";
import IconMapMarker from "../assets/IconMapMarker";
import "../assets/css/bubble.css";

interface MapMarkerProps {
  type: "icon" | "bubble";
  position: { lat: number; lng: number };
  category: string;
  price?: number;
  count?: number;
  onClick?: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({
  type,
  position,
  category,
  price,
  count,
  onClick,
}) => {
  const categoryData = findCategory(category);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bubbleRef.current && type === "bubble") {
      const el = bubbleRef.current;
      el.style.setProperty("--border-color", categoryData?.border ?? "");
      el.style.setProperty(
        "--background-color",
        categoryData?.background ?? "",
      );
    }
  }, [categoryData, type]);

  return (
    <CustomOverlayMap position={position}>
      {type === "icon" ? (
        <div className="relative" onClick={onClick}>
          <IconMapMarker color={categoryData?.border || ""} />
          <div className="absolute left-[7px] top-2">
            {categoryData?.icon({ color: "white" })}
          </div>
        </div>
      ) : (
        <div
          onClick={onClick}
          ref={bubbleRef}
          style={{
            backgroundColor: categoryData?.background,
            borderColor: categoryData?.border,
          }}
          className="bubble flex items-end gap-1 border text-sm"
        >
          {categoryData?.icon && categoryData.icon({})}
          <div>
            ₩{formatPrice(price || 0)}
            {count && count > 1 && (
              <span className="text-[10px]">({count})</span>
            )}
          </div>
        </div>
      )}
    </CustomOverlayMap>
  );
};

export default MapMarker;
