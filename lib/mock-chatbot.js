const responses = {
  visa:
    'Visa requirements vary by nationality. Most visitors from the US, UK, Canada, and the EU can stay up to 90 days visa-free. I can check details if you share your passport country.',
  weather:
    'St Kitts is warm year-round (around 77–88°F). Dry season runs Dec–Apr with sunny days; May–Nov is greener with quick tropical showers.',
  beach:
    'Top beaches include Cockleshell for calm waters, Frigate Bay for lively beach bars, and South Friars Bay for a quieter vibe. Want snorkel-friendly or family-friendly options?',
  snorkel:
    'Snorkel spots include Shitten Bay and the reefs off Cockleshell Beach. Bring reef-safe sunscreen and arrive in the morning for the clearest water.',
  food:
    'For local flavors, try lobster at Spice Mill, goat water stew at a roadside cookshop, or fresh seafood at The Pavilion. I can narrow it down by budget or vibe.',
  transport:
    'Getting around is easy with taxis, hotel shuttles, and rental cars. Taxis are fixed-rate; rental cars drive on the left. Want me to map a sample route?',
  airport:
    'Robert L. Bradshaw International Airport (SKB) is about 15 minutes from Basseterre and most resorts. Taxis and shuttles are available right outside arrivals.',
  currency:
    'The Eastern Caribbean Dollar (XCD) is the official currency. US dollars are widely accepted. Tipping 10–15% is customary for good service.',
};

export const getChatbotResponse = (input) => {
  const query = input.toLowerCase();

  if (query.includes('visa')) return responses.visa;
  if (query.includes('weather') || query.includes('season')) return responses.weather;
  if (query.includes('beach')) return responses.beach;
  if (query.includes('snorkel')) return responses.snorkel;
  if (query.includes('food') || query.includes('restaurant')) return responses.food;
  if (query.includes('transport') || query.includes('taxi') || query.includes('car')) {
    return responses.transport;
  }
  if (query.includes('airport')) return responses.airport;
  if (query.includes('currency') || query.includes('money') || query.includes('tipping')) {
    return responses.currency;
  }

  return (
    "I’m here to help with St Kitts travel tips! Ask me about beaches, dining, weather, transport, or visa details."
  );
};

export const chatbotQuickActions = [
  { label: 'Plan a Trip', prompt: 'Help me plan a 3 day beach and food trip.' },
  { label: 'Find Restaurants', prompt: 'Where should I eat in St Kitts?' },
  { label: 'Beach Recommendations', prompt: 'Which beaches are best for relaxing?' },
];
