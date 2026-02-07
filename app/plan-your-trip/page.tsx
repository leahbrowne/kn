'use client';

import { useMemo, useState } from 'react';

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

    const response = getTripPlannerResponse(text);

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
          <div className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-200 bg-slate-900 px-6 py-4 text-white">
              <h2 className="text-lg font-semibold">Trip Planner Chat</h2>
              <p className="text-sm text-slate-300">
                Mock AI • Responses update based on keywords
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
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">Try a prompt</h3>
              <div className="mt-4 flex flex-col gap-3">
                {[
                  'We are on a cruise and want adventure!',
                  'Plan a romantic beach week for our honeymoon.',
                  'We love history and culture for 5 days.',
                ].map((prompt) => (
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
