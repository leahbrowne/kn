"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const VISITOR_TYPE_STORAGE_KEY = "visitorType";
const TRIP_PERSONA_STORAGE_KEY = "tripPersona";

export const DEFAULT_PERSONA = "first-time";

type PersonalisationFilters = Record<string, string | null>;

type PersonalisationContextValue = {
  persona: string;
  setPersona: (value: string) => void;
  tripPersona: string | null;
  setTripPersona: (value: string | null) => void;
  filters: PersonalisationFilters;
  setFilter: (key: string, value: string | null) => void;
  clearFilters: () => void;
};

const PersonalisationContext = createContext<PersonalisationContextValue | null>(
  null
);

export function PersonalisationProvider({ children }: { children: ReactNode }) {
  const [persona, setPersonaState] = useState(DEFAULT_PERSONA);
  const [tripPersona, setTripPersonaState] = useState<string | null>(null);
  const [filters, setFilters] = useState<PersonalisationFilters>({});

  useEffect(() => {
    const storedPersona = window.localStorage.getItem(VISITOR_TYPE_STORAGE_KEY);
    if (storedPersona) {
      setPersonaState(storedPersona);
    }

    const storedTripPersona = window.localStorage.getItem(TRIP_PERSONA_STORAGE_KEY);
    if (storedTripPersona) {
      setTripPersonaState(storedTripPersona);
    }
  }, []);

  const setPersona = useCallback((value: string) => {
    setPersonaState(value);
    window.localStorage.setItem(VISITOR_TYPE_STORAGE_KEY, value);
  }, []);

  const setTripPersona = useCallback((value: string | null) => {
    setTripPersonaState(value);
    if (value) {
      window.localStorage.setItem(TRIP_PERSONA_STORAGE_KEY, value);
      return;
    }
    window.localStorage.removeItem(TRIP_PERSONA_STORAGE_KEY);
  }, []);

  const setFilter = useCallback((key: string, value: string | null) => {
    setFilters((previousFilters) => ({
      ...previousFilters,
      [key]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const value = useMemo(
    () => ({
      persona,
      setPersona,
      tripPersona,
      setTripPersona,
      filters,
      setFilter,
      clearFilters,
    }),
    [persona, setPersona, tripPersona, setTripPersona, filters, setFilter, clearFilters]
  );

  return (
    <PersonalisationContext.Provider value={value}>
      {children}
    </PersonalisationContext.Provider>
  );
}

export function usePersonalisationContext() {
  const contextValue = useContext(PersonalisationContext);

  if (!contextValue) {
    throw new Error(
      "usePersonalisation must be used within a PersonalisationProvider"
    );
  }

  return contextValue;
}
