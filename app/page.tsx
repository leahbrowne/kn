export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Personalized for you
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900">
          Discover St Kitts with a fresh, vibrant palette
        </h2>
        <p className="mt-3 text-base text-slate-600">
          The demo homepage highlights destination inspiration, PWA features, and a
          personalized planning journey for every visitor segment.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white">
            Start Planning
          </button>
          <button className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary">
            View Itinerary
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "PWA-ready journeys",
            description: "Save itineraries offline and explore on the go.",
          },
          {
            title: "Smart trip planner",
            description: "AI-inspired recommendations tuned to your interests.",
          },
          {
            title: "Live island updates",
            description: "Stay in sync with events, weather, and local tips.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-secondary">
              <span className="text-lg font-semibold">●</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
            <p className="mt-4 text-sm font-semibold text-primary">
              Learn more →
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
