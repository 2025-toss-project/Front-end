import React, { useEffect, useRef } from "react";
import { categoryList, CategoryProps } from "../constants/category";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import IconMapMarker from "../assets/IconMapMarker";

const MapIconMarker: React.FC<{
  position: { lat: number; lng: number };
  category: string;
}> = ({ position, category }) => {
  const findCategory: CategoryProps | undefined = categoryList.find(
    (item) => item.text === category,
  );

  const markerRef = useRef<HTMLDivElement>(null);

  return (
    <CustomOverlayMap position={position}>
      <IconMapMarker color={findCategory?.border || ""} />
      <div className="absolute left-[7px] top-2">
        {React.isValidElement(findCategory?.icon) &&
          React.cloneElement(findCategory.icon as React.ReactElement<any>, {
            color: "white",
          })}
      </div>
    </CustomOverlayMap>
  );
};

export default MapIconMarker;
