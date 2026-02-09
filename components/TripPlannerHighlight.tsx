export default function TripPlannerHighlight() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-neutral-900 to-stone-900 px-6 py-24 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber-900/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-emerald-900/20 blur-3xl" />
        <div className="absolute right-10 top-4 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/60">
            AI Trip Planner
          </p>
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Plan your trip in seconds with AI
          </h2>
          <p className="max-w-xl text-lg text-white/75 sm:text-xl">
            Tell us what you love. We&apos;ll build the perfect itinerary.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="button-base button-primary px-6 text-base">
              Start Planning
            </button>
            <span className="text-sm text-white/60">
              Personalized in under a minute.
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-6 left-10 h-16 w-16 rounded-full bg-amber-900/25 blur-2xl" />
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs text-white/50">
              <span>AI Trip Planner</span>
              <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-emerald-200">
                Live
              </span>
            </div>
            <div className="mt-6 space-y-4 text-sm">
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                Looking for a 4-day escape with beaches, snorkeling, and a sunset
                cruise.
              </div>
              <div className="ml-auto w-11/12 rounded-2xl bg-gradient-to-br from-amber-200/20 via-stone-200/10 to-white/10 p-4">
                Got it! Here&apos;s a curated itinerary with morning beach time,
                midday adventures, and a candlelit dinner on day three.
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                Add a spa afternoon and keep it relaxed.
              </div>
              <div className="ml-auto w-11/12 rounded-2xl bg-gradient-to-br from-amber-200/20 via-stone-200/10 to-white/10 p-4">
                Done. I&apos;ll slot a resort spa session on day two and recommend a
                low-key evening lounge.
              </div>
            </div>
            <div className="mt-6 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/50">
              Describe your dream trip…
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
