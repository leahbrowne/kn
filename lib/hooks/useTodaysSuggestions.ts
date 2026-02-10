import { useCallback, useEffect, useState } from "react";

import { usePersonalisation } from "../../hooks/usePersonalisation";
import { getTodaysSuggestions, type Suggestion } from "../suggestions-engine";
import { getUserLocation } from "../geolocation";
import type { WeatherMode } from "./useWeatherMode";

const readLocalStorage = (key: string, fallback: string) => {
  if (typeof window === "undefined") return fallback;
  return window.localStorage.getItem(key) ?? fallback;
};

export function useTodaysSuggestions(attractions: any[], restaurants: any[]) {
  const { persona } = usePersonalisation();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSuggestions = useCallback(async () => {
    setLoading(true);

    const userLocation = await getUserLocation();
    const visitorType = persona;
    const weatherMode = readLocalStorage("weatherMode", "auto") as WeatherMode;
    const currentHour = new Date().getHours();

    const suggested = getTodaysSuggestions(
      currentHour,
      userLocation,
      visitorType,
      weatherMode,
      attractions,
      restaurants
    );

    setSuggestions(suggested);
    setLoading(false);
  }, [attractions, persona, restaurants]);

  useEffect(() => {
    loadSuggestions();

    const interval = setInterval(loadSuggestions, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [attractions, loadSuggestions, restaurants]);

  return { suggestions, loading, refresh: loadSuggestions };
}
