export default function Home() {
  return (
    <main className="bg-stone-50 text-slate-100">
      <section
        className="relative flex min-h-[95vh] items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2600&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/40 to-slate-950/80" />
        <div className="relative w-full px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
            <span className="text-xs uppercase tracking-[0.5em] text-white/80">
              Caribbean Romance
            </span>
            <h1 className="max-w-[720px] text-[clamp(4rem,6vw,5rem)] font-light leading-[1.05]">
              Say “I Do” in Paradise
            </h1>
            <p className="max-w-[560px] text-[clamp(1.125rem,2vw,1.25rem)] leading-[1.6] text-white/80">
              Create unforgettable moments in the Caribbean’s most romantic
              setting, where turquoise waters meet candlelit celebrations.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                className="inline-flex h-12 items-center justify-center border border-white/40 px-6 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
                href="#experiences"
              >
                Discover Experiences
              </a>
              <a
                className="inline-flex h-12 items-center justify-center border border-white/20 px-6 text-sm uppercase tracking-[0.2em] text-white/80 transition hover:bg-white/10"
                href="#stays"
              >
                View Stays
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="experiences" className="bg-stone-50 px-6 py-28 text-slate-900 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="mb-12 flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Experiences
            </p>
            <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] font-light leading-tight">
              Moments shaped by the islands
            </h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Beach Weddings',
              image:
                'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
            },
            {
              title: 'Dining Under Stars',
              image:
                'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
            },
            {
              title: 'Boutique Stays',
              image:
                'https://images.unsplash.com/photo-1501117716987-c8e1ecb210fe?auto=format&fit=crop&w=1200&q=80',
            },
            {
              title: 'Island Adventures',
              image:
                'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="relative aspect-[4/5] overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-lg font-light text-white">{item.title}</h3>
                <a
                  className="mt-2 inline-flex text-xs uppercase tracking-[0.3em] text-white/70"
                  href="#"
                >
                  Explore
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-28 text-slate-900 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-20">
          {[
            {
              title: 'Caribbean light, slow mornings',
              copy: 'Renowned for its aqua waters and lush gardens, St. Kitts invites you into a rhythm of gentle waves and golden afternoons.',
              image:
                'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80',
            },
            {
              title: 'Evenings framed in warm gold',
              copy: 'Candlelit dinners, soft jazz, and moonlit terraces shape nights that feel effortlessly cinematic.',
              image:
                'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80',
              reverse: true,
            },
          ].map((story) => (
            <div
              key={story.title}
              className={`flex flex-col gap-10 lg:flex-row lg:items-center ${
                story.reverse ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full lg:w-1/2">
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-[420px] w-full object-cover"
                />
              </div>
              <div className="w-full lg:w-1/2">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                  Story
                </p>
                <h3 className="mt-4 text-[clamp(2rem,3vw,2.5rem)] font-light leading-tight">
                  {story.title}
                </h3>
                <p className="mt-4 text-lg leading-[1.7] text-slate-600">
                  {story.copy}
                </p>
                <a
                  className="mt-6 inline-flex text-xs uppercase tracking-[0.3em] text-slate-500"
                  href="#"
                >
                  Read the story
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="stays" className="bg-stone-50 px-6 py-28 text-slate-900 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-[1320px]">
          <div className="mb-10 flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              Curated Stays
            </p>
            <h2 className="text-[clamp(2.25rem,4vw,2.75rem)] font-light leading-tight">
              Suites with a view, villas with a story
            </h2>
          </div>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {[
            {
              title: 'Cliffside Villa',
              image:
                'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
            },
            {
              title: 'Palm Garden Retreat',
              image:
                'https://images.unsplash.com/photo-1501117716987-c8e1ecb210fe?auto=format&fit=crop&w=1400&q=80',
            },
            {
              title: 'Harbor House',
              image:
                'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80',
            },
            {
              title: 'Sunset Bungalow',
              image:
                'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1400&q=80',
            },
          ].map((stay) => (
            <div key={stay.title} className="min-w-[280px] sm:min-w-[360px]">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={stay.image}
                  alt={stay.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-sm uppercase tracking-[0.25em] text-slate-500">
                {stay.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-100 px-6 py-24 text-slate-900 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-[900px] flex-col items-start gap-6">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
            Begin your journey
          </p>
          <h2 className="text-[clamp(2rem,3.6vw,2.5rem)] font-light leading-tight">
            Create your itinerary in a few thoughtful steps
          </h2>
          <p className="text-lg leading-[1.7] text-slate-600">
            Let us guide the flow of your days, from sunrise sails to intimate
            island dinners.
          </p>
          <a
            className="inline-flex h-12 items-center justify-center border border-slate-400 px-6 text-xs uppercase tracking-[0.3em] text-slate-700 transition hover:bg-white"
            href="#"
          >
            Start Planning
          </a>
        </div>
      </section>

    </main>
  );
}
