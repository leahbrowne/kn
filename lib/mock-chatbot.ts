export type IntentKey =
  | 'greeting'
  | 'beaches'
  | 'restaurants'
  | 'trip planning'
  | 'near me'
  | 'unknown questions'
  | 'aggressive/swearing inputs';

export interface MockIntentResponse {
  title: string;
  message: string;
  highlights: string[];
  followUpQuestions: string[];
}

export type Tone = 'aggressive' | 'normal' | 'unknown';

export const mockResponses: Record<IntentKey, MockIntentResponse> = {
  greeting: {
    title: 'Welcome to St Kitts 🌴',
    message:
      "Hi there! I’m your friendly St Kitts concierge. I can help with beaches, dining, nearby ideas, and trip planning.",
    highlights: [
      'Best times to visit and weather tips',
      'Beach picks by vibe (quiet, lively, family-friendly)',
      'Dining recommendations by budget and cuisine',
    ],
    followUpQuestions: [
      'Would you like a quick 2-day or 3-day itinerary?',
      'Are you more interested in beaches, food, or sightseeing first?',
    ],
  },
  beaches: {
    title: 'Top Beach Picks',
    message:
      'St Kitts has beautiful beach options for every mood. Here are a few favorites to get you started.',
    highlights: [
      'Cockleshell Beach: calm water and great views of Nevis',
      'South Friars Bay: relaxed setting with local beach bars',
      'Frigate Bay: lively atmosphere and easy food options nearby',
    ],
    followUpQuestions: [
      'Would you like family-friendly beaches or more secluded spots?',
      'Should I suggest beaches with the best snorkeling access?',
    ],
  },
  restaurants: {
    title: 'Where to Eat in St Kitts',
    message:
      'Great choice—St Kitts has everything from local cookshops to upscale waterfront dining.',
    highlights: [
      'Local flavors: try goat water stew or fresh grilled seafood',
      'Casual options: beach bars with quick bites and cocktails',
      'Dinner plans: waterfront restaurants with sunset views',
    ],
    followUpQuestions: [
      'Are you looking for local food, seafood, or international cuisine?',
      'Do you want recommendations by area like Basseterre or Frigate Bay?',
    ],
  },
  'trip planning': {
    title: 'Trip Planning Assistant',
    message:
      'I can help map out a smooth St Kitts itinerary with a balanced mix of adventure and relaxation.',
    highlights: [
      'Day planning: split time between beaches, sightseeing, and meals',
      'Transport tips: taxi vs rental and estimated travel times',
      'Packing guidance: sun essentials, casual wear, and activity gear',
    ],
    followUpQuestions: [
      'How many days are you staying?',
      'Would you like a relaxing, active, or mixed itinerary?',
    ],
  },
  'near me': {
    title: 'Nearby Suggestions',
    message:
      'I can suggest places near your area once you share where you are staying or exploring.',
    highlights: [
      'Nearby beaches and scenic viewpoints',
      'Restaurants and coffee spots within short travel time',
      'Quick activities for morning, afternoon, or evening',
    ],
    followUpQuestions: [
      'Which area are you in right now (e.g., Basseterre, Frigate Bay)?',
      'Do you want food, activities, or beaches closest to you?',
    ],
  },
  'unknown questions': {
    title: 'I Can Help With Travel Topics',
    message:
      'I might have missed that, but I’m happy to help with St Kitts travel planning and recommendations.',
    highlights: [
      'Beaches and snorkeling suggestions',
      'Restaurant and food recommendations',
      'Trip plans and nearby ideas',
    ],
    followUpQuestions: [
      'Would you like beach, food, or itinerary help?',
      'Can you rephrase your question with a travel detail?',
    ],
  },
  'aggressive/swearing inputs': {
    title: 'Let’s Keep It Friendly',
    message:
      'I’m here to help and want this to stay respectful. I can still assist with your St Kitts plans right away.',
    highlights: [
      'Beach recommendations tailored to your vibe',
      'Restaurant picks by budget and location',
      'Simple day-by-day itinerary suggestions',
    ],
    followUpQuestions: [
      'Would you like to start with beaches or restaurants?',
      'Are you planning a short getaway or a longer trip?',
    ],
  },
};

const intentKeywords: Record<Exclude<IntentKey, 'unknown questions' | 'aggressive/swearing inputs'>, RegExp> = {
  greeting: /\b(hi|hello|hey|good morning|good afternoon|good evening)\b/i,
  beaches: /\b(beach|beaches|swim|snorkel|shore|coast)\b/i,
  restaurants: /\b(restaurant|restaurants|food|eat|dining|dinner|lunch|breakfast)\b/i,
  'trip planning': /\b(plan|itinerary|trip|schedule|vacation|holiday|visit)\b/i,
  'near me': /\b(near me|nearby|close to me|around me|closest)\b/i,
};

const profanityOrAggressivePattern =
  /\b(fuck|shit|bitch|asshole|idiot|stupid|dumb|hate you|screw you|damn you)\b|!{3,}/i;

export function detectTone(message: string): Tone {
  const text = message.trim();
  if (!text) {
    return 'unknown';
  }

  if (profanityOrAggressivePattern.test(text)) {
    return 'aggressive';
  }

  const understood = Object.values(intentKeywords).some((pattern) => pattern.test(text));
  return understood ? 'normal' : 'unknown';
}

function formatResponse(response: MockIntentResponse): string {
  return [
    `${response.title}`,
    response.message,
    '',
    'Helpful highlights:',
    ...response.highlights.map((item) => `- ${item}`),
    '',
    'You might ask:',
    ...response.followUpQuestions.map((question) => `- ${question}`),
  ].join('\n');
}

export function getMockReply(message: string): string {
  const tone = detectTone(message);
  if (tone === 'aggressive') {
    return formatResponse(mockResponses['aggressive/swearing inputs']);
  }

  if (tone === 'unknown') {
    return formatResponse(mockResponses['unknown questions']);
  }

  const text = message.trim();

  if (intentKeywords.greeting.test(text)) {
    return formatResponse(mockResponses.greeting);
  }
  if (intentKeywords.beaches.test(text)) {
    return formatResponse(mockResponses.beaches);
  }
  if (intentKeywords.restaurants.test(text)) {
    return formatResponse(mockResponses.restaurants);
  }
  if (intentKeywords['trip planning'].test(text)) {
    return formatResponse(mockResponses['trip planning']);
  }
  if (intentKeywords['near me'].test(text)) {
    return formatResponse(mockResponses['near me']);
  }

  return formatResponse(mockResponses['unknown questions']);
}

export const chatbotQuickActions = [
  { label: 'Greeting', prompt: 'Hi there!' },
  { label: 'Beaches', prompt: 'What are the best beaches in St Kitts?' },
  { label: 'Restaurants', prompt: 'Where should I eat in St Kitts?' },
  { label: 'Trip Planning', prompt: 'Can you help me plan a 3-day trip?' },
];

export const getChatbotResponse = getMockReply;
