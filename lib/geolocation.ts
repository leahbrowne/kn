export interface Location {
  lat: number;
  lng: number;
}

export async function getUserLocation(): Promise<Location | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Location error:", error);
        resolve(null);
      }
    );
  });
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function estimateWalkingTime(distanceKm: number): string {
  const minutes = Math.round((distanceKm / 5) * 60);

  if (minutes < 5) return "Less than 5 min walk";
  if (minutes < 60) return `${minutes} min walk`;

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs}h ${mins}m walk`;
}

export function sortByDistance(places: any[], userLocation: Location): any[] {
  return places
    .map((place) => ({
      ...place,
      distance: calculateDistance(
        userLocation.lat,
        userLocation.lng,
        place.location.lat,
        place.location.lng
      ),
    }))
    .sort((a, b) => a.distance - b.distance);
}
