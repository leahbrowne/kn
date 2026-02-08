import { calculateDistance } from './geolocation'

export interface Suggestion {
  id: string
  title: string
  description: string
  timing: string
  reason: string
  place?: {
    id: string
    name: string
    type: 'restaurant' | 'beach' | 'attraction'
    distance?: number
  }
  ctaPrimary: string
  ctaSecondary?: string
}

export function getTodaysSuggestions(
  currentHour: number,
  userLocation: { lat: number; lng: number } | null,
  visitorType: string,
  attractions: any[],
  restaurants: any[]
): Suggestion[] {
  const suggestions: Suggestion[] = []

  // MORNING SUGGESTIONS (6am - 11am)
  if (currentHour >= 6 && currentHour < 11) {
    const beach = attractions.find(
      (attraction) =>
        attraction.name?.toLowerCase().includes('cockleshell') ||
        attraction.category === 'beach'
    )

    if (beach) {
      suggestions.push({
        id: 'morning-beach',
        title: 'Perfect Time for the Beach',
        description: `${beach.name} is less crowded before 11am with excellent conditions.`,
        timing: 'Best before 11am',
        reason: 'Fewer crowds, cooler temperature',
        place: {
          id: beach.id,
          name: beach.name,
          type: 'beach',
        },
        ctaPrimary: 'View Details',
        ctaSecondary: 'Directions',
      })
    }
  }

  // LUNCH SUGGESTIONS (11am - 2pm)
  if (currentHour >= 11 && currentHour < 14) {
    let lunchSpots = restaurants

    // If we have user location, find nearby restaurants
    if (userLocation) {
      lunchSpots = restaurants
        .filter((restaurant) => restaurant.location?.lat && restaurant.location?.lng)
        .map((restaurant) => ({
          ...restaurant,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            restaurant.location.lat,
            restaurant.location.lng
          ),
        }))
        .filter((restaurant) => restaurant.distance < 5)
        .sort((a, b) => a.distance - b.distance)
    }

    if (lunchSpots.length > 0) {
      const restaurant = lunchSpots[0]
      suggestions.push({
        id: 'lunch-nearby',
        title: 'Lunch Nearby',
        description: `${restaurant.name} has daily specials. ${restaurant.cuisine || ''}`,
        timing: 'Open now',
        reason: restaurant.distance
          ? `Only ${restaurant.distance}km from your location`
          : 'Popular local spot',
        place: {
          id: restaurant.id,
          name: restaurant.name,
          type: 'restaurant',
          distance: restaurant.distance,
        },
        ctaPrimary: 'View Menu',
        ctaSecondary: 'Directions',
      })
    }
  }

  // AFTERNOON SUGGESTIONS (2pm - 5pm)
  if (currentHour >= 14 && currentHour < 17) {
    if (visitorType === 'cruise') {
      const quickAttraction = attractions.find(
        (attraction) =>
          attraction.name?.toLowerCase().includes('romney') ||
          attraction.quickVisit === true
      )

      if (quickAttraction) {
        suggestions.push({
          id: 'afternoon-quick',
          title: 'Quick Port-Nearby Experience',
          description: `${quickAttraction.name} is perfect before heading back to your ship.`,
          timing: 'Time remaining: 2-3 hours',
          reason: 'Close to port, quick visit',
          place: {
            id: quickAttraction.id,
            name: quickAttraction.name,
            type: 'attraction',
          },
          ctaPrimary: 'View Details',
        })
      }
    } else {
      const mainAttraction = attractions.find(
        (attraction) =>
          attraction.name?.toLowerCase().includes('brimstone') ||
          attraction.featured === true
      )

      if (mainAttraction) {
        suggestions.push({
          id: 'afternoon-culture',
          title: 'Afternoon Culture',
          description: `Visit ${mainAttraction.name} for history and views.`,
          timing: 'Open until 5pm',
          reason: 'Perfect afternoon temperature',
          place: {
            id: mainAttraction.id,
            name: mainAttraction.name,
            type: 'attraction',
          },
          ctaPrimary: 'View Details',
        })
      }
    }
  }

  // EVENING SUGGESTIONS (5pm - 9pm)
  if (currentHour >= 17 && currentHour < 21) {
    // Sunset suggestion
    const sunsetSpot = attractions.find(
      (attraction) =>
        attraction.name?.toLowerCase().includes('beach') ||
        attraction.category === 'beach'
    )

    if (sunsetSpot) {
      suggestions.push({
        id: 'evening-sunset',
        title: "Tonight's Sunset",
        description: `Sunset at ${sunsetSpot.name} at 6:15 PM. Great views and atmosphere.`,
        timing: 'Sunset at 6:15 PM',
        reason: 'Best sunset viewing on the island',
        place: {
          id: sunsetSpot.id,
          name: sunsetSpot.name,
          type: 'beach',
        },
        ctaPrimary: 'Directions',
      })
    }

    // Dinner suggestion
    const dinnerSpot =
      visitorType === 'romance'
        ? restaurants.find(
            (restaurant) =>
              restaurant.type === 'fine-dining' || restaurant.romantic === true
          )
        : restaurants.find((restaurant) => restaurant.popular === true)

    if (dinnerSpot) {
      suggestions.push({
        id: 'evening-dinner',
        title: 'Dinner Recommendation',
        description: `${dinnerSpot.name} - ${dinnerSpot.description || dinnerSpot.cuisine}`,
        timing: 'Reservations recommended',
        reason: visitorType === 'romance' ? 'Perfect for couples' : 'Local favorite',
        place: {
          id: dinnerSpot.id,
          name: dinnerSpot.name,
          type: 'restaurant',
        },
        ctaPrimary: 'View Menu',
        ctaSecondary: 'Reserve',
      })
    }
  }

  return suggestions
}
