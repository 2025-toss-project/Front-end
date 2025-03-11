import { useEffect, useState } from "react";

const useGetMyCurrentLocation = (
  setMyLocation: (location: { lat: number; lng: number }) => void,
  setMapCenter: (mapCenter: { lat: number; lng: number }) => void,
) => {
  const [locationInitialized, setLocationInitialized] = useState(false);
  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setMyLocation({ lat: latitude, lng: longitude });
    setMapCenter({ lat: latitude, lng: longitude });
    setLocationInitialized(true);
    console.log(latitude, longitude);
  };

  const handleError = (error: GeolocationPositionError) => {
    console.error("위치 정보 가져오기 실패", error);
    setLocationInitialized(false);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.error("위치 정보 가져오기 실패");
    }
  }, []);
  return { locationInitialized };
};

export default useGetMyCurrentLocation;
