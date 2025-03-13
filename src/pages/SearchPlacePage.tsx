import { LucideCircleX, LucideSearch } from "lucide-react";
import React, { useEffect, useState } from "react";
import SearchPlace from "../components/SearchPlace";
import { useLocation } from "react-router-dom";

const SearchHeader = ({ place, setPlace, onSearch }: any) => {
  // 검색한 값 place에 저장
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 제출 동작 방지
    if (!place.trim()) {
      console.warn("검색어가 비어있음, 이동하지 않음");
      return;
    }
    onSearch(place); // 부모 컴포넌트에서 전달된 onSearch 호출
  };

  return (
    <div className="flex h-14 w-full flex-row items-center justify-between bg-second-lighter px-2 py-4">
      <LucideSearch size={22} color="#333" />
      <form onSubmit={handleSearch} className="flex flex-1 pl-5">
        <input
          type="text"
          className="flex flex-1 bg-second-lighter focus:outline-none"
          value={place}
          onChange={handleInputChange}
        />
      </form>
      <LucideCircleX size={24} color="#aaa" onClick={() => setPlace("")} />
    </div>
  );
};

const SearchPlacePage = () => {
  const [place, setPlace] = useState<string>("");

  return (
    <div className="flex w-full flex-col gap-5">
      <SearchHeader place={place} setPlace={setPlace} />
      <SearchPlace place={place} setPlace={setPlace} />
    </div>
  );
};

export default SearchPlacePage;
