import { useEffect, useState } from "react";
import { useSearchPlace } from "../pages/SearchPlacePage";
import { AddressButton } from "./common/Buttons";

declare global {
  interface Window {
    kakao: any;
  }
}

interface Place {
  place_name: string;
  road_address_name?: string;
  address_name: string;
  phone?: string;
}

export default function SearchPlace() {
  const { place } = useSearchPlace();
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    if (window.kakao?.maps?.services) {
      setIsKakaoLoaded(true);
      console.log("KakaoMap services 로드 완료!");
    } else {
      console.error("KakaoMap services 로드 실패");
      return;
    }

    if (!place.trim()) {
      setIsSearched(false);
      setPlaces([]); // 검색어 없을 때 리스트 초기화
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(
      place,
      (data: Place[], status: string, pagination: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data);
          setPagination(pagination);
          setIsSearched(true);
        } else {
          setIsSearched(false);
          setPlaces([]);
          if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
          } else {
            alert("검색 중 오류가 발생했습니다.");
          }
        }
      },
    );
  }, [place]);

  return (
    <div className="flex flex-col">
      {isSearched && <h2 className="py-3 text-base font-medium">검색 결과</h2>}
      <div id="menu_wrap" className="bg_white">
        <ul id="placesList">
          {places.map((place, index) => (
            <li key={index} className="item flex flex-col gap-2 border-b py-2">
              <span className={`markerbg marker_${index + 1}`} />
              <div className="info flex flex-col gap-1.5">
                <h2 className="text-base font-medium text-second-dark group-hover:text-main">
                  {place.place_name}
                </h2>
                {place.road_address_name && (
                  <div className="flex items-center gap-1 text-sm text-second">
                    <AddressButton title="도로명" />
                    <span>{place.road_address_name}</span>
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
