'use client';

import { useEffect, useMemo, useState } from 'react';

import { getTripPlannerResponse } from '../../lib/mock-trip-planner';

type PlannerMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  itinerary?: ItineraryTemplate;
};

type ItineraryTemplate = {
  title: string;
  summary: string;
  days: {
    day: number;
    title: string;
    activities: {
      time: string;
      duration: string;
      name: string;
      type: string;
      description: string;
      location: { lat: number; lng: number };
    }[];
  }[];
};

const typingDots = ['0', '150', '300'];
const TRIP_PERSONA_STORAGE_KEY = 'tripPersona';

const tripPersonaOptions = [
  {
    value: 'romance',
    label: 'Romance',
    description: 'Couples escapes, sunsets, and private dining.',
    prompts: [
      'Plan a romantic 4-day getaway with beach sunsets.',
      'We want spa time and candlelit dinners for 3 days.',
      'Design a honeymoon itinerary with scenic viewpoints.',
    ],
    featured: ['Sunset catamaran cruise', 'Private beach picnic', 'Couples spa ritual'],
    recommendations: ['Book a beachfront villa', 'Reserve a sunset dinner'],
  },
  {
    value: 'family',
    label: 'Family',
    description: 'Kid-friendly beaches, easy adventures, and downtime.',
    prompts: [
      'Plan a 5-day family trip with gentle beaches.',
      'We need a mix of culture and kid-friendly activities.',
      'Suggest a family-friendly itinerary with short excursions.',
    ],
    featured: ['Calm bay beach day', 'St Kitts Scenic Railway', 'Interactive museum visit'],
    recommendations: ['Look for family suite stays', 'Include snack stops'],
  },
  {
    value: 'adventure',
    label: 'Adventure',
    description: 'Volcano hikes, rainforest trails, and water sports.',
    prompts: [
      'Build a 3-day adventure itinerary with hikes and snorkeling.',
      'We want an adrenaline-filled port day itinerary.',
      'Plan an active trip with waterfalls and ATV rides.',
    ],
    featured: ['Mount Liamuiga hike', 'Rainforest ATV expedition', 'Snorkeling cove'],
    recommendations: ['Pack light hiking layers', 'Add a beach recovery day'],
  },
  {
    value: 'food',
    label: 'Food',
    description: 'Seafood tastings, local markets, and chef spots.',
    prompts: [
      'Create a 3-day food-focused itinerary.',
      'We want markets, rum tastings, and island cooking.',
      'Plan a culinary trip with beachside dinners.',
    ],
    featured: ['Basseterre market tour', 'Rum tasting flight', 'Sea-to-table dinner'],
    recommendations: ['Schedule a chef-led tasting', 'Pair with cooking class'],
  },
  {
    value: 'culture',
    label: 'Culture',
    description: 'History, heritage sites, and local traditions.',
    prompts: [
      'Plan a culture-rich 5-day itinerary.',
      'We love museums, forts, and local art.',
      'Create a history-focused trip with guided tours.',
    ],
    featured: ['Brimstone Hill Fortress', 'Heritage walking tour', 'Local artisan market'],
    recommendations: ['Include a UNESCO day trip', 'Add a storytelling dinner'],
  },
  {
    value: 'solo',
    label: 'Solo',
    description: 'Independent travel, flexible days, and wellness.',
    prompts: [
      'Design a solo-friendly itinerary with flexible pacing.',
      'Plan a wellness-focused solo escape for 4 days.',
      'We want a mix of adventure and quiet time.',
    ],
    featured: ['Morning yoga session', 'Solo beach day', 'Guided photo walk'],
    recommendations: ['Choose walkable stays', 'Mix group tours with downtime'],
  },
];

type TripPersonaKey = (typeof tripPersonaOptions)[number]['value'];

const defaultPersonaContent = {
  label: 'your trip',
  prompts: [
    'Plan a 4-day escape with beaches and local food.',
    'We want culture highlights and a day of adventure.',
    'Create a balanced itinerary with relaxing afternoons.',
  ],
  featured: ['Signature beach clubs', 'Island heritage tour', 'Local dining crawl'],
  recommendations: ['Share your timeline', 'Tell us your must-do experiences'],
};

