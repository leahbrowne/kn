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
        <button key={experience} className="experience-chip" type="button">
          {experience}
        </button>
      ))}
    </div>
  );
}
