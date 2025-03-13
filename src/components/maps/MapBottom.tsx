import React, { useEffect, useRef, useState } from "react";
import IconMyLocation from "../../assets/IconMyLocation";
import { LucidePlus } from "lucide-react";
import { useMovePage } from "../../hooks/useMovePage";
import { CategoryProps } from "../../constants/category";
import { formatPrice } from "../../utils/formatFunc";
import useMapInfo from "../../stores/mapInfo";
import useClickOutside from "../../hooks/useClickOutside";
import { DataProps } from "../../pages/MainPage";
import PageUrls from "../../constants/PageUrls";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/carousel.css";
import { findCategory } from "../../utils/findTypeOrCategory";

const IconMoveMyLocation: React.FC<{ moveToCurrentLocation: () => void }> = ({
  moveToCurrentLocation,
}) => {
  return (
    <div
      onClick={moveToCurrentLocation}
      className="z-10 grid aspect-square w-10 place-items-center rounded-full bg-white drop-shadow-50"
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
      className="z-10 grid aspect-square w-11 place-items-center rounded-full bg-main drop-shadow-50"
    >
      <LucidePlus size={24} color="#FFF" />
    </div>
  );
};

const ShowDetailInfo: React.FC<{
  showBubbleRef: React.RefObject<HTMLDivElement>;
  selectedData?: any;
  categoryInfo?: CategoryProps;
  showBubble: boolean;
}> = ({ showBubbleRef, selectedData, categoryInfo, showBubble }) => {
  const { moveToPage } = useMovePage();
  const { userSelect } = useMapInfo();

  const handleClickShowDetail = () => {
    if (userSelect.type === "나의 소비") {
      moveToPage(`${PageUrls.PAY_DETAIL}?id=${selectedData?.details[0].id}`);
    }
  };
  if (!selectedData || !showBubble) return null;

  return (
    <div
      ref={showBubbleRef}
      onClick={handleClickShowDetail}
      className="mb-2.5 flex flex-col gap-2 rounded-lg bg-white p-3 drop-shadow-10"
    >
      <div className="flex items-center justify-between">
        {userSelect.type === "나의 소비"
          ? selectedData?.details[0]?.locationName
          : selectedData.locationName}
        <div
          className={`flex items-center gap-1 rounded-lg border px-1.5 py-1 ${categoryInfo?.bgColor} ${categoryInfo?.borderColor}`}
        >
          <div>{categoryInfo?.icon({ size: 16 })}</div>
          <div className="text-sm">{selectedData!.category}</div>
        </div>
      </div>
      {userSelect.type === "나의 소비" && (
        <div className="text-xs font-light">
          {selectedData?.details[0]?.details}
        </div>
      )}
      {userSelect.type === "나의 소비" ? (
        <div className="text-right">
          {formatPrice(selectedData?.details[0]?.price)}원
        </div>
      ) : (
        <div className="text-xs">
          <span className="font-medium text-main">
            {selectedData?.ageGroup} {selectedData?.type}
          </span>
          은 여기서{" "}
          <span className="font-medium text-main">
            {formatPrice(selectedData.price)}원
          </span>
          을 썼어요!
        </div>
      )}
    </div>
  );
};

const Carousel: React.FC<{
  showBubbleRef: React.RefObject<HTMLDivElement>;
  selectedData?: any;
  showBubble: boolean;
}> = ({ showBubbleRef, selectedData, showBubble }) => {
  const settings = {
    infinite: false,
    arrows: false,
    slidesToShow: 1,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "7%",
  };
  const { moveToPage } = useMovePage();

  const handleClickShowDetail = (id: number) => {
    moveToPage(`${PageUrls.PAY_DETAIL}?id=${id}`);
  };

  return (
    <div ref={showBubbleRef}>
      <Slider {...settings} className="w-screen max-w-[500px] -translate-x-6">
        {selectedData.details.map((data: any) => {
          const categoryInfo = findCategory(data.category);
          return (
            <div
              key={data.id}
              className="rounded-lg bg-white p-3 drop-shadow-10"
              onClick={() => handleClickShowDetail(data.id)}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="">{data.locationName}</div>
                <div
                  className={`flex items-center gap-1 rounded-lg border px-1.5 py-1 ${categoryInfo?.bgColor} ${categoryInfo?.borderColor}`}
                >
                  <div>{categoryInfo?.icon({ size: 16 })}</div>
                  <div className="text-sm">{data.category}</div>
                </div>
              </div>
              <div className="mb-2 text-xs font-light">{data.details}</div>
              <div className="text-right">{formatPrice(data.price)}원</div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

const MapBottom: React.FC<{
  selectedData?: DataProps;
  categoryInfo?: CategoryProps;
  showBubble: boolean;
  setShowBubble: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ selectedData, categoryInfo, showBubble, setShowBubble }) => {
  const showBubbleRef = useRef<HTMLDivElement>(null!);
  useClickOutside(showBubbleRef, () => setShowBubble(false));

  const { mapRef, myLocation } = useMapInfo();
  const moveToCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.panTo(
        new kakao.maps.LatLng(myLocation.lat, myLocation.lng),
      );
    }
  };

  return (
    <>
      <div className="z-10 flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <IconMoveMyLocation moveToCurrentLocation={moveToCurrentLocation} />
          <IconFastInputPay />
        </div>

        {showBubble &&
        selectedData?.details &&
        selectedData.details.length > 1 ? (
          <Carousel
            showBubbleRef={showBubbleRef}
            selectedData={selectedData}
            showBubble={showBubble}
          />
        ) : (
          <ShowDetailInfo
            showBubbleRef={showBubbleRef}
            selectedData={selectedData}
            categoryInfo={categoryInfo}
            showBubble={showBubble}
          />
        )}
      </div>
    </>
  );
};

export default MapBottom;
