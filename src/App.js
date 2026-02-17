import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Brand colors: Brown (#5A3A1B), Gold (#D4AF37), Cream (#F7F3ED), Charcoal (#1F1F1F)

export default function MapleLuxeSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // 'success' | 'error' | null
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
      setUploadedFiles([]);
      setTimeout(() => setFormStatus(null), 5000);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
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
                <span className="text-[#D4AF37] font-black text-xl">M</span>
              </div>
              <div className="leading-tight">
                <div className="text-xl font-extrabold tracking-tight" style={{ color: "#5A3A1B" }}>
                  MapleLuxe
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
              <span style={{ color: "#D4AF37" }}>MapleLuxe</span>
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
                img: "/images/deck-installation.jpg",
              },
              {
                title: "Landscaping",
                desc: "Design, hardscapes, lighting and year‑round care.",
                icon: LeafIcon,
                img: "/images/walkway.webp",
              },
              {
                title: "Property Management",
                desc: "Tenant relations, inspections, financials, compliance.",
                icon: KeysIcon,
                img: "/images/main-img.jpg",
              },
              {
                title: "Custom Design Build",
                desc: "Tailored outdoor solutions designed specifically for your lifestyle and property.",
                icon: MegaphoneIcon,
                img: "/images/main-img.jpg",
              },
              {
                title: "Maintenance & Repairs",
                desc: "Preventative programs and 24/7 response.",
                icon: WrenchIcon,
                img: "/images/main-img.jpg",
              },
              {
                title: "Cleaning & Turnover",
                desc: "Move‑in/out, common areas and deep clean crews.",
                icon: SparkleIcon,
                img: "/images/clean-service.jpg",
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
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                      }}
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
                Why House Owners Choose MapleLuxe
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
                src="/images/main-img.jpg"
                alt="Luxury home construction"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="p-6">
                <div className="text-sm text-neutral-700">Featured portfolio</div>
                <div className="mt-1 font-semibold" style={{ color: "#5A3A1B" }}>
                  MapleLuxe Premium Construction
                </div>
                <p className="mt-1 text-sm text-neutral-700">
                  Showcasing our commitment to exceptional craftsmanship and attention to detail. From custom home
                  construction to property maintenance, MapleLuxe delivers professional results that exceed expectations.
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
                img: "/images/deck-installation.jpg",
              },
              {
                title: "Custom Home Renovation",
                desc: "Quality framing and structural work built to last through Calgary's harsh winters.",
                img: "/images/walkway.webp",
              },
              {
                title: "Professional Cleaning Services",
                desc: "Comprehensive property cleaning and maintenance for residential and commercial spaces.",
                img: "/images/clean-service.jpg",
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
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                    }}
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
              Calgary homeowners trust MapleLuxe for quality construction and reliable service.
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
                q: "MapleLuxe built our custom fence and deck perfectly. Quality workmanship that's built to last through Calgary winters.",
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
              <p className="text-sm text-white/80">From build to management, MapleLuxe is your single trusted partner.</p>
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
            <input type="hidden" name="_subject" value="New Quote Request from MapleLuxe Website" />
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
              <label className="text-sm font-medium">Project Type</label>
              <select
                name="service"
                className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <optgroup label="Construction & Exterior">
                  <option>Custom Deck Building</option>
                  <option>Premium Fence Installation</option>
                  <option>Outdoor Kitchen & Living</option>
                  <option>Pergola & Gazebo</option>
                  <option>Full Home Renovation</option>
                </optgroup>
                <optgroup label="Landscaping & Design">
                  <option>Luxury Landscape Design</option>
                  <option>Stone Patios & Walkways</option>
                  <option>Outdoor Lighting</option>
                  <option>Water Features</option>
                  <option>Seasonal Maintenance</option>
                </optgroup>
                <optgroup label="Property Management">
                  <option>Full Property Management</option>
                  <option>Tenant Placement</option>
                  <option>Maintenance Services</option>
                  <option>Emergency Repairs</option>
                </optgroup>
                <optgroup label="Interior Services">
                  <option>Deep Cleaning Service</option>
                  <option>Move In/Out Cleaning</option>
                  <option>Interior Renovations</option>
                  <option>Custom Carpentry</option>
                </optgroup>
                <option>Custom Project (Describe Below)</option>
              </select>
            </div>
            <div className="md:col-span-2 grid gap-1">
              <label className="text-sm font-medium">Project Details</label>
              <textarea
                rows={4}
                name="message"
                placeholder="Tell us about your vision... (e.g., 'I want a 500sqft composite deck with built-in seating and outdoor kitchen')"
                className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
              ></textarea>
            </div>

            {/* Enhanced Media Upload Section */}
            <div className="md:col-span-2 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-[#D4AF37] rounded-xl p-8 shadow-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#5A3A1B] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#5A3A1B] mb-2">
                    📸 Get a Premium Quote in 24 Hours
                  </h3>
                  <p className="text-gray-700 mb-6 text-lg">
                    Upload photos of your space for a more accurate luxury estimate
                  </p>

                  {/* Example Gallery */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                      { icon: "🏠", label: "Front Exterior", example: "Show property entrance" },
                      { icon: "🌳", label: "Backyard", example: "Deck/patio area" },
                      { icon: "🚪", label: "Entry Points", example: "Doors, windows" },
                      { icon: "🛠️", label: "Problem Areas", example: "Repairs needed" },
                      { icon: "✨", label: "Inspiration", example: "Design ideas" },
                      { icon: "📐", label: "Measurements", example: "Space dimensions" },
                      { icon: "🏛️", label: "Architecture", example: "Style details" },
                      { icon: "🎨", label: "Materials", example: "Current finishes" },
                    ].map((item, i) => (
                      <div key={i} className="bg-white/80 backdrop-blur rounded-lg p-3 text-center border border-[#D4AF37]/30">
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <div className="font-semibold text-sm text-[#5A3A1B]">{item.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{item.example}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-2 border-dashed border-[#D4AF37] rounded-xl p-8 text-center bg-white/50 hover:bg-white transition-all cursor-pointer group">
                    <input
                      type="file"
                      id="media-upload"
                      name="media"
                      multiple
                      accept="image/*,video/*,.pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="media-upload" className="cursor-pointer block">
                      <div className="w-20 h-20 bg-[#5A3A1B] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <p className="text-xl font-semibold text-[#5A3A1B] mb-2">
                        Click to Upload Photos/Videos
                      </p>
                      <p className="text-gray-600 mb-4">
                        or drag and drop files here
                      </p>
                      
                      {/* Uploaded Files Display */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="font-semibold text-green-800 mb-2">✓ {uploadedFiles.length} file(s) ready to upload:</p>
                          <div className="flex flex-wrap gap-2">
                            {uploadedFiles.map((file, index) => (
                              <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-green-300">
                                {file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-gray-500">
                        <span className="px-3 py-1 bg-amber-100 rounded-full">📸 Exterior shots</span>
                        <span className="px-3 py-1 bg-amber-100 rounded-full">🎨 Design inspiration</span>
                        <span className="px-3 py-1 bg-amber-100 rounded-full">📏 Measurements</span>
                        <span className="px-3 py-1 bg-amber-100 rounded-full">🔨 Current condition</span>
                      </div>
                    </label>
                  </div>

                  {/* Success Stories */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-[#D4AF37]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🏡</span>
                        <span className="font-semibold text-[#5A3A1B]">Calgary, AB</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        "Sent 6 photos of our backyard, got a detailed quote with 3D renderings in 24 hours!"
                      </p>
                      <p className="text-xs text-gray-400 mt-2">— David R., Custom Deck Project</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-[#D4AF37]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🏢</span>
                        <span className="font-semibold text-[#5A3A1B]">Luxury Estate</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        "Video walkthrough helped the team understand our vision perfectly. Quote matched exactly."
                      </p>
                      <p className="text-xs text-gray-400 mt-2">— Jennifer M., Full Renovation</p>
                    </div>
                  </div>

                  <div className="mt-4 bg-gradient-to-r from-[#5A3A1B] to-[#D4AF37] text-white rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <p className="font-bold">Quick Quote Guarantee</p>
                        <p className="text-sm text-white/90">Photos = 24hr response • Video tour = 12hr response</p>
                      </div>
                    </div>
                    <span className="bg-white text-[#5A3A1B] px-3 py-1 rounded-full text-sm font-bold">PRO TIP</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-between items-center">
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Your files are secure and confidential
              </p>
              <button
                type="submit"
                className="inline-flex items-center rounded-2xl px-8 py-4 text-base font-bold border-2 border-[#5A3A1B] text-white hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                style={{ backgroundColor: "#5A3A1B" }}
              >
                Get My Luxury Quote
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
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
              MapleLuxe
            </div>
            <p className="mt-2 text-sm text-white/80">
              Premium contracting and property management services across Calgary.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <p className="text-sm text-white/60">© 2025 MapleLuxe. Licensed & Insured.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Icons (unchanged)
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
