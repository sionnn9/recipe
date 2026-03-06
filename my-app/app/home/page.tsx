"use client";
import "../components/home.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar/page";
import Loginnav from "../components/loginnav/page";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  useEffect(() => {
    const checkLogin = async () => {
      const res = await fetch("http://localhost:5001/api/auth/checklogin", {
        credentials: "include",
      });

      if (res.ok) {
        setIsLoggedIn(true);
        console.log("User is logged in");
      } else {
        setIsLoggedIn(false);
        console.log(res.status);
        console.log("User is not logged in");
      }
    };

    checkLogin();
  }, []);

  const isVisible = (id: string) => visible.has(id);

  return (
    <>
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
        {isLoggedIn ? <Loginnav /> : <Navbar />}

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
