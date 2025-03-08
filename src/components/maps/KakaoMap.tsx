import React, { useEffect } from "react";
import useMapInfo from "../../stores/mapInfo";
import { Map } from "react-kakao-maps-sdk";
import { api } from "../../utils/api";
import useGetMyCurrentLocation from "../../hooks/useGetMyCurrentLocation";

const KakaoMap: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { level, myLocation, mapRef, setLevel, setMyLocation, setMapCenter } =
    useMapInfo();

  useGetMyCurrentLocation(setMyLocation, setMapCenter);
  useEffect(() => {
    console.log(myLocation);
  }, []);

  return myLocation.lat === 0 && myLocation.lng === 0 ? (
    <div className="absolute inset-0 z-[100] grid h-screen w-screen place-items-center bg-black/20">
      Loading...
    </div>
  ) : (
    <Map
      center={{ lat: myLocation.lat, lng: myLocation.lng }}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
      isPanto={true}
      level={level}
      ref={mapRef}
      onZoomChanged={(map) => {
        const level = map.getLevel();
        setLevel(level);
      }}
      onCenterChanged={(map) => {
        const lat = map.getCenter().getLat();
        const lng = map.getCenter().getLng();
      }}
    >
      {children}
    </Map>
  );
};

export default KakaoMap;
