const itineraryTemplates = [
  {
    key: 'beach-food-3',
    title: '3-Day Beach & Food Adventure',
    summary:
      'A sun-soaked coastal escape with the island’s best seafood, beach clubs, and local bites.',
    days: [
      {
        day: 1,
        title: 'Coastal Introduction',
        activities: [
          {
            time: '9:00 AM',
            duration: '3 hours',
            name: 'Cockleshell Beach',
            type: 'beach',
            description:
              'Kick off with calm Caribbean waters and a relaxed beach club lunch.',
            location: { lat: 17.263, lng: -62.754 },
          },
          {
            time: '2:00 PM',
            duration: '2 hours',
            name: 'Frigate Bay Taste Trail',
            type: 'food',
            description:
              'Sample local favorites and rum cocktails along the strip.',
            location: { lat: 17.269, lng: -62.690 },
          },
        ],
      },
      {
        day: 2,
        title: 'Beach Hopping & Sunset Dining',
        activities: [
          {
            time: '10:00 AM',
            duration: '3 hours',
            name: 'South Friars Bay',
            type: 'beach',
            description:
              'Enjoy paddleboarding and quiet coves with turquoise waters.',
            location: { lat: 17.314, lng: -62.712 },
          },
          {
            time: '6:30 PM',
            duration: '2 hours',
            name: 'Sea-to-Table Dinner',
            type: 'food',
            description:
              'Reserve a seaside table for grilled lobster and island spices.',
            location: { lat: 17.299, lng: -62.725 },
          },
        ],
      },
      {
        day: 3,
        title: 'Local Markets & Farewell Swim',
        activities: [
          {
            time: '9:30 AM',
            duration: '2 hours',
            name: 'Basseterre Market Square',
            type: 'food',
            description:
              'Pick up island produce, spices, and sweet treats to take home.',
            location: { lat: 17.296, lng: -62.735 },
          },
          {
            time: '1:30 PM',
            duration: '2 hours',
            name: 'Banana Bay Dip',
            type: 'beach',
            description:
              'Finish with a final swim and a coconut drink in hand.',
            location: { lat: 17.269, lng: -62.749 },
          },
        ],
      },
    ],
  },
  {
    key: 'heritage-5',
    title: '5-Day Heritage Explorer',
    summary:
      'Walk through UNESCO landmarks, colonial architecture, and cultural traditions across the island.',
    days: [
      {
        day: 1,
        title: 'Historic Basseterre',
        activities: [
          {
            time: '9:30 AM',
            duration: '2 hours',
            name: 'Independence Square',
            type: 'history',
            description:
              'Begin with a guided walk through the heart of the capital.',
            location: { lat: 17.296, lng: -62.735 },
          },
          {
            time: '1:00 PM',
            duration: '2 hours',
            name: 'National Museum',
            type: 'culture',
            description:
              'Discover Kalinago artifacts and colonial-era exhibits.',
            location: { lat: 17.295, lng: -62.735 },
          },
        ],
      },
      {
        day: 2,
        title: 'UNESCO Fortress Day',
        activities: [
          {
            time: '10:00 AM',
            duration: '4 hours',
            name: 'Brimstone Hill Fortress',
            type: 'history',
            description:
              'Explore the UNESCO World Heritage site and panoramic views.',
            location: { lat: 17.363, lng: -62.841 },
          },
        ],
      },
      {
        day: 3,
        title: 'Rail & Estate Stories',
        activities: [
          {
            time: '9:00 AM',
            duration: '3 hours',
            name: 'Scenic Railway Tour',
            type: 'culture',
            description:
              'Ride the heritage railway and hear stories of the sugar trade.',
            location: { lat: 17.310, lng: -62.736 },
          },
        ],
      },
      {
        day: 4,
        title: 'Village Traditions',
        activities: [
          {
            time: '11:00 AM',
            duration: '2 hours',
            name: 'Old Road Rum Experience',
            type: 'culture',
            description:
              'Taste locally crafted rum and meet artisans.',
            location: { lat: 17.292, lng: -62.831 },
          },
        ],
      },
      {
        day: 5,
        title: 'Carib Territory & Farewell',
        activities: [
          {
            time: '9:30 AM',
            duration: '3 hours',
            name: 'Carib Cultural Showcase',
            type: 'history',
            description:
              'Learn about the island’s first inhabitants and traditions.',
            location: { lat: 17.314, lng: -62.746 },
          },
        ],
      },
    ],
  },
  {
    key: 'cruise-adventure',
    title: 'Port Day Adventure',
    summary:
      'High-energy thrills near the port with rainforest views and quick transfers.',
    days: [
      {
        day: 1,
        title: 'Half-Day Thrill Ride',
        activities: [
          {
            time: '9:30 AM',
            duration: '3 hours',
            name: 'Rainforest ATV Expedition',
            type: 'adventure',
            description:
              'Ride through lush trails and stop at hidden overlooks.',
            location: { lat: 17.343, lng: -62.768 },
          },
          {
            time: '1:30 PM',
            duration: '2 hours',
            name: 'Frigate Bay Beach Break',
            type: 'beach',
            description:
              'Cool down with a quick swim and beachside refreshment.',
            location: { lat: 17.266, lng: -62.695 },
          },
        ],
      },
    ],
  },
  {
    key: 'romance-week',
    title: '7-Day Romantic Escape',
    summary:
      'Slow mornings, sunset sails, and private beach moments for couples.',
    days: [
      {
        day: 1,
        title: 'Arrival & Sunset Toast',
        activities: [
          {
            time: '5:30 PM',
            duration: '2 hours',
            name: 'Golden Hour Catamaran',
            type: 'romance',
            description:
              'Celebrate with champagne and a coastal cruise.',
            location: { lat: 17.296, lng: -62.736 },
          },
        ],
      },
      {
        day: 2,
        title: 'Secluded Beach Day',
        activities: [
          {
            time: '10:00 AM',
            duration: '4 hours',
            name: 'Oualie Beach Picnic',
            type: 'beach',
            description:
              'Private cabana, gentle waves, and a picnic for two.',
            location: { lat: 17.198, lng: -62.586 },
          },
        ],
      },
      {
        day: 3,
        title: 'Spa & Slow Afternoon',
        activities: [
          {
            time: '11:00 AM',
            duration: '2 hours',
            name: 'Couples Spa Ritual',
            type: 'romance',
            description:
              'Restore with island botanicals and ocean views.',
            location: { lat: 17.258, lng: -62.760 },
          },
        ],
      },
      {
        day: 4,
        title: 'Rainforest & Waterfalls',
        activities: [
          {
            time: '9:30 AM',
            duration: '3 hours',
            name: 'Romantic Rainforest Hike',
            type: 'adventure',
            description:
              'Guided walk to a hidden waterfall with a scenic break.',
            location: { lat: 17.331, lng: -62.776 },
          },
        ],
      },
      {
        day: 5,
        title: 'Culinary Night',
        activities: [
          {
            time: '7:00 PM',
            duration: '2 hours',
            name: 'Chef’s Table Dinner',
            type: 'food',
            description:
              'Private tasting menu featuring island flavors.',
            location: { lat: 17.306, lng: -62.720 },
          },
        ],
      },
      {
        day: 6,
        title: 'Island Hopping',
        activities: [
          {
            time: '10:00 AM',
            duration: '5 hours',
            name: 'Nevis Day Trip',
            type: 'adventure',
            description:
              'Ferry over for a leisurely day of beaches and boutiques.',
            location: { lat: 17.150, lng: -62.579 },
          },
        ],
      },
      {
        day: 7,
        title: 'Farewell Moments',
        activities: [
          {
            time: '9:00 AM',
            duration: '2 hours',
            name: 'Sunrise Beach Walk',
            type: 'beach',
            description:
              'Capture your final morning together on the shore.',
            location: { lat: 17.300, lng: -62.725 },
          },
        ],
      },
    ],
  },
  {
    key: 'family-fun-4',
    title: '4-Day Family Fun',
    summary:
      'An easy-going itinerary with hands-on culture, beaches, and kid-friendly adventures.',
    days: [
      {
        day: 1,
        title: 'Easy Island Welcome',
        activities: [
          {
            time: '10:30 AM',
            duration: '2 hours',
            name: 'Timothy Hill Scenic Stop',
            type: 'culture',
            description:
              'Quick photo stop with views of both the Atlantic and Caribbean.',
            location: { lat: 17.270, lng: -62.698 },
          },
        ],
      },
      {
        day: 2,
        title: 'Animal Encounters',
        activities: [
          {
            time: '9:00 AM',
            duration: '3 hours',
            name: 'St Kitts Eco Park',
            type: 'adventure',
            description:
              'Interactive wildlife experiences and shaded trails.',
            location: { lat: 17.353, lng: -62.793 },
          },
        ],
      },
      {
        day: 3,
        title: 'Beach & Treats',
        activities: [
          {
            time: '11:00 AM',
            duration: '3 hours',
            name: 'Turtle Beach',
            type: 'beach',
            description:
              'Family-friendly sands with calm, shallow water.',
            location: { lat: 17.299, lng: -62.755 },
          },
        ],
      },
      {
        day: 4,
        title: 'Culture Day',
        activities: [
          {
            time: '10:00 AM',
            duration: '2 hours',
            name: 'Sugar Heritage Walk',
            type: 'history',
            description:
              'Short, engaging tour with storytelling for all ages.',
            location: { lat: 17.298, lng: -62.737 },
          },
        ],
      },
    ],
  },
];

