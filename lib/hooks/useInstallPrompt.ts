import { useEffect, useState } from 'react';

export function useInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const dismissed = localStorage.getItem('installPromptDismissed');
    if (dismissed) return;

    const visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10) + 1;
    localStorage.setItem('visitCount', visitCount.toString());

    if (visitCount >= 2) {
      setCanInstall(true);
    }

    const handler = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handler as EventListener);
    return () => window.removeEventListener('beforeinstallprompt', handler as EventListener);
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) {
      if (typeof navigator !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
        return {
          outcome: 'ios',
          message: 'Tap Share, then "Add to Home Screen"',
        };
      }
      return { outcome: 'unavailable' };
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setCanInstall(false);

    return { outcome };
  };

  const dismissPrompt = () => {
    localStorage.setItem('installPromptDismissed', 'true');
    setCanInstall(false);
  };

  return {
    canInstall,
    isInstalled,
    promptInstall,
    dismissPrompt,
  };
}
