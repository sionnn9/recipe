// app/dashboard/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/navbar/page"; // adjust path if needed
import "../components/home.css"; // reuse your existing styles
import { error } from "console";

// Mock recipe data (replace with real API)
const mockRecipes = [
  {
    id: 1,
    name: "Avocado & Broccoli Pasta",
    time: "25 min",
    difficulty: "Easy",
    ingredients: ["🥑 Avocado", "🥦 Broccoli", "🍅 Tomato", "🍋 Lemon"],
  },
  {
    id: 2,
    name: "Garlic Butter Mushrooms",
    time: "15 min",
    difficulty: "Easy",
    ingredients: ["🍄 Mushrooms", "🧄 Garlic", "🧈 Butter", "🌿 Parsley"],
  },
  {
    id: 3,
    name: "Spicy Thai Curry",
    time: "35 min",
    difficulty: "Medium",
    ingredients: [
      "🥥 Coconut milk",
      "🍛 Curry paste",
      "🥬 Veggies",
      "🌶️ Chili",
    ],
  },
  {
    id: 4,
    name: "Classic Pancakes",
    time: "20 min",
    difficulty: "Easy",
    ingredients: ["🥚 Eggs", "🥛 Milk", "🌾 Flour", "🍯 Maple syrup"],
  },
  {
    id: 5,
    name: "Beef Stroganoff",
    time: "45 min",
    difficulty: "Hard",
    ingredients: ["🥩 Beef", "🍄 Mushrooms", "🧅 Onion", "🥛 Sour cream"],
  },
  {
    id: 6,
    name: "Chocolate Lava Cake",
    time: "30 min",
    difficulty: "Medium",
    ingredients: ["🍫 Chocolate", "🧈 Butter", "🥚 Eggs", "🍬 Sugar"],
  },
];

export default function DashboardPage() {
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

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    handleUpload(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"] },
    maxFiles: 5,
  });

  const handleUpload = async (files: File[]) => {
    try {
      setUploading(true);
      const resp = await fetch(`http://localhost:5001/api/ai/analyze`, {
        method: "POST",
        body: JSON.stringify({ files: files.map((f) => f.name) }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!resp.ok) {
        console.error("Upload failed:", resp.status, resp.statusText);
        console.log("Upload failed");
      } else {
        console.log("Upload successful" + (await resp.text()));
        // Simulate processing time
        setTimeout(() => {
          setRecipes(mockRecipes);
          setUploading(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files. Please try again.");
    }
  };

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
      <Navbar />

      {/* Main dashboard content */}
      <section
        className="hero"
        style={{ minHeight: "auto", paddingBottom: "4rem" }}
      >
        <div className="hero-inner" style={{ maxWidth: "1200px" }}>
          <div className="hero-tag" data-animate id="dashboard-tag">
            ✦ Your Recipe Dashboard
          </div>
          <h1
            data-animate
            id="dashboard-title"
            className={`anim hero-title ${isVisible("dashboard-title") ? "visible" : ""}`}
          >
            Upload your food photos,
            <br />
            get <span>gourmet recipes</span>
          </h1>
          <p
            data-animate
            id="dashboard-sub"
            className={`anim hero-sub ${isVisible("dashboard-sub") ? "visible" : ""}`}
          >
            Snap a picture of your ingredients and let our AI chef work its
            magic.
          </p>

          {/* Upload Area – styled like your feature cards */}
          <div
            {...getRootProps()}
            className={`step-card upload-area ${isDragActive ? "drag-active" : ""}`}
            style={{ cursor: "pointer", marginTop: "3rem", padding: "2rem" }}
            data-animate
            id="upload"
          >
            <input {...getInputProps()} />
            <div className="step-icon" style={{ fontSize: "4rem" }}>
              {isDragActive ? "📥" : "📸"}
            </div>
            <div className="step-title">
              {isDragActive
                ? "Drop your photos here"
                : "Drag & drop food images"}
            </div>
            <p className="step-desc">
              or click to browse (PNG, JPG up to 10MB)
            </p>
            {files.length > 0 && (
              <div style={{ marginTop: "1rem", color: "#2d6a4f" }}>
                {files.length} file{files.length > 1 ? "s" : ""} selected
              </div>
            )}
          </div>

          {/* Loading animation */}
          <AnimatePresence>
            {uploading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="step-card"
                style={{
                  marginTop: "2rem",
                  padding: "2rem",
                  textAlign: "center",
                }}
              >
                <div
                  className="step-icon"
                  style={{ animation: "spin 2s linear infinite" }}
                >
                  🥄
                </div>
                <div className="step-title">Cooking up your recipes...</div>
                <div
                  style={{
                    width: "80%",
                    height: "6px",
                    background: "#e9d8c0",
                    borderRadius: "3px",
                    margin: "1rem auto",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                    style={{ height: "100%", background: "#2d6a4f" }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                <div
                  className="features"
                  style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
                >
                  {recipes.map((recipe, index) => (
                    <motion.div
                      key={recipe.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="feature-card"
                      style={{ cursor: "pointer" }}
                      whileHover={{ y: -5 }}
                    >
                      <span className="feature-emoji">🍽️</span>
                      <div className="feature-title">{recipe.name}</div>
                      <p className="feature-desc">
                        <span
                          style={{ display: "block", marginBottom: "0.5rem" }}
                        >
                          ⏲️ {recipe.time} · {recipe.difficulty}
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
              No recipes yet — upload a photo to get started.
            </p>
          )}
        </div>
      </section>

      <hr className="ruled-divider" />

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          Made with <span>♥</span> and lots of garlic · FridgeChef © 2026
        </p>
      </footer>
    </div>
  );
}
