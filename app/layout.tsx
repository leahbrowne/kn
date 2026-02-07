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
