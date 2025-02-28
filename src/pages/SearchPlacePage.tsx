import { LucideCircleX, LucideSearch } from "lucide-react";
import React, { createContext, useContext, useEffect, useState } from "react";
import SearchListSection from "../components/sections/SearchListSection";
import SearchPlace from "../components/SearchPlace";

// Context 타입 정의
interface SearchContextType {
  place: string;
  onSearch: (newPlace: string) => void;
}

// Context 생성
const SearchPlaceContext = createContext<SearchContextType | undefined>(
  undefined,
);

// Context 사용 훅(place, onSearch 사용가능)
export function useSearchPlace() {
  const context = useContext(SearchPlaceContext);
  if (!context) {
    throw new Error("error SearchPlaceProvider");
  }
  return context;
}

const SearchHeader = () => {
  const { place, onSearch } = useSearchPlace(); // context
  const [inputValue, setInputValue] = useState(place); // place값이 바뀌면 같이 바뀜

  // place 값이 변경될 때 inputValue도 업데이트
  useEffect(() => {
    setInputValue(place);
  }, [place]);

  // 검색한 값 place에 저장
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  //검색 실행
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 제출 이벤트 방지
    if (!inputValue.trim()) return; // 빈 검색어 방지
    onSearch(inputValue); // 입력된 장소 검색
  };

  return (
    <div className="flex h-14 w-full flex-row items-center justify-between bg-second-lighter px-2.5 py-4">
      <LucideSearch size={22} color="#333" />
      <form onSubmit={handleSearch} className="flex flex-1 pl-5">
        <input
          type="text"
          className="flex flex-1 bg-second-lighter focus:outline-none"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
      <LucideCircleX size={24} color="#aaa" onClick={() => setInputValue("")} />
    </div>
  );
};

const SearchPlacePage = () => {
  const [place, setPlace] = useState("");

  // 검색 실행 함수
  const onSearch = (newPlace: string) => {
    setPlace(newPlace);
    console.log("검색한 장소:", newPlace);
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <SearchPlaceContext.Provider value={{ place, onSearch }}>
        <SearchHeader />
        <SearchPlace />
      </SearchPlaceContext.Provider>
    </div>
  );
};

export default SearchPlacePage;
