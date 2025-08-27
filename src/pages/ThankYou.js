import React from 'react';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#1F1F1F]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F7F3ED]/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="font-black text-xl" style={{color: "#5A3A1B"}}>
              Maple<span style={{color: "#D4AF37"}}>Luxe</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="/" className="hover:text-[#5A3A1B]">Home</a>
              <a href="/#services" className="hover:text-[#5A3A1B]">Services</a>
              <a href="/#why" className="hover:text-[#5A3A1B]">Why Us</a>
              <a href="/#projects" className="hover:text-[#5A3A1B]">Projects</a>
              <a href="/#testimonials" className="hover:text-[#5A3A1B]">Reviews</a>
              <a href="/#contact" className="hover:text-[#5A3A1B]">Contact</a>
            </nav>
            <a href="/#contact" className="hidden sm:inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm border border-[#5A3A1B]/20 hover:border-[#5A3A1B]" style={{backgroundColor: "#D4AF37", color: "#1F1F1F"}}>Get a Quote</a>
          </div>
        </div>
      </header>

      {/* Thank You Content */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-8" style={{backgroundColor: "#D4AF37"}}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{color: "#5A3A1B"}}>
            Thank You for Your Quote Request!
          </h1>
          
          <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
            We've received your project details and will get back to you within one business day with a detailed quote.
          </p>

          {/* What Happens Next */}
          <div className="bg-white rounded-3xl ring-1 ring-black/5 p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{color: "#5A3A1B"}}>What Happens Next?</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: "#5A3A1B"}}>
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2" style={{color: "#5A3A1B"}}>Review Your Request</h3>
                <p className="text-sm text-neutral-600">Our team will carefully review your project details and requirements.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: "#5A3A1B"}}>
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2" style={{color: "#5A3A1B"}}>Site Assessment</h3>
                <p className="text-sm text-neutral-600">We'll schedule a convenient time to assess your property and discuss your vision.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{backgroundColor: "#5A3A1B"}}>
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2" style={{color: "#5A3A1B"}}>Detailed Quote</h3>
                <p className="text-sm text-neutral-600">You'll receive a comprehensive quote with timeline and project details.</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-[#5A3A1B] text-white rounded-3xl p-8 mb-8">
            <h2 className="text-xl font-bold mb-4">Have Questions?</h2>
            <p className="mb-6">Need to discuss your project urgently or have additional questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:+1-587-400-4071" className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1F1F1F] px-6 py-3 rounded-2xl font-semibold hover:opacity-95">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now: (587) 400-4071
              </a>
              <a href="mailto:mapleluxebookings@gmail.com" className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-[#5A3A1B]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
            </div>
          </div>

          {/* Return Home */}
          <a href="/" className="inline-flex items-center gap-2 text-[#5A3A1B] hover:text-[#D4AF37] font-semibold">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Homepage
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#5A3A1B] text-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-black text-xl mb-2">
              Maple<span style={{color: "#D4AF37"}}>Luxe</span>
            </div>
            <p className="text-white/80 text-sm">Premium contracting and property management services in Calgary</p>
            <div className="mt-4 text-xs text-white/60">
              © 2025 MapeLuxe. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
