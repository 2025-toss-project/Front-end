import React, { useEffect, useRef } from "react";
import { categoryList, CategoryProps } from "../constants/category";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import IconMapMarker from "../assets/IconMapMarker";
import { findCategory } from "../utils/findTypeOrCategory";

const MapIconMarker: React.FC<{
  position: { lat: number; lng: number };
  category: string;
}> = ({ position, category }) => {
  const markerCategory = findCategory(category);

  return (
    <CustomOverlayMap position={position}>
      <IconMapMarker color={markerCategory?.border || ""} />
      <div className="absolute left-[7px] top-2">
        {React.isValidElement(markerCategory?.icon) &&
          React.cloneElement(markerCategory.icon as React.ReactElement<any>, {
            color: "white",
          })}
      </div>
    </CustomOverlayMap>
  );
};

export default MapIconMarker;
