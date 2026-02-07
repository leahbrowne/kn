import type { CSSProperties } from 'react'

const theme = {
  primary: '#00A3E0',
  secondary: '#FDB913',
  accent: '#00B140',
  neutral: '#0B1F2A',
  white: '#FFFFFF',
}

const buttonBase: CSSProperties = {
  borderRadius: '999px',
  padding: '0.85rem 1.6rem',
  fontSize: '1rem',
  fontWeight: 600,
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'transform 150ms ease, box-shadow 150ms ease',
}

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`,
        color: theme.white,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
      }}
    >
      <section
        style={{
          maxWidth: '860px',
          backgroundColor: 'rgba(11, 31, 42, 0.72)',
          borderRadius: '32px',
          padding: '3.5rem',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.25)',
        }}
      >
        <p
          style={{
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: '0.85rem',
            color: theme.secondary,
            marginBottom: '1.25rem',
            fontWeight: 600,
          }}
        >
          Mock Welcome
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: 1.05,
            marginBottom: '1.25rem',
          }}
        >
          Discover the St Kitts vibe in a bold, modern PWA.
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.86)',
            marginBottom: '2.25rem',
          }}
        >
          Mock content for the demo hero: explore sun-soaked shores, heritage
          experiences, and effortless trip planning designed to convert curious
          visitors into booked adventures.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <a
            href="#"
            style={{
              ...buttonBase,
              backgroundColor: theme.secondary,
              color: theme.neutral,
              boxShadow: `0 12px 24px rgba(253, 185, 19, 0.35)`,
            }}
          >
            Start Planning
          </a>
          <a
            href="#"
            style={{
              ...buttonBase,
              backgroundColor: 'transparent',
              color: theme.white,
              border: `2px solid ${theme.white}`,
            }}
          >
            View Experiences
          </a>
        </div>
      </section>
    </main>
  )
}
