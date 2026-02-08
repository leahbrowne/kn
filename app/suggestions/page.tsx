'use client'

import attractions from '../../data/attractions.json'
import restaurants from '../../data/restaurants.json'
import { useTodaysSuggestions } from '../../lib/hooks/useTodaysSuggestions'

export default function SuggestionsPage() {
  const { suggestions, loading } = useTodaysSuggestions(attractions, restaurants)

  if (loading) {
    return <div>Loading suggestions...</div>
  }

  if (suggestions.length === 0) {
    return null
  }

  return (
    <div>
      <h2>Today's Suggestions</h2>
      <p>
        {new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        })}
      </p>

      {suggestions.map((suggestion) => (
        <div key={suggestion.id}>
          <h3>{suggestion.title}</h3>
          <span>{suggestion.timing}</span>
          <p>{suggestion.description}</p>

          {suggestion.place && (
            <div>
              {suggestion.place.name}
              {suggestion.place.distance && ` • ${suggestion.place.distance}km away`}
            </div>
          )}

          <p>
            <em>{suggestion.reason}</em>
          </p>

          <button type="button">{suggestion.ctaPrimary}</button>
          {suggestion.ctaSecondary && (
            <button type="button">{suggestion.ctaSecondary}</button>
          )}
        </div>
      ))}
    </div>
  )
}
