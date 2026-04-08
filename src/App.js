import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── HERO BACKGROUND ──────────────────────────────────────────────────────────
function HeroBg() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 3 + 0.5,
      dx: (Math.random() - 0.5) * 0.15, dy: (Math.random() - 0.5) * 0.15,
      o: Math.random() * 0.08 + 0.02,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,60,${p.o})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }} />;
}

// ─── PROJECT CARD IMAGE (with optional crossfade) ────────────────────────────
function ProjectCardImage({ project }) {
  const [showAlt, setShowAlt] = useState(false);
  useEffect(() => {
    if (!project.imgAlt) return;
    const t1 = setTimeout(() => setShowAlt(true), project.imgDuration ?? 2500);
    const cycle = () => {
      const t2 = setTimeout(() => setShowAlt(false), (project.imgAltDuration ?? 6000));
      const t3 = setTimeout(() => setShowAlt(true), (project.imgAltDuration ?? 6000) + (project.imgDuration ?? 2500));
      return [t2, t3];
    };
    let timers = [];
    const loop = setInterval(() => { timers.forEach(clearTimeout); timers = cycle(); }, (project.imgDuration ?? 2500) + (project.imgAltDuration ?? 6000));
    return () => { clearTimeout(t1); clearInterval(loop); timers.forEach(clearTimeout); };
  }, [project]);
  return (
    <div className="w-full h-full relative">
      <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
      {project.imgAlt && (
        <img src={project.imgAlt} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 transition-opacity duration-1000" style={{ opacity: showAlt ? 1 : 0 }} loading="lazy" />
      )}
    </div>
  );
}

