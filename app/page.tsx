import ExperienceChips from '../components/ExperienceChips';
import TripPlannerHighlight from '../components/TripPlannerHighlight';

export default function Home() {
  const heroTitle = "Say 'I Do' in Paradise";
  const heroSubtitle =
    'Create unforgettable moments in the Caribbean’s most romantic setting';

  return (
    <main className="text-white">
      <section
        className="relative flex min-h-[90vh] items-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/60 to-indigo-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-24 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/80">
            Caribbean Romance
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            {heroTitle}
          </h1>
          <p className="max-w-2xl text-xl leading-relaxed text-white/80 sm:text-2xl">
            {heroSubtitle}
          </p>
          <div className="mt-2 flex flex-wrap gap-4">
            <a
              className="rounded-full bg-white/25 px-8 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.25)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/35"
              href="#"
            >
              Explore Experiences
            </a>
            <a
              className="rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-base font-semibold text-white/90 shadow-[0_18px_40px_rgba(15,23,42,0.2)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/20"
              href="#"
            >
              Plan My Trip
            </a>
          </div>
        </div>
      </section>
      <TripPlannerHighlight />
      <section className="bg-gradient-to-b from-white via-slate-50 to-white px-6 py-24 text-slate-900">
        <div className="experience-shell">
          <div className="experience-panel">
            <div className="experience-header">
              <p className="experience-kicker">Discover the island</p>
              <h2>Choose your experience</h2>
              <p className="experience-subtitle">
                Tap into the themes that match your perfect St Kitts escape.
              </p>
            </div>
            <ExperienceChips />
          </div>
        </div>
      </section>
    </main>
  );
}
