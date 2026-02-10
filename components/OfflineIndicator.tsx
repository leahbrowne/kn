"use client";

import { useEffect, useState } from "react";

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    updateOnlineStatus();

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  if (!isOffline) {
    return null;
  }

  return (
    <div className="bg-amber-100 px-4 py-2 text-sm text-amber-900">
      You’re offline. Some features may be unavailable.
    </div>
  );
}
