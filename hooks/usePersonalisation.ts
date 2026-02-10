"use client";

import { usePersonalisationContext } from "../context/PersonalisationContext";

export function usePersonalisation() {
  return usePersonalisationContext();
}
