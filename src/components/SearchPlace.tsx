import { useEffect, useLayoutEffect, useState } from "react";
import { AddressButton } from "./common/Buttons";
import { useMovePage } from "../hooks/useMovePage";
import { useLocation } from "react-router-dom";
import PageUrls from "../constants/PageUrls";
import useAddPayInfo from "../stores/addpayInfo";
import useLocationInfo from "../stores/locationInfo";
import useMapInfo from "../stores/mapInfo";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoPlace {
  place_name: string;
  road_address_name?: string;
  address_name: string;
  phone?: string;
  x: number;
  y: number;
}

interface SearchPlaceProps {
  place: string; // 부모로부터 받은 place
  setPlace: React.Dispatch<React.SetStateAction<string>>; // 부모로 상태를 업데이트하는 함수
}

export default function SearchPlace({ place, setPlace }: SearchPlaceProps) {
  const [isSearched, setIsSearched] = useState(false);
  const [places, setPlaces] = useState<KakaoPlace[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  const { moveToPage } = useMovePage();
  const { setAddPayInfo } = useAddPayInfo();
  const { setLocationInfo } = useLocationInfo();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode") || "add";
  const id = searchParams.get("id");
  const { myLocation } = useMapInfo();

  useEffect(() => {
    setPlaces([]);
  }, []);

  useEffect(() => {
    if (!place.trim()) {
      setIsSearched(false);
      setPlaces([]);
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(
      place,
      (data: KakaoPlace[], status: string, pagination: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data);
          setPagination(pagination);
          setIsSearched(true);
        } else {
          setIsSearched(false);
          setPlaces([]);
        }
      },
      {
        location: new window.kakao.maps.LatLng({
          lat: myLocation.lat,
          lng: myLocation.lng,
        }),
      },
    );
  }, [place]);

  // 클릭한 장소로 이동하는 함수
  const handlePlaceClick = (place: KakaoPlace) => {
    setLocationInfo(place.place_name, place.y, place.x); // 장소, 위도, 경도 순 저장
    // 페이지 이동
    moveToPage(`${PageUrls.SEARCH_PLACE_MAP}?mode=${mode}&id=${id}`);
  };

  return (
    <div className="flex flex-col">
      {isSearched && <h2 className="py-3 text-base font-medium">검색 결과</h2>}
      <div id="menu_wrap" className="bg_white">
        <ul id="placesList">
          {places.map((place, index) => (
            <li
              key={index}
              className="item flex flex-col gap-2 border-b py-2"
              onClick={() => handlePlaceClick(place)} // 클릭 시 데이터 전달
            >
              <span className={`markerbg marker_${index + 1}`} />
              <div className="info flex flex-col gap-1.5">
                <h2 className="text-base font-medium text-second-dark">
                  {place.place_name}
                </h2>
                {place.road_address_name && (
                  <div className="flex items-center gap-1 text-sm text-second">
                    <AddressButton title="도로명" />
                    <span>
                      {place.road_address_name.length > 20
                        ? `${place.road_address_name.substring(0, 20)}...`
                        : place.road_address_name}
                    </span>
                  </div>
                )}
                {place.address_name && (
                  <div className="flex items-center gap-1 text-sm text-second">
                    <AddressButton title="주소" />
                    <span>{place.address_name}</span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div id="pagination" className="mt-5 flex justify-center gap-2 pb-6">
          {pagination &&
            Array.from({ length: pagination.last }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  className={`border px-2 ${
                    page === pagination.current
                      ? "bg-main text-white"
                      : "bg-second-lighter"
                  }`}
                  onClick={() => pagination.gotoPage(page)}
                >
                  {page}
                </button>
              ),
            )}
        </div>
      </div>
    </div>
  );
}
