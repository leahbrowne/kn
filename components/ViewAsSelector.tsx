"use client";

import { usePersonalisation } from "../hooks/usePersonalisation";

type ViewAsSelectorProps = {
  persona?: string;
  setPersona?: (value: string) => void;
};

const visitorOptions = [
  { value: "first-time", label: "First-Time Visitor" },
  { value: "cruise", label: "Cruise Visitor" },
  { value: "returning", label: "Returning Visitor" },
  { value: "romance", label: "Romance Seeker" },
];

export default function ViewAsSelector({
  persona: personaProp,
  setPersona: setPersonaProp,
}: ViewAsSelectorProps) {
  const context = usePersonalisation();
  const persona = personaProp ?? context.persona;
  const setPersona = setPersonaProp ?? context.setPersona;

  return (
    <div className="ml-auto hidden items-center gap-2 px-4 sm:flex">
      <label className="text-sm font-medium" htmlFor="view-as-selector">
        View As:
      </label>
      <select
        id="view-as-selector"
        className="rounded border border-gray-300 bg-white px-3 py-1"
        onChange={(event) => {
          setPersona(event.target.value);
        }}
        value={persona}
      >
        {visitorOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
