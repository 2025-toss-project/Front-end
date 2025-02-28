import { useEffect, useState } from "react";
import { useSearchPlace } from "../pages/SearchPlacePage";

export default function SearchPlace() {
  const { place } = useSearchPlace(); // Context에서 검색어 가져오기
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      setIsKakaoLoaded(true);
      console.log("KakaoMap services 로드 완료!");
    } else {
      console.log("KakaoMap services 로드 실패");
    }

    if (!place) return; // 검색어가 없으면 실행 안 함

    const ps = new window.kakao.maps.services.Places();

    // 키워드 검색 실행
    ps.keywordSearch(place, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        displayPlaces(data);
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 중 오류가 발생했습니다.");
      }
    });

    function displayPlaces(places: any[]) {
      const listEl = document.getElementById("placesList");
      const menuEl = document.getElementById("menu_wrap");

      if (!listEl || !menuEl) return;

      // 기존 검색 결과 초기화
      listEl.innerHTML = "";

      places.forEach((place, index) => {
        const el = document.createElement("li");
        el.innerHTML = `
          <span class="markerbg marker_${index + 1}"></span>
          <div class="info">
            <h5>${place.place_name}</h5>
            <span>${place.road_address_name || place.address_name}</span>
            <span class="tel">${place.phone || "전화번호 없음"}</span>
          </div>
        `;
        el.className = "item";
        listEl.appendChild(el);
      });

      menuEl.scrollTop = 0;
    }

    function displayPagination(pagination: kakao.maps.Pagination) {
      const paginationEl = document.getElementById("pagination");
      if (!paginationEl) return;

      paginationEl.innerHTML = "";

      for (let i = 1; i <= pagination.last; i++) {
        const el = document.createElement("a");
        el.href = "#";
        el.innerHTML = String(i);
        if (i === pagination.current) {
          el.classList.add("on");
        } else {
          el.onclick = () => pagination.gotoPage(i);
        }
        paginationEl.appendChild(el);
      }
    }
  }, [place]); // place가 변경될 때만 실행

  return (
    <div>
      <div id="menu_wrap" className="bg_white">
        <hr />
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
}
