"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
const page = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
  );
};

export default page;
