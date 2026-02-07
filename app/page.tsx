export default function Home() {
  return (
    <main className="bg-gradient-to-br from-primary to-accent px-6 py-16 text-white">
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <div className="max-w-3xl rounded-[32px] bg-slate-950/70 p-10 shadow-2xl shadow-slate-900/40">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-secondary">
            Mock Welcome
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Discover the St Kitts vibe in a bold, modern PWA.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-white/80">
            Mock content for the demo hero: explore sun-soaked shores, heritage
            experiences, and effortless trip planning designed to convert curious
            visitors into booked adventures.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-secondary/30 transition hover:-translate-y-0.5"
              href="#"
            >
              Start Planning
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
          {[
            {
              title: "Curated itineraries",
              description:
                "Personalized day plans that blend beach time, culture, and cuisine.",
            },
            {
              title: "Offline-ready guides",
              description:
                "Save key travel tips and maps to access them on the go.",
            },
            {
              title: "Local-first highlights",
              description:
                "Spotlight festivals, hidden coves, and island-led experiences.",
            },
          ].map((item) => (
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
