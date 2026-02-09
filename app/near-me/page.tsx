"use client";

import { useEffect, useMemo, useState } from "react";
import {
  estimateWalkingTime,
  getUserLocation,
  sortByDistance,
  type Location,
} from "../../lib/geolocation";
import { useLocationPermission } from "../../lib/hooks/useLocationPermission";
import attractions from "../../data/attractions.json";
import restaurants from "../../data/restaurants.json";

type Place = {
  id: string;
  name: string;
  description?: string;
  category?: string;
  location: Location;
  type: "attraction" | "restaurant";
  distance?: number;
};

type Filter = "all" | "restaurants" | "beaches" | "attractions";

export default function NearMePage() {
  const { permissionState, requestPermission } = useLocationPermission();
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<Place[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (permissionState === "granted") {
      loadNearbyPlaces();
    }
  }, [permissionState]);

  const loadNearbyPlaces = async () => {
    setLoading(true);
    const location = await getUserLocation();

    if (location) {
      setUserLocation(location);

      const allPlaces: Place[] = [
        ...attractions.map((attraction) => ({
          ...attraction,
          description:
            attraction.description ??
            attraction.vibe ??
            "Explore this nearby attraction.",
          type: "attraction" as const,
        })),
        ...restaurants.map((restaurant) => ({
          ...restaurant,
          description:
            restaurant.description ??
            restaurant.vibe ??
            "Enjoy a nearby dining option.",
          type: "restaurant" as const,
        })),
      ];

      const sorted = sortByDistance(allPlaces, location) as Place[];
      const nearby = sorted.filter(
        (place) => place.distance !== undefined && place.distance <= 10
      );

      setNearbyPlaces(nearby);
    }

    setLoading(false);
  };

  const handleRequestLocation = async () => {
    const granted = await requestPermission();
    if (granted) {
      loadNearbyPlaces();
    }
  };

  const filteredPlaces = useMemo(() => {
    if (filter === "all") return nearbyPlaces;
    return nearbyPlaces.filter((place) => {
      if (filter === "restaurants") return place.type === "restaurant";
      if (filter === "attractions") return place.type === "attraction";
      if (filter === "beaches") return place.category?.includes("beach");
      return true;
    });
  }, [filter, nearbyPlaces]);

  if (permissionState === "prompt" || permissionState === "denied") {
    return (
      <main className="bg-slate-50 px-6 py-12">
        <div className="mx-auto w-full max-w-5xl space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-semibold text-slate-900">Near You</h1>
          <p className="text-sm text-slate-600">
            Enable location to see what&apos;s nearby.
          </p>
          <button
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm"
            onClick={handleRequestLocation}
            type="button"
          >
            Enable Location
          </button>
        </div>
      </main>
    );
  }

  if (permissionState === "unsupported") {
    return (
      <main className="bg-slate-50 px-6 py-12">
        <div className="mx-auto w-full max-w-5xl space-y-3 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-semibold text-slate-900">Near You</h1>
          <p className="text-sm text-slate-600">
            Location is not supported on this device.
          </p>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="bg-slate-50 px-6 py-12">
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-lg">
          Finding places near you...
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-semibold text-slate-900">Near You</h1>
          <p className="mt-2 text-sm text-slate-600">
            Showing places within 10km of your current location.
          </p>
          {userLocation ? (
            <p className="mt-1 text-xs text-slate-500">
              Lat {userLocation.lat.toFixed(3)}, Lng {userLocation.lng.toFixed(3)}
            </p>
          ) : null}
        </section>

        <section className="flex flex-wrap gap-3">
          <button
            className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-white text-slate-600 shadow-sm"
            }`}
            onClick={() => setFilter("all")}
            type="button"
          >
            All
          </button>
          <button
            className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
              filter === "restaurants"
                ? "bg-primary text-white"
                : "bg-white text-slate-600 shadow-sm"
            }`}
            onClick={() => setFilter("restaurants")}
            type="button"
          >
            Restaurants
          </button>
          <button
            className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
              filter === "beaches"
                ? "bg-primary text-white"
                : "bg-white text-slate-600 shadow-sm"
            }`}
            onClick={() => setFilter("beaches")}
            type="button"
          >
            Beaches
          </button>
          <button
            className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
              filter === "attractions"
                ? "bg-primary text-white"
                : "bg-white text-slate-600 shadow-sm"
            }`}
            onClick={() => setFilter("attractions")}
            type="button"
          >
            Attractions
          </button>
        </section>

        <section className="grid gap-4">
          {filteredPlaces.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-lg">
              No places found nearby.
            </div>
          ) : (
            filteredPlaces.map((place) => (
              <article
                key={place.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {place.name}
                  </h2>
                  {place.distance !== undefined ? (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {place.distance} km · {estimateWalkingTime(place.distance)}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  {place.description}
                </p>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
