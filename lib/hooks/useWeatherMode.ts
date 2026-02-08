import { useEffect, useState } from 'react';

export type WeatherMode = 'sunny' | 'rainy' | 'auto';

export function useWeatherMode() {
  const [mode, setMode] = useState<WeatherMode>('auto');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = localStorage.getItem('weatherMode') as WeatherMode | null;
    if (saved) setMode(saved);
  }, []);

  const changeMode = (newMode: WeatherMode) => {
    setMode(newMode);
    localStorage.setItem('weatherMode', newMode);
    window.dispatchEvent(new Event('weatherModeChange'));
  };

  return { mode, changeMode };
}
