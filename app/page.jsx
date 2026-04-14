"use client";

import { useState, useEffect, useRef } from "react";
// ... the rest of your code

const NAV_LINKS = ["Product Lab", "Services", "Process"];

const BENTO_CARDS = [
  {
    icon: "⚡",
    title: "Single-Purpose Tools",
    desc: "Laser-focused productivity instruments. One problem, one solution, zero bloat.",
    accent: "#3b82f6",
    span: "col-span-1",
  },
  {
    icon: "🔁",
    title: "Automation Utilities",
    desc: "Eliminate repetition at scale. We wire the logic so your team never has to repeat themselves again.",
    accent: "#10b981",
    span: "col-span-1",
  },
  {
    icon: "🌐",
    title: "Web Applications",
    desc: "Focused, fast, opinionated. Built for the exact workflow — nothing more, nothing less.",
    accent: "#3b82f6",
    span: "col-span-1",
  },
  {
    icon: "🛤️",
    title: "Low-Friction Workflows",
    desc: "Digital pipelines that remove the friction between intent and outcome.",
    accent: "#10b981",
    span: "col-span-1",
  },
];

const SERVICES = [
  {
    num: "01",
    title: "Web & Mobile Engineering",
    desc: "High-performance applications built for speed, scale, and longevity. We ship products that outlast trends.",
    tags: ["React", "Next.js", "React Native", "TypeScript"],
    accent: "#3b82f6",
  },
  {
    num: "02",
    title: "QA Automation & Test Management",
    badge: "Senior-level Architecture",
    desc: "Testing is not an afterthought. We architect quality from line one — automated, reliable, ruthless.",
    tags: ["Playwright", "Cypress", "Jest", "CI/CD"],
    accent: "#10b981",
  },
  {
    num: "03",
    title: "Workflow & Business Automation",
    desc: "We turn manual, repetitive processes into self-running systems that scale without headcount.",
    tags: ["n8n", "Zapier", "Make", "Custom APIs"],
    accent: "#3b82f6",
  },
];

