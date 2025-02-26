import { useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import MapHeader from "../components/MapHeader";

const MainPage: React.FC = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 }); // 현재 위치의 좌표값을 저장할 상태
  const mapRef = useRef(null);

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    console.log(latitude, longitude);
    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (error: GeolocationPositionError) => {
    console.log("error");
  };

  useEffect(() => {
    const { geolocation } = navigator;

    geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);
  return (
    <Map
      center={{ lat: location.latitude, lng: location.longitude }}
      style={{ width: "100%", height: "100%", position: "relative" }}
      level={3}
      ref={mapRef}
    >
      <MapHeader />
      <MapMarker
        position={{ lat: location.latitude, lng: location.longitude }}
      ></MapMarker>
    </Map>
  );
};

export default MainPage;
