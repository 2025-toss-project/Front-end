import React, { useEffect, useState, useRef } from "react";
import useMapInfo from "../../stores/mapInfo";
import { Map } from "react-kakao-maps-sdk";
import { api } from "../../utils/api";
import useGetMyCurrentLocation from "../../hooks/useGetMyCurrentLocation";
import { debounce } from "lodash";

const KakaoMap: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const {
    level,
    myLocation,
    mapRef,
    setLevel,
    setMyLocation,
    setMapCenter,
    mapCenter,
    userSelect,
    setMapDatas,
  } = useMapInfo();

  const { locationInitialized } = useGetMyCurrentLocation(
    setMyLocation,
    setMapCenter,
  );

  const [radius, setRadius] = useState<number>(750);

  const getRadiusByZoom = (zoom: number) => {
    if (zoom <= 3) return 50 * 10;
    if (zoom <= 5) return 250 * 10;
    if (zoom <= 7) return 1000 * 10;
    if (zoom <= 9) return 4000 * 10;
    if (zoom <= 11) return 16000 * 10;
    return 128000 * 10;
  };

  const haversine = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number,
  ) => {
    const R = 6371000; // 지구 반지름 (미터)
    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const isOutOfBounds = (
    lat_c: number,
    lng_c: number,
    lat_n: number,
    lng_n: number,
    radius: number,
  ) => {
    const distance = haversine(lat_c, lng_c, lat_n, lng_n);
    return distance > radius;
  };

  const getPayList = async () => {
    try {
      let res;
      if (userSelect.type === "나의 소비") {
        res = await api.get("/map/all", {
          params: {
            lat: mapCenter.lat,
            lng: mapCenter.lng,
            radius: getRadiusByZoom(level) / 1000,
          },
        });
      } else {
        res = await api.get("/map/other", {
          params: {
            type: userSelect.type,
            lat: mapCenter.lat,
            lng: mapCenter.lng,
            radius: getRadiusByZoom(level) / 1000,
          },
        });
      }
      setMapDatas(res.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const getNewData = (newCenter: { lat: number; lng: number }) => {
    const threshold = radius * 0.8;
    if (
      isOutOfBounds(
        mapCenter.lat,
        mapCenter.lng,
        newCenter.lat,
        newCenter.lng,
        threshold,
      )
    ) {
      const newRadius = getRadiusByZoom(level);
      setRadius(newRadius);
      setMapCenter(newCenter);
      getPayList();
    }
  };

  const debounceGetNewData = debounce(getNewData, 500);
  const handleZoomChanged = (map: any) => {
    const newLevel = map.getLevel();
    setRadius(getRadiusByZoom(newLevel));
    setLevel(newLevel);
    const newCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    };
  };

  const handleCenterChanged = (map: any) => {
    const newCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    };
    debounceGetNewData(newCenter);
  };

  useEffect(() => {
    if (locationInitialized) {
      getPayList();
    }
  }, [userSelect.type, locationInitialized]);

  useEffect(() => {
    getPayList();
  }, [radius]);

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
      onZoomChanged={handleZoomChanged}
      onCenterChanged={handleCenterChanged}
    >
      {children}
    </Map>
  );
};

export default KakaoMap;
