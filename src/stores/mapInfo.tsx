import { create } from "zustand";

interface MapStore {
  myLocation: { lat: number; lng: number };
  setMyLocation: (location: { lat: number; lng: number }) => void;
  mapCenter: { lat: number; lng: number };
  setMapCenter: (center: { lat: number; lng: number }) => void;
  level: number;
  setLevel: (level: number) => void;
  mapRef: React.RefObject<kakao.maps.Map | null>;
  setMapRef: (ref: React.RefObject<kakao.maps.Map | null>) => void;
}

const useMapInfo = create<MapStore>((set) => ({
  myLocation: { lat: 0, lng: 0 },
  setMyLocation: (location) => set({ myLocation: location }),
  mapCenter: { lat: 0, lng: 0 },
  setMapCenter: (center) => set({ mapCenter: center }),
  level: 3,
  setLevel: (level) => set({ level }),
  mapRef: { current: null },
  setMapRef: (mapRef) => set({ mapRef }),
}));

export default useMapInfo;
