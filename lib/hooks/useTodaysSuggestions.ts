import { useEffect, useState } from 'react'
import { getTodaysSuggestions, type Suggestion } from '../suggestions-engine'
import { getUserLocation } from '../geolocation'
import type { WeatherMode } from './useWeatherMode'

export function useTodaysSuggestions(attractions: any[], restaurants: any[]) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(true)

  const readLocalStorage = (key: string, fallback: string) => {
    if (typeof window === 'undefined') return fallback
    return localStorage.getItem(key) || fallback
  }

  useEffect(() => {
    loadSuggestions()

    // Refresh every hour
    const interval = setInterval(loadSuggestions, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [attractions, restaurants])

  async function loadSuggestions() {
    setLoading(true)

    const userLocation = await getUserLocation()
    const visitorType = readLocalStorage('visitorType', 'first-time')
    const weatherMode: WeatherMode =
      readLocalStorage('weatherMode', 'auto') as WeatherMode
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
