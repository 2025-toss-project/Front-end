import { createContext, useContext, useEffect, useState } from "react";

interface SearchPlaceContextType {
  place: string;
  setPlace: (place: string) => void;
  selectPlace: string;
  setSelectPlace: (place: string) => void;
  onSearch: (newPlace: string) => void;
}

const SearchPlaceContext = createContext<SearchPlaceContextType | undefined>(
  undefined,
);

export function SearchPlaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [place, setPlace] = useState("");
  const [selectPlace, setSelectPlace] = useState("");

  const onSearch = (newPlace: string) => {
    setPlace(newPlace);
    console.log("검색한 장소:", newPlace);
  };

  useEffect(() => {
    console.log("선택한 장소 업데이트됨:", selectPlace);
  }, [selectPlace]); // electPlace가 변경될 때 실행됨

  return (
    <SearchPlaceContext.Provider
      value={{ place, setPlace, selectPlace, setSelectPlace, onSearch }}
    >
      {children}
    </SearchPlaceContext.Provider>
  );
}

export function useSearchPlace() {
  const context = useContext(SearchPlaceContext);
  if (!context) {
    throw new Error("useSearchPlace must be used within a SearchPlaceProvider");
  }
  return context;
}