// ─── SERVICES CAROUSEL ───────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
function ServicesCarousel({ services }) {
  const allItems = services.flatMap(g => g.items);
  const [idx, setIdx] = useState(0);
  const startX = useRef(null);
  const timerRef = useRef(null);

  const go = (next) => {
    setIdx(next);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % allItems.length), 3000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx(i => (i + 1) % allItems.length), 3000);
    return () => clearInterval(timerRef.current);
  }, [allItems.length]);

  const handleTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (startX.current === null) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 40) go((idx + 1) % allItems.length);
    else if (diff < -40) go((idx - 1 + allItems.length) % allItems.length);
    startX.current = null;
  };

  const item = allItems[idx];
  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} className="select-none relative">
      <img src={item.img} alt={item.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
      <button onClick={() => go((idx - 1 + allItems.length) % allItems.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full w-9 h-9 flex items-center justify-center shadow text-lg text-white border border-white/10">‹</button>
      <button onClick={() => go((idx + 1) % allItems.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full w-9 h-9 flex items-center justify-center shadow text-lg text-white border border-white/10">›</button>
      <div className="p-6 bg-[#111111]">
        <div className="text-xs text-[#D4AF37] uppercase tracking-widest mb-1">Our Services</div>
        <div className="font-semibold text-white mb-1">{item.title}</div>
        <p className="text-sm text-[#8A8A8A]">{item.desc}</p>
        <div className="flex gap-1.5 mt-4 justify-center">
          {allItems.map((_, i) => (
            <button key={i} onClick={() => go(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-[#D4AF37]" : "w-1.5 bg-[#3A3A3A]"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BEFORE / AFTER SLIDER ───────────────────────────────────────────────────
function BeforeAfterImg() {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const containerRef = useRef(null);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const move = (clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden select-none border border-[#2A2A2A] shadow-xl"
      style={{ aspectRatio: "16/9", cursor: dragging.current ? "col-resize" : "default" }}
      onMouseDown={() => { dragging.current = true; }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onMouseMove={(e) => { if (dragging.current) move(e.clientX); }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
        touchStartY.current = e.touches[0].clientY;
      }}
      onTouchMove={(e) => {
        const dx = Math.abs(e.touches[0].clientX - touchStartX.current);
        const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
        if (dx > dy) {
          e.preventDefault();
          move(e.touches[0].clientX);
        }
      }}
    >
      <img src="/images/wallpanelafter.png" alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src="/images/wallpanelbefore.png" alt="Before" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: "none" }} />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-3 left-3 text-xs font-bold tracking-widest bg-black/70 text-white px-2 py-1 rounded-md uppercase">Before</div>
      </div>
      <div className="absolute top-3 right-3 text-xs font-bold tracking-widest bg-[#D4AF37] text-[#111111] px-2 py-1 rounded-md uppercase">After</div>
      {/* Drag handle */}
      <div className="absolute top-0 bottom-0 w-px bg-white/60" style={{ left: `${pos}%`, pointerEvents: "none" }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0A0A0A] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-col-resize" style={{ pointerEvents: "all" }}
          onMouseDown={(e) => { e.stopPropagation(); dragging.current = true; }}>
          <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] tracking-widest text-white/40 uppercase font-mono pointer-events-none">Drag to compare</div>
    </div>
  );
}

// ─── CHAT DEMO ────────────────────────────────────────────────────────────────
const chatScript = [
  { from: "client", name: "Jane Arnold", text: "Hi — we're looking to do a full living room renovation. Open-concept feel, new flooring, a feature wall, and updated lighting throughout.", delay: 0 },
  { from: "ai", text: "Hi Jane — beautiful project. Are we opening up any walls for the open-concept look, or focusing on finishes — flooring, millwork, and lighting?", delay: 1400 },
  { from: "client", name: "Jane Arnold", text: "Mostly finishes. Engineered hardwood floors, a custom built-in feature wall with integrated lighting, and new trim and baseboards throughout.", delay: 3000 },
  { from: "ai", text: "Perfect scope — here's a preliminary range based on what you've described:\n\n• Engineered hardwood (supply + install): $8,000 – $12,000\n• Custom built-in feature wall w/ integrated lighting: $6,500 – $10,000\n• Trim, baseboards & casings: $2,500 – $4,000\n• Timeline: 2 – 3 weeks from deposit\n\nSend a few photos and room dimensions and I can sharpen this considerably.", delay: 4800 },
  { from: "client", name: "Jane Arnold", text: "That's exactly the clarity I was looking for. I'll grab some photos and measurements today.", delay: 7200 },
  { from: "ai", text: "Perfect. Once we have your photos, a senior estimator will review and send a written scope, fixed price, and timeline — typically within 12 hours.\n\nWould you like us to flag this for our next available interior team?", delay: 8800 },
  { from: "client", name: "Jane Arnold", text: "Yes please!", delay: 10400 },
  { from: "ai", text: "Done — your project is flagged and prioritized. You'll hear from us within 12 hours. Looking forward to transforming your space, Jane. ✓", delay: 12000 },
];

function TypingDots() {
  return (
    <span className="inline-flex gap-[3px] items-end h-4">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="w-[5px] h-[5px] rounded-full bg-[#D4AF37]/60"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.18 }} />
      ))}
    </span>
  );
}

function ChatDemo() {
  const [visible, setVisible] = useState([]);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!started) return;
    setVisible([]); setTyping(false); setDone(false);
    let timeouts = [];
    chatScript.forEach((msg, i) => {
      if (msg.from === "ai") {
        const t1 = setTimeout(() => setTyping(true), msg.delay);
        const t2 = setTimeout(() => { setTyping(false); setVisible((v) => [...v, i]); if (i === chatScript.length - 1) setDone(true); }, msg.delay + 1100);
        timeouts.push(t1, t2);
      } else {
        timeouts.push(setTimeout(() => setVisible((v) => [...v, i]), msg.delay));
      }
    });
    return () => timeouts.forEach(clearTimeout);
  }, [started]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [visible, typing]);

  return (
    <div className="w-full max-w-lg mx-auto" style={{ filter: "drop-shadow(0 0 40px rgba(212,175,55,0.08))" }}>
      {/* Terminal-style header bar */}
      <div className="rounded-t-2xl border border-[#2A2A2A] border-b-0 bg-[#141414] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#3A3A3A]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3A3A3A]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#3A3A3A]" />
          </div>
          <span className="text-[10px] font-mono text-[#3A3A3A] ml-2 tracking-widest uppercase">maple-estimating · secure channel</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400/80 animate-pulse" />
          <span className="text-[10px] font-mono text-green-400/80">live</span>
        </div>
      </div>

      {/* Chat avatar header */}
      <div className="border-x border-[#2A2A2A] bg-[#111111] px-5 py-4 flex items-center gap-4"
        style={{ borderTop: "1px solid rgba(212,175,55,0.15)", background: "linear-gradient(180deg, #161616 0%, #111111 100%)" }}>
        <div className="relative">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-[#0A0A0A] text-sm"
            style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8902A 100%)" }}>M</div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-[#111111]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white tracking-tight">MapleLuxe Estimating</div>
          <div className="text-[11px] text-[#6B6B6B] font-mono">Jane Arnold · Living Room Remodel · SW Calgary</div>
        </div>
        <div className="text-[10px] font-mono text-[#D4AF37]/60 tracking-widest uppercase">≤ 12h reply</div>
      </div>

      {/* Messages */}
      <div className="border-x border-[#2A2A2A] bg-[#0D0D0D] p-5 min-h-[300px] max-h-[360px] overflow-y-auto space-y-4"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#2A2A2A transparent" }}>
        {!started ? (
          <div className="flex flex-col items-center justify-center h-56 gap-6">
            {/* Animated rings */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/20 animate-ping" style={{ animationDuration: "2s" }} />
              <div className="absolute inset-1 rounded-full border border-[#D4AF37]/10" />
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)", border: "1px solid rgba(212,175,55,0.3)" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[#C0C0C0] text-sm font-medium mb-1">See a real client conversation</p>
              <p className="text-[#4A4A4A] text-xs font-mono">from first message → fixed-price proposal</p>
            </div>
            <button onClick={() => setStarted(true)}
              className="group flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-[#0A0A0A] text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
              style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8902A 100%)", boxShadow: "0 0 24px rgba(212,175,55,0.25)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Play Conversation
            </button>
          </div>
        ) : (
          <>
            {chatScript.map((msg, i) =>
              visible.includes(i) ? (
                <motion.div key={i} initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex flex-col ${msg.from === "client" ? "items-end" : "items-start"}`}>
                  {msg.name && (
                    <span className="text-[10px] font-mono text-[#4A4A4A] mb-1 px-1 tracking-wide">{msg.name}</span>
                  )}
                  <div className={`max-w-[84%] px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed ${
                    msg.from === "client"
                      ? "text-[#0A0A0A] font-medium rounded-2xl rounded-br-sm"
                      : "text-[#D8D8D8] rounded-2xl rounded-bl-sm border"
                  }`} style={msg.from === "client" ? {
                    background: "linear-gradient(135deg, #D4AF37 0%, #C09A28 100%)",
                    boxShadow: "0 2px 16px rgba(212,175,55,0.2)"
                  } : {
                    background: "linear-gradient(180deg, #1C1C1C 0%, #181818 100%)",
                    borderColor: "#2A2A2A"
                  }}>
                    {msg.text}
                  </div>
                  {msg.from === "client" && visible.includes(i) && (
                    <span className="text-[9px] font-mono text-[#3A3A3A] mt-1 px-1 tracking-widest">SENT ✓</span>
                  )}
                </motion.div>
              ) : null
            )}
            {typing && (
              <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8902A 100%)" }}>
                  <span className="text-[#0A0A0A] text-[9px] font-black">M</span>
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm border border-[#2A2A2A]"
                  style={{ background: "linear-gradient(180deg, #1C1C1C 0%, #181818 100%)" }}>
                  <TypingDots />
                </div>
              </motion.div>
            )}
            {done && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex justify-center pt-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  <span className="text-[10px] font-mono text-[#D4AF37]/70 tracking-widest uppercase">Proposal sent · 11h 42m</span>
                </div>
              </motion.div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar (decorative) */}
      <div className="rounded-b-2xl border border-[#2A2A2A] border-t-0 bg-[#0F0F0F] px-4 py-3 flex items-center gap-3"
        style={{ borderTop: "1px solid #1A1A1A" }}>
        <div className="flex-1 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] px-3 py-2 text-xs text-[#3A3A3A] font-mono">
          Send a message...
        </div>
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #D4AF37 0%, #B8902A 100%)" }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#0A0A0A">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ─── DEMO FLOW ────────────────────────────────────────────────────────────────
function Confetti({ active }) {
  const pieces = Array.from({ length: 60 }, (_, i) => ({
    id: i, color: ["#D4AF37", "#111111", "#B8902A", "#FFD700", "#555555"][i % 5],
    left: Math.random() * 100, delay: Math.random() * 0.6, duration: 1.5 + Math.random() * 1,
  }));
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      {pieces.map((p) => (
        <motion.div key={p.id} initial={{ y: -20, x: `${p.left}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "105vh", opacity: 0, rotate: 720 }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          style={{ position: "absolute", top: 0, width: 8, height: 8, borderRadius: 2, backgroundColor: p.color }} />
      ))}
    </div>
  );
}

const DEMO_STEPS = [
  { id: 1, icon: "👋", title: "Welcome to MapleLuxe", sub: "Canada's premium renovation & property team" },
  { id: 2, icon: "📸", title: "Upload Your Photos", sub: "Snap your space — our team reads it instantly" },
  { id: 3, icon: "🤖", title: "We Scope Your Project", sub: "Materials, timeline, and scope identified fast" },
  { id: 4, icon: "🎨", title: "Review Design Options", sub: "Premium finishes curated for your property" },
  { id: 5, icon: "💰", title: "Receive Your Estimate", sub: "Clear pricing, no surprises, within 12 hours" },
  { id: 6, icon: "👷", title: "Meet Your Assigned Team", sub: "Licensed Calgary professionals, ready to go" },
  { id: 7, icon: "✅", title: "Project Confirmed", sub: "Calendar locked. Work begins on your schedule." },
];

function DemoFlow({ onClose }) {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(false);
  useEffect(() => {
    if (!auto) return;
    if (step >= DEMO_STEPS.length - 1) { setAuto(false); setDone(true); setConfetti(true); setTimeout(() => setConfetti(false), 3500); return; }
    const t = setTimeout(() => setStep((s) => s + 1), 1400);
    return () => clearTimeout(t);
  }, [auto, step]);
  const goNext = () => {
    if (step < DEMO_STEPS.length - 1) setStep((s) => s + 1);
    else { setDone(true); setConfetti(true); setTimeout(() => setConfetti(false), 3500); }
  };
  const current = DEMO_STEPS[step];
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Confetti active={confetti} />
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
        className="relative bg-white border border-gray-200 rounded-3xl shadow-2xl w-full max-w-md p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        {done ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-black text-[#111111] mb-2">You're all set!</h2>
            <p className="text-gray-500 mb-6">Your MapleLuxe project journey starts now.</p>
            <a href="#contact" onClick={onClose} className="inline-flex items-center px-6 py-3 bg-[#111111] text-white font-bold rounded-2xl hover:bg-[#333] transition-colors">
              Get Your Free Quote in Under 12 Hours →
            </a>
          </div>
        ) : (
          <>
            <div className="flex gap-1.5 mb-8">
              {DEMO_STEPS.map((_, i) => (
                <div key={i} className="flex-1 h-1 rounded-full transition-all duration-500"
                  style={{ background: i <= step ? "#D4AF37" : "#E5E7EB" }} />
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="text-center mb-8">
                <div className="text-6xl mb-4">{current.icon}</div>
                <div className="text-xs text-gray-400 mb-1 tracking-widest uppercase">Step {step + 1} of {DEMO_STEPS.length}</div>
                <h3 className="text-xl font-black text-[#111111] mb-2">{current.title}</h3>
                <p className="text-gray-500">{current.sub}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-3">
              <button onClick={() => setAuto(!auto)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${auto ? "border-gray-200 text-gray-400" : "border-gray-300 text-gray-600 hover:border-gray-400"}`}>
                {auto ? "⏸ Pause" : "▶ Auto-Play"}
              </button>
              <button onClick={goNext} className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-[#111111] text-white hover:bg-[#333] transition-colors">
                {step === DEMO_STEPS.length - 1 ? "Finish 🎉" : "Next →"}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

// ─── SUBCONTRACTOR DASHBOARD ──────────────────────────────────────────────────
const subJobs = {
  available: [
    { id: 1, title: "Cedar deck — Springbank Hill", budget: "$4,200", distance: "3.2 km", posted: "2h ago", tags: ["Decking", "Cedar"], urgent: false },
    { id: 2, title: "Composite fence install — Aspen Woods", budget: "$2,800", distance: "5.1 km", posted: "5h ago", tags: ["Fencing"], urgent: true },
    { id: 3, title: "Patio stone — Cougar Ridge", budget: "$3,500", distance: "4.7 km", posted: "1d ago", tags: ["Landscaping", "Hardscape"], urgent: false },
    { id: 4, title: "Pergola build — Tuscany", budget: "$6,100", distance: "7.4 km", posted: "2d ago", tags: ["Structures"], urgent: false },
  ],
  active: [
    { id: 5, title: "Privacy fence — Signal Hill", budget: "$3,200", progress: 65, dueDate: "Mar 20", client: "Thompson Family", phase: "Installation" },
    { id: 6, title: "Deck refinish — Strathcona", budget: "$1,800", progress: 30, dueDate: "Mar 25", client: "B. Kowalski", phase: "Prep & Sanding" },
    { id: 7, title: "Retaining wall — Rocky Ridge", budget: "$5,400", progress: 85, dueDate: "Mar 16", client: "Zhang Properties", phase: "Final Grading" },
  ],
  completed: [
    { id: 8, title: "Vinyl fence — Tuscany", budget: "$2,900", rating: 5, date: "Feb 28", client: "Martinez Family", review: "Flawless work, very professional." },
    { id: 9, title: "Cedar deck — Discovery Ridge", budget: "$4,800", rating: 5, date: "Feb 14", client: "O'Brien Residence", review: "Exceeded expectations, beautiful result." },
    { id: 10, title: "Gate install — Cougar Ridge", budget: "$1,100", rating: 4, date: "Jan 30", client: "S. Nakamura", review: "Great job, very punctual." },
  ],
};
const subMessages = [
  { id: 1, from: "MapleLuxe HQ", time: "10:24am", text: "Your payout for job #9 has been processed — $4,320 to your account.", unread: true },
  { id: 2, from: "Thompson Family", time: "Yesterday", text: "Quick question on the fence post spacing — can we chat tomorrow morning?", unread: true },
  { id: 3, from: "Dispatch", time: "Mar 12", text: "New jobs available in your zone. 4 new listings matching your skills.", unread: false },
  { id: 4, from: "Zhang Properties", time: "Mar 11", text: "Almost done — looking great! Can we do a final walkthrough Friday?", unread: false },
];
const subInvoices = [
  { id: "INV-0048", job: "Cedar deck — Discovery Ridge", amount: "$4,320", status: "Paid", date: "Mar 1" },
  { id: "INV-0047", job: "Vinyl fence — Tuscany", amount: "$2,610", status: "Paid", date: "Mar 3" },
  { id: "INV-0049", job: "Privacy fence — Signal Hill", amount: "$1,600", status: "Pending", date: "Mar 18" },
  { id: "INV-0050", job: "Retaining wall — Rocky Ridge", amount: "$2,700", status: "Pending", date: "Mar 16" },
];

function SubcontractorDashboard({ onClose }) {
  const [tab, setTab] = useState("jobs");
  const [jobFilter, setJobFilter] = useState("available");
  const [selectedJob, setSelectedJob] = useState(null);
  const sideItems = [
    { id: "jobs", icon: "🔨", label: "Jobs" },
    { id: "metrics", icon: "📊", label: "Metrics" },
    { id: "messages", icon: "💬", label: "Messages", badge: 2 },
    { id: "invoices", icon: "🧾", label: "Invoices" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <div className="fixed inset-0 z-[100] flex bg-gray-50">
      <div className="w-16 md:w-56 bg-white border-r border-gray-200 flex flex-col py-6 gap-1 shrink-0">
        <div className="px-3 mb-6 hidden md:block">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center text-[#111111] font-black text-sm">M</div>
            <div><div className="text-[#111111] font-bold text-xs leading-tight">MapleLuxe</div><div className="text-gray-400 text-[9px] tracking-widest">SUB PORTAL</div></div>
          </div>
        </div>
        {sideItems.map((item) => (
          <button key={item.id} onClick={() => setTab(item.id)}
            className={`relative flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === item.id ? "bg-[#111111] text-white" : "text-gray-500 hover:text-[#111111] hover:bg-gray-100"}`}>
            <span className="text-base shrink-0">{item.icon}</span>
            <span className="hidden md:block">{item.label}</span>
            {item.badge && <span className={`ml-auto hidden md:flex w-5 h-5 text-[10px] font-bold rounded-full items-center justify-center ${tab === item.id ? "bg-white text-[#111111]" : "bg-[#D4AF37] text-[#111111]"}`}>{item.badge}</span>}
          </button>
        ))}
        <div className="mt-auto mx-2">
          <button onClick={onClose} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
            <span className="text-base">←</span><span className="hidden md:block">Exit Portal</span>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {tab === "jobs" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div><h1 className="text-xl font-black text-[#111111]">Job Board</h1><p className="text-xs text-gray-400">Calgary & surrounding area</p></div>
              <div className="flex gap-2">
                {["available", "active", "completed"].map((f) => (
                  <button key={f} onClick={() => setJobFilter(f)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${jobFilter === f ? "bg-[#111111] text-white" : "border border-gray-200 text-gray-500 hover:border-gray-400"}`}>
                    {f} <span className="opacity-60">({subJobs[f].length})</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {jobFilter === "available" && subJobs.available.map((job) => (
                <motion.button key={job.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} onClick={() => setSelectedJob(job)}
                  className="text-left p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#D4AF37]/60 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-semibold text-[#111111] text-sm group-hover:text-[#B8902A] transition-colors">{job.title}</span>
                    {job.urgent && <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-2 py-0.5 rounded-full">Urgent</span>}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3"><span>📍 {job.distance}</span><span>⏰ {job.posted}</span></div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">{job.tags.map((t) => <span key={t} className="text-[10px] bg-[#D4AF37]/10 text-[#9A7820] px-2 py-0.5 rounded-full border border-[#D4AF37]/20">{t}</span>)}</div>
                    <span className="text-[#111111] font-bold text-sm">{job.budget}</span>
                  </div>
                </motion.button>
              ))}
              {jobFilter === "active" && subJobs.active.map((job) => (
                <motion.div key={job.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-white border border-gray-200">
                  <div className="flex items-start justify-between mb-1"><span className="font-semibold text-[#111111] text-sm">{job.title}</span><span className="text-[#111111] font-bold text-sm">{job.budget}</span></div>
                  <div className="text-xs text-gray-400 mb-3">{job.client} · Due {job.dueDate}</div>
                  <div className="text-[10px] text-[#9A7820] mb-1.5 font-medium">{job.phase} — {job.progress}%</div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${job.progress}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full rounded-full bg-[#D4AF37]" />
                  </div>
                </motion.div>
              ))}
              {jobFilter === "completed" && subJobs.completed.map((job) => (
                <motion.div key={job.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl bg-white border border-gray-200">
                  <div className="flex items-start justify-between mb-1"><span className="font-semibold text-[#111111] text-sm">{job.title}</span><span className="text-[#111111] font-bold text-sm">{job.budget}</span></div>
                  <div className="text-xs text-gray-400 mb-2">{job.client} · {job.date}</div>
                  <div className="flex items-center gap-1 mb-2">{Array.from({ length: job.rating }).map((_, i) => <span key={i} className="text-[#D4AF37] text-xs">★</span>)}</div>
                  <p className="text-xs text-gray-500 italic">"{job.review}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        {tab === "metrics" && (
          <div className="p-6">
            <h1 className="text-xl font-black text-[#111111] mb-6">My Metrics</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[{ label: "Earned (Mar)", value: "$6,930", icon: "💰" }, { label: "Jobs Done", value: "23", icon: "✅" }, { label: "Avg Rating", value: "4.9 ★", icon: "⭐" }, { label: "On-Time Rate", value: "97%", icon: "⏱" }].map((m, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white border border-gray-200 text-center shadow-sm">
                  <div className="text-2xl mb-1">{m.icon}</div>
                  <div className="text-xl font-black text-[#111111]">{m.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{m.label}</div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <h3 className="text-sm font-bold text-[#111111] mb-4">Monthly Earnings</h3>
              <div className="flex items-end gap-3 h-28">
                {[{ month: "Nov", amt: 4200 }, { month: "Dec", amt: 5800 }, { month: "Jan", amt: 3900 }, { month: "Feb", amt: 7200 }, { month: "Mar", amt: 6930 }].map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    <motion.div initial={{ height: 0 }} animate={{ height: `${(d.amt / 7200) * 100}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
                      className="w-full rounded-t-lg" style={{ backgroundColor: d.month === "Mar" ? "#D4AF37" : "#E5E7EB" }} />
                    <span className="text-[10px] text-gray-400">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "messages" && (
          <div className="p-6">
            <h1 className="text-xl font-black text-[#111111] mb-6">Messages</h1>
            <div className="space-y-3">
              {subMessages.map((msg) => (
                <div key={msg.id} className={`p-4 rounded-2xl border transition-all cursor-pointer ${msg.unread ? "bg-[#D4AF37]/5 border-[#D4AF37]/30 hover:border-[#D4AF37]/50" : "bg-white border-gray-200 hover:border-gray-300"}`}>
                  <div className="flex items-center justify-between mb-1"><span className="text-sm font-semibold text-[#111111]">{msg.from}</span><span className="text-[10px] text-gray-400">{msg.time}</span></div>
                  <p className="text-sm text-gray-500">{msg.text}</p>
                  {msg.unread && <div className="mt-2"><span className="text-[10px] bg-[#D4AF37] text-[#111111] px-2 py-0.5 rounded-full font-bold">New</span></div>}
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === "invoices" && (
          <div className="p-6">
            <h1 className="text-xl font-black text-[#111111] mb-6">Invoices</h1>
            <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead><tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Invoice</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold hidden md:table-cell">Job</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Amount</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold">Status</th>
                  <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold hidden md:table-cell">Date</th>
                </tr></thead>
                <tbody>
                  {subInvoices.map((inv, i) => (
                    <tr key={inv.id} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                      <td className="px-4 py-3 text-[#9A7820] font-mono text-xs">{inv.id}</td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{inv.job}</td>
                      <td className="px-4 py-3 text-[#111111] font-semibold">{inv.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${inv.status === "Paid" ? "bg-green-50 text-green-600 border border-green-200" : "bg-[#D4AF37]/10 text-[#9A7820] border border-[#D4AF37]/30"}`}>{inv.status}</span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell">{inv.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-between">
              <span className="text-sm text-gray-500">Total Pending</span>
              <span className="text-lg font-black text-[#111111]">$4,300</span>
            </div>
          </div>
        )}
        {tab === "profile" && (
          <div className="p-6 max-w-lg">
            <h1 className="text-xl font-black text-[#111111] mb-6">My Profile</h1>
            <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#111111] font-black text-2xl">JD</div>
              <div>
                <div className="font-bold text-[#111111]">Jake Donovan</div>
                <div className="text-xs text-[#9A7820]">Senior Contractor · Calgary, AB</div>
                <div className="flex gap-1 mt-1">{["Decking", "Fencing", "Pergola"].map((s) => <span key={s} className="text-[10px] bg-[#D4AF37]/10 text-[#9A7820] px-2 py-0.5 rounded-full border border-[#D4AF37]/20">{s}</span>)}</div>
              </div>
            </div>
            <div className="space-y-3">
              {[{ label: "Email", value: "jake.d@example.com" }, { label: "Phone", value: "(403) 616-1176", href: "tel:+14036161176" }, { label: "License #", value: "AB-CON-48832" }, { label: "Insurance", value: "Valid until Dec 2025" }, { label: "Service Radius", value: "25 km from SW Calgary" }].map((f) => (
                <div key={f.label} className="flex justify-between items-center p-3 rounded-xl bg-white border border-gray-200">
                  <span className="text-xs text-gray-400">{f.label}</span>
                  {f.href
                    ? <a href={f.href} className="text-sm text-[#D4AF37] font-semibold hover:underline">{f.value}</a>
                    : <span className="text-sm text-[#111111]">{f.value}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <AnimatePresence>
        {selectedJob && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 z-10" onClick={() => setSelectedJob(null)}>
            <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()} className="bg-white border border-gray-200 rounded-3xl p-6 w-full max-w-sm shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-bold text-[#111111] text-lg">{selectedJob.title}</h3>
                <button onClick={() => setSelectedJob(null)} className="text-gray-400 hover:text-gray-600 text-xl leading-none">×</button>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm"><span className="text-gray-400">Budget</span><span className="text-[#111111] font-bold">{selectedJob.budget}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Distance</span><span className="text-[#111111]">{selectedJob.distance}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Posted</span><span className="text-[#111111]">{selectedJob.posted}</span></div>
                <div className="flex gap-1.5 flex-wrap pt-1">{selectedJob.tags.map((t) => <span key={t} className="text-[10px] bg-[#D4AF37]/10 text-[#9A7820] px-2 py-0.5 rounded-full border border-[#D4AF37]/20">{t}</span>)}</div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setSelectedJob(null)} className="flex-1 py-2.5 rounded-xl text-sm border border-gray-200 text-gray-500 hover:border-gray-400 transition-all">Pass</button>
                <button onClick={() => setSelectedJob(null)} className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-[#111111] text-white hover:bg-[#333] transition-colors">Accept Job ✓</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  { q: "How fast will I receive my quote?", a: "We guarantee a detailed quote within 12 hours of receiving your project information. If you upload photos of your space, our estimator can often turn it around faster — without needing an in-person visit first." },
  { q: "Do I need to upload photos?", a: "Photos are optional but highly recommended. With clear images of your space, we can provide a more accurate estimate and in many cases skip the initial site visit entirely, saving you time." },
  { q: "Do you always need to visit in person?", a: "Not always. For many exterior, landscaping, and renovation projects, photo submissions allow us to prepare a full scope and pricing proposal remotely. Complex structural projects may require a site visit, which we arrange at no cost." },
  { q: "What areas of Calgary do you serve?", a: "We serve all Calgary neighbourhoods and surrounding areas including Airdrie, Cochrane, and Chestermere. If you're unsure whether we cover your area, just reach out — we rarely say no." },
  { q: "Is MapleLuxe licensed and insured?", a: "Yes. MapleLuxe is fully licensed and insured in Alberta. All team members carry active liability insurance and WCB coverage. We're happy to provide documentation upon request." },
  { q: "Do you handle both design and construction?", a: "Yes. We offer fully integrated design-build service. Our team handles scope, material selection, permits where required, construction, and final walkthrough. You work with one team from start to finish." },
  { q: "Do you work with landlords, investors, and property managers?", a: "Absolutely. A significant portion of our work is for investors, landlords, and property management companies who need reliable, high-quality work at consistent pricing. We offer priority scheduling for repeat clients." },
  { q: "What types of projects does MapleLuxe take on?", a: "We specialize in exterior construction (decks, fencing, pergolas), landscaping and hardscaping, interior renovations, property maintenance, deep cleaning, and full property management. If it involves your property, we likely handle it." },
  { q: "What happens after I submit the form?", a: "A senior estimator reviews your project and responds with a clear quote, scope of work, and proposed timeline — within 12 hours. There's no obligation. We only move forward when you're comfortable and ready." },
];

// ─── ARCHITECTURAL PROCESS PANEL ─────────────────────────────────────────────
// Used in the Why Us right column. Blueprint grid background, monospaced
// annotation bars, and corner-mark micro-interactions on each step card.
function ArchProcess() {
  const steps = [
    { num: "01", title: "Photo-Based Quote",     sub: "Send photos of your space. We scope and price your project — no site visit required." },
    { num: "02", title: "Fixed-Price Proposal",  sub: "Written scope, locked price, and timeline. What you approve is exactly what you pay." },
    { num: "03", title: "Licensed Build Crews",   sub: "Alberta-certified, vetted, and insured professionals assigned before work begins." },
    { num: "04", title: "Delivered & Warranted", sub: "Final walkthrough, documented warranty, and ongoing support after completion." },
  ];
  return (
    <div className="relative rounded-3xl border border-[#1E1E1E] bg-[#0D0D0D] overflow-hidden ml-blueprint">
      {/* Top annotation bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 border-b border-[#1E1E1E]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37]/60" />
          <span className="text-[10px] font-mono text-[#5A5A5A] uppercase tracking-[0.22em]">Project Process</span>
        </div>
        <span className="text-[10px] font-mono text-[#3A3A3A] uppercase tracking-[0.18em]">ML-STD-2025</span>
      </div>
      {/* Process steps */}
      <div className="relative z-10 p-5 space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.11, duration: 0.45 }}
            className="group flex items-start gap-4 p-4 rounded-xl border border-[#1A1A1A] bg-[#111111] hover:border-[#D4AF37]/30 hover:bg-[#141414] transition-all duration-300 ml-card"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg border border-[#D4AF37]/20 bg-[#D4AF37]/5 flex items-center justify-center">
              <span className="text-[11px] font-black text-[#D4AF37] tracking-wider font-mono">{step.num}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-white text-sm mb-0.5 leading-snug">{step.title}</div>
              <p className="text-xs text-[#5A5A5A] leading-relaxed">{step.sub}</p>
            </div>
            {/* Corner-mark — appears on hover */}
            <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-0.5">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M1 1h4M1 1v4"      stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round"/>
                <path d="M12 12h-4M12 12v-4" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Bottom annotation bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-3 border-t border-[#1E1E1E]">
        <span className="text-[10px] font-mono text-[#3A3A3A] uppercase tracking-[0.18em]">Calgary, AB</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/70 animate-pulse" />
          <span className="text-[10px] font-mono text-[#5A5A5A]">Accepting Projects</span>
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4 group">
        <span className="text-sm md:text-base font-semibold text-[#E0E0E0] group-hover:text-[#D4AF37] transition-colors">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}
          className="shrink-0 w-6 h-6 rounded-full border border-[#3A3A3A] flex items-center justify-center text-[#6B6B6B] text-lg leading-none group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-colors">+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="pb-5 text-sm text-[#8A8A8A] leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── RENOVATE AI ──────────────────────────────────────────────────────────────
const AI_STYLES = [
  { id: "modern", label: "Modern Minimalist", desc: "Clean lines, neutral palettes, uncluttered spaces." },
  { id: "warm", label: "Warm Contemporary", desc: "Earthy tones, natural textures, inviting atmosphere." },
  { id: "scandi", label: "Scandinavian", desc: "Light woods, whites, functional simplicity." },
  { id: "farmhouse", label: "Farmhouse", desc: "Shiplap, warm whites, vintage-inspired charm." },
  { id: "industrial", label: "Industrial Loft", desc: "Exposed brick, steel, concrete, raw materials." },
  { id: "mediterranean", label: "Mediterranean", desc: "Terracotta, arches, warm stone, rich colour." },
  { id: "midcentury", label: "Mid-Century Modern", desc: "Organic forms, bold accents, retro-forward design." },
];
const AI_ROOMS = ["Living Room", "Kitchen", "Bathroom", "Bedroom", "Exterior Facade", "Backyard/Deck", "Full House"];
const AI_PROGRESS_STEPS = [
  "Analyzing room structure…",
  "Mapping surfaces & materials…",
  "Applying design style…",
  "Generating options…",
  "Finalizing renders…",
];
const AI_RESULTS = {
  before: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=800&q=80",
  after: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  cost: {
    materials: "$8,400",
    labor: "$6,200",
    timeline: "3–4 weeks",
    total: "$14,600",
  },
};

function RenovateAI({ onClose }) {
  const [tab, setTab] = useState("transform");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [phase, setPhase] = useState("upload"); // upload | processing | results
  const [progressIdx, setProgressIdx] = useState(0);
  const [progressPct, setProgressPct] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedImage(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleGenerate = () => {
    setPhase("processing");
    setProgressIdx(0);
    setProgressPct(0);
    let idx = 0;
    let pct = 0;
    const stepDuration = 700;
    const pctStep = 100 / AI_PROGRESS_STEPS.length;
    const interval = setInterval(() => {
      idx += 1;
      pct = Math.min(100, Math.round(pctStep * idx));
      setProgressIdx(idx);
      setProgressPct(pct);
      if (idx >= AI_PROGRESS_STEPS.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("results"), 400);
      }
    }, stepDuration);
  };

  const handleReset = () => {
    setPhase("upload");
    setUploadedImage(null);
    setSelectedStyle(null);
    setSelectedRoom(null);
    setPrompt("");
    setProgressIdx(0);
    setProgressPct(0);
  };

  const tabs = [
    { id: "transform", label: "✨ Transform" },
    { id: "styles", label: "🎨 Styles" },
    { id: "history", label: "🕐 History" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0A0A0A] overflow-hidden"
    >
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#2A2A2A] bg-[#0F0F0F]">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#D4AF37] grid place-items-center shrink-0">
            <span className="text-[#111111] font-black text-sm">M</span>
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-tight">AI Room Transformer</div>
            <div className="text-[10px] text-[#6A6A6A] tracking-widest uppercase">MapleLuxe · Beta</div>
          </div>
        </div>
        {/* Tabs */}
        <div className="hidden sm:flex items-center gap-1 bg-[#181818] border border-[#2A2A2A] rounded-2xl p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                tab === t.id
                  ? "bg-[#D4AF37] text-[#0A0A0A]"
                  : "text-[#8A8A8A] hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="text-[#6A6A6A] hover:text-white text-2xl leading-none transition-colors w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#1A1A1A]"
        >
          ×
        </button>
      </div>

      {/* Mobile tabs */}
      <div className="sm:hidden flex border-b border-[#2A2A2A] shrink-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2.5 text-xs font-semibold transition-all ${
              tab === t.id
                ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                : "text-[#6A6A6A]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {/* ── TRANSFORM TAB ── */}
          {tab === "transform" && (
            <motion.div
              key="transform"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6"
            >
              {phase === "upload" && (
                <>
                  {/* Camera / Upload Section */}
                  <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] overflow-hidden">
                    <div className="bg-[#181818] px-5 py-3 border-b border-[#2A2A2A] flex items-center gap-2">
                      <span className="text-base">📸</span>
                      <span className="text-sm font-bold text-white">Upload Your Space</span>
                    </div>
                    <div className="p-5">
                      {uploadedImage ? (
                        <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
                          <img
                            src={uploadedImage}
                            alt="Uploaded room"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <button
                            onClick={() => setUploadedImage(null)}
                            className="absolute top-3 right-3 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-black/80 transition-colors"
                          >
                            ×
                          </button>
                          <div className="absolute bottom-3 left-3">
                            <span className="bg-[#D4AF37] text-[#0A0A0A] text-[10px] font-bold px-2.5 py-1 rounded-full">✓ Photo Ready</span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="rounded-xl border-2 border-dashed border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 p-8"
                          style={{ aspectRatio: "4/3" }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <div className="w-16 h-16 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                            <svg className="w-8 h-8 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-semibold text-[#E0E0E0] mb-1">Take a photo or upload one</p>
                            <p className="text-xs text-[#5A5A5A]">Interior, exterior, backyard — any space works</p>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                              className="px-4 py-2 rounded-xl text-xs font-bold text-[#0A0A0A] transition-colors"
                              style={{ background: "linear-gradient(135deg, #D4AF37, #B8902A)" }}
                            >
                              📁 Upload Photo
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                              className="px-4 py-2 rounded-xl text-xs font-semibold border border-[#2A2A2A] text-[#C0C0C0] hover:border-[#D4AF37]/40 transition-colors"
                            >
                              📷 Use Camera
                            </button>
                          </div>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  {/* Design Options Panel */}
                  <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] overflow-hidden">
                    <div className="bg-[#181818] px-5 py-3 border-b border-[#2A2A2A] flex items-center gap-2">
                      <span className="text-base">🎨</span>
                      <span className="text-sm font-bold text-white">Design Options</span>
                    </div>
                    <div className="p-5 space-y-5">
                      {/* Style presets */}
                      <div>
                        <p className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-widest mb-3">Style Preset</p>
                        <div className="flex flex-wrap gap-2">
                          {AI_STYLES.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => setSelectedStyle(s.id === selectedStyle ? null : s.id)}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                selectedStyle === s.id
                                  ? "bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37]"
                                  : "border-[#2A2A2A] text-[#8A8A8A] hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Room type */}
                      <div>
                        <p className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-widest mb-3">Room Type</p>
                        <div className="flex flex-wrap gap-2">
                          {AI_ROOMS.map((r) => (
                            <button
                              key={r}
                              onClick={() => setSelectedRoom(r === selectedRoom ? null : r)}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                selectedRoom === r
                                  ? "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/60"
                                  : "border-[#2A2A2A] text-[#8A8A8A] hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Custom prompt */}
                      <div>
                        <p className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-widest mb-2">Custom Instructions (optional)</p>
                        <textarea
                          rows={2}
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder="e.g. Keep the windows, add a kitchen island, use warm oak tones…"
                          className="w-full rounded-xl border border-[#2A2A2A] bg-[#0F0F0F] text-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] placeholder:text-[#3A3A3A] transition-colors resize-none"
                        />
                      </div>

                      {/* Generate CTA */}
                      <button
                        onClick={handleGenerate}
                        disabled={!uploadedImage}
                        className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${
                          uploadedImage
                            ? "text-[#0A0A0A] hover:opacity-90 shadow-lg shadow-[#D4AF37]/20"
                            : "bg-[#1A1A1A] text-[#4A4A4A] cursor-not-allowed"
                        }`}
                        style={uploadedImage ? { background: "linear-gradient(135deg, #D4AF37, #B8902A)" } : {}}
                      >
                        {uploadedImage ? "✨ Generate Design Options" : "Upload a photo first to generate"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {phase === "processing" && (
                <div className="rounded-2xl border border-[#2A2A2A] bg-[#111111] overflow-hidden">
                  <div className="relative" style={{ aspectRatio: "4/3" }}>
                    {uploadedImage && (
                      <img src={uploadedImage} alt="Processing" className="w-full h-full object-cover" />
                    )}
                    {/* Scan-line overlay */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <motion.div
                        animate={{ y: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-0.5 bg-[#D4AF37]/70"
                        style={{ boxShadow: "0 0 12px 4px rgba(212,175,55,0.4)" }}
                      />
                      {/* Grid overlay */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)",
                          backgroundSize: "40px 40px",
                        }}
                      />
                      {/* Corner brackets */}
                      {[
                        "top-3 left-3 border-t border-l",
                        "top-3 right-3 border-t border-r",
                        "bottom-3 left-3 border-b border-l",
                        "bottom-3 right-3 border-b border-r",
                      ].map((cls, i) => (
                        <div key={i} className={`absolute w-6 h-6 border-[#D4AF37] ${cls}`} />
                      ))}
                      {/* Dark tint */}
                      <div className="absolute inset-0 bg-[#0A0A0A]/50" />
                    </div>
                    {/* Status overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                          <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </motion.div>
                      </div>
                      <div className="text-center">
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={progressIdx}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="text-sm font-semibold text-[#D4AF37]"
                          >
                            {AI_PROGRESS_STEPS[Math.min(progressIdx, AI_PROGRESS_STEPS.length - 1)]}
                          </motion.p>
                        </AnimatePresence>
                        <p className="text-xs text-[#6A6A6A] mt-1">AI rendering in progress…</p>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full max-w-xs">
                        <div className="flex justify-between text-[10px] text-[#6A6A6A] mb-1.5">
                          <span>Progress</span>
                          <span>{progressPct}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
                          <motion.div
                            animate={{ width: `${progressPct}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ background: "linear-gradient(90deg, #D4AF37, #B8902A)" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {phase === "results" && (
                <div className="space-y-5">
                  {/* Before / After cards */}
                  <div>
                    <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-3">Before & After</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { label: "Before", img: AI_RESULTS.before },
                        { label: "After (AI Redesign)", img: AI_RESULTS.after },
                      ].map(({ label, img }) => (
                        <div key={label} className="rounded-2xl border border-[#2A2A2A] overflow-hidden bg-[#111111]">
                          <div className="relative" style={{ aspectRatio: "4/3" }}>
                            <img src={img} alt={label} className="w-full h-full object-cover" />
                            <div className="absolute top-3 left-3">
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${label === "Before" ? "bg-black/70 text-[#8A8A8A]" : "bg-[#D4AF37] text-[#0A0A0A]"}`}>
                                {label}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cost estimate */}
                  <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-5">
                    <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-4">AI Cost Estimate</p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {[
                        { label: "Materials", value: AI_RESULTS.cost.materials },
                        { label: "Labour", value: AI_RESULTS.cost.labor },
                        { label: "Timeline", value: AI_RESULTS.cost.timeline },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-center">
                          <div className="text-lg font-extrabold text-white">{value}</div>
                          <div className="text-[10px] text-[#8A8A8A] mt-0.5">{label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#D4AF37]/20 pt-4 flex items-center justify-between">
                      <span className="text-sm text-[#8A8A8A]">Estimated Total</span>
                      <span className="text-xl font-black text-[#D4AF37]">{AI_RESULTS.cost.total}</span>
                    </div>
                    <p className="text-[10px] text-[#5A5A5A] mt-2">* AI estimate only — get a free accurate quote from MapleLuxe.</p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="#contact"
                      onClick={onClose}
                      className="flex-1 py-3.5 rounded-xl text-sm font-bold text-center text-[#0A0A0A] transition-all hover:opacity-90"
                      style={{ background: "linear-gradient(135deg, #D4AF37, #B8902A)" }}
                    >
                      Start Your Free Quote →
                    </a>
                    <button
                      onClick={handleReset}
                      className="flex-1 py-3.5 rounded-xl text-sm font-semibold border border-[#2A2A2A] text-[#C0C0C0] hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-all"
                    >
                      🔄 Try Another Style
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── STYLES TAB ── */}
          {tab === "styles" && (
            <motion.div
              key="styles"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-5xl mx-auto px-4 sm:px-6 py-6"
            >
              <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest mb-5">Browse Design Styles</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {AI_STYLES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => { setSelectedStyle(s.id); setTab("transform"); }}
                    className="text-left rounded-2xl border border-[#2A2A2A] bg-[#111111] hover:border-[#D4AF37]/40 hover:bg-[#141414] p-5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-3 group-hover:bg-[#D4AF37]/20 transition-colors">
                      <span className="text-[#D4AF37] text-lg">✦</span>
                    </div>
                    <div className="font-bold text-sm text-white mb-1">{s.label}</div>
                    <p className="text-xs text-[#6A6A6A] leading-relaxed">{s.desc}</p>
                    <span className="text-[10px] text-[#D4AF37] mt-3 block font-semibold group-hover:text-[#C9A530] transition-colors">Use This Style →</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── HISTORY TAB ── */}
          {tab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex flex-col items-center justify-center min-h-[40vh] gap-4 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#181818] border border-[#2A2A2A] flex items-center justify-center">
                <span className="text-2xl">🕐</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-1">No saved transformations yet</p>
                <p className="text-xs text-[#6A6A6A]">Your AI redesigns will appear here once you generate them.</p>
              </div>
              <button
                onClick={() => setTab("transform")}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#0A0A0A] transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #D4AF37, #B8902A)" }}
              >
                ✨ Start Your First Transformation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── MAIN SITE ─────────────────────────────────────────────────────────────────
export default function MapleLuxeSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showDemo, setShowDemo] = useState(false);
  const [showSubDash, setShowSubDash] = useState(false);
  const [showRenovateAI, setShowRenovateAI] = useState(false);
  // Hero background transition: before → after, fires once after 2.5s
  const [heroAfterVisible, setHeroAfterVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroAfterVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await fetch("https://formsubmit.co/ajax/mapleluxebookings@gmail.com", { method: "POST", body: formData });
      setFormStatus("success");
      e.target.reset();
      setUploadedFiles([]);
      setTimeout(() => setFormStatus(null), 6000);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  const handleFileChange = (e) => setUploadedFiles(Array.from(e.target.files));

  const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

  const services = [
    {
      category: "Exterior Construction",
      icon: "🏗️",
      items: [
        { title: "Custom Deck Building", desc: "Composite and cedar decks engineered for Calgary's climate — built to last decades.", img: "/images/compdeck.png", Icon: FenceIcon },
        { title: "Fencing & Gates", desc: "Privacy, cedar, composite, and ornamental fencing installed with precision and care.", img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=800&q=80", Icon: FenceIcon },
        { title: "Pergolas & Outdoor Structures", desc: "Custom-built pergolas, gazebos, and covered outdoor living areas.", img: "/images/pergola.png", Icon: MegaphoneIcon },
        { title: "Framing & Structural Work", desc: "Residential framing, additions, and structural builds done right from the ground up.", img: "/images/framing-construction.jpg", Icon: WrenchIcon },
      ],
    },
    {
      category: "Landscaping & Outdoor Living",
      icon: "🌿",
      items: [
        { title: "Landscape Design & Hardscaping", desc: "Stone patios, retaining walls, pathways, and seasonal planting plans.", img: "/images/landscape.png", Icon: LeafIcon },
        { title: "Outdoor Kitchens & Living Spaces", desc: "Fully designed outdoor entertaining areas — built for Alberta summers.", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80", Icon: SparkleIcon },
      ],
    },
    {
      category: "Property Care & Maintenance",
      icon: "🔧",
      items: [
        { title: "Interior & Kitchen Renovation", desc: "Full kitchen and interior renovations — cabinets, flooring, tile, and finishes done right.", img: "/images/kitchen.png", Icon: WrenchIcon },
        { title: "Professional Cleaning & Turnover", desc: "Move-in/out cleans, deep cleans, and same-day turnovers for rental properties.", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80", Icon: SparkleIcon },
      ],
    },
    {
      category: "Property Management",
      icon: "🏠",
      items: [
        { title: "Full Property Management", desc: "Tenant relations, inspections, rent collection, financials, and compliance.", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80", Icon: KeysIcon },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] relative">
      <AnimatePresence>
        {showDemo && <DemoFlow onClose={() => setShowDemo(false)} />}
        {showSubDash && <SubcontractorDashboard onClose={() => setShowSubDash(false)} />}
        {showRenovateAI && <RenovateAI onClose={() => setShowRenovateAI(false)} />}
      </AnimatePresence>

      {/* Sticky Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#0A0A0A]/95 backdrop-blur border-t border-[#D4AF37]/20 px-4 py-3 flex gap-3">
        <a href="tel:+14036161176" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] font-semibold text-sm hover:border-[#D4AF37]/60 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now
        </a>
        <button onClick={() => setShowRenovateAI(true)} className="flex items-center justify-center w-12 py-3 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5 transition-colors" aria-label="AI Room Preview">
          📸
        </button>
        <a href="#contact" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#D4AF37] text-[#0A0A0A] font-bold text-sm hover:bg-[#C9A530] transition-colors">
          Get Free Quote
        </a>
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button onClick={scrollToTop} aria-label="Back to top"
          className="fixed bottom-24 right-6 z-50 md:bottom-8 bg-[#111111] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Floating desktop CTA */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <a href="#contact" className="inline-flex items-center justify-center px-5 py-3 text-sm font-bold text-[#111111] bg-[#D4AF37] rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-[#D4AF37]/40">
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Free Quote
        </a>
      </div>

      {/* ── HEADER — glassmorphism navbar ── */}
      <header className="sticky top-0 z-40 border-b border-white/6"
        style={{
          background: "rgba(10,10,10,0.55)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          boxShadow: "0 1px 0 rgba(212,175,55,0.10), 0 4px 24px rgba(0,0,0,0.35)",
        }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-[#D4AF37] grid place-items-center shadow-lg shadow-[#D4AF37]/20">
                <span className="text-[#0A0A0A] font-black text-xl">M</span>
              </div>
              <div className="leading-tight">
                <div className="text-xl font-extrabold tracking-tight text-white">MapleLuxe</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/60">Canada's Premium Property Team</div>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#services" className="text-[#A0A0A0] hover:text-white transition font-medium">Services</a>
              <a href="#why" className="text-[#A0A0A0] hover:text-white transition font-medium">Why Us</a>
              <a href="#projects" className="text-[#A0A0A0] hover:text-white transition font-medium">Projects</a>
              <a href="#faq" className="text-[#A0A0A0] hover:text-white transition font-medium">FAQ</a>
              <a href="#contact" className="text-[#A0A0A0] hover:text-white transition font-medium">Contact</a>
              <button onClick={() => setShowSubDash(true)} className="text-[#D4AF37]/70 hover:text-[#D4AF37] transition text-xs border border-[#D4AF37]/25 px-2 py-1 rounded-lg hover:border-[#D4AF37]/60">
                Sub Portal
              </button>
            </nav>
            <div className="flex items-center gap-3">
              <a href="#contact" className="hidden sm:inline-flex items-center rounded-xl px-4 py-2 text-sm font-bold bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#C9A530] transition-colors">
                Free Quote
              </a>
              <button className="md:hidden p-2 rounded-lg hover:bg-white/5 text-[#A0A0A0]" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </div>
          {menuOpen && (
            <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 flex flex-col gap-1 border-t border-[#D4AF37]/15 mt-2">
              {[["#services", "Services"], ["#why", "Why Us"], ["#projects", "Projects"], ["#faq", "FAQ"], ["#contact", "Contact"]].map(([href, label]) => (
                <a key={href} href={href} className="py-2.5 px-2 text-[#A0A0A0] hover:text-white rounded-lg font-medium" onClick={() => setMenuOpen(false)}>{label}</a>
              ))}
              <button onClick={() => { setMenuOpen(false); setShowSubDash(true); }} className="py-2.5 px-2 text-[#D4AF37]/60 hover:text-[#D4AF37] text-left rounded-lg">Subcontractor Portal</button>
            </motion.nav>
          )}
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Hero background: fades from beforehallway → afterhallway once after 2.5s */}
        {/* Preload after image so it's ready before the transition fires */}
        <link rel="preload" as="image" href="/images/afterhallway.png" />
        {/* Base layer — before image, always underneath */}
        <img src="/images/beforehallway.jpg" alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_30%]" />
        {/* After layer — fades in on top, stays permanently */}
        <img src="/images/afterhallway.png" alt="MapleLuxe hero"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_30%]"
          style={{ opacity: heroAfterVisible ? 1 : 0, transition: "opacity 1.8s ease" }} />
        {/* Layered dark overlays for depth and readability */}
        <div className="absolute inset-0 bg-[#0A0A0A]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-transparent" />
        {/* Floating gold particles layer */}
        <HeroBg />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 md:py-40 relative z-10 w-full">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-7 max-w-3xl">

            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-xs font-semibold text-[#D4AF37] tracking-wide">Currently Accepting Projects · Quotes in Under 12 Hours</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
              <span className="text-white">Canada's</span>
              <br />
              <span className="text-[#D4AF37]">Premier Property</span>
              <br />
              <span className="text-white">& Renovation Team.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-[#C0C0C0] leading-relaxed max-w-xl">
              One trusted team for decks, fencing, landscaping, renovations, maintenance, and property management — built for those who expect more.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-2">
              {/* Primary CTA — gold fill with white shimmer sweep on hover */}
              <a href="#contact" className="ml-btn-primary inline-flex items-center justify-center px-7 py-3.5 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-xl hover:bg-[#C9A530] transition-all text-sm shadow-lg shadow-[#D4AF37]/25">
                <span className="ml-sweep-light" aria-hidden="true" />
                Start Your Project →
              </a>
              {/* Secondary CTA — warm gold outlined with gold shimmer sweep */}
              <button onClick={() => setShowDemo(true)} className="ml-btn-outline inline-flex items-center justify-center px-7 py-3.5 border border-[#D4AF37]/35 text-[#D4AF37] rounded-xl hover:border-[#D4AF37]/65 hover:bg-[#D4AF37]/5 transition-all text-sm backdrop-blur-sm">
                <span className="ml-sweep" aria-hidden="true" />
                ▶ See How It Works
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="pt-1">
              <button onClick={() => setShowRenovateAI(true)} className="inline-flex items-center gap-2 text-xs text-[#8A8A8A] hover:text-[#D4AF37] transition-colors group">
                <span className="text-sm">📸</span>
                <span className="group-hover:underline underline-offset-2">AI Room Preview — visualize your renovation instantly</span>
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {["✓ Licensed & Insured in Alberta", "✓ Quotes Under 12 Hours", "✓ No Visit Required"].map((t) => (
                <span key={t} className="text-xs text-[#A0A0A0] font-medium">{t}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* KPI cards */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="mt-20 grid grid-cols-3 gap-4 md:gap-5 max-w-xl">
            {[
              { kpi: "12 hrs", label: "Quote guarantee" },
              { kpi: "24/7", label: "Emergency response" },
              { kpi: "4.9★", label: "Client rating" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="ml-card rounded-2xl bg-white/5 backdrop-blur-sm border border-[#D4AF37]/15 p-4 hover:border-[#D4AF37]/35 transition-all">
                <div className="text-2xl font-extrabold text-[#D4AF37]">{item.kpi}</div>
                <div className="text-xs text-[#8A8A8A] mt-1 leading-snug">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SITE NAV CARDS ── */}
      {/* Quick-navigation cards — same ml-card glow system, scroll to section on click */}
      <section className="py-12 bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: "🏗️",
                label: "Services",
                headline: "What We Build",
                sub: "Decks, fencing, landscaping, renovations & more.",
                cta: "View Services",
                href: "#services",
              },
              {
                icon: "📸",
                label: "Recent Work",
                headline: "Real Projects",
                sub: "See completed builds across Calgary.",
                cta: "View Projects",
                href: "#projects",
                onAI: true,
              },
              {
                icon: "💬",
                label: "Free Quote",
                headline: "Start Today",
                sub: "Send photos. Quote in under 12 hours.",
                cta: "Get Quote",
                href: "#contact",
              },
              {
                icon: "🔨",
                label: "Subcontractors",
                headline: "Join Our Network.",
                sub: "Matched to local jobs. Transparent pay.",
                cta: "Apply Now",
                onClick: true,
              },
            ].map((card, i) => (
              <motion.div key={i} variants={fadeUp}>
                {card.onClick ? (
                  <button onClick={() => setShowSubDash(true)} className="ml-card w-full text-left rounded-2xl bg-[#111111] border border-[#1E1E1E] hover:border-[#D4AF37]/30 p-5 flex flex-col gap-3 transition-all duration-300 group">
                    <div className="text-2xl">{card.icon}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">{card.label}</div>
                    <div className="font-bold text-white text-sm leading-snug">{card.headline}</div>
                    <p className="text-xs text-[#5A5A5A] leading-relaxed flex-1">{card.sub}</p>
                    <span className="text-xs font-semibold text-[#D4AF37] group-hover:text-[#C9A530] transition-colors">{card.cta} →</span>
                  </button>
                ) : card.onAI ? (
                  <div className="ml-card rounded-2xl bg-[#111111] border border-[#1E1E1E] hover:border-[#D4AF37]/30 p-5 flex flex-col gap-3 transition-all duration-300 group">
                    <div className="text-2xl">{card.icon}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">{card.label}</div>
                    <div className="font-bold text-white text-sm leading-snug">{card.headline}</div>
                    <p className="text-xs text-[#5A5A5A] leading-relaxed flex-1">{card.sub}</p>
                    <a href={card.href} className="text-xs font-semibold text-[#D4AF37] group-hover:text-[#C9A530] transition-colors">{card.cta} →</a>
                    <button onClick={() => setShowRenovateAI(true)} className="text-left text-[10px] text-[#6A6A6A] hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                      <span>✨</span><span className="hover:underline underline-offset-2">Try AI Redesign</span>
                    </button>
                  </div>
                ) : (
                  <a href={card.href} className="ml-card block rounded-2xl bg-[#111111] border border-[#1E1E1E] hover:border-[#D4AF37]/30 p-5 flex flex-col gap-3 transition-all duration-300 group">
                    <div className="text-2xl">{card.icon}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">{card.label}</div>
                    <div className="font-bold text-white text-sm leading-snug">{card.headline}</div>
                    <p className="text-xs text-[#5A5A5A] leading-relaxed flex-1">{card.sub}</p>
                    <span className="text-xs font-semibold text-[#D4AF37] group-hover:text-[#C9A530] transition-colors">{card.cta} →</span>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="py-20 bg-[#0F0F0F] border-b border-[#D4AF37]/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-12 text-center">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-white">Who We Work With</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-[#8A8A8A] max-w-xl mx-auto">Three types of clients. One standard of service.</motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "🏡",
                label: "Homeowners",
                headline: "Your vision. Our craft.",
                points: ["Decks, fencing & outdoor living", "Interior & kitchen renovation", "Fixed-price proposals, always"],
                cta: "Free Quote",
                href: "#contact",
                aiCta: true,
              },
              {
                icon: "🏢",
                label: "Property Managers",
                headline: "One partner. Every property.",
                points: ["Maintenance contracts & turnovers", "Airbnb-ready cleaning & prep", "Emergency response, 24/7"],
                cta: "Talk to Us",
                href: "#contact",
                featured: true,
              },
              {
                icon: "🔨",
                label: "Subcontractors",
                headline: "Join our network.",
                points: ["Matched to local jobs by skill", "Transparent pay & fast invoicing", "Access the subcontractor portal"],
                cta: "Apply Now",
                onClick: true,
              },
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`ml-card rounded-2xl p-7 flex flex-col gap-4 transition-all border ${card.featured ? "bg-[#D4AF37]/5 border-[#D4AF37]/40" : "bg-[#111111] border-[#1E1E1E] hover:border-[#D4AF37]/28"}`}>
                <div className="text-3xl">{card.icon}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">{card.label}</div>
                <div className="font-bold text-xl text-white leading-snug">{card.headline}</div>
                <ul className="space-y-2 flex-1">
                  {card.points.map((p, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-[#8A8A8A]">
                      <span className="w-1 h-1 rounded-full bg-[#D4AF37] shrink-0" />{p}
                    </li>
                  ))}
                </ul>
                {card.onClick
                  ? <button onClick={() => setShowSubDash(true)} className="mt-2 self-start text-sm font-semibold text-[#D4AF37] hover:text-[#C9A530] transition">{card.cta} →</button>
                  : (
                    <div className="flex flex-col gap-2 mt-2">
                      <a href={card.href} className="self-start text-sm font-semibold text-[#D4AF37] hover:text-[#C9A530] transition">{card.cta} →</a>
                      {card.aiCta && (
                        <button onClick={() => setShowRenovateAI(true)} className="self-start text-xs text-[#6A6A6A] hover:text-[#D4AF37] transition flex items-center gap-1">
                          <span>📸</span><span className="hover:underline underline-offset-2">AI Room Preview</span>
                        </button>
                      )}
                    </div>
                  )
                }
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-14 text-center">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Everything Your Property Needs.<br /><span className="text-[#D4AF37]">One Team For Everything.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-2 text-sm text-[#6A6A6A] tracking-wide">
              Think about it, This Keeps Luxury Quality Through All Services
            </motion.p>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl mx-auto text-[#8A8A8A]">
              From first build to long-term management, MapleLuxe handles every stage of your property — with the same licensed, accountable team throughout.
            </motion.p>
          </motion.div>

          <div className="space-y-12">
            {services.map((group, gi) => (
              <div key={gi}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl">{group.icon}</span>
                  <h3 className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">{group.category}</h3>
                  <div className="flex-1 h-px bg-[#2A2A2A]" />
                </div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
                  className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((s, i) => {
                    const Icon = s.Icon;
                    return (
                      <motion.div key={i} variants={fadeUp}
                        className="ml-card group rounded-2xl bg-[#111111] border border-[#1E1E1E] hover:border-[#D4AF37]/30 hover:bg-[#141414] transition-all overflow-hidden">
                        <div className="relative h-36 overflow-hidden">
                          <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-9 w-9 rounded-lg grid place-items-center bg-[#D4AF37]/10 border border-[#D4AF37]/20 shrink-0">
                              <div className="text-[#D4AF37]"><Icon /></div>
                            </div>
                            <div className="font-bold text-base text-white">{s.title}</div>
                          </div>
                          <p className="text-sm text-[#8A8A8A] leading-relaxed">{s.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <a href="#contact" className="ml-btn-primary inline-flex items-center px-7 py-3.5 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-xl hover:bg-[#C9A530] transition-colors shadow-lg shadow-[#D4AF37]/20 text-sm">
              <span className="ml-sweep-light" aria-hidden="true" />
              Start Your Free Quote →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CHAT DEMO SECTION ── */}
      <section className="py-20 bg-[#0F0F0F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/25 rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-xs font-semibold text-[#D4AF37] tracking-wide">How Quoting Works</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-white mb-4">
                Send a photo.<br /><span className="text-[#D4AF37]">Get a quote. SIMPLE.</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#8A8A8A] mb-2 leading-relaxed">
                Watch a real client conversation — from first message to a full price range, scope, and next steps in one exchange.
              </motion.p>
              <motion.p variants={fadeUp} className="text-xs text-[#6B6B6B] mb-7">
                No phone calls. No waiting days. Just clear answers, fast.
              </motion.p>
              <motion.ul variants={stagger} className="space-y-3 mb-8">
                {[
                  "Upload photos — skip the in-person visit",
                  "Get a price range and scope the same day",
                  "Receive a full proposal within 12 hours",
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="flex items-center gap-3 text-sm text-[#C0C0C0]">
                    <span className="w-5 h-5 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0A0A0A] text-xs font-bold shrink-0">✓</span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp} className="flex gap-3">
                <a href="#contact" className="inline-flex items-center px-6 py-3 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-xl hover:bg-[#C9A530] transition-colors text-sm">
                  Get My Free Quote
                </a>
                <button onClick={() => setShowDemo(true)} className="inline-flex items-center px-5 py-3 border border-[#3A3A3A] text-[#C0C0C0] rounded-xl hover:border-[#D4AF37]/40 transition-colors text-sm">
                  ▶ Full Demo
                </button>
              </motion.div>
            </motion.div>
            <ChatDemo />
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center mb-8">
            <motion.h2 variants={fadeUp} className="text-3xl font-black text-white">The MapleLuxe Difference</motion.h2>
            <motion.p variants={fadeUp} className="mt-2 text-[#6B6B6B]">Drag the slider to see a real project transformation</motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <BeforeAfterImg />
          </motion.div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why" className="py-20 bg-[#0F0F0F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
                Why Canada's Top Property Owners <span className="text-[#D4AF37]">Choose MapleLuxe</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-[#8A8A8A] mb-8 text-sm leading-relaxed">
                We built MapleLuxe around one principle: no contractor chaos. Clear communication, licensed teams, real accountability — from quote to completion.
              </motion.p>
              <ul className="space-y-5">
                {[
                  { h: "Fixed-Price Proposals. No Surprises.", p: "Every project comes with a written scope, price, and timeline before a single nail goes in. What you approve is what you pay." },
                  { h: "You Always Know What's Happening", p: "Progress updates at every stage. No chasing. No wondering. A dedicated contact is assigned from day one." },
                  { h: "12-Hour Quote Response — Guaranteed", p: "Send photos and receive a detailed quote within 12 hours, not days. Many are delivered the same evening." },
                  { h: "Fully Licensed, Insured & Accountable", p: "Active Alberta licences, liability insurance, and WCB coverage. Every crew member vetted." },
                ].map((item, i) => (
                  <motion.li key={i} variants={fadeUp} className="grid grid-cols-[auto,1fr] gap-4">
                    <div className="mt-2 h-2 w-2 rounded-full bg-[#D4AF37] shrink-0" />
                    <div>
                      <div className="font-semibold text-white mb-0.5">{item.h}</div>
                      <p className="text-sm text-[#8A8A8A] leading-relaxed">{item.p}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            {/* Architectural process panel — layered cards with blueprint grid */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <ArchProcess />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST INDICATORS ── */}
      <section className="py-14 bg-[#111111] border-y border-[#D4AF37]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { icon: "✅", title: "Licensed & Insured", subtitle: "Alberta Certified" },
              { icon: "⭐", title: "4.9 / 5.0", subtitle: "Average Client Rating" },
              { icon: "🛡️", title: "Warranty Backed", subtitle: "On All Completed Work" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold text-lg text-white">{item.title}</div>
                <div className="text-sm text-[#6B6B6B] mt-0.5">{item.subtitle}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/25">
              <div className="h-2 w-2 bg-[#D4AF37] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#D4AF37]">Currently accepting new projects in Calgary & surrounding area</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-20 bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-12 text-center">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-white">Real Projects. <span className="text-[#D4AF37]">Real Results.</span></motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl mx-auto text-[#8A8A8A]">
              Every project starts with a photo and a conversation. Here's what property owners across Canada have trusted us to build.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "500 sqft Composite Deck — Springbank Hill",
                desc: "Built for a growing family in SW Calgary. Quote delivered within 8 hours of photos. Permit, framing, and completion in 16 days.",
                tag: "Exterior Build",
                img: "/images/compdeck.png",
              },
              {
                title: "Airbnb Rental Turnover — Beltline Condo",
                desc: "Same-day turnover between guests — deep clean, linen swap, restocking, and a full walkthrough. Host maintained a 4.9-star rating throughout.",
                imgAlt: "/images/airbnb.png",
                imgDuration: 2500,
                imgAltDuration: 6000,
                tag: "Premium Property Care",
                tagSub: "Airbnb Cleaning Contracts",
                img: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Outdoor Living Upgrade — Tuscany",
                desc: "Pergola, built-in seating, and stone patio designed from a single site visit. Full project delivered under budget and on schedule.",
                tag: "Landscaping & Build",
                img: "/images/landscape.png",
              },
            ].map((project, i) => (
              <motion.div key={i} variants={fadeUp} className="ml-card rounded-3xl overflow-hidden border border-[#1E1E1E] bg-[#111111] hover:border-[#D4AF37]/28 group transition-all">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ProjectCardImage project={project} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <div className="bg-[#D4AF37] text-[#0A0A0A] px-2.5 py-1 rounded-full inline-block">
                      <div className="text-[10px] font-bold leading-tight">{project.tag}</div>
                      {project.tagSub && <div className="text-[9px] font-medium leading-tight opacity-80">{project.tagSub}</div>}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="font-semibold text-white mb-1.5">{project.title}</div>
                  <p className="text-sm text-[#8A8A8A] leading-relaxed">{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-20 bg-[#0F0F0F]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-12 text-center">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-white">What Clients Say</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl mx-auto text-[#8A8A8A]">
              From first-time homeowners to multi-property investors — here's what working with MapleLuxe actually looks like.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 md:grid-cols-3">
            {[
              { q: "I sent photos of my backyard on a Tuesday evening and had a detailed quote with pricing options by Wednesday morning. The deck was finished in two weeks — exactly what they proposed. No surprises.", a: "Rachel L.", role: "Homeowner · Signal Hill", rating: 5 },
              { q: "As a landlord with four properties, I needed a team I could actually rely on. MapleLuxe handles all my maintenance calls and turnovers. Response time is always fast, work is always clean.", a: "Michael R.", role: "Property Investor · Airdrie", rating: 5 },
              { q: "We had a pergola and outdoor kitchen installed. The crew was professional, showed up when they said they would, and finished three days ahead of schedule. Fixed-price quote meant no budget stress.", a: "Amanda K.", role: "Homeowner · Aspen Woods", rating: 5 },
            ].map((t, i) => (
              <motion.div key={i} variants={fadeUp} className="ml-card rounded-2xl bg-[#111111] border border-[#1E1E1E] p-6 hover:border-[#D4AF37]/25 transition-all flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => <span key={j} className="text-[#D4AF37] text-sm">★</span>)}
                </div>
                <p className="text-sm text-[#C0C0C0] italic leading-relaxed flex-1">"{t.q}"</p>
                <div className="mt-5 pt-4 border-t border-[#2A2A2A]">
                  <div className="font-semibold text-white text-sm">{t.a}</div>
                  <div className="text-xs text-[#6B6B6B] mt-0.5">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-16 bg-[#111111]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-2xl md:text-3xl font-black tracking-tight text-white">Ready to get started?</div>
              <p className="text-sm text-gray-400 mt-1">Send us your project — get a clear quote, scope, and timeline within 12 hours.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => setShowDemo(true)} className="ml-btn-outline inline-flex items-center rounded-2xl px-5 py-3 text-sm font-semibold border border-[#D4AF37]/35 text-[#D4AF37] hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/5 transition-all">
                <span className="ml-sweep" aria-hidden="true" />
                ▶ See Demo
              </button>
              <a href="#contact" className="ml-btn-primary inline-flex items-center rounded-2xl px-6 py-3 text-sm font-bold bg-[#D4AF37] text-[#111111] hover:bg-[#C9A530] transition-colors">
                <span className="ml-sweep-light" aria-hidden="true" />
                Get My Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 bg-[#0A0A0A]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-12 text-center">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-white">Common Questions</motion.h2>
            <motion.p variants={fadeUp} className="mt-3 text-[#8A8A8A]">Everything you need to know before reaching out.</motion.p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-2xl border border-[#2A2A2A] bg-[#111111] px-6 md:px-8 divide-y divide-[#2A2A2A]">
            {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 bg-[#0F0F0F]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mb-10 text-center">
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Start Your Free Quote
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-3 max-w-xl mx-auto text-[#8A8A8A]">
              Tell us about your project and upload a few photos. We'll send a detailed quote, scope of work, and timeline within 12 hours — no obligation.
            </motion.p>
          </motion.div>

          {/* Trust strip */}
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { icon: "✅", label: "Licensed & Insured in Alberta" },
              { icon: "⚡", label: "Free Quote in Under 12 Hours" },
              { icon: "📸", label: "Upload Photos for Faster Estimates" },
              { icon: "📋", label: "Clear Scope, Timeline & Pricing" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#111111] border border-[#2A2A2A]">
                <span className="text-lg shrink-0">{t.icon}</span>
                <span className="text-xs text-[#D4AF37] font-medium leading-tight">{t.label}</span>
              </div>
            ))}
          </motion.div>

          {formStatus === "success" && (
            <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 text-green-400 rounded-xl text-sm">
              ✓ Your project has been submitted. A senior estimator will review and respond with a full quote within 12 hours.
            </div>
          )}
          {formStatus === "error" && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 text-red-400 rounded-xl text-sm">
              ✗ Something went wrong. Please try again or call us at (403) 616-1176.
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input type="hidden" name="_subject" value="New Quote Request from MapleLuxe Website" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            <div className="grid gap-1.5">
              <label className="text-sm font-semibold text-[#C0C0C0]">Full name *</label>
              <input required type="text" name="name" placeholder="Jane Arnold"
                className="rounded-xl border border-[#2A2A2A] bg-[#111111] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] placeholder:text-[#4A4A4A] transition-colors" />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-semibold text-[#C0C0C0]">Email *</label>
              <input required type="email" name="email" placeholder="jane@example.com"
                className="rounded-xl border border-[#2A2A2A] bg-[#111111] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] placeholder:text-[#4A4A4A] transition-colors" />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-semibold text-[#C0C0C0]">Phone</label>
              <input type="tel" name="phone" placeholder="(403) 616-1176"
                className="rounded-xl border border-[#2A2A2A] bg-[#111111] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] placeholder:text-[#4A4A4A] transition-colors" />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-semibold text-[#C0C0C0]">Project Type</label>
              <select name="service" className="rounded-xl border border-[#2A2A2A] bg-[#111111] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] transition-colors">
                <optgroup label="Exterior Construction">
                  <option>Custom Deck Building</option>
                  <option>Premium Fence Installation</option>
                  <option>Pergola & Outdoor Structure</option>
                  <option>Full Home Renovation</option>
                </optgroup>
                <optgroup label="Landscaping & Outdoor Living">
                  <option>Landscape Design & Hardscaping</option>
                  <option>Outdoor Kitchen & Living Space</option>
                  <option>Stone Patios & Walkways</option>
                </optgroup>
                <optgroup label="Property Care">
                  <option>Preventative Maintenance Program</option>
                  <option>Emergency Repair</option>
                  <option>Deep Cleaning Service</option>
                  <option>Move In/Out Cleaning</option>
                </optgroup>
                <optgroup label="Property Management">
                  <option>Full Property Management</option>
                  <option>Tenant Placement</option>
                </optgroup>
                <option>Custom Project — I'll Describe Below</option>
              </select>
            </div>
            <div className="md:col-span-2 grid gap-1.5">
              <label className="text-sm font-semibold text-[#C0C0C0]">Project Details</label>
              <textarea rows={3} name="message"
                placeholder="Tell us what you're looking to do — location, size, materials, timeline, budget range. The more detail, the more accurate your quote."
                className="rounded-xl border border-[#2A2A2A] bg-[#111111] text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37] placeholder:text-[#4A4A4A] transition-colors" />
            </div>

            {/* Photo upload */}
            <div className="md:col-span-2 border border-[#2A2A2A] rounded-2xl overflow-hidden">
              <div className="bg-[#181818] px-5 py-4 border-b border-[#2A2A2A] flex items-center gap-3">
                <span className="text-xl">📸</span>
                <div>
                  <p className="text-sm font-bold text-white">Upload Photos — Get a Faster, More Accurate Quote</p>
                  <p className="text-xs text-[#6A6A6A] mt-0.5">Many projects can be scoped and priced from photos alone — no site visit needed to get started</p>
                </div>
              </div>
              <div className="p-5 bg-[#111111]">
                {/* AI banner */}
                <button onClick={() => setShowRenovateAI(true)} className="w-full mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#D4AF37]/8 border border-[#D4AF37]/25 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/12 transition-all group text-left">
                  <span className="text-lg shrink-0">✨</span>
                  <p className="text-xs text-[#C0C0C0] group-hover:text-white transition-colors">
                    Want to <span className="text-[#D4AF37] font-semibold">visualize your renovation first?</span> Try our AI Room Transformer
                  </p>
                  <span className="ml-auto text-[10px] text-[#D4AF37] font-bold whitespace-nowrap shrink-0">Try It →</span>
                </button>
                <input type="file" id="media-upload" name="media" multiple accept="image/*,video/*,.pdf" className="hidden" onChange={handleFileChange} />
                <label htmlFor="media-upload" className="block cursor-pointer">
                  <div className="border-2 border-dashed border-[#2A2A2A] rounded-xl p-6 text-center hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all group">
                    <div className="w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#D4AF37]/10 transition-colors">
                      <svg className="w-6 h-6 text-[#5A5A5A] group-hover:text-[#D4AF37] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-[#E0E0E0] mb-1">Click to add photos or videos</p>
                    <p className="text-xs text-[#6A6A6A]">Exterior shots, current condition, measurements, or inspiration images</p>
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 p-3 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/25 text-left">
                        <p className="text-xs font-semibold text-[#D4AF37] mb-2">✓ {uploadedFiles.length} file{uploadedFiles.length > 1 ? "s" : ""} ready to submit</p>
                        <div className="flex flex-wrap gap-1.5">
                          {uploadedFiles.map((file, idx) => (
                            <span key={idx} className="bg-[#1A1A1A] px-2.5 py-1 rounded-full text-xs text-[#D4AF37] border border-[#D4AF37]/25">
                              {file.name.length > 22 ? file.name.substring(0, 22) + "…" : file.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </label>
                <p className="text-xs text-[#5A5A5A] mt-3 text-center">⚡ Photos = quote in as little as 4 hours · No photos = still under 12 hours</p>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
              <p className="text-xs text-[#5A5A5A] flex items-center gap-2">
                <svg className="w-4 h-4 text-[#3A3A3A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Your information is private and never shared.
              </p>
              <button type="submit"
                className="ml-btn-primary w-full sm:w-auto inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-bold bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#B8902A] transition-colors shadow-lg shadow-[#D4AF37]/20">
                <span className="ml-sweep-light" aria-hidden="true" />
                Send My Project — Get Quote in 12 Hours
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111111] py-10 mb-16 md:mb-0">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-[#D4AF37] grid place-items-center">
                <span className="text-[#111111] font-black text-lg">M</span>
              </div>
              <div>
                <div className="font-bold text-white">MapleLuxe</div>
                <div className="text-xs text-gray-500">Calgary's Premium Property Team</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
              <a href="#services" className="hover:text-white transition">Services</a>
              <a href="#why" className="hover:text-white transition">Why Us</a>
              <a href="#projects" className="hover:text-white transition">Projects</a>
              <a href="#faq" className="hover:text-white transition">FAQ</a>
              <a href="#contact" className="hover:text-white transition">Contact</a>
              <button onClick={() => setShowSubDash(true)} className="hover:text-white transition">Subcontractor Portal</button>
            </div>
            <div className="text-xs text-gray-600">© 2025 MapleLuxe. Licensed & Insured.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
function FenceIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M7 3l2 2-2 2-2-2 2-2zm5 0l2 2-2 2-2-2 2-2zm5 0l2 2-2 2-2-2 2-2zM5 9h14v2H5V9zm-2 4h18v8H3v-8zm4 0v8m5-8v8m5-8v8" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M5 13c5-1 9-5 14-9-2 6-6 10-12 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
function KeysIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
      <circle cx="8" cy="8" r="3" fill="currentColor" />
      <path d="M8 11l7 7 3-3 2 2 2-2-2-2 2-2-2-2-2 2-2-2-3 3-4-3z" fill="currentColor" />
    </svg>
  );
}
function WrenchIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
function MegaphoneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M3 11l19-9-9 19-2-8-8-2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}
