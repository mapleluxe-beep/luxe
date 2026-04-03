// pages/onboarding/contractor.jsx
// Maple Luxe — Contractor Onboarding with embedded DocuSeal e-signature

import { useState } from 'react';
import { DocusealForm } from '@docuseal/react';
import OnboardingLayout from '../components/OnboardingLayout';

const STEPS = {
  FORM: 'form',
  SIGNING: 'signing',
  COMPLETE: 'complete',
};

export default function ContractorOnboarding() {
  const [step, setStep] = useState(STEPS.FORM);
  const [embedSrc, setEmbedSrc] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    trade: '',
    licenseNumber: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
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
          type: 'contractor',
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

  return (
    <OnboardingLayout
      title="Welcome to Our Contractor Network"
      subtitle="Join Maple Luxe's trusted contractor network. Review and sign your independent contractor agreement to get started with premium property projects."
      type="contractor"
    >
      <style jsx>{`
        /* ── Info cards row ── */
        .info-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 48px;
        }

        .info-card {
          background: white;
          border: 1px solid #e8e4dd;
          border-radius: 4px;
          padding: 20px 22px;
        }

        .info-card-icon {
          font-size: 20px;
          margin-bottom: 10px;
        }

        .info-card h4 {
          font-size: 13px;
          font-weight: 500;
          color: #1c2e22;
          margin-bottom: 4px;
          letter-spacing: 0.02em;
        }

        .info-card p {
          font-size: 12px;
          color: #6b6560;
          line-height: 1.5;
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

        @media (max-width: 640px) {
          .info-cards { grid-template-columns: 1fr; }
          .form-grid { grid-template-columns: 1fr; }
          .form-group.full-width { grid-column: 1; }
          .submit-row { flex-direction: column-reverse; align-items: stretch; }
          .btn-submit { text-align: center; }
        }
      `}</style>

      {/* ── STEP 1: Info Form ── */}
      {step === STEPS.FORM && (
        <>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-card-icon">🔐</div>
              <h4>Legally Binding</h4>
              <p>Your e-signature carries full legal weight under Canadian electronic signature law.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon">📋</div>
              <h4>Contractor Agreement</h4>
              <p>Review your independent contractor terms, scope of work, and payment schedule.</p>
            </div>
            <div className="info-card">
              <div className="info-card-icon">⚡</div>
              <h4>2-Minute Process</h4>
              <p>Fill in your details below and sign your agreement — all in one session.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <p className="form-section-label">Your Information</p>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Legal Name <span>*</span></label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  required
                />
              </div>
              <div className="form-group">
                <label>Business / Company Name</label>
                <input
                  name="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="Smith Contracting Ltd."
                />
              </div>
              <div className="form-group">
                <label>Email Address <span>*</span></label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@smithcontracting.ca"
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
                  placeholder="+1 (403) 555-0100"
                />
              </div>
            </div>

            <div className="form-divider" />

            <p className="form-section-label">Trade Details</p>
            <div className="form-grid">
              <div className="form-group">
                <label>Trade / Specialty <span>*</span></label>
                <select
                  name="trade"
                  value={formData.trade}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your trade…</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="hvac">HVAC</option>
                  <option value="carpentry">Carpentry & Millwork</option>
                  <option value="painting">Painting & Finishing</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="cleaning">Cleaning & Maintenance</option>
                  <option value="flooring">Flooring</option>
                  <option value="roofing">Roofing</option>
                  <option value="general">General Contracting</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>License / Certificate Number</label>
                <input
                  name="licenseNumber"
                  type="text"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  placeholder="e.g. AB-12345"
                />
              </div>
            </div>

            {error && <div className="error-box">⚠ {error}</div>}

            <div className="submit-row">
              <p className="submit-note">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Your information is encrypted and never sold.
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
            <h2>Review & Sign Your Agreement</h2>
            <p>
              Hi <strong>{formData.name}</strong> — please read the contractor agreement carefully
              and add your signature where indicated.
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
          <h2>You're In, {formData.name.split(' ')[0]}.</h2>
          <p>
            Your contractor agreement has been signed and securely stored. A copy will be emailed
            to <strong>{formData.email}</strong>. The Maple Luxe team will be in touch within 1–2
            business days with your first project details.
          </p>
          <a href="/" className="complete-next">
            Return to Maple Luxe →
          </a>
        </div>
      )}
    </OnboardingLayout>
  );
}
