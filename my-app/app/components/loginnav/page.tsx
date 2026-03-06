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
        <Link href="/saved" className="nav-link nav-cta">
          Your Saved Recipes
        </Link>
        <Link href="/dashboard" className="nav-link nav-cta">
          Dashboard
        </Link>
        <Link href="/logout" className="nav-link nav-cta">
          Logout icon u put profile thingy here
        </Link>
      </div>
    </nav>
  );
};

export default page;
