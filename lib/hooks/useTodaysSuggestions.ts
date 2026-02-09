import { useEffect, useState } from 'react'
import { getTodaysSuggestions, type Suggestion } from '../suggestions-engine'
import { getUserLocation } from '../geolocation'

export function useTodaysSuggestions(attractions: any[], restaurants: any[]) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [loading, setLoading] = useState(true)

  async function loadSuggestions() {
    setLoading(true)

    const userLocation = await getUserLocation()
    const visitorType = localStorage.getItem('visitorType') || 'first-time'
    const currentHour = new Date().getHours()

    const suggested = getTodaysSuggestions(
      currentHour,
      userLocation,
      visitorType,
      attractions,
      restaurants
    )

    setSuggestions(suggested)
    setLoading(false)
  }

  useEffect(() => {
    loadSuggestions()

    // Refresh every hour
    const interval = setInterval(loadSuggestions, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [attractions, restaurants, loadSuggestions])

  return { suggestions, loading, refresh: loadSuggestions }
}
