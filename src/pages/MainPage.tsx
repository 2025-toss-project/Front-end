import React, { useRef, useState } from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import MapHeader from "../components/MapHeader";
import IconMyLocation from "../assets/IconMyLocation";
import { LucidePlus } from "lucide-react";
import "../assets/bubble.css";
import MapBubble from "../components/MapBubble";
import { useMovePage } from "../hooks/useMovePage";
import useGetMyCurrentLocation from "../hooks/useGetMyCurrentLocation";
import MapIconMarker from "../components/MapIconMarker";

const IconMoveMyLocation: React.FC<{ moveToCurrentLocation: () => void }> = ({
  moveToCurrentLocation,
}) => {
  return (
    <div
      onClick={moveToCurrentLocation}
      className="z-10 grid w-10 bg-white rounded-full aspect-square place-items-center drop-shadow-50"
    >
      <IconMyLocation />
    </div>
  );
};
const IconFastInputPay: React.FC = () => {
  const { moveToPage } = useMovePage();
  return (
    <div
      onClick={() => moveToPage("/addpay")}
      className="z-10 grid rounded-full aspect-square w-11 place-items-center bg-main drop-shadow-50"
    >
      <LucidePlus size={24} color="#FFF" />
    </div>
  );
};

const MyCurrentLocation: React.FC<{
  location: { lat: number; lng: number };
}> = ({ location }) => {
  return (
    <CustomOverlayMap
      position={{ lat: location.lat, lng: location.lng }}
      zIndex={1}
    >
      <div className="grid w-8 rounded-full aspect-square place-items-center bg-main bg-opacity-30">
        <div className="w-4 border-2 border-white rounded-full aspect-square bg-main"></div>
      </div>
    </CustomOverlayMap>
  );
};

const MainPage: React.FC = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [level, setLevel] = useState(3);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const mapRef = useRef<kakao.maps.Map | null>(null);

  useGetMyCurrentLocation(setLocation, setMapCenter);

  const moveToCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.panTo(new kakao.maps.LatLng(location.lat, location.lng));
    }
    setMapCenter({ lat: location.lat, lng: location.lng });
  };

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
        key={`map-${mapCenter.lat}-${mapCenter.lng}`}
        center={{ lat: mapCenter.lat, lng: mapCenter.lng }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
        isPanto={true}
        level={level}
        ref={mapRef}
        onZoomChanged={(map) => {
          const level = map.getLevel();
          setLevel(level);
        }}
      >
        <MyCurrentLocation
          location={{ lat: location.lat, lng: location.lng }}
        />
        {dummyDatas.map((data, index) =>
          level >= 5 ? (
            <MapIconMarker
              key={index}
              position={{
                lat: location.lat + (index + 1) * 0.001,
                lng: location.lng + (index + 1) * 0.001,
              }}
              category={data.category}
            />
          ) : (
            <MapBubble
              key={index}
              position={{
                lat: location.lat + (index + 1) * 0.001,
                lng: location.lng + (index + 1) * 0.001,
              }}
              category={data.category}
              price={data.price}
              count={data.count}
            />
          ),
        )}
      </Map>
      <div className="flex flex-col justify-between w-full h-full px-6 pt-10 pb-5">
        <MapHeader />
        <div className="flex items-end justify-between">
          <IconMoveMyLocation moveToCurrentLocation={moveToCurrentLocation} />
          <IconFastInputPay />
        </div>
      </div>
    </>
  );
};

export default MainPage;
