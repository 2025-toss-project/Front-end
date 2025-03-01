import React, { useEffect, useRef, useState } from "react";
import { useSearchPlace } from "../contexts/SearchPlaceContext";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const { selectPlace } = useSearchPlace();

  useEffect(() => {
    // Kakao API 로드 확인
    const checkKakao = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        console.log("Kakao Maps API 로드 완료");
        setLoaded(true);
        clearInterval(checkKakao);
      }
    }, 100);

    return () => clearInterval(checkKakao);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    if (!mapRef.current) {
      // 처음 한 번만 지도 생성
      console.log("지도 생성!");
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 좌표
        level: 3,
      };

      mapRef.current = new window.kakao.maps.Map(container, options);
    }
  }, [loaded]);

  useEffect(() => {
    if (!selectPlace) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(selectPlace, (data: any[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const place = data[0]; // 첫 번째 검색 결과
        const position = new window.kakao.maps.LatLng(place.y, place.x);

        console.log("선택된 장소:", selectPlace);
        console.log("좌표:", place.y, place.x);

        // 기존 마커 제거
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        // 새 마커 생성
        const marker = new window.kakao.maps.Marker({
          position,
        });
        marker.setMap(mapRef.current);
        markerRef.current = marker;

        //  지도 객체가 존재할 때만 setCenter 실행
        if (mapRef.current) {
          mapRef.current.setCenter(position);
        }
      }
    });
  }, [selectPlace, loaded]); // selectPlace가 바뀔 때마다 실행

  return <div id="map" style={{ width: "500px", height: "500px" }} />;
};

const MapPin = () => {
  const { selectPlace } = useSearchPlace();

  return (
    <div>
      <h1>선택된 장소: {selectPlace}</h1>
    </div>
  );
};

const MapPinPage = () => {
  return (
    <div>
      <Map></Map>
      <MapPin />
    </div>
  );
};

export default MapPinPage;
