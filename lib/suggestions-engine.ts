import { useCallback, useEffect, useState } from 'react';

import type { WeatherMode } from './hooks/useWeatherMode';

export type Suggestion = {
  id: string;
  title: string;
  description?: string;
  category: 'attraction' | 'restaurant';
  tags?: string[];
  timing?: string;
  place?: {
    name: string;
    distance?: number;
  };
  reason?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
};

const getTimeOfDayLabel = (hour: number) => {
  if (hour < 11) return 'morning';
  if (hour < 14) return 'midday';
  if (hour < 17) return 'afternoon';
  if (hour < 21) return 'evening';
  return 'night';
};

const matchesAny = (value: string, tokens: string[]) =>
  tokens.some((token) => value.includes(token));

const isSunnyPreference = (suggestion: Suggestion) => {
  const text = `${suggestion.title} ${suggestion.description ?? ''}`.toLowerCase();
  return matchesAny(text, ['beach', 'water', 'outdoor', 'hike', 'sunset', 'snorkel']);
};

const isRainyPreference = (suggestion: Suggestion) => {
  const text = `${suggestion.title} ${suggestion.description ?? ''}`.toLowerCase();
  return matchesAny(text, ['museum', 'distillery', 'rum', 'indoor', 'gallery', 'spa']);
};

const prioritizeByWeather = (suggestions: Suggestion[], weatherMode: WeatherMode) => {
  if (weatherMode === 'auto') return suggestions;
  const matcher = weatherMode === 'sunny' ? isSunnyPreference : isRainyPreference;
  const preferred = suggestions.filter(matcher);
  const rest = suggestions.filter((item) => !matcher(item));
  return [...preferred, ...rest];
};

export function getTodaysSuggestions(
  currentHour: number,
  userLocation: { lat: number; lng: number } | null,
  visitorType: string,
  weatherMode: WeatherMode,
  attractions: any[],
  restaurants: any[]
): Suggestion[] {
  const timeOfDay = getTimeOfDayLabel(currentHour);

  const attractionSuggestions: Suggestion[] = attractions.map((item, index) => ({
    id: `attraction-${index}`,
    title: item.name ?? item.title ?? 'Attraction',
    description: item.description ?? item.vibe,
    category: 'attraction',
    tags: item.tags ?? [timeOfDay, visitorType],
  }));

  const restaurantSuggestions: Suggestion[] = restaurants.map((item, index) => ({
    id: `restaurant-${index}`,
    title: item.name ?? item.title ?? 'Restaurant',
    description: item.description ?? item.vibe,
    category: 'restaurant',
    tags: item.tags ?? [timeOfDay, visitorType],
  }));

  const baseSuggestions = [...attractionSuggestions, ...restaurantSuggestions];
  const prioritized = prioritizeByWeather(baseSuggestions, weatherMode);

  return prioritized.slice(0, 6);
}

const getUserLocation = async (): Promise<{ lat: number; lng: number } | null> => {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    return null;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
      () => resolve(null),
      { timeout: 5000 }
    );
  });
};

export function useTodaysSuggestions(attractions: any[], restaurants: any[]) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSuggestions = useCallback(async () => {
    setLoading(true);

    const userLocation = await getUserLocation();
    const visitorType =
      (typeof window !== 'undefined' && localStorage.getItem('visitorType')) ||
      'first-time';
    const weatherMode =
      (typeof window !== 'undefined' &&
        (localStorage.getItem('weatherMode') as WeatherMode | null)) ||
      'auto';
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
  }, [attractions, restaurants]);

  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);

  useEffect(() => {
    const handler = () => {
      loadSuggestions();
    };
    window.addEventListener('weatherModeChange', handler);
    return () => window.removeEventListener('weatherModeChange', handler);
  }, [loadSuggestions]);

  return { suggestions, loading, reload: loadSuggestions };
}
