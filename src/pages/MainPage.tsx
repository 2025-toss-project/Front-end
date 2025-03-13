import React, { useEffect, useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import MapHeader from "../components/maps/MapHeader";
import MapBubble from "../components/MapBubble";
import { findCategory } from "../utils/findTypeOrCategory";
import { CategoryProps } from "../constants/category";
import useMapInfo from "../stores/mapInfo";
import KakaoMap from "../components/maps/KakaoMap";
import MapBottom from "../components/maps/MapBottom";
import userStore from "../stores/user";
import { LucideHome } from "lucide-react";
import IconMapMarker from "../assets/IconMapMarker";

const MyCurrentLocation: React.FC<{
  location: { lat: number; lng: number };
}> = ({ location }) => {
  return (
    <CustomOverlayMap position={{ lat: location.lat, lng: location.lng }}>
      <div className="grid aspect-square w-8 animate-pulse place-items-center rounded-full bg-main bg-opacity-30"></div>
      <div className="absolute left-1/2 top-1/2 aspect-square w-4 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-white bg-main"></div>
    </CustomOverlayMap>
  );
};

const IconHomeMakrer = () => {
  const { userInfo } = userStore();
  return (
    <CustomOverlayMap
      position={
        typeof userInfo.home !== "string"
          ? { lat: userInfo.home.lat, lng: userInfo.home.lng }
          : { lat: 0, lng: 0 }
      }
      zIndex={-10}
    >
      <div className="relative">
        <IconMapMarker color="#C80150" />
        <LucideHome
          color="#FFFFFF"
          style={{ position: "absolute", left: "5px", top: "5px" }}
        />
      </div>
    </CustomOverlayMap>
  );
};

export interface DataProps {
  id: number;
  category: string;
  details: string;
  locationName: string;
  lat: number;
  lng: number;
  price: number;
  date: string;
}

const MainPage: React.FC = () => {
  const { level, myLocation, mapCenter, userSelect, mapDatas, setMapDatas } =
    useMapInfo();
  const [showBubble, setShowBubble] = useState<boolean>(false);
  const [selectedData, setSelectedBubble] = useState<DataProps>();
  const [categoryInfo, setCategoryInfo] = useState<CategoryProps>();

  const showBubbleInfo = (data: any) => {
    setShowBubble(true);
    setSelectedBubble(data);
  };

  const showDatas = () => {
    if (userSelect.category === "") {
      return Array.from(mapDatas).flatMap((item: any) => {
        return item.mapInfoDTOList.map((mapInfo: any) => {
          return {
            ...mapInfo,
            category: item.category,
          };
        });
      });
    } else {
      return (
        mapDatas
          .find((info: any) => info.category === userSelect.category)
          ?.mapInfoDTOList?.map((mapInfo: any) => {
            return {
              ...mapInfo,
              category: userSelect.category,
            };
          }) || []
      );
    }
  };

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
        {showDatas()?.map((data: any, idx: number) => (
          <MapBubble
            onClick={() => showBubbleInfo(data)}
            key={idx}
            type={level >= 5 ? "icon" : "bubble"}
            position={{
              lat: data.lat,
              lng: data.lng,
            }}
            category={data.category}
            price={data.totalPrice || data.price}
            count={data?.details?.length}
          />
        ))}
        <IconHomeMakrer />
      </KakaoMap>
      <div className="flex h-full w-full flex-col justify-between px-6 pb-5 pt-10">
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
