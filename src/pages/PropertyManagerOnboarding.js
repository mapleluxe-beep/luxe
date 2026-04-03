// pages/onboarding/property-manager.jsx
// Maple Luxe — Property Manager Onboarding with embedded DocuSeal e-signature

import { useState } from 'react';
import { DocusealForm } from '@docuseal/react';
import OnboardingLayout from '../components/OnboardingLayout';

const STEPS = {
  FORM: 'form',
  SIGNING: 'signing',
  COMPLETE: 'complete',
};

const PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
  'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
  'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec',
  'Saskatchewan', 'Yukon',
];

const PORTFOLIO_SIZES = [
  '1–5 units', '6–20 units', '21–50 units', '51–100 units', '100+ units',
];

export default function PropertyManagerOnboarding() {
  const [step, setStep] = useState(STEPS.FORM);
  const [embedSrc, setEmbedSrc] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    province: '',
    portfolioSize: '',
    propertyTypes: [],
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const togglePropertyType = (type) => {
    setFormData((prev) => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter((t) => t !== type)
        : [...prev.propertyTypes, type],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/docuseal/create-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          type: 'property-manager',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      setEmbedSrc(data.embedSrc);
      setStep(STEPS.SIGNING);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSigningComplete = () => {
    setStep(STEPS.COMPLETE);
  };

  const propertyTypeOptions = [
    { value: 'residential', label: 'Residential' },
    { value: 'condo', label: 'Condo / Strata' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'vacation', label: 'Vacation / Short-term' },
    { value: 'multi-family', label: 'Multi-family' },
    { value: 'luxury', label: 'Luxury Estate' },
  ];

  return (
    <OnboardingLayout
      title="Elevate Your Property Management"
      subtitle="Partner with Maple Luxe to deliver exceptional property experiences. Sign your management agreement and gain access to our contractor network, reporting tools, and concierge support."
      type="property-manager"
    >
      <style jsx>{`
        /* ── Partnership tiers ── */
        .tiers {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 48px;
        }

        .tier-card {
          border: 1px solid #e8e4dd;
          border-radius: 4px;
          padding: 22px;
          background: white;
          position: relative;
        }

        .tier-card.featured {
          border-color: #1c2e22;
          background: #fafff8;
        }

        .tier-badge {
          position: absolute;
          top: -10px;
          left: 16px;
          background: #b8933f;
          color: white;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 3px 10px;
          border-radius: 2px;
        }

        .tier-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 500;
          color: #1c2e22;
          margin-bottom: 6px;
        }

        .tier-desc {
          font-size: 12px;
          color: #6b6560;
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .tier-features {
          list-style: none;
          font-size: 12px;
          color: #2d2d2d;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .tier-features li::before {
          content: '✓ ';
          color: #b8933f;
          font-weight: 600;
        }

        /* ── Form ── */
        .form-section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #b8933f;
          margin-bottom: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 12px;
          font-weight: 500;
          color: #2d2d2d;
          letter-spacing: 0.04em;
        }

        .form-group label span {
          color: #b8933f;
          margin-left: 2px;
        }

        .form-group input,
        .form-group select {
          height: 46px;
          border: 1.5px solid #e0dbd3;
          border-radius: 3px;
          padding: 0 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #2d2d2d;
          background: white;
          transition: border-color 0.15s ease;
          outline: none;
          -webkit-appearance: none;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #1c2e22;
        }

        .form-group input::placeholder {
          color: #bbb5ae;
        }

        /* ── Property type chips ── */
        .chips-label {
          font-size: 12px;
          font-weight: 500;
          color: #2d2d2d;
          letter-spacing: 0.04em;
          margin-bottom: 10px;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          padding: 8px 16px;
          border: 1.5px solid #e0dbd3;
          border-radius: 100px;
          font-size: 13px;
          color: #6b6560;
          cursor: pointer;
          transition: all 0.15s ease;
          background: white;
          font-family: 'DM Sans', sans-serif;
          user-select: none;
        }

        .chip:hover {
          border-color: #1c2e22;
          color: #1c2e22;
        }

        .chip.selected {
          background: #1c2e22;
          border-color: #1c2e22;
          color: #faf7f2;
        }

        .form-divider {
          height: 1px;
          background: #e8e4dd;
          margin: 32px 0;
        }

        .error-box {
          background: #fff5f5;
          border: 1px solid #ffcdd2;
          border-radius: 3px;
          padding: 12px 16px;
          font-size: 13px;
          color: #c62828;
          margin-bottom: 20px;
        }

        .submit-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .submit-note {
          font-size: 12px;
          color: #6b6560;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-submit {
          height: 50px;
          padding: 0 40px;
          background: #1c2e22;
          color: #faf7f2;
          border: none;
          border-radius: 3px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
        }

        .btn-submit:hover:not(:disabled) {
          background: #2d4a35;
        }

        .btn-submit:active:not(:disabled) {
          transform: translateY(1px);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ── Signing step ── */
        .signing-header {
          margin-bottom: 24px;
        }

        .signing-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 400;
          color: #1c2e22;
          margin-bottom: 8px;
        }

        .signing-header p {
          font-size: 14px;
          color: #6b6560;
        }

        .docuseal-wrap {
          border: 1px solid #e8e4dd;
          border-radius: 4px;
          overflow: hidden;
          min-height: 600px;
        }

        /* ── Complete step ── */
        .complete-wrap {
          text-align: center;
          padding: 80px 24px;
        }

        .complete-icon {
          width: 72px;
          height: 72px;
          background: #1c2e22;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 32px;
        }

        .complete-icon svg {
          color: #b8933f;
        }

        .complete-wrap h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 300;
          color: #1c2e22;
          margin-bottom: 12px;
        }

        .complete-wrap p {
          font-size: 15px;
          color: #6b6560;
          max-width: 480px;
          margin: 0 auto 36px;
          line-height: 1.6;
        }

        .complete-next {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: #b8933f;
          color: white;
          border-radius: 3px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-decoration: none;
          transition: background 0.2s;
        }

        .complete-next:hover {
          background: #9a7a32;
        }

        @media (max-width: 768px) {
          .tiers { grid-template-columns: 1fr; }
        }

        @media (max-width: 640px) {
          .form-grid { grid-template-columns: 1fr; }
          .form-group.full-width { grid-column: 1; }
          .submit-row { flex-direction: column-reverse; align-items: stretch; }
          .btn-submit { text-align: center; }
        }
      `}</style>

      {/* ── STEP 1: Info Form ── */}
      {step === STEPS.FORM && (
        <>
          {/* Partnership tiers preview */}
          <div className="tiers">
            <div className="tier-card">
              <p className="tier-title">Essential</p>
              <p className="tier-desc">For growing portfolios getting started with Maple Luxe.</p>
              <ul className="tier-features">
                <li>Contractor network access</li>
                <li>Monthly reporting</li>
                <li>Email support</li>
              </ul>
            </div>
            <div className="tier-card featured">
              <span className="tier-badge">Most Popular</span>
              <p className="tier-title">Professional</p>
              <p className="tier-desc">Full-service management for established portfolios.</p>
              <ul className="tier-features">
                <li>Priority contractor dispatch</li>
                <li>Real-time dashboard</li>
                <li>Dedicated account manager</li>
              </ul>
            </div>
            <div className="tier-card">
              <p className="tier-title">Elite</p>
              <p className="tier-desc">White-glove service for luxury and large portfolios.</p>
              <ul className="tier-features">
                <li>24/7 concierge support</li>
                <li>Custom reporting & analytics</li>
                <li>Legal & compliance advisory</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <p className="form-section-label">Contact Information</p>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name <span>*</span></label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Tremblay"
                  required
                />
              </div>
              <div className="form-group">
                <label>Company / Brokerage Name</label>
                <input
                  name="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Tremblay Properties Inc."
                />
              </div>
              <div className="form-group">
                <label>Email Address <span>*</span></label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@tremblayproperties.ca"
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (403) 555-0199"
                />
              </div>
            </div>

            <div className="form-divider" />

            <p className="form-section-label">Portfolio Details</p>
            <div className="form-grid">
              <div className="form-group">
                <label>Primary Province <span>*</span></label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select province…</option>
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Portfolio Size <span>*</span></label>
                <select
                  name="portfolioSize"
                  value={formData.portfolioSize}
                  onChange={handleChange}
                  required
                >
                  <option value="">Number of units…</option>
                  {PORTFOLIO_SIZES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="form-group full-width">
                <p className="chips-label">Property Types (select all that apply)</p>
                <div className="chips">
                  {propertyTypeOptions.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      className={`chip${formData.propertyTypes.includes(value) ? ' selected' : ''}`}
                      onClick={() => togglePropertyType(value)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {error && <div className="error-box">⚠ {error}</div>}

            <div className="submit-row">
              <p className="submit-note">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Encrypted & confidential. PIPEDA compliant.
              </p>
              <button type="submit" className="btn-submit" disabled={submitting}>
                {submitting ? 'Preparing Agreement…' : 'Continue to Agreement →'}
              </button>
            </div>
          </form>
        </>
      )}

      {/* ── STEP 2: DocuSeal Embedded Signing ── */}
      {step === STEPS.SIGNING && embedSrc && (
        <>
          <div className="signing-header">
            <h2>Review & Sign Your Management Agreement</h2>
            <p>
              Hi <strong>{formData.name}</strong> — please review the Maple Luxe property
              management agreement carefully and add your signature where indicated.
            </p>
          </div>
          <div className="docuseal-wrap">
            <DocusealForm
              src={embedSrc}
              email={formData.email}
              onComplete={handleSigningComplete}
              style={{ width: '100%', minHeight: '600px' }}
            />
          </div>
        </>
      )}

      {/* ── STEP 3: Complete ── */}
      {step === STEPS.COMPLETE && (
        <div className="complete-wrap">
          <div className="complete-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2>Welcome to Maple Luxe, {formData.name.split(' ')[0]}.</h2>
          <p>
            Your property management agreement is signed and on file. A copy has been sent to{' '}
            <strong>{formData.email}</strong>. Your dedicated account manager will reach out within
            one business day to finalize your onboarding and access to the Maple Luxe dashboard.
          </p>
          <a href="/" className="complete-next">
            Return to Maple Luxe →
          </a>
        </div>
      )}
    </OnboardingLayout>
  );
}
