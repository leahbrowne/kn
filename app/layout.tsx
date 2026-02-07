import type { ReactNode } from "react";

const navLinks = ["Overview", "Features", "Pricing", "Contact"];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <header className="site-header">
            <div className="brand">
              <span className="brand-mark" aria-hidden="true">
                ◆
              </span>
              <span className="brand-text">Acme Platform</span>
            </div>
            <nav aria-label="Primary">
              <ul className="nav-list">
                {navLinks.map((label) => (
                  <li key={label}>
                    <a className="nav-link" href="#">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </header>
          <main className="content">{children}</main>
          <footer className="site-footer">
            <span>© 2024 Acme Platform. Built for modern teams.</span>
          </footer>
        </div>
        <style jsx global>{`
          :root {
            color-scheme: light;
            font-family: "Inter", "Segoe UI", system-ui, sans-serif;
          }

          body {
            margin: 0;
            background: #f8fafc;
            color: #0f172a;
          }

          .page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .site-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem 2.5rem;
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            gap: 1.5rem;
          }

          .brand {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-weight: 600;
            font-size: 1.1rem;
          }

          .brand-mark {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2.25rem;
            height: 2.25rem;
            border-radius: 0.75rem;
            background: #1e40af;
            color: #ffffff;
            font-size: 1rem;
          }

          .nav-list {
            list-style: none;
            display: flex;
            margin: 0;
            padding: 0;
            gap: 1.5rem;
            flex-wrap: wrap;
          }

          .nav-link {
            text-decoration: none;
            font-weight: 500;
            color: #1e293b;
          }

          .nav-link:hover {
            color: #1d4ed8;
          }

          .content {
            flex: 1;
            padding: 2.5rem;
          }

          .site-footer {
            padding: 1.5rem 2.5rem;
            background: #0f172a;
            color: #e2e8f0;
            text-align: center;
          }

          @media (max-width: 640px) {
            .site-header {
              flex-direction: column;
              align-items: flex-start;
              padding: 1.5rem;
            }

            .nav-list {
              gap: 0.75rem 1.5rem;
            }

            .content {
              padding: 1.5rem;
            }
          }
        `}</style>
      </body>
    </html>
  );
}
