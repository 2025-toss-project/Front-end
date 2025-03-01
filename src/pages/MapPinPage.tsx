// 주소 검색 후 맵에서 핀 설정 페이지
import React, { useEffect, useState } from "react";
import {
  SearchPlaceProvider,
  useSearchPlace,
} from "../contexts/SearchPlaceContext";

const Map = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Kakao API가 로드될 때까지 기다림
    const checkKakao = setInterval(() => {
      if (window.kakao && window.kakao.maps) {
        console.log("API 로드완료");
        setLoaded(true);
        clearInterval(checkKakao);
      }
    }, 100);

    return () => clearInterval(checkKakao);
  }, []);

  useEffect(() => {
    if (loaded) {
      console.log(loaded);
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      new window.kakao.maps.Map(container, options);
    }
  }, [loaded]);

  return (
    <>
      <div
        id="map"
        style={{
          width: "500px",
          height: "500px",
        }}
      ></div>
      <br />
      <div></div>
    </>
  );
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
