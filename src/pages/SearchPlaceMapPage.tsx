import React, { useEffect, useRef, useState } from "react";
import { useMovePage } from "../hooks/useMovePage";
import { SaveButton } from "../components/common/Buttons";
import { LucideMapPin } from "lucide-react";
import { createRoot } from "react-dom/client";
import PageUrls from "../constants/PageUrls";
import { useLocation } from "react-router-dom";
import useAddPayInfo from "../stores/addpayInfo";
import useLocationInfo from "../stores/locationInfo";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Place {
  place_name: string;
  road_address_name?: string;
  address_name: string;
  phone?: string;
  lat: number; // 위도
  lng: number; // 경도
}

const Map = () => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [currentLat, setCurrentLat] = useState<number | null>(null); // 지도 위치 위도 상태
  const [currentLng, setCurrentLng] = useState<number | null>(null); // 지도 위치 경도 상태
  const [currentLocationName, setCurrentLocationName] = useState<string>("");
  const { locationName, lat, lng } = useLocationInfo(); // locationInfo에서 값 가져오기
  const { addpayInfo, setAddPayInfo } = useAddPayInfo();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode") || "add";
  const placeData = searchParams.get("place");

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

    // 위도, 경도 값으로 지도 위치 설정
    if (lat && lng) {
      const position = new window.kakao.maps.LatLng(lat, lng); // locationInfo에서 가져온 위도, 경도 사용

      // 지도 위치 변경
      mapRef.current.setCenter(position);

      // 마커 추가
      const marker = new window.kakao.maps.Marker({
        position,
      });
      marker.setMap(mapRef.current);

      console.log("선택된 장소:", locationName);
      console.log("좌표:", lng, lat);

      // 기존 마커 제거
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // React 컴포넌트 렌더링할 DOM 요소 생성
      const container = document.createElement("div");
      container.className = "custom-marker";
      container.style.position = "absolute";
      container.style.transform = "translate(-50%, -100%)"; // 중심이 아래쪽 기준이 되도록 조정
      container.style.overflow = "visible"; // 아이콘이 넘칠 수 있도록 설정

      // React 컴포넌트 렌더링
      createRoot(container).render(
        <div className="flex h-10 w-10 items-center justify-center">
          <LucideMapPin fill="#C80150" color="#fff" strokeWidth="1" size={35} />
        </div>,
      );

      const overlay = new window.kakao.maps.CustomOverlay({
        position,
        content: container,
        yAnchor: 0.9, // 위치 조정
      });

      overlay.setMap(mapRef.current);
      markerRef.current = overlay;

      // 지도 객체가 존재할 때만 setCenter 실행
      if (mapRef.current) {
        mapRef.current.setCenter(position);
      }
    }
  }, [loaded, lat, lng, locationName]); // locationName, lat, lng 변경 시 실행

  return (
    <>
      <div id="map" className="h-100 min-w-[calc(100vw)]" />
    </>
  );
};

const MapInfo = () => {
  const { moveToPage } = useMovePage();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode") || "add"; // 기본값 "add"
  const id = searchParams.get("id");

  // 저장/수정 버튼 텍스트
  const buttonText = mode === "edit" ? "수정하기" : "저장하기";
  const targetUrl =
    mode === "edit" && id
      ? `${PageUrls.PAY_DETAIL}?id=${id}`
      : PageUrls.ADD_PAY;

  return (
    <div className="pointer-events-auto absolute bottom-20 left-1/2 z-10 w-80 -translate-x-1/2">
      <SaveButton
        title={buttonText}
        style="px-6"
        onClick={() => moveToPage(targetUrl)}
      />
    </div>
  );
};

const SearchPlaceMapPage = () => {
  return (
    <>
      <Map />
      <MapInfo />
    </>
  );
};

export default SearchPlaceMapPage;
