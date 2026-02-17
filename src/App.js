import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Brand colors: Black matte (#0A0A0A), Gold (#D4AF37), Dark Gold (#B8860B)

export default function MapleLuxeSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  // Mouse position for gold glare effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

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

  // Gold glare gradient that follows mouse
  const glareX = useTransform(mouseX, [0, 2000], [0, 100]);
  const glareY = useTransform(mouseY, [0, 2000], [0, 100]);
  
  const glareGradient = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x}px ${y}px, rgba(212, 175, 55, 0.15) 0%, transparent 50%)`
  );

  return (
    <div 
      className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] relative"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Gold Glare Overlay */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: glareGradient,
        }}
      />
      
      {/* Subtle Gold Glare Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-3xl opacity-5 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-3xl opacity-5 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37] rounded-full filter blur-3xl opacity-3 animate-pulse delay-500" />
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 bg-[#D4AF37] text-[#0A0A0A] p-3 rounded-full shadow-lg hover:scale-110 transition-transform shadow-[#D4AF37]/20"
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
          className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-[#0A0A0A] bg-[#D4AF37] rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-[#D4AF37]/50 animate-pulse"
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
      <header className="sticky top-0 z-40 backdrop-blur bg-[#0A0A0A]/80 border-b border-[#D4AF37]/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#D4AF37] grid place-items-center shadow-lg shadow-[#D4AF37]/20">
                <span className="text-[#0A0A0A] font-black text-xl">M</span>
              </div>
              <div className="leading-tight">
                <div className="text-xl font-extrabold tracking-tight text-[#D4AF37]">
                  MapleLuxe
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]/60">
                  Contracting • Property Management
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#services" className="text-[#E5E5E5] hover:text-[#D4AF37] transition">Services</a>
              <a href="#why" className="text-[#E5E5E5] hover:text-[#D4AF37] transition">Why Us</a>
              <a href="#projects" className="text-[#E5E5E5] hover:text-[#D4AF37] transition">Projects</a>
              <a href="#testimonials" className="text-[#E5E5E5] hover:text-[#D4AF37] transition">Reviews</a>
              <a href="#contact" className="text-[#E5E5E5] hover:text-[#D4AF37] transition">Contact</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-[#D4AF37]/10 text-[#D4AF37]"
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
              className="hidden sm:inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm border border-[#D4AF37] text-[#0A0A0A] bg-[#D4AF37] hover:bg-[#D4AF37]/90 transition"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile Navigation Menu */}
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 flex flex-col gap-3 border-t border-[#D4AF37]/20 mt-2"
            >
              <a href="#services" className="py-2 text-[#E5E5E5] hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#why" className="py-2 text-[#E5E5E5] hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Why Us</a>
              <a href="#projects" className="py-2 text-[#E5E5E5] hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Projects</a>
              <a href="#testimonials" className="py-2 text-[#E5E5E5] hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Reviews</a>
              <a href="#contact" className="py-2 text-[#E5E5E5] hover:text-[#D4AF37]" onClick={() => setMenuOpen(false)}>Contact</a>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Hero Section with Logo Glare */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Logo Background Glare */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl opacity-10">
            <svg viewBox="0 0 200 200" className="w-full h-full animate-pulse">
              <path 
                d="M100 20 L120 70 L180 70 L130 105 L150 160 L100 130 L50 160 L70 105 L20 70 L80 70 Z" 
                fill="#D4AF37"
              />
              <text x="100" y="120" fontSize="80" textAnchor="middle" fill="#D4AF37" fontWeight="bold">M</text>
            </svg>
          </div>
          <div className="absolute inset-0 bg-gradient-radial from-[#D4AF37]/5 via-transparent to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerChildren} className="space-y-6">
            <motion.div variants={fadeUp} className="flex justify-center mb-8">
              <div className="w-32 h-32 rounded-full bg-[#D4AF37]/10 flex items-center justify-center border-2 border-[#D4AF37]/30 shadow-2xl shadow-[#D4AF37]/20">
                <div className="w-24 h-24 rounded-full bg-[#D4AF37] flex items-center justify-center">
                  <span className="text-[#0A0A0A] font-black text-6xl">M</span>
                </div>
              </div>
            </motion.div>
            
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-black tracking-tight text-center"
            >
              <span className="text-[#D4AF37]">Maple</span>
              <span className="text-white">Luxe</span>
            </motion.h1>
            
            <motion.p
              variants={fadeUp}
              className="text-2xl md:text-3xl text-center text-[#D4AF37] font-light tracking-wide"
            >
              "Making Canadian Luxury Affordable"
            </motion.p>
            
            <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-center text-lg text-[#E5E5E5]/80">
              Premium contracting and property management—built with care, built to last. We help owners maximize value
              and tenants love where they live.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-[#0A0A0A] bg-[#D4AF37] rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-[#D4AF37]/30"
              >
                Get a Free Quote Today
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="tel:(587)400-4071"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
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
                className="rounded-2xl bg-[#0A0A0A]/60 backdrop-blur border border-[#D4AF37]/20 p-5 shadow-lg hover:shadow-[#D4AF37]/10 transition"
              >
                <div className="text-2xl font-extrabold text-[#D4AF37]">
                  {item.kpi}
                </div>
                <div className="text-sm text-[#E5E5E5]/70">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mb-10 text-center"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-[#D4AF37]">
              What We Do
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 max-w-2xl mx-auto text-[#E5E5E5]/70">
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
                desc: "Tailored outdoor solutions designed specifically for your lifestyle.",
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
                  className="group rounded-2xl p-6 bg-[#0A0A0A]/60 backdrop-blur border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D4AF37]/10"
                >
                  <div className="relative h-40 -mx-6 -mt-6 mb-4 rounded-t-2xl overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent opacity-60" />
                  </div>
                  <div className="h-12 w-12 rounded-xl grid place-items-center mb-4 bg-[#D4AF37]">
                    <div className="text-[#0A0A0A]">
                      <Icon />
                    </div>
                  </div>
                  <div className="font-extrabold text-lg text-[#D4AF37]">
                    {s.title}
                  </div>
                  <p className="mt-2 text-sm text-[#E5E5E5]/70">{s.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
            >
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-[#D4AF37]">
                Why Choose MapleLuxe
              </motion.h2>
              <ul className="mt-6 space-y-4">
                {[
                  {
                    h: "Increase Home Value",
                    p: "Our quality craftsmanship and premium materials boost your property's market value and curb appeal.",
                  },
                  {
                    h: "Warranty Protection",
                    p: "All work backed by comprehensive warranties and insured teams for complete peace of mind.",
                  },
                  {
                    h: "Seasonal Expertise",
                    p: "Calgary-specific knowledge ensures your outdoor spaces withstand harsh winters and thrive in summer.",
                  },
                  {
                    h: "Turnkey Solutions",
                    p: "From design to completion, we handle permits, materials, and cleanup—you just enjoy the results.",
                  },
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="grid grid-cols-[auto,1fr] gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-[#D4AF37]" />
                    <div>
                      <div className="font-semibold text-[#D4AF37]">
                        {item.h}
                      </div>
                      <p className="text-sm text-[#E5E5E5]/70">{item.p}</p>
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
              className="rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-2xl bg-[#0A0A0A]/60 backdrop-blur"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Luxury home construction"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <div className="text-sm text-[#D4AF37]/60">Featured Portfolio</div>
                <div className="mt-1 font-semibold text-[#D4AF37]">
                  MapleLuxe Premium Construction
                </div>
                <p className="mt-1 text-sm text-[#E5E5E5]/70">
                  Showcasing our commitment to exceptional craftsmanship and attention to detail. From custom home
                  construction to property maintenance, MapleLuxe delivers professional results that exceed expectations.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#D4AF37]">
              Trusted by Calgary Homeowners
            </h2>
            <p className="mt-2 text-[#E5E5E5]/60">Licensed, insured, and committed to excellence</p>
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
                <div className="font-bold text-lg text-[#D4AF37]">
                  {item.title}
                </div>
                <div className="text-sm text-[#E5E5E5]/60">{item.subtitle}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/30">
              <div className="h-2 w-2 bg-[#D4AF37] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[#D4AF37]">Currently accepting new projects</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4AF37]/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mb-10 text-center"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-[#D4AF37]">
              Recent Work
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 max-w-2xl mx-auto text-[#E5E5E5]/70">
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
                className="rounded-3xl overflow-hidden border border-[#D4AF37]/20 bg-[#0A0A0A]/60 backdrop-blur group"
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
                  <div className="font-semibold text-[#D4AF37]">
                    {project.title}
                  </div>
                  <p className="mt-1 text-sm text-[#E5E5E5]/70">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mb-10 text-center"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-[#D4AF37]">
              What Clients Say
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 max-w-2xl mx-auto text-[#E5E5E5]/70">
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
                className="rounded-2xl bg-[#0A0A0A]/60 backdrop-blur border border-[#D4AF37]/20 p-6 shadow-lg hover:shadow-[#D4AF37]/10 transition"
              >
                <div className="text-sm text-[#D4AF37] mb-2">{t.rating}</div>
                <p className="text-[15px] text-[#E5E5E5] italic">"{t.q}"</p>
                <div className="mt-4 text-sm font-semibold text-[#D4AF37]">
                  {t.a}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 bg-gradient-to-r from-[#0A0A0A] to-[#1A1A1A] border-y border-[#D4AF37]/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-2xl md:text-3xl font-black tracking-tight text-[#D4AF37]">Ready to elevate your property?</div>
              <p className="text-sm text-[#E5E5E5]/70">From build to management, MapleLuxe is your single trusted partner.</p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm border border-[#D4AF37] text-[#0A0A0A] bg-[#D4AF37] hover:bg-[#D4AF37]/90 transition"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="mb-10 text-center"
          >
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-[#D4AF37]">
              Contact Us
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 max-w-2xl mx-auto text-[#E5E5E5]/70">
              Tell us about your property or project. We'll respond within one business day.
            </motion.p>
          </motion.div>

          {formStatus === "success" && (
            <div className="mb-6 p-4 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] rounded-lg">
              ✓ Message sent successfully! We'll get back to you soon.
            </div>
          )}
          {formStatus === "error" && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500 text-red-400 rounded-lg">
              ✗ Something went wrong. Please try again or call us directly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
            <input type="hidden" name="_subject" value="New Quote Request from MapleLuxe Website" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="grid gap-1">
              <label className="text-sm font-medium text-[#D4AF37]">Full name *</label>
              <input
                required
                type="text"
                name="name"
                placeholder="Jane Doe"
                className="rounded-xl border border-[#D4AF37]/30 bg-[#0A0A0A] text-[#E5E5E5] px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium text-[#D4AF37]">Email *</label>
              <input
                required
                type="email"
                name="email"
                placeholder="jane@example.com"
                className="rounded-xl border border-[#D4AF37]/30 bg-[#0A0A0A] text-[#E5E5E5] px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium text-[#D4AF37]">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="(587) 400-4071"
                className="rounded-xl border border-[#D4AF37]/30 bg-[#0A0A0A] text-[#E5E5E5] px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium text-[#D4AF37]">Project Type</label>
              <select
                name="service"
                className="rounded-xl border border-[#D4AF37]/30 bg-[#0A0A0A] text-[#E5E5E5] px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
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
              <label className="text-sm font-medium text-[#D4AF37]">Project Details</label>
              <textarea
                rows={4}
                name="message"
                placeholder="Tell us about your vision... (e.g., 'I want a 500sqft composite deck with built-in seating and outdoor kitchen')"
                className="rounded-xl border border-[#D4AF37]/30 bg-[#0A0A0A] text-[#E5E5E5] px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]"
              ></textarea>
            </div>

            {/* Enhanced Media Upload Section */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl p-8 shadow-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#D4AF37] mb-2">
                    📸 Get a Premium Quote in 24 Hours
                  </h3>
                  <p className="text-[#E5E5E5]/70 mb-6 text-lg">
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
                      <div key={i} className="bg-[#0A0A0A]/60 backdrop-blur rounded-lg p-3 text-center border border-[#D4AF37]/20">
                        <div className="text-2xl mb-1">{item.icon}</div>
                        <div className="font-semibold text-sm text-[#D4AF37]">{item.label}</div>
                        <div className="text-xs text-[#E5E5E5]/50 mt-1">{item.example}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-2 border-dashed border-[#D4AF37]/30 rounded-xl p-8 text-center bg-[#0A0A0A]/40 backdrop-blur hover:border-[#D4AF37]/60 transition-all cursor-pointer group">
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
                      <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-[#0A0A0A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <p className="text-xl font-semibold text-[#D4AF37] mb-2">
                        Click to Upload Photos/Videos
                      </p>
                      <p className="text-[#E5E5E5]/50 mb-4">
                        or drag and drop files here
                      </p>
                      
                      {/* Uploaded Files Display */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 p-4 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/30">
                          <p className="font-semibold text-[#D4AF37] mb-2">✓ {uploadedFiles.length} file(s) ready to upload:</p>
                          <div className="flex flex-wrap gap-2">
                            {uploadedFiles.map((file, index) => (
                              <span key={index} className="bg-[#0A0A0A] px-3 py-1 rounded-full text-sm text-[#D4AF37] border border-[#D4AF37]/30">
                                {file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-[#E5E5E5]/50">
                        <span className="px-3 py-1 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">📸 Exterior shots</span>
                        <span className="px-3 py-1 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">🎨 Design inspiration</span>
                        <span className="px-3 py-1 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">📏 Measurements</span>
                        <span className="px-3 py-1 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">🔨 Current condition</span>
                      </div>
                    </label>
                  </div>

                  {/* Success Stories */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0A0A0A]/60 backdrop-blur rounded-lg p-4 shadow-lg border-l-4 border-[#D4AF37]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🏡</span>
                        <span className="font-semibold text-[#D4AF37]">Calgary, AB</span>
                      </div>
                      <p className="text-sm text-[#E5E5E5]/70">
                        "Sent 6 photos of our backyard, got a detailed quote with 3D renderings in 24 hours!"
                      </p>
                      <p className="text-xs text-[#E5E5E5]/50 mt-2">— David R., Custom Deck Project</p>
                    </div>
                    <div className="bg-[#0A0A0A]/60 backdrop-blur rounded-lg p-4 shadow-lg border-l-4 border-[#D4AF37]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🏢</span>
                        <span className="font-semibold text-[#D4AF37]">Luxury Estate</span>
                      </div>
                      <p className="text-sm text-[#E5E5E5]/70">
                        "Video walkthrough helped the team understand our vision perfectly. Quote matched exactly."
                      </p>
                      <p className="text-xs text-[#E5E5E5]/50 mt-2">— Jennifer M., Full Renovation</p>
                    </div>
                  </div>

                  <div className="mt-4 bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/5 rounded-lg p-4 flex items-center justify-between border border-[#D4AF37]/30">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <p className="font-bold text-[#D4AF37]">Quick Quote Guarantee</p>
                        <p className="text-sm text-[#E5E5E5]/70">Photos = 24hr response • Video tour = 12hr response</p>
                      </div>
                    </div>
                    <span className="bg-[#D4AF37] text-[#0A0A0A] px-3 py-1 rounded-full text-sm font-bold">PRO TIP</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-between items-center">
              <p className="text-sm text-[#E5E5E5]/50 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Your files are secure and confidential
              </p>
              <button
                type="submit"
                className="inline-flex items-center rounded-2xl px-8 py-4 text-base font-bold border-2 border-[#D4AF37] text-[#0A0A0A] bg-[#D4AF37] hover:scale-105 transition-all shadow-lg hover:shadow-[#D4AF37]/30"
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
      <footer className="bg-[#0A0A0A] border-t border-[#D4AF37]/20 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-lg font-bold text-[#D4AF37]">
              MapleLuxe
            </div>
            <p className="mt-2 text-sm text-[#E5E5E5]/50">
              Premium contracting and property management services across Calgary.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <p className="text-sm text-[#E5E5E5]/30">© 2025 MapleLuxe. Licensed & Insured.</p>
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
