"use client";

import { useEffect, useState } from "react";

const DEFAULT_VISITOR_TYPE = "first-time";

export default function ViewAsSelector() {
  const [visitorType, setVisitorType] = useState(DEFAULT_VISITOR_TYPE);

  useEffect(() => {
    const storedVisitorType = window.localStorage.getItem("visitorType");
    if (storedVisitorType) {
      setVisitorType(storedVisitorType);
    }
  }, []);

  return (
    <div className="ml-auto hidden items-center gap-2 px-4 sm:flex">
      <label className="text-sm font-medium" htmlFor="view-as-selector">
        View As:
      </label>
      <select
        id="view-as-selector"
        className="rounded border border-gray-300 bg-white px-3 py-1"
        onChange={(event) => {
          const nextValue = event.target.value;
          window.localStorage.setItem("visitorType", nextValue);
          setVisitorType(nextValue);
          window.location.reload();
        }}
        value={visitorType}
      >
        <option value="first-time">First-Time Visitor</option>
        <option value="cruise">Cruise Visitor</option>
        <option value="returning">Returning Visitor</option>
        <option value="romance">Romance Seeker</option>
      </select>
    </div>
  );
}
