import { useEffect } from "react";

const useGetMyCurrentLocation = (
  setLocation: (location: { lat: number; lng: number }) => void,
  setMapCenter: (mapCenter: { lat: number; lng: number }) => void,
) => {
  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setLocation({ lat: latitude, lng: longitude });
    setMapCenter({ lat: latitude, lng: longitude });
  };

  const handleError = (error: GeolocationPositionError) => {
    console.error("위치 정보 가져오기 실패");
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.error("위치 정보 가져오기 실패");
    }
  }, []);
};

export default useGetMyCurrentLocation;
