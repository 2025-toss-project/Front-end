import React, { useEffect, useState, useRef } from "react"; // useRef 추가
import useMapInfo from "../../stores/mapInfo";
import { Map } from "react-kakao-maps-sdk";
import { api } from "../../utils/api";
import useGetMyCurrentLocation from "../../hooks/useGetMyCurrentLocation";
import { throttle } from "lodash";

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
    mapDatas,
    setMapDatas,
  } = useMapInfo();

  useGetMyCurrentLocation(setMyLocation, setMapCenter);

  const [radius, setRadius] = useState<number>(750); // 초기 반경 (m)

  const getRadiusByZoom = (zoom: number) => {
    if (zoom <= 3) return 50 * 10; // 500m
    if (zoom <= 5) return 250 * 5; // 1250m
    if (zoom <= 7) return 1000 * 3; // 3km
    if (zoom <= 9) return 4000 * 2; // 8km
    if (zoom <= 11) return 16000 * 1.5; // 24km
    return 128000 * 1; // 128km
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
    return R * c; // 거리 (미터)
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
      console.log(res.data);
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

  const throttledGetNewData = throttle(getNewData, 1000);
  const handleZoomChanged = (map: any) => {
    const newLevel = map.getLevel();
    setLevel(newLevel);
    const newCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    };
    throttledGetNewData(newCenter);
  };

  const handleCenterChanged = (map: any) => {
    const newCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    };
    throttledGetNewData(newCenter);
  };

  useEffect(() => {
    if (mapCenter.lat === 0 && mapCenter.lng === 0) return;
    getPayList();
  }, [mapCenter, userSelect.type]);

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
