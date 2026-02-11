export const MOCK_CONCIERGE_RESPONSES = {
  greeting: [
    'Hi there. Welcome to St Kitts 🌴',
    'I’m your friendly local guide. I can help with beaches, food, and trip ideas.',
    'What would you like to explore first?',
  ],

  beaches: [
    'For relaxing? Try Cockleshell or South Friars. Calm water and fewer crowds.',
    'Want quiet, lively, or snorkelling spots?',
  ],

  restaurants: [
    'Looking for local food or something upscale?',
    'I can suggest beach bars, seafood spots, or date-night restaurants. What’s your vibe?',
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

export type ConciergeResponseKey = keyof typeof MOCK_CONCIERGE_RESPONSES;

const intentPatterns: Array<{ key: ConciergeResponseKey; pattern: RegExp }> = [
  { key: 'greeting', pattern: /\b(hi|hello|hey|good morning|good afternoon|good evening)\b/i },
  { key: 'beaches', pattern: /\b(beach|beaches|swim|snorkel|snorkelling|shore|coast)\b/i },
  { key: 'restaurants', pattern: /\b(restaurant|restaurants|food|eat|dining|dinner|lunch|breakfast)\b/i },
  { key: 'itinerary', pattern: /\b(3-day|three day|itinerary|day 1|day one)\b/i },
  { key: 'planning', pattern: /\b(plan|planning|trip|schedule|vacation|holiday|visit)\b/i },
  { key: 'nearMe', pattern: /\b(near me|nearby|close to me|around me|closest|location)\b/i },
];

const aggressivePattern =
  /\b(fuck|shit|bitch|asshole|idiot|stupid|dumb|hate you|screw you|damn you|kill you|go to hell)\b|!{3,}/i;
const profanityPattern = /\b(fuck|shit|bitch|damn)\b/i;

export function getMockReply(message: string): string {
  const text = message.trim();
  if (!text) {
    return MOCK_CONCIERGE_RESPONSES.fallback.join('\n');
  }

  if (aggressivePattern.test(text)) {
    return MOCK_CONCIERGE_RESPONSES.aggressive.join('\n');
  }

  if (profanityPattern.test(text)) {
    return MOCK_CONCIERGE_RESPONSES.profanity.join('\n');
  }

  const detectedIntent = intentPatterns.find(({ pattern }) => pattern.test(text));
  if (!detectedIntent) {
    return MOCK_CONCIERGE_RESPONSES.fallback.join('\n');
  }

  return MOCK_CONCIERGE_RESPONSES[detectedIntent.key].join('\n');
}

export const chatbotQuickActions = [
  { label: 'Greeting', prompt: 'Hi there!' },
  { label: 'Beaches', prompt: 'What are the best beaches in St Kitts?' },
  { label: 'Restaurants', prompt: 'Where should I eat in St Kitts?' },
  { label: 'Trip Planning', prompt: 'Can you help me plan a 3-day trip?' },
];

export const getChatbotResponse = getMockReply;
