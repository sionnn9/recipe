"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 },
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const isVisible = (id: string) => visible.has(id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .home {
          min-height: 100vh;
          background: #fdf6ec;
          font-family: 'Lora', serif;
          overflow-x: hidden;
        }

        /* ── NOTEBOOK LINES ── */
        .notebook-bg {
          position: fixed;
          inset: 0;
          background-image: repeating-linear-gradient(
            transparent, transparent 31px,
            rgba(230,57,70,0.07) 31px, rgba(230,57,70,0.07) 32px
          );
          pointer-events: none;
          z-index: 0;
        }

        /* ── NAV ── */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 48px;
          background: rgba(253,246,236,0.88);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(230,57,70,0.1);
          transition: box-shadow 0.3s;
        }

        .nav.scrolled {
          box-shadow: 0 2px 20px rgba(0,0,0,0.07);
        }

        .nav-brand {
          font-family: 'Caveat', cursive;
          font-size: 32px;
          font-weight: 700;
          color: #e63946;
          text-decoration: none;
          letter-spacing: -1px;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-link {
          font-family: 'Caveat', cursive;
          font-size: 18px;
          color: #6b5740;
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-link:hover { color: #e63946; }

        .nav-cta {
          background: #e63946;
          color: white !important;
          padding: 10px 24px;
          border-radius: 3px;
          font-family: 'Caveat', cursive;
          font-size: 18px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 3px 10px rgba(230,57,70,0.3);
          transition: all 0.2s;
        }

        .nav-cta:hover {
          background: #c1121f;
          transform: translateY(-1px);
          box-shadow: 0 5px 16px rgba(230,57,70,0.4);
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 120px 48px 80px;
          z-index: 1;
        }

        .hero-inner {
          max-width: 860px;
          text-align: center;
        }

        .hero-tag {
          display: inline-block;
          font-family: 'Caveat', cursive;
          font-size: 16px;
          font-weight: 600;
          color: #e63946;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 20px;
          opacity: 0;
          animation: fadeUp 0.7s 0.2s forwards;
        }

        .hero-title {
          font-family: 'Caveat', cursive;
          font-size: clamp(56px, 9vw, 96px);
          font-weight: 700;
          color: #2d2416;
          line-height: 1.0;
          letter-spacing: -2px;
          margin-bottom: 24px;
          opacity: 0;
          animation: fadeUp 0.7s 0.4s forwards;
        }

        .hero-title span {
          color: #e63946;
          display: inline-block;
          position: relative;
        }

        .hero-title span::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 0; right: 0;
          height: 3px;
          background: rgba(230,57,70,0.3);
          border-radius: 2px;
        }

        .hero-sub {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 20px;
          color: #7a6550;
          max-width: 560px;
          margin: 0 auto 48px;
          line-height: 1.7;
          opacity: 0;
          animation: fadeUp 0.7s 0.6s forwards;
        }

        .hero-btns {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeUp 0.7s 0.8s forwards;
        }

        .btn-primary {
          background: #e63946;
          color: white;
          padding: 16px 40px;
          border-radius: 3px;
          font-family: 'Caveat', cursive;
          font-size: 22px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(230,57,70,0.35);
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary:hover {
          background: #c1121f;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(230,57,70,0.45);
        }

        .btn-secondary {
          background: transparent;
          color: #6b5740;
          padding: 16px 36px;
          border-radius: 3px;
          border: 1.5px solid #d4c4aa;
          font-family: 'Caveat', cursive;
          font-size: 22px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          border-color: #e63946;
          color: #e63946;
          transform: translateY(-2px);
        }

        /* ── HERO MOCKUP ── */
        .hero-mockup {
          margin-top: 64px;
          opacity: 0;
          animation: fadeUp 0.8s 1s forwards;
          position: relative;
        }

        .mockup-card {
          background: #fffef9;
          border-radius: 4px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.1), 4px 4px 0 #f0e6d3, 8px 8px 0 #e8dbc8;
          padding: 32px 40px 32px 64px;
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          text-align: left;
        }

        .mockup-card::before {
          content: '';
          position: absolute;
          left: 48px; top: 0; bottom: 0;
          width: 1px;
          background: rgba(230,57,70,0.25);
        }

        .mockup-holes {
          position: absolute;
          left: 16px; top: 0; bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }

        .mockup-hole {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #fdf6ec;
          border: 1.5px solid #ddd;
        }

        .mockup-label {
          font-family: 'Caveat', cursive;
          font-size: 12px;
          color: #b0a090;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }

        .mockup-title {
          font-family: 'Caveat', cursive;
          font-size: 26px;
          font-weight: 700;
          color: #2d2416;
          margin-bottom: 16px;
        }

        .mockup-ingredients {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .mockup-tag {
          background: rgba(230,57,70,0.1);
          color: #e63946;
          font-family: 'Caveat', cursive;
          font-size: 16px;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid rgba(230,57,70,0.2);
        }

        .mockup-step {
          font-family: 'Lora', serif;
          font-size: 13px;
          color: #7a6550;
          font-style: italic;
          line-height: 1.6;
          border-left: 2px solid rgba(230,57,70,0.2);
          padding-left: 12px;
        }

        /* ── SECTION BASE ── */
        .section {
          position: relative;
          z-index: 1;
          padding: 100px 48px;
        }

        .section-inner {
          max-width: 1000px;
          margin: 0 auto;
        }

        .section-tag {
          font-family: 'Caveat', cursive;
          font-size: 14px;
          font-weight: 600;
          color: #e63946;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .section-title {
          font-family: 'Caveat', cursive;
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 700;
          color: #2d2416;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .section-sub {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 17px;
          color: #7a6550;
          max-width: 500px;
          line-height: 1.7;
          margin-bottom: 56px;
        }

        /* ── ANIMATE ON SCROLL ── */
        .anim {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .anim.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .anim-delay-1 { transition-delay: 0.1s; }
        .anim-delay-2 { transition-delay: 0.2s; }
        .anim-delay-3 { transition-delay: 0.3s; }
        .anim-delay-4 { transition-delay: 0.4s; }
        .anim-delay-5 { transition-delay: 0.5s; }

        /* ── HOW IT WORKS ── */
        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 32px;
        }

        .step-card {
          background: #fffef9;
          border-radius: 4px;
          padding: 32px 28px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06), 3px 3px 0 #f0e6d3;
          position: relative;
          border-left: 3px solid rgba(230,57,70,0.2);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.1), 3px 3px 0 #f0e6d3;
        }

        .step-num {
          font-family: 'Caveat', cursive;
          font-size: 48px;
          font-weight: 700;
          color: rgba(230,57,70,0.15);
          line-height: 1;
          margin-bottom: 8px;
        }

        .step-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .step-title {
          font-family: 'Caveat', cursive;
          font-size: 22px;
          font-weight: 700;
          color: #2d2416;
          margin-bottom: 8px;
        }

        .step-desc {
          font-family: 'Lora', serif;
          font-size: 14px;
          color: #7a6550;
          font-style: italic;
          line-height: 1.6;
        }

        /* ── FEATURES ── */
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
        }

        .feature-card {
          background: #fffef9;
          border-radius: 4px;
          padding: 36px 32px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05), 3px 3px 0 #f0e6d3;
          position: relative;
          overflow: hidden;
        }

        .feature-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(to right, #e63946, rgba(230,57,70,0));
        }

        .feature-emoji {
          font-size: 36px;
          margin-bottom: 16px;
          display: block;
        }

        .feature-title {
          font-family: 'Caveat', cursive;
          font-size: 24px;
          font-weight: 700;
          color: #2d2416;
          margin-bottom: 10px;
        }

        .feature-desc {
          font-family: 'Lora', serif;
          font-size: 14px;
          color: #7a6550;
          font-style: italic;
          line-height: 1.7;
        }

        /* ── DIVIDER ── */
        .ruled-divider {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(230,57,70,0.2), transparent);
          margin: 0 48px;
        }

        /* ── CTA ── */
        .cta-section {
          position: relative;
          z-index: 1;
          padding: 100px 48px 120px;
          text-align: center;
        }

        .cta-paper {
          background: #fffef9;
          border-radius: 4px;
          max-width: 700px;
          margin: 0 auto;
          padding: 64px 56px 56px 80px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.1), 4px 4px 0 #f0e6d3, 8px 8px 0 #e8dbc8;
          position: relative;
          text-align: left;
        }

        .cta-paper::before {
          content: '';
          position: absolute;
          left: 64px; top: 0; bottom: 0;
          width: 1px;
          background: rgba(230,57,70,0.25);
        }

        .cta-holes {
          position: absolute;
          left: 20px; top: 0; bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
        }

        .cta-hole {
          width: 12px; height: 12px;
          border-radius: 50%;
          background: #fdf6ec;
          border: 1.5px solid #ddd;
        }

        .cta-title {
          font-family: 'Caveat', cursive;
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 700;
          color: #2d2416;
          line-height: 1.1;
          margin-bottom: 16px;
        }

        .cta-title span { color: #e63946; }

        .cta-sub {
          font-family: 'Lora', serif;
          font-style: italic;
          font-size: 16px;
          color: #7a6550;
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 460px;
        }

        .cta-btns {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .cta-deco {
          position: absolute;
          bottom: 20px;
          right: 24px;
          font-family: 'Caveat', cursive;
          font-size: 13px;
          color: #e0d4c4;
          font-style: italic;
          transform: rotate(-2deg);
        }

        /* ── FOOTER ── */
        .footer {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 32px 48px;
          border-top: 1px solid rgba(230,57,70,0.1);
        }

        .footer-text {
          font-family: 'Caveat', cursive;
          font-size: 16px;
          color: #b0a090;
        }

        .footer-text span { color: #e63946; }

        /* ── FLOATING VEGGIES ── */
        .bg-veggies {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .bg-veggies svg {
          position: absolute;
          opacity: 0.1;
        }

        .fv1 { animation: fvA 8s ease-in-out infinite; }
        .fv2 { animation: fvB 11s ease-in-out infinite; }
        .fv3 { animation: fvA 9s ease-in-out infinite reverse; }
        .fv4 { animation: fvB 13s ease-in-out infinite; }

        @keyframes fvA {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(5deg); }
        }
        @keyframes fvB {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(12px) rotate(-4deg); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .nav { padding: 14px 20px; }
          .hero { padding: 100px 24px 60px; }
          .section { padding: 60px 24px; }
          .cta-section { padding: 60px 24px 80px; }
          .cta-paper { padding: 48px 32px 40px 60px; }
          .nav-links .nav-link:not(.nav-cta) { display: none; }
        }
      `}</style>

      <div className="home">
        <div className="notebook-bg" />

        {/* Floating veggies */}
        <div className="bg-veggies">
          <svg
            className="fv1"
            style={{ top: "10%", right: "3%", width: 130, height: 130 }}
            viewBox="0 0 100 100"
          >
            <ellipse cx="50" cy="58" rx="36" ry="34" fill="#e63946" />
            <path
              d="M50 24 C50 24 44 12 37 16 C41 20 44 24 50 24Z"
              fill="#52b788"
            />
            <path
              d="M50 24 C50 24 56 12 63 16 C59 20 56 24 50 24Z"
              fill="#52b788"
            />
            <path
              d="M50 24 L50 8"
              stroke="#52b788"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="fv2"
            style={{ bottom: "15%", left: "2%", width: 140, height: 140 }}
            viewBox="0 0 100 100"
          >
            <rect x="43" y="62" width="14" height="28" rx="4" fill="#6b9e4e" />
            <circle cx="50" cy="48" r="20" fill="#52b788" />
            <circle cx="34" cy="55" r="15" fill="#52b788" />
            <circle cx="66" cy="55" r="15" fill="#52b788" />
            <circle cx="50" cy="33" r="13" fill="#74c69d" />
          </svg>
          <svg
            className="fv3"
            style={{ top: "50%", right: "1%", width: 100, height: 120 }}
            viewBox="0 0 60 110"
          >
            <path
              d="M30 105 C18 80 14 55 20 28 Q30 12 40 28 C46 55 42 80 30 105Z"
              fill="#f4a261"
            />
            <path
              d="M30 14 L30 0"
              stroke="#52b788"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <svg
            className="fv4"
            style={{ top: "30%", left: "1%", width: 110, height: 110 }}
            viewBox="0 0 100 100"
          >
            <ellipse cx="50" cy="54" rx="34" ry="28" fill="#f9c74f" />
            <ellipse
              cx="39"
              cy="47"
              rx="9"
              ry="7"
              fill="rgba(255,255,255,0.2)"
              transform="rotate(-20 39 47)"
            />
          </svg>
        </div>

        {/* Nav */}
        <nav className={`nav ${scrollY > 20 ? "scrolled" : ""}`}>
          <a href="/" className="nav-brand">
            FridgeChef
          </a>
          <div className="nav-links">
            <a href="#how-it-works" className="nav-link">
              How it works
            </a>
            <a href="#features" className="nav-link">
              Features
            </a>
            <Link href="/login" className="nav-link nav-cta">
              Get Started →
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-tag">✦ AI-Powered Cooking</div>
            <h1 className="hero-title">
              Open your fridge.
              <br />
              Get a <span>Michelin</span>
              <br />
              star recipe.
            </h1>
            <p className="hero-sub">
              Snap a photo of your ingredients and let our AI chef turn
              whatever's in your fridge into 5 gourmet recipes — instantly.
            </p>
            <div className="hero-btns">
              <Link href="/login" className="btn-primary">
                Start Cooking →
              </Link>
              <a href="#how-it-works" className="btn-secondary">
                See how it works
              </a>
            </div>

            {/* Mockup card */}
            <div className="hero-mockup">
              <div className="mockup-card">
                <div className="mockup-holes">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="mockup-hole" />
                  ))}
                </div>
                <div className="mockup-label">Today's Recipe</div>
                <div className="mockup-title">🍝 Avocado & Broccoli Pasta</div>
                <div className="mockup-ingredients">
                  {["🥑 Avocado", "🥦 Broccoli", "🍅 Tomato", "🍋 Lemon"].map(
                    (ing) => (
                      <span key={ing} className="mockup-tag">
                        {ing}
                      </span>
                    ),
                  )}
                </div>
                <div className="mockup-step">
                  1. Bring salted water to a rolling boil and cook pasta al
                  dente. Meanwhile, blanch broccoli for 2 minutes until bright
                  green...
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="ruled-divider" />

        {/* How it works */}
        <section className="section" id="how-it-works">
          <div className="section-inner">
            <div
              id="how-tag"
              data-animate
              className={`anim section-tag ${isVisible("how-tag") ? "visible" : ""}`}
            >
              ✦ Simple as 1-2-3
            </div>
            <h2
              id="how-title"
              data-animate
              className={`anim anim-delay-1 section-title ${isVisible("how-title") ? "visible" : ""}`}
            >
              From fridge to plate
              <br />
              in seconds
            </h2>
            <p
              id="how-sub"
              data-animate
              className={`anim anim-delay-2 section-sub ${isVisible("how-sub") ? "visible" : ""}`}
            >
              No meal planning. No grocery lists. Just open your fridge, snap a
              photo, and dinner is figured out.
            </p>

            <div className="steps">
              {[
                {
                  num: "01",
                  icon: "📸",
                  title: "Snap your fridge",
                  desc: "Take a photo of whatever ingredients, vegetables, or leftovers you have. Our vision AI identifies everything in the frame.",
                },
                {
                  num: "02",
                  icon: "🤖",
                  title: "AI does the thinking",
                  desc: "Powered by Llama 4 Scout vision model running on Groq's ultra-fast LPU chips — ingredients are detected in under a second.",
                },
                {
                  num: "03",
                  icon: "📖",
                  title: "Get 5 gourmet recipes",
                  desc: "Our Michelin-star AI chef generates 5 unique, detailed recipes complete with quantities, techniques, and chef's tips.",
                },
                {
                  num: "04",
                  icon: "🔖",
                  title: "Save your favorites",
                  desc: "Save the recipes you love to your personal recipe box. Your collection grows every time you cook.",
                },
              ].map((step, i) => (
                <div
                  key={step.num}
                  id={`step-${i}`}
                  data-animate
                  className={`step-card anim anim-delay-${i + 1} ${isVisible(`step-${i}`) ? "visible" : ""}`}
                >
                  <div className="step-num">{step.num}</div>
                  <div className="step-icon">{step.icon}</div>
                  <div className="step-title">{step.title}</div>
                  <p className="step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="ruled-divider" />

        {/* Features */}
        <section className="section" id="features">
          <div className="section-inner">
            <div
              id="feat-tag"
              data-animate
              className={`anim section-tag ${isVisible("feat-tag") ? "visible" : ""}`}
            >
              ✦ What makes it special
            </div>
            <h2
              id="feat-title"
              data-animate
              className={`anim anim-delay-1 section-title ${isVisible("feat-title") ? "visible" : ""}`}
            >
              Your personal AI chef,
              <br />
              always in the kitchen
            </h2>
            <p
              id="feat-sub"
              data-animate
              className={`anim anim-delay-2 section-sub ${isVisible("feat-sub") ? "visible" : ""}`}
            >
              Built with open-source models — no black box AI, just transparent,
              fast, and powerful cooking assistance.
            </p>

            <div className="features">
              {[
                {
                  emoji: "🔍",
                  title: "Smart Ingredient Detection",
                  desc: "Detects vegetables, fruits, meat, dairy, and more from a single photo using Meta's Llama 4 Scout vision model.",
                },
                {
                  emoji: "👨‍🍳",
                  title: "Gourmet Recipe Generation",
                  desc: "Not just basic recipes — detailed chef techniques, exact quantities, and timing. Powered by Llama 3.3 70B.",
                },
                {
                  emoji: "⚡",
                  title: "Groq LPU Speed",
                  desc: "Results in under 2 seconds. Groq's custom Language Processing Unit chips make AI inference blazing fast.",
                },
                {
                  emoji: "🔖",
                  title: "Personal Recipe Box",
                  desc: "Save recipes you love. Your collection is linked to your account so it's always there when you need it.",
                },
                {
                  emoji: "🌿",
                  title: "Works with anything",
                  desc: "Vegetables, fruits, meat, cheese, leftovers — whatever's in your fridge, the AI figures out something delicious.",
                },
                {
                  emoji: "🔒",
                  title: "Secure & Private",
                  desc: "JWT auth with secure cookies. Your data stays yours — we don't store your food photos or sell your data.",
                },
              ].map((feat, i) => (
                <div
                  key={feat.title}
                  id={`feat-${i}`}
                  data-animate
                  className={`feature-card anim anim-delay-${(i % 3) + 1} ${isVisible(`feat-${i}`) ? "visible" : ""}`}
                >
                  <span className="feature-emoji">{feat.emoji}</span>
                  <div className="feature-title">{feat.title}</div>
                  <p className="feature-desc">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="ruled-divider" />

        {/* CTA */}

        {/* Footer */}
        <footer className="footer">
          <p className="footer-text">
            Made with <span>♥</span> and lots of garlic · FridgeChef © 2026
          </p>
        </footer>
      </div>
    </>
  );
}
