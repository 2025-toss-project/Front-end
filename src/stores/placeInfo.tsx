import { create } from "zustand";

interface placeInfo {
  lat: number;
  lng: number;
}

interface PlaceStore {
  placeInfo: placeInfo;
  place: string;
  selectPlace: string;
  setPlace: (place: string) => void;
  setSelectPlace: (selectPlace: string) => void;
  setPlaceInfo: (lat: number, lng: number) => void;
  resetPlaceState: () => void;
}

export const usePlaceInfo = create<PlaceStore>((set) => ({
  placeInfo: {
    lat: 0,
    lng: 0,
  },
  place: "",
  selectPlace: "",
  setPlace: (place: string) => set({ place }),
  setSelectPlace: (selectPlace: string) => set({ selectPlace }),
  setPlaceInfo: (lat: number, lng: number) => set({ placeInfo: { lat, lng } }),
  resetPlaceState: () => set({ place: "", selectPlace: "" }),
}));
