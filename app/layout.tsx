import type { ReactNode } from "react";

import "./globals.css";

export const metadata = {
  title: "St Kitts Tourism PWA Demo",
  description: "Modern St Kitts Tourism PWA concept",
};
import "./globals.css";

import type { ReactNode } from "react";

import Chatbot from "../components/Chatbot";
import Footer from "../components/Footer";
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
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="min-h-screen">
          <header className="bg-primary text-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-white/80">
                  St Kitts
                </p>
                <h1 className="text-2xl font-semibold">Tourism PWA Demo</h1>
              </div>
              <span className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-slate-900">
                Visit Planner
              </span>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-sm text-slate-500">
              <span>Offline-ready PWA experience</span>
              <span className="font-semibold text-accent">Personalization Enabled</span>
      <body className="bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Chatbot />
      </body>
    </html>
  );
}
