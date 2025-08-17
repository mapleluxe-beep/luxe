import React from "react";
import { motion } from "framer-motion";

// One-page React site for MapeLuxe (Contracting & Property Management)
// Stack: React + TailwindCSS. Single-file demo with soft animations.
// Brand: Brown (#5A3A1B), Gold (#D4AF37), Cream (#F7F3ED), Charcoal (#1F1F1F)

export default function MapeLuxeSite() {
  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#1F1F1F]">
      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-3xl animate-pulse" style={{backgroundColor: "#D4AF37"}}>
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
                <div className="text-xl font-extrabold tracking-tight" style={{color: "#5A3A1B"}}>MapeLuxe</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Contracting • Property Management</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#services" className="hover:text-[#5A3A1B]">Services</a>
              <a href="#why" className="hover:text-[#5A3A1B]">Why Us</a>
              <a href="#projects" className="hover:text-[#5A3A1B]">Projects</a>
              <a href="#testimonials" className="hover:text-[#5A3A1B]">Reviews</a>
              <a href="#contact" className="hover:text-[#5A3A1B]">Contact</a>
            </nav>
            <a href="#contact" className="hidden sm:inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm border border-[#5A3A1B]/20 hover:border-[#5A3A1B]" style={{backgroundColor: "#D4AF37", color: "#1F1F1F"}}>Get a Quote</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F7F3ED] to-[#F7F3ED]" />
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-20" style={{background: "radial-gradient(closest-side, #D4AF37, transparent)"}}/>
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full opacity-15" style={{background: "radial-gradient(closest-side, #5A3A1B, transparent)"}}/>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <motion.h1
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.6}}
            className="text-4xl md:text-6xl font-black tracking-tight"
            style={{color: "#5A3A1B"}}
          >
            Transform Your Property with <span style={{color: "#D4AF37"}}>MapeLuxe</span>
          </motion.h1>
          <motion.p
            initial={{opacity:0, y:10}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true}}
            transition={{duration:0.6, delay:0.1}}
            className="mt-5 max-w-2xl text-lg text-neutral-700"
          >
            Premium contracting and property management—built with care, built to last. We help owners maximize value and tenants love where they live.
          </motion.p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl" style={{backgroundColor: "#D4AF37"}}>
              Get a Free Quote Today
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="tel:(403) 555-0123" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl border-2 transition-all duration-300 hover:shadow-lg" style={{color: "#5A3A1B", borderColor: "#5A3A1B"}}>
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (403) 555-0123
            </a>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {kpi:"98%", label:"On-time project delivery"},
              {kpi:"24/7", label:"Emergency maintenance"},
              {kpi:"+200", label:"Units under management"},
              {kpi:"A+", label:"Owner satisfaction"},
            ].map((item, i)=> (
              <motion.div key={i} initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.5, delay:0.1*i}}
                className="rounded-2xl bg-white ring-1 ring-black/5 p-5 shadow-sm">
                <div className="text-2xl font-extrabold" style={{color: "#5A3A1B"}}>{item.kpi}</div>
                <div className="text-sm text-neutral-600">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{color: "#5A3A1B"}}>What We Do</h2>
            <p className="mt-2 max-w-2xl text-neutral-700">Full‑stack contracting and property management—one partner for everything from build to ongoing care.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {title:"Fencing & Decking", desc:"Custom wood & composite builds designed for Calgary's seasons.", icon: FenceIcon()},
              {title:"Landscaping", desc:"Design, hardscapes, lighting and year‑round care.", icon: LeafIcon()},
              {title:"Property Management", desc:"Tenant relations, inspections, financials, compliance.", icon: KeysIcon()},
              {title:"Custom Design Build", desc:"Tailored outdoor solutions designed specifically for your lifestyle and property.", icon: MegaphoneIcon()},
              {title:"Maintenance & Repairs", desc:"Preventative programs and 24/7 response.", icon: WrenchIcon()},
              {title:"Cleaning & Turnover", desc:"Move‑in/out, common areas and deep clean crews.", icon: SparkleIcon()},
            ].map((s,i)=> (
              <div key={i} className="group rounded-2xl p-6 bg-[#F7F3ED] ring-1 ring-black/5 hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-xl grid place-items-center mb-4" style={{backgroundColor: "#5A3A1B"}}>
                  <div className="text-white">{s.icon}</div>
                </div>
                <div className="font-extrabold text-lg" style={{color: "#5A3A1B"}}>{s.title}</div>
                <p className="mt-2 text-sm text-neutral-700">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section id="why" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{color: "#5A3A1B"}}>Why House Owners Choose MapeLuxe</h2>
              <ul className="mt-6 space-y-4">
                {[
                  {h:"Increase home value", p:"Our quality craftsmanship and premium materials boost your property's market value and curb appeal."},
                  {h:"Warranty protection", p:"All work backed by comprehensive warranties and insured teams for complete peace of mind."},
                  {h:"Seasonal expertise", p:"Calgary-specific knowledge ensures your outdoor spaces withstand harsh winters and thrive in summer."},
                  {h:"Turnkey solutions", p:"From design to completion, we handle permits, materials, and cleanup—you just enjoy the results."}
                ].map((item,i)=> (
                  <li key={i} className="grid grid-cols-[auto,1fr] gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full" style={{backgroundColor: "#D4AF37"}} />
                    <div>
                      <div className="font-semibold" style={{color: "#5A3A1B"}}>{item.h}</div>
                      <p className="text-sm text-neutral-700">{item.p}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-sm bg-white">
              <div className="aspect-[4/3] bg-cover bg-center" style={{backgroundImage: "url('/images/main-img.jpg')"}} />
              <div className="p-6">
                <div className="text-sm text-neutral-700">Featured portfolio</div>
                <div className="mt-1 font-semibold" style={{color: "#5A3A1B"}}>MapeLuxe Premium Construction</div>
                <p className="mt-1 text-sm text-neutral-700">Showcasing our commitment to exceptional craftsmanship and attention to detail. From custom home construction to property maintenance, MapeLuxe delivers professional results that exceed expectations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight" style={{color: "#5A3A1B"}}>Trusted by Calgary Homeowners</h2>
            <p className="mt-2 text-neutral-600">Licensed, insured, and committed to excellence</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {icon: "🏆", title: "15+ Years", subtitle: "Experience"},
              {icon: "✅", title: "Licensed", subtitle: "& Insured"},
              {icon: "⭐", title: "4.9/5 Rating", subtitle: "Customer Reviews"},
              {icon: "🛡️", title: "Warranty", subtitle: "Guaranteed"}
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold text-lg" style={{color: "#5A3A1B"}}>{item.title}</div>
                <div className="text-sm text-neutral-600">{item.subtitle}</div>
              </div>
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
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{color: "#5A3A1B"}}>Recent Work</h2>
<p className="mt-2 max-w-2xl text-neutral-700">See how we've transformed outdoor spaces across Calgary with quality craftsmanship.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl" style={{backgroundColor: "#D4AF37"}}>
                Get a Free Quote Today
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a href="tel:(403) 555-0123" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-2xl border-2 transition-all duration-300 hover:shadow-lg" style={{color: "#5A3A1B", borderColor: "#5A3A1B"}}>
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (403) 555-0123
              </a>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 bg-[#F7F3ED]">
              <div className="aspect-[4/3] bg-cover bg-center" style={{backgroundImage: "url('/images/fence-construction.jpg')"}} />
              <div className="p-5">
                <div className="font-semibold" style={{color: "#5A3A1B"}}>Custom Fence Installation</div>
                <p className="mt-1 text-sm text-neutral-700">Professional fence construction with quality materials and expert craftsmanship.</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 bg-[#F7F3ED]">
              <div className="aspect-[4/3] bg-cover bg-center" style={{backgroundImage: "url('/images/framing-construction.jpg')"}} />
              <div className="p-5">
                <div className="font-semibold" style={{color: "#5A3A1B"}}>Custom Home Construction</div>
                <p className="mt-1 text-sm text-neutral-700">Quality framing and structural work built to last through Calgary's harsh winters.</p>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden ring-1 ring-black/5 bg-[#F7F3ED]">
              <div className="aspect-[4/3] bg-cover bg-center" style={{backgroundImage: "url('/images/clean-service.jpg')"}} />
              <div className="p-5">
                <div className="font-semibold" style={{color: "#5A3A1B"}}>Professional Cleaning Services</div>
                <p className="mt-1 text-sm text-neutral-700">Comprehensive property cleaning and maintenance for residential and commercial spaces.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{color: "#5A3A1B"}}>What Clients Say</h2>
            <p className="mt-2 max-w-2xl text-neutral-700">Calgary homeowners trust MapeLuxe for quality construction and reliable service.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {q:"MapeLuxe built our custom fence and deck perfectly. Quality workmanship that's built to last through Calgary winters.", a:"— Jennifer L., Homeowner", rating: "⭐⭐⭐⭐⭐"},
              {q:"Professional construction team that exceeded our expectations. Clean, reliable, and finished on time.", a:"— Michael R., Property Owner", rating: "⭐⭐⭐⭐⭐"},
              {q:"Best cleaning service we've used. Attention to detail and great communication throughout the project.", a:"— Amanda K., Calgary", rating: "⭐⭐⭐⭐⭐"},
            ].map((t,i)=> (
              <div key={i} className="rounded-2xl bg-white ring-1 ring-black/5 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-sm text-yellow-500 mb-2">{t.rating}</div>
                <p className="text-[15px] text-neutral-800 italic">"{t.q}"</p>
                <div className="mt-4 text-sm font-semibold" style={{color: "#5A3A1B"}}>{t.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#5A3A1B] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-2xl md:text-3xl font-black tracking-tight">Ready to protect and elevate your property?</div>
              <p className="text-sm text-white/80">From build to management, MapeLuxe is your single trusted partner.</p>
            </div>
            <a href="#contact" className="inline-flex items-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm border border-white/20 hover:bg-white hover:text-[#5A3A1B]" style={{backgroundColor: "#D4AF37", color: "#1F1F1F"}}>Book a Consultation</a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight" style={{color: "#5A3A1B"}}>Contact Us</h2>
            <p className="mt-2 max-w-2xl text-neutral-700">Tell us about your property or project. We'll respond within one business day.</p>
          </div>
          <form name="mapleluxe-contact" method="POST" data-netlify="true" action="/" className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="form-name" value="mapleluxe-contact" />
            <div className="grid gap-1">
              <label className="text-sm font-medium" htmlFor="name">Full name</label>
              <input required type="text" name="name" id="name" placeholder="Jane Doe" className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <input required type="email" name="email" id="email" placeholder="jane@email.com" className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]" />
            </div>
            <div className="grid gap-1">
              <label className="text-sm font-medium" htmlFor="phone">Phone</label>
              <input type="tel" name="phone" id="phone" placeholder="(555) 000-0000" className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]" />
            </div>
            <div className="grid gap-1 md:col-span-2">
              <label className="text-sm font-medium" htmlFor="message">Message</label>
              <textarea rows={4} name="message" id="message" placeholder="What can we help with?" className="rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]" />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="w-full md:w-auto inline-flex items-center rounded-2xl px-6 py-3 text-sm font-semibold border border-[#5A3A1B] text-white hover:opacity-95 transition-opacity" style={{backgroundColor: "#5A3A1B"}}>
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
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
            <div className="text-lg font-bold" style={{color: "#D4AF37"}}>MapeLuxe</div>
            <p className="mt-2 text-sm text-white/80">Premium contracting and property management services across Calgary.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <p className="text-sm text-white/60"> 2024 MapeLuxe. Licensed & Insured.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- Minimal inline icons ---
function FenceIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M7 3l2 2-2 2-2-2 2-2zm5 0l2 2-2 2-2-2 2-2zm5 0l2 2-2 2-2-2 2-2zM5 9h14v2H5V9zm-2 4h18v8H3v-8zm4 0v8m5-8v8m5-8v8" stroke="currentColor" strokeWidth="1" fill="none"/>
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M12 3c6 0 9 3 9 9-6 0-9 3-9 9-6 0-9-3-9-9 0-6 3-9 9-9z" opacity=".1"/>
      <path d="M5 13c5-1 9-5 14-9-2 6-6 10-12 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}
function KeysIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <circle cx="8" cy="8" r="3" fill="currentColor"/>
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
