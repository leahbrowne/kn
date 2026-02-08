export interface UserLocation {
  lat: number;
  lng: number;
}

const EARTH_RADIUS_KM = 6371;

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
) {
  const deltaLat = toRadians(lat2 - lat1);
  const deltaLng = toRadians(lng2 - lng1);
  const startLat = toRadians(lat1);
  const endLat = toRadians(lat2);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(startLat) * Math.cos(endLat) *
      Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Number((EARTH_RADIUS_KM * c).toFixed(1));
}

export async function getUserLocation(): Promise<UserLocation | null> {
  if (typeof navigator === 'undefined' || !('geolocation' in navigator)) {
    return null;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => resolve(null),
      { timeout: 5000 }
    );
  });
}