const STEPS = [
  { label: "Discovery", desc: "Understand the exact problem, no more." },
  { label: "Architecture", desc: "Design the system before a line is written." },
  { label: "Engineering", desc: "Ship fast. Ship right. No shortcuts." },
  { label: "Automated QA", desc: "Test everything. Trust nothing manually." },
  { label: "Deployment", desc: "Live, monitored, and production-hardened." },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function GlassCard({ children, accent = "#3b82f6", className = "", style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        background: hovered
          ? "rgba(255,255,255,0.055)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? accent + "55" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "16px",
        backdropFilter: "blur(12px)",
        transition: "all 0.35s ease",
        boxShadow: hovered ? `0 0 32px ${accent}18` : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Stepper() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView(0.2);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % STEPS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref}>
      {/* Desktop stepper */}
      <div className="hidden md:flex items-start gap-0 relative">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center cursor-pointer"
            onClick={() => setActive(i)}
          >
            {/* Connector line */}
            <div className="w-full flex items-center">
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: i === 0 ? "transparent" : i <= active ? "#3b82f6" : "rgba(255,255,255,0.1)",
                  transition: "background 0.5s ease",
                }}
              />
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: `2px solid ${i === active ? "#3b82f6" : i < active ? "#10b981" : "rgba(255,255,255,0.15)"}`,
                  background: i === active ? "rgba(59,130,246,0.15)" : i < active ? "rgba(16,185,129,0.1)" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.4s ease",
                  boxShadow: i === active ? "0 0 20px rgba(59,130,246,0.35)" : "none",
                }}
              >
                {i < active ? (
                  <span style={{ color: "#10b981", fontSize: 14 }}>✓</span>
                ) : (
                  <span style={{ color: i === active ? "#3b82f6" : "rgba(255,255,255,0.3)", fontSize: 12, fontWeight: 700 }}>
                    {i + 1}
                  </span>
                )}
              </div>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: i >= STEPS.length - 1 ? "transparent" : i < active ? "#3b82f6" : "rgba(255,255,255,0.1)",
                  transition: "background 0.5s ease",
                }}
              />
            </div>
            <div className="mt-4 text-center px-2">
              <p style={{
                color: i === active ? "#fff" : "rgba(255,255,255,0.45)",
                fontWeight: i === active ? 600 : 400,
                fontSize: 13,
                letterSpacing: "0.03em",
                transition: "color 0.3s",
                fontFamily: "'DM Mono', monospace",
              }}>
                {step.label}
              </p>
              <p style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 11,
                marginTop: 6,
                maxWidth: 120,
                lineHeight: 1.5,
                opacity: i === active ? 1 : 0,
                transform: i === active ? "translateY(0)" : "translateY(4px)",
                transition: "all 0.4s ease",
              }}>
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile stepper */}
      <div className="flex md:hidden flex-col gap-3">
        {STEPS.map((step, i) => (
          <div
            key={i}
            onClick={() => setActive(i)}
            className="flex items-start gap-4 p-4 rounded-xl cursor-pointer"
            style={{
              background: i === active ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${i === active ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)"}`,
              transition: "all 0.3s ease",
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
              border: `2px solid ${i === active ? "#3b82f6" : i < active ? "#10b981" : "rgba(255,255,255,0.15)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: i === active ? "rgba(59,130,246,0.15)" : "transparent",
            }}>
              {i < active
                ? <span style={{ color: "#10b981", fontSize: 12 }}>✓</span>
                : <span style={{ color: i === active ? "#3b82f6" : "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
              }
            </div>
            <div>
              <p style={{ color: i === active ? "#fff" : "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: 13 }}>{step.label}</p>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 2 }}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KozonHQ() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{
      background: "#09090b",
      minHeight: "100vh",
      fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif",
      color: "#fff",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(59,130,246,0.3); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #09090b; }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.4); border-radius: 4px; }

        .hero-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
        }
        .noise-overlay {
          position: fixed;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
        }
        .grid-bg {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .tag-pill {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
          font-family: 'DM Mono', monospace;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.02em;
          transition: all 0.25s ease;
          border: none;
          outline: none;
        }
        .cta-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #fff;
          box-shadow: 0 4px 20px rgba(59,130,246,0.3);
        }
        .cta-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(59,130,246,0.45);
        }
        .cta-ghost {
          background: transparent;
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.1) !important;
        }
        .cta-ghost:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.25) !important;
          background: rgba(255,255,255,0.04);
        }
        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #3b82f6;
        }
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.25);
          color: #10b981;
          font-family: 'DM Mono', monospace;
          letter-spacing: 0.04em;
        }
      `}</style>

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* NAV */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 24px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(9,9,11,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #3b82f6, #10b981)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>K</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>
            Kozon<span style={{ color: "#3b82f6" }}>HQ</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ gap: 8, alignItems: "center" }}>
          {NAV_LINKS.map((link) => (
            <button key={link} className="cta-btn cta-ghost" style={{ padding: "8px 16px", fontSize: 13 }}>
              {link}
            </button>
          ))}
          <button className="cta-btn cta-primary" style={{ marginLeft: 8 }}>
            Book a Call →
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 8 }}
        >
          <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ height: 1.5, background: "rgba(255,255,255,0.7)", borderRadius: 2, transition: "all 0.3s",
                transform: menuOpen && i === 0 ? "rotate(45deg) translate(4px, 4px)" :
                            menuOpen && i === 1 ? "opacity(0)" :
                            menuOpen && i === 2 ? "rotate(-45deg) translate(4px, -4px)" : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: "rgba(9,9,11,0.97)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "20px 24px", display: "flex", flexDirection: "column", gap: 8,
        }}>
          {NAV_LINKS.map((link) => (
            <button key={link} style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.7)",
              fontSize: 15, fontWeight: 500, cursor: "pointer", textAlign: "left", padding: "10px 0",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              {link}
            </button>
          ))}
          <button className="cta-btn cta-primary" style={{ marginTop: 8, justifyContent: "center" }}>
            Book a Call →
          </button>
        </div>
      )}

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div className="grid-bg" />
        <div className="hero-glow" style={{ background: "rgba(59,130,246,0.12)", top: "10%", left: "20%" }} />
        <div className="hero-glow" style={{ background: "rgba(16,185,129,0.08)", bottom: "10%", right: "15%" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 760, padding: "0 24px", paddingTop: 80 }}>
          {/* Badge */}
          <div style={{
            opacity: 0,
            animation: "fadeUp 0.8s ease 0.2s forwards",
          }}>
            <span className="badge">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block" }} />
              IT Agency & Product Studio
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            marginTop: 28,
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            opacity: 0,
            animation: "fadeUp 0.9s ease 0.35s forwards",
          }}>
            Engineering Velocity.{" "}
            <span style={{
              background: "linear-gradient(135deg, #3b82f6 0%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Automating Growth.
            </span>
          </h1>

          {/* Subtext */}
          <p style={{
            marginTop: 24,
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "24px auto 0",
            opacity: 0,
            animation: "fadeUp 0.9s ease 0.5s forwards",
          }}>
            From high-performance mobile apps to low-friction automation workflows, we build digital products that scale.
          </p>

          {/* CTAs */}
          <div style={{
            marginTop: 40,
            display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
            opacity: 0,
            animation: "fadeUp 0.9s ease 0.65s forwards",
          }}>
            <button className="cta-btn cta-primary" style={{ padding: "13px 28px", fontSize: 14 }}>
              Start a Project →
            </button>
            <button className="cta-btn cta-ghost" style={{ padding: "13px 28px", fontSize: 14 }}>
              View Product Lab
            </button>
          </div>

          {/* Stats row */}
          <div style={{
            marginTop: 72,
            display: "flex", justifyContent: "center", gap: "clamp(28px, 6vw, 72px)",
            opacity: 0,
            animation: "fadeUp 0.9s ease 0.8s forwards",
          }}>
            {[["50+", "Products Shipped"], ["99%", "Test Coverage"], ["3×", "Avg Growth"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 800, letterSpacing: "-0.03em",
                  background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>
                  {val}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 4, fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: 0, animation: "fadeUp 1s ease 1.2s forwards",
        }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.1em" }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(59,130,246,0.5), transparent)" }} />
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* PRODUCT LAB */}
      <section id="product-lab" style={{ padding: "120px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span className="section-label">// Product Lab</span>
          <h2 style={{ marginTop: 16, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            Tools built with one rule.<br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>Solve one problem perfectly.</span>
          </h2>
          <p style={{ marginTop: 16, color: "rgba(255,255,255,0.4)", fontSize: 15, maxWidth: 480, lineHeight: 1.7 }}>
            We don't build feature-bloated platforms. Every product in our lab solves a single, focused problem — elegantly and completely.
          </p>
        </FadeIn>

        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {BENTO_CARDS.map((card, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <GlassCard accent={card.accent} style={{ padding: "32px 28px", height: "100%" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${card.accent}18`,
                  border: `1px solid ${card.accent}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, marginBottom: 20,
                }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>
                  {card.desc}
                </p>
                <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: card.accent }} />
                  <span style={{ fontSize: 11, color: card.accent, fontFamily: "'DM Mono', monospace", fontWeight: 500 }}>
                    LIVE IN LAB
                  </span>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ maxWidth: 1100, margin: "0 auto 0", padding: "0 24px" }}>
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
      </div>

      {/* SERVICES */}
      <section id="services" style={{ padding: "120px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span className="section-label">// Agency Services</span>
          <h2 style={{ marginTop: 16, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            We build. We test.<br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>We automate the rest.</span>
          </h2>
        </FadeIn>

        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 16,
        }}>
          {SERVICES.map((svc, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <GlassCard accent={svc.accent} style={{ padding: "36px 32px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 13, fontWeight: 500,
                    color: svc.accent, letterSpacing: "0.05em",
                  }}>
                    {svc.num}
                  </span>
                  {svc.badge && (
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: "3px 8px",
                      borderRadius: 100, background: "rgba(16,185,129,0.1)",
                      border: "1px solid rgba(16,185,129,0.25)", color: "#10b981",
                      fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em",
                    }}>
                      {svc.badge}
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 14 }}>
                  {svc.title}
                </h3>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, flex: 1 }}>
                  {svc.desc}
                </p>
                <div style={{ marginTop: 24, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {svc.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)" }} />
      </div>

      {/* QA-FIRST PROCESS */}
      <section id="process" style={{ padding: "120px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <span className="section-label">// The QA-First Process</span>
          <h2 style={{ marginTop: 16, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            Quality isn't a step.<br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>It's the architecture.</span>
          </h2>
          <p style={{ marginTop: 16, color: "rgba(255,255,255,0.4)", fontSize: 15, maxWidth: 480, lineHeight: 1.7 }}>
            Every engagement follows a process where testing is designed from day one — not bolted on at the end.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <GlassCard style={{ marginTop: 56, padding: "48px 40px" }}>
            <Stepper />
          </GlassCard>
        </FadeIn>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "0 24px 120px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{
            borderRadius: 20, padding: "64px 48px",
            background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.06) 100%)",
            border: "1px solid rgba(59,130,246,0.2)",
            textAlign: "center", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", width: 400, height: 400, borderRadius: "50%",
              background: "rgba(59,130,246,0.07)", filter: "blur(80px)",
              top: "50%", left: "50%", transform: "translate(-50%,-50%)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#3b82f6", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
                Ready to build?
              </p>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 16 }}>
                Let's ship something precise.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, marginBottom: 36, maxWidth: 420, margin: "0 auto 36px" }}>
                "Book a Call" and we'll scope your project within 48 hours. No retainers, no surprises.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button className="cta-btn cta-primary" style={{ padding: "14px 32px", fontSize: 14 }}>
                  Book a Call →
                </button>
                <button className="cta-btn cta-ghost" style={{ padding: "14px 32px", fontSize: 14 }}>
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "40px 24px",
        maxWidth: 1100, margin: "0 auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: "linear-gradient(135deg, #3b82f6, #10b981)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>K</span>
            </div>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace" }}>
              Built by <span style={{ color: "#3b82f6" }}>KozonHQ</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Product Lab", "Services", "Process", "Book a Call"].map((link) => (
              <a key={link} href="#" style={{
                fontSize: 13, color: "rgba(255,255,255,0.35)",
                textDecoration: "none", transition: "color 0.2s",
                fontFamily: "'DM Mono', monospace",
              }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
              >
                {link}
              </a>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontFamily: "'DM Mono', monospace" }}>
            © 2025 KozonHQ
          </p>
        </div>
      </footer>
    </div>
  );
}
