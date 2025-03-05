import { LucideCircleX, LucideSearch } from "lucide-react";
import React, { useEffect, useState } from "react";
import SearchPlace from "../components/SearchPlace";
import { usePlaceInfo } from "../stores/placeInfo";

const SearchHeader = () => {
  const { place, setPlace, setSelectPlace } = usePlaceInfo();

  useEffect(() => {
    console.log("Current place:", place);
  }, [place]);

  // 검색한 값 place에 저장
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submit
    if (!place.trim()) return; // If place is empty, prevent search
    setSelectPlace(place); // Directly set the selected place from the search input
    console.log("검색한 장소:", place); // Or trigger search logic here
  };

  return (
    <div className="flex h-14 w-full flex-row items-center justify-between bg-second-lighter px-2.5 py-4">
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
  return (
    <div className="flex w-full flex-col gap-5">
      <SearchHeader />
      <SearchPlace />
    </div>
  );
};

export default SearchPlacePage;
