import { useEffect, useState } from "react";
import { AddressButton } from "./common/Buttons";
import {
  SearchPlaceProvider,
  useSearchPlace,
} from "../contexts/SearchPlaceContext";
import { useMovePage } from "../hooks/useMovePage";

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
  const [isSearched, setIsSearched] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const { place, selectPlace, setSelectPlace } = useSearchPlace();
  const { moveToPage } = useMovePage(); // 페이지 이동 핸들러

  useEffect(() => {
    setSelectPlace(""); // 선택한 장소 초기화
    setPlaces([]); // 검색 리스트 초기화
  }, []);

  useEffect(() => {
    if (selectPlace) {
      setTimeout(() => moveToPage("./map"), 0); // 아주 짧은 지연을 ₩주어 즉시 실행
    }
  }, [selectPlace]);

  useEffect(() => {
    if (!place.trim()) {
      setIsSearched(false);
      setPlaces([]);
      setSelectPlace(""); // 검색이 시작되면 선택장소 초기화
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
        }
      },
    );
  }, [place, selectPlace]); // 검색어 바뀌면 재검색

  return (
    <SearchPlaceProvider>
      <div className="flex flex-col">
        {isSearched && (
          <h2 className="py-3 text-base font-medium">검색 결과</h2>
        )}
        <div id="menu_wrap" className="bg_white">
          <ul id="placesList">
            {places.map((place, index) => (
              <li
                key={index}
                className="item flex flex-col gap-2 border-b py-2"
                onClick={() => {
                  setSelectPlace(place.place_name);
                }}
              >
                <span className={`markerbg marker_${index + 1}`} />
                <div className="info flex flex-col gap-1.5">
                  <h2 className="text-base font-medium text-second-dark">
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
    </SearchPlaceProvider>
  );
}