const interestKeywords = [
  'beach',
  'food',
  'history',
  'culture',
  'adventure',
  'romance',
];

const visitorKeywords = ['cruise', 'honeymoon', 'family'];

const detectDuration = (query) => {
  const match = query.match(/(\d+)\s*(day|days)/);
  if (match) {
    return Number(match[1]);
  }
  if (query.includes('week')) {
    return 7;
  }
  return null;
};

const detectInterests = (query) =>
  interestKeywords.filter((keyword) => query.includes(keyword));

const detectVisitorType = (query) =>
  visitorKeywords.find((keyword) => query.includes(keyword)) ?? null;

const findTemplate = (query, duration, interests, visitorType) => {
  if (interests.includes('beach') && interests.includes('food') && duration === 3) {
    return itineraryTemplates.find((item) => item.key === 'beach-food-3');
  }
  if (
    (interests.includes('history') || interests.includes('culture')) &&
    duration === 5
  ) {
    return itineraryTemplates.find((item) => item.key === 'heritage-5');
  }
  if (visitorType === 'cruise' && interests.includes('adventure')) {
    return itineraryTemplates.find((item) => item.key === 'cruise-adventure');
  }
  if (
    interests.includes('romance') &&
    interests.includes('beach') &&
    (duration === 7 || query.includes('week'))
  ) {
    return itineraryTemplates.find((item) => item.key === 'romance-week');
  }
  if (visitorType === 'family') {
    return itineraryTemplates.find((item) => item.key === 'family-fun-4');
  }
  return null;
};

export const getTripPlannerResponse = (input) => {
  const query = input.toLowerCase();
  const duration = detectDuration(query);
  const interests = detectInterests(query);
  const visitorType = detectVisitorType(query);

  const template = findTemplate(query, duration, interests, visitorType);

  if (template) {
    return {
      type: 'itinerary',
      text: `Great choices! Here’s a curated ${template.title} that matches your ${interests.join(
        ', '
      )} interests${visitorType ? ` for ${visitorType} travelers` : ''}.`,
      itinerary: template,
    };
  }

  return {
    type: 'message',
    text:
      'Tell me how long you’ll stay and what you love most (beaches, food, history, adventure, romance), and I’ll craft a custom St Kitts itinerary.',
  };
};

export const tripPlannerTemplates = itineraryTemplates;
