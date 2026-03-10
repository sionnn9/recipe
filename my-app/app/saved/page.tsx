// app/dashboard/page.tsx
"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import Loginnav from "../components/loginnav/page"; // adjust path if needed
import "../components/home.css"; // reuse your existing styles
import { error } from "console";
import { u } from "framer-motion/client";
import { LikeComponent } from "../components/likecomp";
import { useRouter } from "next/dist/client/components/navigation";
// Mock recipe data (replace with real API)
const mockRecipes = [
  {
    _id: "507f1f77bcf86cd799439011",
    id: 1,
    recipeName: "Avocado & Broccoli Pasta",
    prepTime: "25 min",
    difficulty: "Easy",
    ingredients: ["🥑 Avocado"],
    instructions: [
      "1. Cook pasta. 2. Blend avocado with lemon for sauce. 3. Sauté broccoli and tomatoes. 4. Toss everything together and serve!",
    ],
  },
];

export default function DashboardPage() {
  const router = useRouter();

  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [recipes, setRecipes] = useState<typeof mockRecipes>([]);

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

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/my-recipes`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        const data = await response.json(); // ✅ parse once

        if (!response.ok) {
          console.error("Error fetching saved recipes:", data);
          return; // ✅ early return on error
        }

        setRecipes(data);
        console.log("Fetched saved recipes:", data);
      } catch (err) {
        console.error("Network or parse error:", err); // ✅ handle fetch/json failures
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div className="home">
      {/* Notebook background (matches your homepage) */}
      <div className="notebook-bg" />

      {/* Floating veggies — reuse your SVGs */}
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

      {/* Navbar (reuse your component) */}
      <Loginnav />

      {/* Main dashboard content */}
      <section
        className="hero"
        style={{ minHeight: "auto", paddingBottom: "4rem" }}
      >
        <div className="hero-inner" style={{ maxWidth: "1200px" }}>
          {/* Recipe results */}
          <AnimatePresence>
            {recipes.length > 0 && !uploading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ marginTop: "4rem" }}
              >
                <h2
                  data-animate
                  id="results-title"
                  className={`anim section-title ${isVisible("results-title") ? "visible" : ""}`}
                  style={{ fontSize: "2.5rem", marginBottom: "2rem" }}
                >
                  Found {recipes.length} recipes
                </h2>
                <div className="features">
                  {recipes.map((recipe, index) => (
                    <motion.div
                      key={recipe._id || recipe.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="feature-card"
                      style={{ cursor: "pointer", position: "relative" }} // Added relative positioning
                      whileHover={{ y: -5 }}
                      onClick={() => router.push(`/recipe/${recipe._id}`)}
                    >
                      {/* --- LIKE BUTTON COMPONENT --- */}
                      <div
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          zIndex: 10,
                        }}
                        onClick={(e) => e.stopPropagation()} // Important: stops the card click from firing when liking
                      >
                        {" "}
                        <LikeComponent
                          recipeId={recipe._id}
                          recipeName={recipe.recipeName}
                          ingredients={recipe.ingredients}
                          prepTime={recipe.prepTime}
                          difficulty={recipe.difficulty}
                          instructions={recipe.instructions}
                          isInitiallySaved={true}
                          onUnsave={() =>
                            setRecipes(
                              recipes.filter((r) => r._id !== recipe._id),
                            )
                          }
                        />
                      </div>

                      <span className="feature-emoji">🍽️</span>
                      <div className="feature-title">{recipe.recipeName}</div>

                      <p className="feature-desc">
                        <span
                          style={{ display: "block", marginBottom: "0.5rem" }}
                        >
                          ⏲️ {recipe.prepTime} · {recipe.difficulty}
                        </span>
                        {recipe.ingredients.join(" · ")}
                      </p>

                      <div
                        style={{
                          marginTop: "1rem",
                          borderTop: "1px dashed #8b5a2b",
                          paddingTop: "0.75rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ color: "#2d6a4f", fontWeight: 500 }}>
                          View Recipe →
                        </span>
                        <span style={{ fontSize: "1.5rem", opacity: 0.5 }}>
                          ✦
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Empty state */}
          {!uploading && recipes.length === 0 && files.length === 0 && (
            <p
              data-animate
              id="empty-state"
              className={`anim hero-sub ${isVisible("empty-state") ? "visible" : ""}`}
              style={{ marginTop: "3rem", fontStyle: "italic", opacity: 0.7 }}
            >
              No recipes saved yet — go save some of your favorite recipes!
            </p>
          )}
        </div>
      </section>

      <hr className="ruled-divider" />

      {/* Footer */}
      <footer className="footer flex justify-center align-bottom">
        <p className="footer-text">
          Made with <span>♥</span> and lots of garlic · FridgeChef © 2026
        </p>
      </footer>
    </div>
  );
}
