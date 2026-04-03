// components/onboarding/OnboardingLayout.jsx
// Shared layout for all Maple Luxe onboarding pages


import { Link } from 'react-router-dom';

export default function OnboardingLayout({ children, title, subtitle, type }) {
  return (
    <>
      <Head>
        <title>{title} | Maple Luxe</title>
        <meta name="description" content={subtitle} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        :root {
          --cream: #faf7f2;
          --forest: #1c2e22;
          --gold: #b8933f;
          --gold-light: #d4aa5a;
          --bark: #6b4e2a;
          --mist: #e8e4dd;
          --charcoal: #2d2d2d;
          --text-secondary: #6b6560;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: var(--cream);
          color: var(--charcoal);
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .onboarding-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .onb-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 48px;
          border-bottom: 1px solid var(--mist);
          background: var(--cream);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .onb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .onb-logo-icon {
          width: 36px;
          height: 36px;
        }

        .onb-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 500;
          color: var(--forest);
          letter-spacing: 0.04em;
        }

        .onb-header-badge {
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          padding: 6px 14px;
          border: 1px solid var(--gold);
          border-radius: 2px;
        }

        /* ── Hero strip ── */
        .onb-hero {
          background: var(--forest);
          padding: 64px 48px 56px;
          position: relative;
          overflow: hidden;
        }

        .onb-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.4;
        }

        .onb-hero-inner {
          max-width: 720px;
          position: relative;
        }

        .onb-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .onb-eyebrow::after {
          content: '';
          display: block;
          width: 40px;
          height: 1px;
          background: var(--gold);
          opacity: 0.6;
        }

        .onb-hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 300;
          color: var(--cream);
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        .onb-hero h1 em {
          font-style: italic;
          color: var(--gold-light);
        }

        .onb-hero p {
          font-size: 16px;
          font-weight: 300;
          color: rgba(250, 247, 242, 0.65);
          line-height: 1.7;
          max-width: 540px;
        }

        /* ── Steps indicator ── */
        .onb-steps {
          display: flex;
          align-items: center;
          gap: 0;
          padding: 24px 48px;
          background: var(--mist);
          border-bottom: 1px solid #ddd8d0;
        }

        .onb-step {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 400;
          color: var(--text-secondary);
          flex: 1;
        }

        .onb-step.active {
          color: var(--forest);
          font-weight: 500;
        }

        .onb-step.done {
          color: var(--gold);
        }

        .onb-step-num {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1.5px solid currentColor;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 500;
          flex-shrink: 0;
        }

        .onb-step.active .onb-step-num {
          background: var(--forest);
          border-color: var(--forest);
          color: var(--cream);
        }

        .onb-step.done .onb-step-num {
          background: var(--gold);
          border-color: var(--gold);
          color: white;
        }

        .onb-step-divider {
          flex: 1;
          max-width: 60px;
          height: 1px;
          background: #ccc8c0;
          margin: 0 8px;
        }

        /* ── Main content ── */
        .onb-main {
          flex: 1;
          padding: 56px 48px;
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
        }

        /* ── Footer ── */
        .onb-footer {
          padding: 24px 48px;
          border-top: 1px solid var(--mist);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .onb-footer a {
          color: var(--gold);
          text-decoration: none;
        }

        .onb-secure-badge {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .onb-header { padding: 16px 24px; }
          .onb-hero { padding: 40px 24px 36px; }
          .onb-steps { padding: 16px 24px; flex-wrap: wrap; gap: 8px; }
          .onb-step-divider { display: none; }
          .onb-main { padding: 32px 24px; }
          .onb-footer { padding: 20px 24px; flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>

      <div className="onboarding-root">
        {/* Header */}
        <header className="onb-header">
          <Link href="/" className="onb-logo">
            <svg className="onb-logo-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 4L22 12H30L24 18L26 26L18 22L10 26L12 18L6 12H14L18 4Z" fill="#1c2e22" />
              <path d="M18 4L22 12H30L24 18L26 26L18 22L10 26L12 18L6 12H14L18 4Z" fill="none" stroke="#b8933f" strokeWidth="1.5" />
            </svg>
            <span className="onb-logo-text">Maple Luxe</span>
          </Link>
          <span className="onb-header-badge">
            {type === 'contractor' ? 'Contractor Portal' : 'Property Manager Portal'}
          </span>
        </header>

        {/* Hero */}
        <div className="onb-hero">
          <div className="onb-hero-inner">
            <p className="onb-eyebrow">
              {type === 'contractor' ? 'Contractor Onboarding' : 'Property Manager Onboarding'}
            </p>
            <h1>{title.split(' ').slice(0, -1).join(' ')} <em>{title.split(' ').slice(-1)}</em></h1>
            <p>{subtitle}</p>
          </div>
        </div>

        {/* Steps */}
        <div className="onb-steps">
          <div className="onb-step done">
            <div className="onb-step-num">✓</div>
            <span>Account Details</span>
          </div>
          <div className="onb-step-divider" />
          <div className="onb-step active">
            <div className="onb-step-num">2</div>
            <span>Review Agreement</span>
          </div>
          <div className="onb-step-divider" />
          <div className="onb-step">
            <div className="onb-step-num">3</div>
            <span>Sign & Complete</span>
          </div>
        </div>

        {/* Main content */}
        <main className="onb-main">{children}</main>

        {/* Footer */}
        <footer className="onb-footer">
          <span>© {new Date().getFullYear()} Maple Luxe. All rights reserved.</span>
          <div className="onb-secure-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Secured by <a href="https://docuseal.com" target="_blank" rel="noopener noreferrer">DocuSeal</a>
          </div>
        </footer>
      </div>
    </>
  );
}
