import "./globals.css";

export const metadata = {
  title: "KN",
  description: "Next.js 14 app scaffolded with Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
