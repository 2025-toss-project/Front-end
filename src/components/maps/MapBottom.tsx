import React, { useRef } from "react";
import IconMyLocation from "../../assets/IconMyLocation";
import { LucidePlus } from "lucide-react";
import { useMovePage } from "../../hooks/useMovePage";
import { CategoryProps } from "../../constants/category";
import { formatPrice } from "../../utils/formatPrice";
import useMapInfo from "../../stores/mapInfo";
import useClickOutside from "../../hooks/useClickOutside";

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

interface DataProps {
  category: string;
  price: number;
  count: number;
  detail: string;
  place: string;
}

const ShowDetailInfo: React.FC<{
  showBubbleRef: React.RefObject<HTMLDivElement>;
  selectedData: DataProps;
  categoryInfo: CategoryProps;
}> = ({ showBubbleRef, selectedData, categoryInfo }) => {
  return (
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
      <div className="text-right">{formatPrice(selectedData!.price)}원</div>
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
        {showBubble && (
          <ShowDetailInfo
            showBubbleRef={showBubbleRef}
            selectedData={selectedData!}
            categoryInfo={categoryInfo!}
          />
        )}
      </div>
    </>
  );
};

export default MapBottom;
