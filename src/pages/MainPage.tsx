import { useEffect, useRef, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import MapHeader from "../components/MapHeader";
import IconMyLocation from "../assets/IconMyLocation";
import { LucidePlus } from "lucide-react";
import "../assets/bubble.css";
import MapBubble from "../components/MapBubble";

const IconMoveMyLocation: React.FC = () => {
  return (
    <div className="z-10 grid aspect-square w-10 place-items-center rounded-full bg-white drop-shadow-50">
      <IconMyLocation />
    </div>
  );
};
const IconFastInputPay: React.FC = () => {
  return (
    <div className="z-10 grid aspect-square w-11 place-items-center rounded-full bg-main drop-shadow-50">
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
  const [level, setLevel] = useState(3);
  const mapRef = useRef<kakao.maps.Map | null>(null);

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

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    mapRef.current?.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  const getMapInfo = () => {
    var level = mapRef.current?.getLevel() || 0;
    console.log("zoomLevel : " + level);
    setLevel(level);
  };

  useEffect(() => {
    if (!mapRef.current) return;
    kakao.maps.event.addListener(mapRef.current, "zoom_changed", getMapInfo);

    return () => {
      if (!mapRef.current) return;

      kakao.maps.event.removeListener(
        mapRef.current,
        "zoom_changed",
        getMapInfo,
      );
    };
  }, [mapRef.current]);

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
  //

  return (
    <>
      <Map
        center={{ lat: location.latitude, lng: location.longitude }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        level={level}
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
      <div className="flex h-full w-full flex-col justify-between px-6 pb-5 pt-10">
        <MapHeader />

        <MapBottomIcons />
      </div>
    </>
  );
};

export default MainPage;
