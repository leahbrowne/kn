import "./globals.css";

import type { ReactNode } from "react";

import Chatbot from "../components/Chatbot";
import Header from "./Header";

export const metadata = {
  title: "St Kitts Tourism",
  description: "Island escapes, curated for you.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "St Kitts Tourism",
  },
};

export const viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="bg-slate-900">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
              <span>© 2024 St Kitts Tourism. All rights reserved.</span>
              <span className="text-slate-400">
                Crafted for the Phase 1 demo experience.
              </span>
            </div>
          </footer>
        </div>
        <Chatbot />
      </body>
    </html>
  );
}
