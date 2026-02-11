"use client";

import { useInstallPrompt } from "../lib/hooks/useInstallPrompt";

export default function MobileInstallBanner() {
  const { canInstall, dismissPrompt, isInstalled, promptInstall } =
    useInstallPrompt();

  const handleInstall = async () => {
    const result = await promptInstall();
    if (result?.outcome === "ios") {
      window.alert(result.message);
    }
  };

  if (!canInstall || isInstalled) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-[#faf9f6]/95 p-4 shadow-[0_-8px_24px_rgba(15,23,42,0.12)] backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex w-full max-w-[1320px] items-center gap-3 px-2 sm:px-6">
        <button className="header-ghost-button flex-1 border-slate-900/25 bg-slate-900/5 text-slate-900 hover:bg-slate-900/10" onClick={handleInstall} type="button">
          Install App
        </button>
        <button className="header-ghost-button border-slate-900/25 bg-slate-900/5 text-slate-900 hover:bg-slate-900/10" onClick={dismissPrompt} type="button">
          Not now
        </button>
      </div>
    </div>
  );
}
