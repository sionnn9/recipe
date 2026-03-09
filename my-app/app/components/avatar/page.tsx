"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ProfileDropdown = ({
  handleSignOut,
}: {
  handleSignOut: () => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      {/* Avatar Button */}
      <motion.button
        onClick={() => setShowDropdown(!showDropdown)}
        whileHover={{ scale: isMobile ? 1.05 : 1.09 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        style={{
          backgroundColor: showDropdown ? "#EAF0EB" : "transparent",
          border: "1.5px solid #8a8a8a",
          cursor: "pointer",
          padding: isMobile ? "0.35rem" : "0.45rem",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
          transition: "background 0.2s, border-color 0.2s",
        }}
      >
        <svg
          width={isMobile ? "24" : "26"}
          height={isMobile ? "24" : "26"}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="8" r="3.5" stroke="#444" strokeWidth="1.8" />
          <path
            d="M12 14c-4.5 0-7.5 2.2-7.5 4.2V19h15v-.8C19.5 16.2 16.5 14 12 14z"
            stroke="#444"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              right: isMobile ? "auto" : 0,
              left: isMobile ? "50%" : "auto",
              transform: isMobile ? "translateX(-50%)" : "none",
              background: "white",
              border: "1px solid #e8e8e8",
              borderRadius: "10px",
              boxShadow:
                "0 8px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
              zIndex: 1000,
              minWidth: isMobile ? "140px" : "148px",
              overflow: "hidden",
              padding: "4px",
            }}
          >
            <DropdownItem
              onClick={() => {
                handleSignOut();
                setShowDropdown(false);
              }}
              icon={
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 17l5-5-5-5M21 12H9M13 3H5a2 2 0 00-2 2v14a2 2 0 002 2h8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              label="Sign Out"
              danger
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Reusable dropdown item
const DropdownItem = ({
  onClick,
  icon,
  label,
  danger,
}: {
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
  danger?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        backgroundColor: hovered ? (danger ? "#fff1f1" : "#f5f5f5") : "#ffffff",
        color: hovered ? (danger ? "#d00" : "#111") : danger ? "#c00" : "#333",
      }}
      transition={{ duration: 0.15 }}
      style={{
        width: "100%",
        padding: "0.5rem 0.75rem",
        border: "none",
        borderRadius: "7px",
        textAlign: "left",
        cursor: "pointer",
        fontSize: "0.875rem",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        letterSpacing: "-0.01em",
      }}
    >
      {icon}
      {label}
    </motion.button>
  );
};

export default ProfileDropdown;
