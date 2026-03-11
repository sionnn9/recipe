"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  Gauge,
  ListChecks,
  Terminal,
  ChefHat,
} from "lucide-react";
import "../../components/home.css"; // Reuse your existing styles
import Loginnav from "../../components/loginnav/page";
//import { LikeComponent } from "@/components/LikeComponent";
import { useSearchParams } from "next/navigation";

export default function RecipeDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState<any>(null);
  const [pointwise, setPointwise] = useState(false);
  const searchParams = useSearchParams();
  // Fetch recipe data from your backend
  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      // Case 1: AI-generated preview — read from sessionStorage
      if (id === "preview") {
        const index = searchParams.get("index");
        const stored = sessionStorage.getItem(`preview_recipe_${index}`);
        if (stored) {
          setRecipe(JSON.parse(stored));
        } else {
          console.error("No preview recipe found");
          router.push("/dashboard");
        }
        return;
      }

      // Case 2: saved recipe — fetch from DB
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}`,
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Failed to fetch recipe");
        }

        const data = await res.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        router.push("/dashboard"); // redirect on failure
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe)
    return <div className="home p-20 text-center">Initializing Chef...</div>;

  return (
    <div className="home">
      <div className="notebook-bg" />
      <Loginnav />

      <main className="section" style={{ paddingTop: "120px" }}>
        <div className="section-inner" style={{ maxWidth: "900px" }}>
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="btn-secondary"
            style={{
              marginBottom: "2rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ArrowLeft size={16} /> Back to Fridge
          </button>

          {/* Header Area */}
          <div
            className="mockup-card"
            style={{ marginBottom: "3rem", padding: "3rem" }}
          >
            <div className="mockup-holes">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="mockup-hole" />
              ))}
            </div>

            <div className="flex justify-between items-start">
              <div>
                <div className="section-tag">✦ Michelin Star Quality</div>
                <h1
                  className="section-title"
                  style={{ fontSize: "2rem", textAlign: "left" }}
                >
                  {recipe.recipeName}
                </h1>
              </div>
            </div>

            <div className="mockup-ingredients" style={{ marginTop: "1rem" }}>
              <span className="mockup-tag">⏲️ {recipe.prepTime}</span>
              <span className="mockup-tag">🔥 {recipe.difficulty}</span>
            </div>
          </div>

          <hr className="ruled-divider" />

          {/* Content Grid */}
          <div
            className="recipe-detail-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              alignItems: "start",
              gap: "1.5rem",
            }}
          >
            {/* Ingredients Side */}
            <div className="step-card" style={{ textAlign: "left" }}>
              <div className="step-icon">🛒</div>
              <div className="step-title">Ingredients</div>
              <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
                {recipe.ingredients.map((ing: string, i: number) => (
                  <li
                    key={i}
                    style={{
                      padding: "8px 0",
                      borderBottom: "1px dashed #ccc",
                      fontSize: "0.9rem",
                    }}
                  >
                    • {ing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions Side */}
            <div
              style={{
                marginTop: "1rem",
                background: "rgba(255,253,245,0.95)",
                border: "1.5px solid #e8d9c0",
                borderRadius: "16px",
                boxShadow: "0 4px 24px rgba(139,90,43,0.07), 3px 3px 0 #e8d9c0",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "3px",
                  background:
                    "linear-gradient(90deg, #E8A838, #D4622A, #C47B1E)",
                }}
              />

              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "1.25rem",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "white",
                        border: "2px solid #e8d9c0",
                        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
                      }}
                    />
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {["Normal", "Step by Step"].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setPointwise(mode === "Step by Step")}
                      style={{
                        padding: "0.4rem 1rem",
                        borderRadius: "999px",
                        border: "1.5px solid",
                        borderColor:
                          (mode === "Step by Step") === pointwise
                            ? "#C47B1E"
                            : "#ddd",
                        background:
                          (mode === "Step by Step") === pointwise
                            ? "#FDF0D8"
                            : "white",
                        color:
                          (mode === "Step by Step") === pointwise
                            ? "#8B5E1A"
                            : "#999",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {mode === "Step by Step" ? "🔢 " : "📜 "}
                      {mode}
                    </button>
                  ))}
                </div>

                {!pointwise && (
                  <div
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(transparent, transparent 31px, #f0e6d3 31px, #f0e6d3 32px)",
                      backgroundSize: "100% 32px",
                      padding: "0.25rem 0.5rem 0.25rem 1rem",
                      borderLeft: "3px solid #f4b86e",
                    }}
                  >
                    <div
                      className="mockup-step"
                      style={{
                        whiteSpace: "pre-line",
                        fontSize: "1rem",
                        lineHeight: 2,
                        color: "#3a2412",
                      }}
                    >
                      {Array.isArray(recipe.instructions)
                        ? recipe.instructions.join("\n")
                        : recipe.instructions}
                    </div>
                  </div>
                )}

                {pointwise && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.85rem",
                    }}
                  >
                    {(Array.isArray(recipe.instructions)
                      ? recipe.instructions
                      : recipe.instructions.split("\n").filter(Boolean)
                    ).map((step: string, i: number) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          gap: "1rem",
                          alignItems: "flex-start",
                          padding: "1rem 1.1rem",
                          background: "white",
                          borderRadius: "12px",
                          border: "1px dashed #d4b896",
                        }}
                      >
                        <span
                          style={{
                            minWidth: "30px",
                            height: "30px",
                            background:
                              "linear-gradient(135deg, #E8A838, #C47B1E)",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontWeight: 800,
                            fontSize: "0.78rem",
                            flexShrink: 0,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "1rem",
                            color: "#3a2412",
                            lineHeight: 1.75,
                            fontWeight: 500,
                          }}
                        >
                          {step.replace(/^\d+[\.\)]\s*/, "")}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <style>{`
  .recipe-detail-grid {
    grid-template-columns: 1fr 2fr;
  }
  @media (max-width: 640px) {
    .recipe-detail-grid {
      grid-template-columns: 1fr !important;
    }
  }
`}</style>

          {/* Chef's Note */}
          <div
            className="feature-card"
            style={{ marginTop: "3rem", background: "rgba(244, 162, 97, 0.1)" }}
          >
            <span className="feature-emoji">💡</span>
            <div className="feature-title">Chef's Pro Tip</div>
            <p className="feature-desc">
              Always taste as you go. For this {recipe.title}, ensuring your
              seasoning is balanced at every step makes the difference between a
              good meal and a great one.
            </p>
          </div>
        </div>
      </main>

      <footer className="footer" style={{ marginTop: "5rem" }}>
        <p className="footer-text">FridgeChef Internal Protocol © 2026</p>
      </footer>
    </div>
  );
}
