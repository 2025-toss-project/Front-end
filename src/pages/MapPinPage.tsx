import React, { useEffect, useRef, useState } from "react";
import { useSearchPlace } from "../contexts/SearchPlaceContext";
import { useMovePage } from "../hooks/useMovePage";
import { SaveButton } from "../components/common/Buttons";
import { LucideMapPin } from "lucide-react";
import { createRoot } from "react-dom/client";

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
  const { moveToBack } = useMovePage();

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
    if (!selectPlace) {
      console.log("선택이 없으므로 뒤로감");
      moveToBack();
    }

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

        // React 컴포넌트 렌더링할 DOM 요소 생성
        const container = document.createElement("div");
        container.className = "custom-marker";
        container.style.position = "absolute";
        container.style.transform = "translate(-50%, -100%)"; // 중심이 아래쪽 기준이 되도록 조정
        container.style.overflow = "visible"; // 아이콘이 넘칠 수 있도록 설정

        // React 컴포넌트 렌더링
        createRoot(container).render(
          <div className="flex h-10 w-10 items-center justify-center">
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

        //  지도 객체가 존재할 때만 setCenter 실행
        if (mapRef.current) {
          mapRef.current.setCenter(position);
        }
      }
    });
  }, [selectPlace, loaded]); // selectPlace가 바뀔 때마다 실행

  return <div id="map" style={{ width: "500px", height: "750px" }} />;
};

const MapInfo = () => {
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러
  const { selectPlace } = useSearchPlace();

  return (
    <div className="pointer-events-auto absolute bottom-10 left-1/2 z-10 w-80 -translate-x-1/2">
      <SaveButton
        title="저장하기"
        style="px-6"
        onClick={() => moveToPage("/addpay")}
      />
    </div>
  );
};

const MapPinPage = () => {
  return (
    <div className="relative">
      <Map />
      <MapInfo />
    </div>
  );
};

export default MapPinPage;
