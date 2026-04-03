import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Brand colors: Brown (#5A3A1B), Gold (#D4AF37), Cream (#F7F3ED), Charcoal (#1F1F1F)

export default function MapeLuxeSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await fetch("https://formsubmit.co/ajax/mapleluxebookings@gmail.com", {
        method: "POST",
        body: formData,
      });
      setFormStatus("success");
      e.target.reset();
      setTimeout(() => setFormStatus(null), 5000);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerChildren = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#1F1F1F]">
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 bg-[#5A3A1B] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="#contact"
          className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-3xl animate-pulse"
          style={{ backgroundColor: "#D4AF37" }}
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          Free Quote
        </a>
      </div>

      {/* Top Bar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-black/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#5A3A1B] grid place-items-center shadow-sm">
                <span className="text-[#D4AF37] font-black">M</span>
              </div>
              <div className="leading-tight">
                <div className="text-xl font-extrabold tracking-tight" style={{ color: "#5A3A1B" }}>
                  MapeLuxe
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  Contracting • Property Management
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#services" className="hover:text-[#5A3A1B] transition">Services</a>
              <a href="#why" className="hover:text-[#5A3A1B] transition">Why Us</a>
              <a href="#projects" className="hover:text-[#5A3A1B] transition">Projects</a>
              <a href="#testimonials" className="hover:text-[#5A3A1B] transition">Reviews</a>
              <a href="#contact" className="hover:text-[#5A3A1B] transition">Contact</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-black/5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm border border-[#5A3A1B]/20 hover:border-[#5A3A1B] transition"
              style={{ backgroundColor: "#D4AF37", color: "#1F1F1F" }}
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Navigation Menu */}
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 flex flex-col gap-3 border-t border-black/5 mt-2"
            >
              <a href="#services" className="py-2 hover:text-[#5A3A1B]" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#why" className="py-2 hover:text-[#5A3A1B]" onClick={() => setMenuOpen(false)}>Why Us</a>
              <a href="#projects" className="py-2 hover:text-[#5A3A1B]" onClick={() => setMenuOpen(false)}>Projects</a>
              <a href="#testimonials" className="py-2 hover:text-[#5A3A1B]" onClick={() => setMenuOpen(false)}>Reviews</a>
              <a href="#contact" className="py-2 hover:text-[#5A3A1B]" onClick={() => setMenuOpen(false)}>Contact</a>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F7F3ED] to-[#F7F3ED]" />
          <div
            className="absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(closest-side, #D4AF37, transparent)" }}
          />
          <div
            className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full opacity-15"
            style={{ background: "radial-gradient(closest-side, #5A3A1B, transparent)" }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.div initial="hidden" animate="visible" variants={staggerChildren} className="space-y-6">
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black tracking-tight"
              style={{ color: "#5A3A1B" }}
            >
              Transform Your Property with{" "}
              <span style={{ color: "#D4AF37" }}>MapeLuxe</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="max-w-2xl text-lg text-neutral-700">
              Premium contracting and property management—built with care, built to last. We help owners maximize value
              and tenants love where they live.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: "#D4AF37" }}
              >
                Get a Free Quote Today
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="tel:(587)400-4071"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl border-2 transition-all duration-300 hover:shadow-lg"
                style={{ color: "#5A3A1B", borderColor: "#5A3A1B" }}
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (587) 400-4071
              </a>
            </motion.div>
          </motion.div>

          {/* KPI Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { kpi: "98%", label: "On-time project delivery" },
              { kpi: "24/7", label: "Emergency maintenance" },
              { kpi: "+200", label: "Units under management" },
              { kpi: "A+", label: "Owner satisfaction" },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl bg-white ring-1 ring-black/5 p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="text-2xl font-extrabold" style={{ color: "#5A3A1B" }}>
                  {item.kpi}
                </div>
                <div className="text-sm text-neutral-600">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mb-10"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "#5A3A1B" }}>
              What We Do
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 max-w-2xl text-neutral-700">
              Full‑stack contracting and property management—one partner for everything from build to ongoing care.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                title: "Fencing & Decking",
                desc: "Custom wood & composite builds designed for Calgary's seasons.",
                icon: FenceIcon,
                img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Landscaping",
                desc: "Design, hardscapes, lighting and year‑round care.",
                icon: LeafIcon,
                img: "https://images.unsplash.com/photo-1557428887-5611a52a6f3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Property Management",
                desc: "Tenant relations, inspections, financials, compliance.",
                icon: KeysIcon,
                img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Custom Design Build",
                desc: "Tailored outdoor solutions designed specifically for your lifestyle and property.",
                icon: MegaphoneIcon,
                img: "https://images.unsplash.com/photo-1534237710431-e2a6981d3f9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Maintenance & Repairs",
                desc: "Preventative programs and 24/7 response.",
                icon: WrenchIcon,
                img: "https://images.unsplash.com/photo-1581147036324-c6c2f01b2cfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Cleaning & Turnover",
                desc: "Move‑in/out, common areas and deep clean crews.",
                icon: SparkleIcon,
                img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group rounded-2xl p-6 bg-[#F7F3ED] ring-1 ring-black/5 hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="relative h-40 -mx-6 -mt-6 mb-4 rounded-t-2xl overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="h-12 w-12 rounded-xl grid place-items-center mb-4" style={{ backgroundColor: "#5A3A1B" }}>
                    <div className="text-white">
                      <Icon />
                    </div>
                  </div>
                  <div className="font-extrabold text-lg" style={{ color: "#5A3A1B" }}>
                    {s.title}
                  </div>
                  <p className="mt-2 text-sm text-neutral-700">{s.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "#5A3A1B" }}>
                Why House Owners Choose MapeLuxe
              </motion.h2>
              <ul className="mt-6 space-y-4">
                {[
                  {
                    h: "Increase home value",
                    p: "Our quality craftsmanship and premium materials boost your property's market value and curb appeal.",
                  },
                  {
                    h: "Warranty protection",
                    p: "All work backed by comprehensive warranties and insured teams for complete peace of mind.",
                  },
                  {
                    h: "Seasonal expertise",
                    p: "Calgary-specific knowledge ensures your outdoor spaces withstand harsh winters and thrive in summer.",
                  },
                  {
                    h: "Turnkey solutions",
                    p: "From design to completion, we handle permits, materials, and cleanup—you just enjoy the results.",
                  },
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="grid grid-cols-[auto,1fr] gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full" style={{ backgroundColor: "#D4AF37" }} />
                    <div>
                      <div className="font-semibold" style={{ color: "#5A3A1B" }}>
                        {item.h}
                      </div>
                      <p className="text-sm text-neutral-700">{item.p}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-sm bg-white"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Luxury home construction"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="text-sm text-neutral-700">Featured portfolio</div>
                <div className="mt-1 font-semibold" style={{ color: "#5A3A1B" }}>
                  MapeLuxe Premium Construction
                </div>
                <p className="mt-1 text-sm text-neutral-700">
                  Showcasing our commitment to exceptional craftsmanship and attention to detail. From custom home
                  construction to property maintenance, MapeLuxe delivers professional results that exceed expectations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: "#5A3A1B" }}>
              Trusted by Calgary Homeowners
            </h2>
            <p className="mt-2 text-neutral-600">Licensed, insured, and committed to excellence</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "🏆", title: "8+ Years", subtitle: "Experience" },
              { icon: "✅", title: "Licensed", subtitle: "& Insured" },
              { icon: "⭐", title: "4.9/5 Rating", subtitle: "Customer Reviews" },
              { icon: "🛡️", title: "Warranty", subtitle: "Guaranteed" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold text-lg" style={{ color: "#5A3A1B" }}>
                  {item.title}
                </div>
                <div className="text-sm text-neutral-600">{item.subtitle}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Currently accepting new projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mb-10"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "#5A3A1B" }}>
              Recent Work
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 max-w-2xl text-neutral-700">
              See how we've transformed outdoor spaces across Calgary with quality craftsmanship.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                title: "Custom Deck Installation",
                desc: "Professional deck construction with quality materials and expert craftsmanship.",
                img: "https://images.unsplash.com/photo-1558005530-a7958896ec60?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Custom Home Renovation",
                desc: "Quality framing and structural work built to last through Calgary's harsh winters.",
                img: "https://images.unsplash.com/photo-1600585154363-67d8f97d77c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Professional Cleaning Services",
                desc: "Comprehensive property cleaning and maintenance for residential and commercial spaces.",
                img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-3xl overflow-hidden ring-1 ring-black/5 bg-[#F7F3ED] group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <div className="font-semibold" style={{ color: "#5A3A1B" }}>
                    {project.title}
                  </div>
                  <p className="mt-1 text-sm text-neutral-700">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mb-10"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "#5A3A1B" }}>
              What Clients Say
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 max-w-2xl text-neutral-700">
              Calgary homeowners trust MapeLuxe for quality construction and reliable service.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                q: "MapeLuxe built our custom fence and deck perfectly. Quality workmanship that's built to last through Calgary winters.",
                a: "— Rachel L., Homeowner",
                rating: "⭐⭐⭐⭐⭐",
              },
              {
                q: "Professional construction team that exceeded our expectations. Clean, reliable, and finished on time.",
                a: "— Michael R., Property Owner",
                rating: "⭐⭐⭐⭐⭐",
              },
              {
                q: "Best cleaning service we've used. Attention to detail and great communication throughout the project.",
                a: "— Amanda K., Calgary",
                rating: "⭐⭐⭐⭐⭐",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl bg-white ring-1 ring-black/5 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="text-sm text-yellow-500 mb-2">{t.rating}</div>
                <p className="text-[15px] text-neutral-800 italic">"{t.q}"</p>
                <div className="mt-4 text-sm font-semibold" style={{ color: "#5A3A1B" }}>
                  {t.a}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-[#5A3A1B] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-2xl md:text-3xl font-black tracking-tight">Ready to protect and elevate your property?</div>
              <p className="text-sm text-white/80">From build to management, MapeLuxe is your single trusted partner.</p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm border border-white/20 hover:bg-white hover:text-[#5A3A1B] transition"
              style={{ backgroundColor: "#D4AF37", color: "#1F1F1F" }}
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mb-10"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "#5A3A1B" }}>
              Contact Us
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 max-w-2xl text-neutral-700">
              Tell us about your property or project. We'll respond within one business day.
            </motion.p>
          </motion.div>

          {formStatus === "success" && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              ✓ Message sent successfully! We'll get back to you soon.
            </div>
          )}
          {formStatus === "error" && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              ✗ Something went wrong. Please try again or call us directly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="_subject" value="New Quote Request from MapeLuxe Website" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="grid gap-1">
              <label className="text-sm font-medium">Full name *</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Jane Doe"
                className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Email *</label>
              <input
                required
                type="email"
                name="email"
                placeholder="jane@example.com"
                className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="(587) 400-4071"
                className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium">Service needed</label>
              <select
                name="service"
                className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option>Custom fence installation</option>
                <option>Home construction</option>
                <option>Cleaning services</option>
                <option>Property maintenance</option>
                <option>Other</option>
              </select>
            </div>
            <div className="md:col-span-2 grid gap-1">
              <label className="text-sm font-medium">Project details</label>
              <textarea
                rows={4}
                name="message"
                placeholder="Tell us about your project..."
                className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
              ></textarea>
            </div>

            {/* Media Upload */}
            <div className="md:col-span-2 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    📸 Speed Up Your Quote with Photos or Videos
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    <strong>Optional but recommended:</strong> Upload photos or videos of your property to help us
                    provide a more accurate and faster quote.
                  </p>
                  <label htmlFor="media-upload" className="block text-sm font-medium text-gray-700 mb-2">
                    Property Photos/Videos (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id="media-upload"
                      name="media"
                      multiple
                      accept="image/*,video/*,.pdf,.doc,.docx,.txt,.heic,.webp,.tiff,.bmp,.svg,.avi,.wmv,.flv,.webm,.mkv,.m4v,.3gp,.mov,.mp4"
                      className="hidden"
                      onChange={(e) => {
                        const files = Array.from(e.target.files);
                        const fileList = document.getElementById("file-list");
                        fileList.innerHTML = "";
                        files.forEach((file) => {
                          const div = document.createElement("div");
                          div.className =
                            "text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full inline-block mr-2 mb-2";
                          div.textContent = file.name;
                          fileList.appendChild(div);
                        });
                      }}
                    />
                    <label htmlFor="media-upload" className="cursor-pointer">
                      <svg
                        className="w-12 h-12 text-gray-400 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-gray-600">
                        <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Images: JPG, PNG, HEIC, WebP, TIFF, BMP, SVG<br />
                        Videos: MP4, MOV, AVI, WMV, WebM, MKV, FLV, 3GP<br />
                        Documents: PDF, DOC, DOCX, TXT • Up to 25MB each
                      </p>
                    </label>
                  </div>
                  <div id="file-list" className="mt-3"></div>
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-3">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-sm text-green-800">
                        <strong>Pro tip:</strong> Including photos can reduce quote turnaround time by up to 50%!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center rounded-2xl px-6 py-3 text-sm font-semibold border border-[#5A3A1B] text-white hover:opacity-95 transition"
                style={{ backgroundColor: "#5A3A1B" }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#5A3A1B] text-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: "#D4AF37" }}>
              MapeLuxe
            </div>
            <p className="mt-2 text-sm text-white/80">
              Premium contracting and property management services across Calgary.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <p className="text-sm text-white/60">© 2025 MapeLuxe. Licensed & Insured.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Icons (unchanged, but exported as functions)
function FenceIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path
        d="M7 3l2 2-2 2-2-2 2-2zm5 0l2 2-2 2-2-2 2-2zm5 0l2 2-2 2-2-2 2-2zM5 9h14v2H5V9zm-2 4h18v8H3v-8zm4 0v8m5-8v8m5-8v8"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M12 3c6 0 9 3 9 9-6 0-9 3-9 9-6 0-9-3-9-9 0-6 3-9 9-9z" opacity=".1" />
      <path d="M5 13c5-1 9-5 14-9-2 6-6 10-12 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
function KeysIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <circle cx="8" cy="8" r="3" fill="currentColor" />
      <path d="M8 11l7 7 3-3 2 2 2-2-2-2 2-2-2-2-2 2-2-2-3 3-4-3z" />
    </svg>
  );
}
function MegaphoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M3 10v4l12-4V6L3 10zm12-4v12l6 2V4l-6 2z" />
    </svg>
  );
}
function WrenchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M14 2l3 3-3 3-1.5-1.5L7 12l5 5 7-7L17 7l3-3-3-3-3 3z" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zm7 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
    </svg>
  );
}
