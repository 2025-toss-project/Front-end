import { useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import MapHeader from "../components/MapHeader";
import IconMyLocation from "../assets/IconMyLocation";
import { Icon, LucidePlus } from "lucide-react";
import IconFood from "../assets/categoryIcons/IconFood";
import "../assets/bubble.css";
import MapBubble from "../components/MapBubble";

const IconMoveMyLocation: React.FC = () => {
  return (
    <div className="grid w-10 bg-white rounded-full aspect-square place-items-center drop-shadow-50">
      <IconMyLocation />
    </div>
  );
};
const IconFastInputPay: React.FC = () => {
  return (
    <div className="grid rounded-full aspect-square w-11 place-items-center bg-main drop-shadow-50">
      <LucidePlus size={24} color="#FFF" />
    </div>
  );
};

const MapBottomIcons = () => {
  return (
    <div className="flex items-end justify-between">
      <IconMoveMyLocation />
      <IconFastInputPay />
    </div>
  );
};

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

  const dummyDatas = [
    {
      category: "식비",
      price: 2000,
      count: 3,
    },
    {
      category: "주거",
      price: 50000,
      count: 2,
    },
  ];
  return (
    <>
      <Map
        center={{ lat: location.latitude, lng: location.longitude }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -10,
        }}
        level={3}
        ref={mapRef}
      >
        {dummyDatas.map((data, index) => (
          <MapBubble
            key={index}
            position={{
              lat: location.latitude + index * 0.001,
              lng: location.longitude + index * 0.001,
            }}
            category={data.category}
            price={data.price}
            count={data.count}
          />
        ))}
      </Map>
      <div className="flex flex-col justify-between w-full h-full px-6 pt-10 pb-5">
        <MapHeader />

        <MapBottomIcons />
      </div>
    </>
  );
};

export default MainPage;
