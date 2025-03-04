import React, { useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import MapHeader from "../components/MapHeader";
import IconMyLocation from "../assets/IconMyLocation";
import { LucidePlus } from "lucide-react";
import MapBubble from "../components/MapBubble";
import { useMovePage } from "../hooks/useMovePage";
import useGetMyCurrentLocation from "../hooks/useGetMyCurrentLocation";
import { formatPrice } from "../utils/formatPrice";
import { findCategory } from "../utils/findTypeOrCategory";
import { CategoryProps } from "../constants/category";
import useClickOutside from "../hooks/useClickOutside";

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
      <div className="grid w-8 rounded-full aspect-square animate-pulse place-items-center bg-main bg-opacity-30"></div>
      <div className="absolute w-4 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full left-1/2 top-1/2 aspect-square bg-main"></div>
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

  interface DataProps {
    category: string;
    price: number;
    count: number;
    detail: string;
    place: string;
  }

  const dummyDatas = [
    {
      category: "식비",
      price: 2000,
      count: 3,
      detail: "한국경제신문에서 밥머금",
      place: "맥도날드",
    },
    {
      category: "교통",
      price: 50000,
      count: 2,
      detail: "한국경제신문에서 버스탐",
      place: "버스",
    },
  ];

  const [showBubble, setShowBubble] = useState<boolean>(false);
  const [selectedData, setSelectedBubble] = useState<DataProps>();
  const [categoryInfo, setCategoryInfo] = useState<CategoryProps>();
  const showBubbleInfo = (idx: number) => {
    setShowBubble(true);
    setSelectedBubble(dummyDatas[idx]);
  };

  useEffect(() => {
    if (!selectedData?.category) return;
    setCategoryInfo(findCategory(selectedData!.category));
  }, [selectedData]);

  const showBubbleRef = useRef<HTMLDivElement>(null!);
  useClickOutside(showBubbleRef, () => setShowBubble(false));

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
        {dummyDatas.map((data, index) => (
          <MapBubble
            onClick={() => showBubbleInfo(index)}
            key={index}
            type={level >= 5 ? "icon" : "bubble"}
            position={{
              lat: location.lat + (index + 1) * 0.001,
              lng: location.lng + (index + 1) * 0.001,
            }}
            category={data.category}
            price={data.price}
            count={data.count}
          />
        ))}
      </Map>
      <div className="flex flex-col justify-between w-full h-full px-6 pt-10 pb-5">
        <MapHeader />
        <div className="z-10 flex flex-col gap-3">
          <div className="flex items-end justify-between">
            <IconMoveMyLocation moveToCurrentLocation={moveToCurrentLocation} />
            <IconFastInputPay />
          </div>
          {showBubble && (
            <div
              ref={showBubbleRef}
              className="flex flex-col gap-2 p-3 bg-white rounded-lg drop-shadow-10"
            >
              <div className="flex items-center justify-between">
                {selectedData!.place}
                <div
                  className={`flex items-center gap-1 rounded-lg border px-1.5 py-1 ${categoryInfo?.bgColor} ${categoryInfo?.borderColor}`}
                >
                  <div>{categoryInfo?.icon({ size: 16 })}</div>
                  <div className="text-sm">{selectedData!.category}</div>
                </div>
              </div>
              <div className="text-xs font-light">{selectedData!.detail}</div>
              <div className="text-right">
                {formatPrice(selectedData!.price)}원
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MainPage;
