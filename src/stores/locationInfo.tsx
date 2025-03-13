import { create } from "zustand";

interface LocationState {
  lat: number | null; //위도
  lng: number | null; //경도
  locationName: string;
  setLocationInfo: (name: string, lat: number, lng: number) => void;
}

export const useLocationInfo = create<LocationState>((set) => ({
  locationName: "",
  lat: null,
  lng: null,
  setLocationInfo: (name, lat, lng) => set({ locationName: name, lat, lng }),
}));

export default useLocationInfo;
