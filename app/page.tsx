'use client';

import { useEffect, useState } from 'react';

const heroContent = {
  'first-time': {
    title: 'Discover Your Caribbean Paradise',
    subtitle: 'Pristine beaches, rich history, and authentic island culture await',
    cta: 'Start Planning Your Adventure',
    features: [
      {
        title: 'UNESCO heritage sites',
        description:
          'Explore UNESCO-listed landmarks that bring St Kitts history to life.',
      },
      {
        title: 'Natural beauty',
        description: 'From rainforests to beaches, discover the island’s wild side.',
      },
      {
        title: 'Authentic culture',
        description: 'Meet locals, savor cuisine, and celebrate island traditions.',
      },
    ],
  },
  cruise: {
    title: 'Make the Most of Your Port Day',
    subtitle: 'Shore excursions and experiences just minutes from the port',
    cta: 'Browse Shore Excursions',
    features: [
      {
        title: 'Port proximity',
        description: 'Top experiences are only minutes away from Port Zante.',
      },
      {
        title: '4-6 hour adventures',
        description: 'Perfect-length tours built around cruise schedules.',
      },
      {
        title: 'Easy transportation',
        description: 'Smooth transfers to beaches, culture stops, and viewpoints.',
      },
    ],
  },
  returning: {
    title: 'Welcome Back to St Kitts',
    subtitle: "Discover what's new since your last visit",
    cta: "See What's New",
    features: [
      {
        title: 'New openings',
        description: 'Fresh restaurants, boutiques, and attractions to explore.',
      },
      {
        title: 'Saved itineraries',
        description: 'Pick up where you left off with your favorite plans.',
      },
      {
        title: "Locals' favorites",
        description: 'Go beyond the guidebook with insider recommendations.',
      },
    ],
  },
  romance: {
    title: "Say 'I Do' in Paradise",
    subtitle:
      "Create unforgettable moments in the Caribbean's most romantic setting",
    cta: 'Explore Wedding Venues',
    features: [
      {
        title: 'Beach ceremonies',
        description: 'Exchange vows with ocean views and soft sand underfoot.',
      },
      {
        title: 'Romantic packages',
        description: 'Tailored celebrations for proposals, weddings, and more.',
      },
      {
        title: 'Honeymoon experiences',
        description: 'Plan candlelit dinners, sunset sails, and spa escapes.',
      },
    ],
  },
};

type VisitorType = keyof typeof heroContent;

export default function Home() {
  const [visitorType, setVisitorType] = useState<VisitorType>('first-time');

  useEffect(() => {
    const storedType = localStorage.getItem('visitorType') as VisitorType | null;
    if (storedType && storedType in heroContent) {
      setVisitorType(storedType);
    }
  }, []);

  const content = heroContent[visitorType];

  return (
    <main className="bg-gradient-to-br from-primary to-accent px-6 py-16 text-white">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="max-w-3xl rounded-[32px] bg-slate-950/70 p-10 shadow-2xl shadow-slate-900/40">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            Mock Welcome
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/80">
            {content.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-secondary/30 transition hover:-translate-y-0.5"
              href="#"
            >
              {content.cta}
            </a>
            <a
              className="rounded-full border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              href="#"
            >
              View Experiences
            </a>
          </div>
        </div>
        <div className="grid gap-6 text-slate-900 sm:grid-cols-3">
          {content.features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white/90 p-6 shadow-lg shadow-slate-900/10"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
