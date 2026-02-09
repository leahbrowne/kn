import { useEffect, useState } from 'react'
import { getTodaysSuggestions, type Suggestion } from '../suggestions-engine'
import { getUserLocation } from '../geolocation'
import type { WeatherMode } from './useWeatherMode'

export function useTodaysSuggestions(attractions: any[], restaurants: any[]) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSuggestions()

    // Refresh every hour
    const interval = setInterval(loadSuggestions, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [attractions, restaurants])

  async function loadSuggestions() {
    setLoading(true)

    const userLocation = await getUserLocation()
    const visitorType =
      (typeof window !== 'undefined' && localStorage.getItem('visitorType')) ||
      'first-time'
    const weatherMode: WeatherMode =
      (typeof window !== 'undefined' &&
        (localStorage.getItem('weatherMode') as WeatherMode | null)) ||
      'auto'
    const currentHour = new Date().getHours()

    const suggested = getTodaysSuggestions(
      currentHour,
      userLocation,
      visitorType,
      weatherMode,
      attractions,
      restaurants
    )

    setSuggestions(suggested)
    setLoading(false)
  }

  return { suggestions, loading, refresh: loadSuggestions }
}
