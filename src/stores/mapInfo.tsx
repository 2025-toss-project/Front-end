import { create } from "zustand";

interface MapInfo {
  center: { lat: number; lng: number };
  level: number;
  ref: React.RefObject<kakao.maps.Map | null>;
}

interface MapStore {
  mapInfo: MapInfo;
  setCenter: (center: { lat: number; lng: number }) => void;
  setLevel: (level: number) => void;
  setRef: (ref: React.RefObject<kakao.maps.Map | null>) => void;
}

const useMapInfo = create<MapStore>((set) => ({
  mapInfo: {
    center: { lat: 0, lng: 0 },
    level: 3,
    ref: { current: null },
  },
  setCenter: (center: { lat: number; lng: number }) =>
    set((state) => ({
      mapInfo: { ...state.mapInfo, center },
    })),
  setLevel: (level: number) =>
    set((state) => ({
      mapInfo: { ...state.mapInfo, level },
    })),
  setRef: (ref: React.RefObject<kakao.maps.Map | null>) =>
    set((state) => ({
      mapInfo: { ...state.mapInfo, ref },
    })),
}));

export default useMapInfo;
