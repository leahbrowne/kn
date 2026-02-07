const experiences = [
  'Beach Weddings',
  'Honeymoons',
  'Dining',
  'Adventure',
  'Culture',
  'Wellness',
];

export default function ExperienceChips() {
  return (
    <div className="experience-row" aria-label="Experience categories">
      {experiences.map((experience) => (
        <button
          key={experience}
          className="button-base button-secondary px-4 text-xs font-semibold tracking-[0.08em]"
          type="button"
        >
          {experience}
        </button>
      ))}
    </div>
  );
}
