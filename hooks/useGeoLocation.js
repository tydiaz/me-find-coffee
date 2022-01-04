import { useState } from 'react';

const useGeoLocation = () => {
  const [locationErrorMessage, setLocationErrorMessage] = useState('');
  const [coordinates, setCoordinates] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const successHandler = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setCoordinates(`${latitude},${longitude}`);
    setLocationErrorMessage('');
    setIsLoading(false);
  };

  const errorHandler = () => {
    setIsLoading(false);
    setLocationErrorMessage('Unable to retrieve your location');
  };

  const handleGeoLocation = () => {
    setIsLoading(true);

    if (!navigator.geolocation) {
      setLocationErrorMessage('Geolocation is not supported by your browser');
      setIsLoading(false);
    } else {
      navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
    }
  };

  return {
    coordinates,
    handleGeoLocation,
    isLoading,
    locationErrorMessage,
  };
};

export default useGeoLocation;
