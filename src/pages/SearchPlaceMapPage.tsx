import React, { useEffect, useRef, useState } from "react";
import { useMovePage } from "../hooks/useMovePage";
import { SaveButton } from "../components/common/Buttons";
import { LucideMapPin } from "lucide-react";
import { createRoot } from "react-dom/client";
import PageUrls from "../constants/PageUrls";
import { useLocation } from "react-router-dom";
import useAddPayInfo from "../stores/addpayInfo";

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);
  const { moveToBack } = useMovePage();
  const { setAddPayInfo } = useAddPayInfo();

  // 장소 정보 상태 관리
  const [locationName, setLocationName] = useState<string>("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode") || "add";

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
    if (!locationName) {
      console.log("선택된 장소가 없으므로 뒤로 이동");
      moveToBack();
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(locationName, (data: any[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const place = data[0]; // 첫 번째 검색 결과
        const position = new window.kakao.maps.LatLng(place.y, place.x);

        console.log("선택된 장소:", locationName);
        console.log("좌표:", place.y, place.x);

        // 상태 업데이트
        setLat(place.y);
        setLng(place.x);

        // addPayInfo에 장소 정보 저장
        setAddPayInfo("locationName", locationName); // 장소 이름 저장
        setAddPayInfo("lat", place.y); // 위도 저장
        setAddPayInfo("lng", place.x); // 경도 저장

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
          <div className="flex items-center justify-center w-10 h-10">
            <LucideMapPin
              fill="#C80150"
              color="#fff"
              strokeWidth="1"
              size={35}
            />
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
    });
  }, [locationName, loaded]); // locationName이 바뀔 때마다 실행

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
    <div className="absolute z-10 -translate-x-1/2 pointer-events-auto bottom-20 left-1/2 w-80">
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
