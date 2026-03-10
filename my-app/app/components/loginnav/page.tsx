"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ProfileDropdown } from "../avatar/page";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Page = () => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleSignOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (res.ok) {
        localStorage.removeItem("dashboardRecipes"); // ✅ clean up
        router.push("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <nav className={`nav ${scrollY > 20 ? "scrolled" : ""}`}>
        <a href="/" className="nav-brand">
          FridgeChef
        </a>

        {/* Desktop links */}

        {/* Mobile right side */}
        <div
          className="mobile-only"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,

              borderColor: "#E8C98A",
            }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            animate={{
              background: menuOpen ? "#FDF6EC" : "transparent",
              borderColor: menuOpen ? "#E8C98A" : "#d4d4d4",
            }}
            transition={{ duration: 0.25 }}
            style={{
              border: "2px solid #140808",
              borderRadius: "10px",
              padding: "8px 10px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Warm ripple bg on open */}
            <motion.span
              animate={{
                scale: menuOpen ? 8 : 0,
                opacity: menuOpen ? 0.12 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#201c17",
                pointerEvents: "none",
              }}
            />

            {/* Top bar */}
            <motion.span
              animate={
                menuOpen
                  ? { rotate: 45, y: 7, width: "20px" }
                  : { rotate: 0, y: 0, width: "20px" }
              }
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
              style={{
                display: "block",
                height: "2px",
                background: menuOpen ? "#C47B1E" : "#555",
                borderRadius: "2px",
                transformOrigin: "center",
              }}
            />

            {/* Middle bar */}
            <motion.span
              animate={
                menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }
              }
              transition={{ duration: 0.18 }}
              style={{
                display: "block",
                width: "14px",
                height: "2px",
                background: "#555",
                borderRadius: "2px",
                alignSelf: "flex-start", // offset for visual interest
              }}
            />

            {/* Bottom bar */}
            <motion.span
              animate={
                menuOpen
                  ? { rotate: -45, y: -7, width: "20px" }
                  : { rotate: 0, y: 0, width: "20px" }
              }
              transition={{ type: "spring", stiffness: 340, damping: 26 }}
              style={{
                display: "block",
                height: "2px",
                background: menuOpen ? "#C47B1E" : "#555",
                borderRadius: "2px",
                transformOrigin: "center",
              }}
            />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(20,12,4,0.35)",
                zIndex: 998,
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "75vw",
                maxWidth: "290px",
                background: "#FFFDF8",
                zIndex: 999,
                display: "flex",
                flexDirection: "column",
                boxShadow: "-12px 0 48px rgba(0,0,0,0.12)",
                overflow: "hidden",
              }}
            >
              {/* Decorative top strip */}
              <div
                style={{
                  height: "4px",
                  background:
                    "linear-gradient(90deg, #E8A838, #D4622A, #C47B1E)",
                }}
              />

              <div
                style={{
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "2rem",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: "1.15rem",
                        color: "#1a1008",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      🍴 FridgeChef
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "#aaa",
                        fontWeight: 400,
                        marginTop: "1px",
                      }}
                    >
                      What's cooking today?
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      background: "#f5f0e8",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      color: "#888",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    ✕
                  </motion.button>
                </div>

                {/* Nav links */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  {[
                    {
                      href: "/saved",
                      label: "Saved Recipes",
                      icon: "⭐",
                      desc: "Your favourites",
                    },
                    {
                      href: "/dashboard",
                      label: "Dashboard",
                      icon: "🍳",
                      desc: "Browse & generate",
                    },
                  ].map(({ href, label, icon, desc }, i) => (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.07 + 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 28,
                      }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.85rem",
                          padding: "0.85rem 1rem",
                          borderRadius: "12px",
                          background: "white",
                          border: "1px solid #EDE8DF",
                          color: "#1a1008",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                          textDecoration: "none",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                          transition: "background 0.15s, transform 0.15s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#FDF6EC")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "white")
                        }
                      >
                        <span
                          style={{
                            fontSize: "1.1rem",
                            width: "34px",
                            height: "34px",
                            background: "#FDF0D8",
                            borderRadius: "9px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {icon}
                        </span>
                        <div>
                          <div>{label}</div>
                          <div
                            style={{
                              fontSize: "0.72rem",
                              color: "#aaa",
                              fontWeight: 400,
                            }}
                          >
                            {desc}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <div
                  style={{
                    margin: "1.25rem 0",
                    height: "1px",
                    background: "#EDE8DF",
                  }}
                />

                {/* Bottom section */}
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {/* Small recipe tip */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                      padding: "0.85rem 1rem",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #FDF6EC, #FDE8C8)",
                      border: "1px solid #F0D9A8",
                      fontSize: "0.78rem",
                      color: "#8B5E1A",
                      marginBottom: "0.5rem",
                      lineHeight: 1.5,
                    }}
                  >
                    😎 <strong>Tip:</strong> Save your favorite recipes so you
                    can access them and make the food you love whenever you
                    want.
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      handleSignOut();
                      setMenuOpen(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "0.85rem 1rem",
                      borderRadius: "12px",
                      border: "1px solid #FCCACA",
                      background: "white",
                      color: "#B91C1C",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "#FFF5F5")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.background =
                        "white")
                    }
                  >
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        background: "#FEE2E2",
                        borderRadius: "7px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.85rem",
                      }}
                    >
                      →
                    </span>
                    Sign Out
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .desktop-only { display: flex; }
        .mobile-only { display: none; }

        @media (max-width: 640px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Page;