const getSavedItineraries = (): ItineraryTemplate[] => {
  if (typeof window === 'undefined') return [];
  const stored = window.localStorage.getItem('savedItineraries');
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Unable to parse saved itineraries', error);
    return [];
  }
};

const saveItinerary = (itinerary: ItineraryTemplate) => {
  if (typeof window === 'undefined') return;
  const current = getSavedItineraries();
  const updated = current.some((item) => item.title === itinerary.title)
    ? current
    : [...current, itinerary];
  window.localStorage.setItem('savedItineraries', JSON.stringify(updated));
};

const shareItinerary = async (itinerary: ItineraryTemplate) => {
  const message = `Check out this St Kitts itinerary: ${itinerary.title}`;
  if (navigator.share) {
    await navigator.share({
      title: itinerary.title,
      text: message,
      url: window.location.href,
    });
    return;
  }
  await navigator.clipboard.writeText(`${message} — ${window.location.href}`);
};

export default function PlanYourTripPage() {
  const [tripPersona, setTripPersona] = useState<TripPersonaKey | null>(null);
  const [messages, setMessages] = useState<PlannerMessage[]>([
    {
      id: 'intro',
      role: 'assistant',
      content:
        "Tell me your trip length and interests (beach, food, history, adventure, romance) and I'll craft a mock itinerary.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [savedTitles, setSavedTitles] = useState<string[]>(
    () => getSavedItineraries().map((item) => item.title)
  );

  useEffect(() => {
    const storedPersona = window.localStorage.getItem(
      TRIP_PERSONA_STORAGE_KEY
    ) as TripPersonaKey | null;
    if (
      storedPersona &&
      tripPersonaOptions.some((option) => option.value === storedPersona)
    ) {
      setTripPersona(storedPersona);
    }
  }, []);

  const activePersona =
    tripPersonaOptions.find((option) => option.value === tripPersona) ??
    defaultPersonaContent;

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: PlannerMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const query = tripPersona ? `${text} ${tripPersona}` : text;
    const response = getTripPlannerResponse(query);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: 'assistant',
          content: response.text,
          itinerary: response.itinerary,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const savedNotice = useMemo(() => new Set(savedTitles), [savedTitles]);

  return (
    <main className="bg-slate-50 px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <section className="rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-900 to-primary p-10 text-white shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            Phase 3 Mock AI Trip Planner
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Plan your St Kitts escape with a conversational guide.
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Share your timeline, interests, and travel style to unlock a curated day-by-day itinerary.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <fieldset className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                    Step 1
                  </p>
                  <legend className="mt-2 text-lg font-semibold text-slate-900">
                    What type of trip are you planning?
                  </legend>
                  <p className="mt-2 text-sm text-slate-600">
                    Choose one to tailor itinerary ideas, featured content, and recommendations.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {tripPersonaOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer flex-col gap-1 rounded-2xl border px-4 py-3 text-left text-sm transition focus-within:ring-2 focus-within:ring-primary ${
                        tripPersona === option.value
                          ? 'border-primary bg-primary/10 text-slate-900'
                          : 'border-slate-200 text-slate-700 hover:border-primary'
                      }`}
                    >
                      <input
                        className="sr-only"
                        name="tripPersona"
                        onChange={() => {
                          setTripPersona(option.value);
                          window.localStorage.setItem(
                            TRIP_PERSONA_STORAGE_KEY,
                            option.value
                          );
                        }}
                        type="radio"
                        value={option.value}
                        checked={tripPersona === option.value}
                      />
                      <span className="text-sm font-semibold">{option.label}</span>
                      <span className="text-xs text-slate-500">
                        {option.description}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  {tripPersona
                    ? `Personalizing for ${activePersona.label} trips.`
                    : 'Select a trip type to personalize the planner.'}
                </p>
              </fieldset>
            </div>

            <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
                <h2 className="text-lg font-semibold">Trip Planner Chat</h2>
                <p className="text-sm text-slate-300">
                  Mock AI • Responses update based on keywords
                  {tripPersona ? ` • Focus: ${activePersona.label}` : ''}
                </p>
              </div>
              <div className="flex max-h-[520px] flex-1 flex-col gap-4 overflow-y-auto px-6 py-6">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-4">
                    <div
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                          message.role === 'user'
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>

                    {message.itinerary && (
                      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex flex-col gap-2 border-b border-slate-200 pb-4">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {message.itinerary.title}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {message.itinerary.summary}
                          </p>
                          <div className="flex flex-wrap gap-3 pt-2">
                            <button
                              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white"
                              onClick={() => {
                                saveItinerary(message.itinerary);
                                setSavedTitles((prev) =>
                                  prev.includes(message.itinerary.title)
                                    ? prev
                                    : [...prev, message.itinerary.title]
                                );
                              }}
                              type="button"
                            >
                              {savedNotice.has(message.itinerary.title)
                                ? 'Saved'
                                : 'Save Itinerary'}
                            </button>
                            <button
                              className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700"
                              onClick={async () => {
                                await shareItinerary(message.itinerary);
                              }}
                              type="button"
                            >
                              Share
                            </button>
                          </div>
                        </div>

                        <div className="mt-4 space-y-4">
                          {message.itinerary.days.map((day) => (
                            <div key={day.day} className="rounded-2xl bg-slate-50 p-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-semibold text-slate-800">
                                  Day {day.day}: {day.title}
                                </h4>
                                <span className="rounded-full bg-slate-200 px-2 py-1 text-[11px] font-semibold uppercase text-slate-500">
                                  {day.activities.length} stops
                                </span>
                              </div>
                              <div className="mt-3 space-y-3">
                                {day.activities.map((activity) => (
                                  <div
                                    key={`${day.day}-${activity.name}`}
                                    className="rounded-xl border border-slate-200 bg-white p-3"
                                  >
                                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                                      <span>{activity.time}</span>
                                      <span>{activity.duration}</span>
                                    </div>
                                    <h5 className="mt-2 text-sm font-semibold text-slate-900">
                                      {activity.name}
                                    </h5>
                                    <p className="mt-1 text-sm text-slate-600">
                                      {activity.description}
                                    </p>
                                    <p className="mt-2 text-xs text-slate-400">
                                      {activity.location.lat.toFixed(3)},
                                      {activity.location.lng.toFixed(3)}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                          <p className="font-semibold text-slate-700">
                            Map preview
                          </p>
                          <p className="mt-1">
                            Route visualization will appear here with Mapbox in the next phase.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      {typingDots.map((delay) => (
                        <span
                          key={delay}
                          className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                    AI is typing...
                  </div>
                )}
              </div>

              <form
                className="border-t border-slate-200 bg-slate-50 px-6 py-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSend(input);
                }}
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm focus:border-primary focus:outline-none"
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Try: 3 days of beach + food"
                    type="text"
                    value={input}
                  />
                  <button
                    className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                What the AI listens for
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  <span className="font-semibold text-slate-800">Duration:</span>{' '}
                  3 days, 5 days, week
                </li>
                <li>
                  <span className="font-semibold text-slate-800">Interests:</span>{' '}
                  beach, food, history, culture, adventure, romance
                </li>
                <li>
                  <span className="font-semibold text-slate-800">Visitor type:</span>{' '}
                  cruise, honeymoon, family
                </li>
                <li>
                  <span className="font-semibold text-slate-800">Trip style:</span>{' '}
                  {tripPersona ? activePersona.label : 'select a trip type above'}
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Featured for {activePersona.label}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {activePersona.featured.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-primary">
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Recommendations
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                {activePersona.recommendations.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span aria-hidden="true" className="text-primary">
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">Try a prompt</h3>
              <div className="mt-4 flex flex-col gap-3">
                {activePersona.prompts.map((prompt) => (
                  <button
                    key={prompt}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm text-slate-700 hover:border-primary hover:text-primary"
                    onClick={() => handleSend(prompt)}
                    type="button"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
