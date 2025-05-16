import { useState, useEffect } from 'react';

interface LocationState {
  coords: { latitude: number; longitude: number } | null;
  isLoadingLocation: boolean;
  locationError: string | null;
}

export const useCurrentLocation = (): LocationState => {
  const [state, setState] = useState<LocationState>({
    coords: null,
    isLoadingLocation: false,
    locationError: null,
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        locationError: 'Geolocation is not supported by your browser',
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoadingLocation: true }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          isLoadingLocation: false,
          locationError: null,
        });
      },
      (error) => {
        setState({
          coords: null,
          isLoadingLocation: false,
          locationError: getLocationErrorMessage(error),
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return state;
};

const getLocationErrorMessage = (error: GeolocationPositionError): string => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'User denied the request for geolocation';
    case error.POSITION_UNAVAILABLE:
      return 'Location information is unavailable';
    case error.TIMEOUT:
      return 'The request to get user location timed out';
    default:
      return 'An unknown error occurred';
  }
};