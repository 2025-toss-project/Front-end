import React, { useEffect, useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import MapHeader from "../components/maps/MapHeader";
import MapBubble from "../components/MapBubble";
import useGetMyCurrentLocation from "../hooks/useGetMyCurrentLocation";
import { findCategory } from "../utils/findTypeOrCategory";
import { CategoryProps } from "../constants/category";
import useMapInfo from "../stores/mapInfo";
import KakaoMap from "../components/maps/KakaoMap";
import MapBottom from "../components/maps/MapBottom";

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

interface DataProps {
  category: string;
  price: number;
  count: number;
  detail: string;
  place: string;
}

const MainPage: React.FC = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const { level, setMapCenter, setMyLocation, myLocation } = useMapInfo();
  const [showBubble, setShowBubble] = useState<boolean>(false);
  const [selectedData, setSelectedBubble] = useState<DataProps>();
  const [categoryInfo, setCategoryInfo] = useState<CategoryProps>();

  // TODO : remove dummy datas
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

  const showBubbleInfo = (idx: number) => {
    setShowBubble(true);
    setSelectedBubble(dummyDatas[idx]);
  };

  useGetMyCurrentLocation(setMyLocation, setMapCenter);

  useEffect(() => {
    if (!selectedData?.category) return;
    setCategoryInfo(findCategory(selectedData!.category));
  }, [selectedData]);
  return (
    <>
      <KakaoMap>
        <MyCurrentLocation
          location={{ lat: myLocation.lat, lng: myLocation.lng }}
        />
        {dummyDatas.map((data, index) => (
          <MapBubble
            onClick={() => showBubbleInfo(index)}
            key={index}
            type={level >= 5 ? "icon" : "bubble"}
            position={{
              lat: myLocation.lat + (index + 1) * 0.001,
              lng: myLocation.lng + (index + 1) * 0.001,
            }}
            category={data.category}
            price={data.price}
            count={data.count}
          />
        ))}
      </KakaoMap>
      <div className="flex flex-col justify-between w-full h-full px-6 pt-10 pb-5">
        <MapHeader />
        <MapBottom
          selectedData={selectedData}
          categoryInfo={categoryInfo}
          showBubble={showBubble}
          setShowBubble={setShowBubble}
        />
      </div>
    </>
  );
};

export default MainPage;
