import { useState, useEffect } from "react";

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

interface GeolocationData {
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
  timestamp?: number;
}

interface PositionError {
  code: number;
  message: string;
}

interface GeolocationResult {
  loading: boolean;
  error?: PositionError;
  data: GeolocationData;
}

export default function useGeolocation(
  options?: GeolocationOptions
): GeolocationResult {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PositionError | undefined>();
  const [data, setData] = useState<GeolocationData>({});

  useEffect(() => {
    const successHandler = (e: GeolocationPosition) => {
      setLoading(false);
      setError(undefined);
      setData({
        latitude: e.coords.latitude,
        longitude: e.coords.longitude,
        accuracy: e.coords.accuracy,
        altitude: e.coords.altitude,
        altitudeAccuracy: e.coords.altitudeAccuracy,
        heading: e.coords.heading,
        speed: e.coords.speed,
        timestamp: e.timestamp,
      });
    };

    const errorHandler = (e: PositionError) => {
      setError(e);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options
    );

    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );

    return () => navigator.geolocation.clearWatch(id);
  }, [options]);

  return { loading, error, data };
}
