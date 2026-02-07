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
  const heroTitle = "Say 'I Do' in Paradise";
  const heroSubtitle =
    'Create unforgettable moments in the Caribbean’s most romantic setting';

  return (
    <main className="text-white">
      <section
        className="relative flex min-h-[85vh] items-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-slate-900/10" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
            Caribbean Romance
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            {heroTitle}
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
            {heroSubtitle}
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <a
              className="rounded-full bg-white/20 px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(15,23,42,0.25)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/30"
              href="#"
            >
              Explore Experiences
            </a>
            <a
              className="rounded-full border border-white/40 bg-white/10 px-7 py-3 text-sm font-semibold text-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.2)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
              href="#"
            >
              Plan My Trip
            </a>
          </div>
        </div>
      </section>
      <section className="bg-white px-6 py-16 text-slate-900">
        <div className="mx-auto grid w-full max-w-5xl gap-6 sm:grid-cols-3">
          {content.features.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-900/10"
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
