export const MOCK_CONCIERGE_RESPONSES = {
  greeting: ['Hi, I’m your St Kitts concierge. How can I help you explore the island today?'],

  beaches: [
    'For relaxing? Try Cockleshell or South Friars. Calm water and fewer crowds.',
    'Want quiet, lively, or snorkelling spots?',
  ],

  restaurants: [
    'Looking for local food or something upscale?',
    'I can suggest beach bars, seafood spots, or date-night restaurants. What’s your vibe?',
  ],

  stay: [
    'Beachfront resorts',
    'Boutique hotels',
    'Budget stays',
    'Family friendly options',
  ],

  planning: ['Happy to help plan your trip.', 'How many days are you visiting?'],

  itinerary: [
    'Here’s a simple 3-day idea:',
    'Day 1 beaches • Day 2 food & town • Day 3 rainforest or volcano hike.',
    'Want me to tailor it to couples, family, or solo travel?',
  ],

  nearMe: [
    'I can show places near you if you enable location.',
    'Want restaurants, beaches, or attractions nearby?',
  ],

  demoDisclosure: [
    'Quick note. This is a demo assistant, so answers are simplified.',
    'The full version will provide deeper personalised recommendations.',
  ],

  profanity: [
    'Hey, let’s keep it friendly 😊',
    'I’m here to help with your trip. What do you need?',
  ],

  aggressive: [
    'I want to help, but I can’t respond to hostile messages.',
    'If you’d like travel tips, I’m happy to continue.',
  ],

  fallback: [
    'I’m not sure about that yet.',
    'Try asking about beaches, restaurants, or trip planning.',
  ],
} as const;

const profanityRegex =
  /\b(fuck|shit|bitch|asshole|wtf|stupid|idiot|cunt|motherfucker|dumb|hate|kill|sucks)\b/i;

export function getMockReply(input: string) {
  const text = input.toLowerCase().trim();

  const pick = (responses: readonly string[]) =>
    responses[Math.floor(Math.random() * responses.length)];

  if (profanityRegex.test(text)) {
    return 'I’m here to help 😊 If something’s frustrating, tell me what you need and I’ll do my best to guide you.';
  }

  if (text.includes('beach')) {
    return 'Looking to relax or something more lively? I can suggest calm beaches or social beach bars.';
  }

  if (text.includes('eat') || text.includes('food') || text.includes('restaurant')) {
    return 'Craving local seafood, Caribbean flavours, or something upscale? Tell me your vibe.';
  }

  if (
    text.includes('stay') ||
    text.includes('hotel') ||
    text.includes('resort') ||
    text.includes('accommodation')
  ) {
    return pick(MOCK_CONCIERGE_RESPONSES.stay);
  }

  if (text.includes('plan') || text.includes('itinerary')) {
    return 'How many days are you staying? I can sketch a simple beach-and-food plan for you.';
  }

  return 'How can I help you explore St Kitts?';
}

export const chatbotQuickActions = [
  { label: 'Beaches', prompt: 'What are the best beaches in St Kitts?' },
  { label: 'Restaurants', prompt: 'Where should I eat in St Kitts?' },
  { label: 'Stay', prompt: 'Where should I stay in St Kitts?' },
  { label: 'Trip Planning', prompt: 'Can you help me plan a 3-day trip?' },
];

export const getChatbotResponse = getMockReply;
