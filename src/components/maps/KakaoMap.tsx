import React from "react";
import useMapInfo from "../../stores/mapInfo";
import { Map } from "react-kakao-maps-sdk";

const KakaoMap: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { mapInfo, setLevel } = useMapInfo();
  return (
    <Map
      center={{ lat: mapInfo.center.lat, lng: mapInfo.center.lng }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
      isPanto={true}
      level={mapInfo.level}
      ref={mapInfo.ref}
      onZoomChanged={(map) => {
        const level = map.getLevel();
        setLevel(level);
      }}
    >
      {children}
    </Map>
  );
};

export default KakaoMap;
