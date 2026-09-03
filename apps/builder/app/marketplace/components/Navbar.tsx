import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <header
      style={{
        borderBottom: "1px solid #e5e7eb",
        background: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        <img
          src="/images/Quantumberg-Logo.png"
          alt="Quantumberg Logo"
          width={100}
          height={48}
          style={{
            width: 100,
            height: 48,
            objectFit: "contain",
          }}
        />

        {/* Desktop Navigation */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
            }}
          >
            <Link to="/marketplace/templates">Templates</Link>
            <Link to="/marketplace/categories">Categories</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 28,
              padding: 0,
            }}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px 20px 20px",
            gap: 16,
            borderTop: "1px solid #e5e7eb",
            background: "#fff",
          }}
        >
          <Link to="/marketplace/templates" onClick={() => setMenuOpen(false)}>
            Templates
          </Link>

          <Link to="/marketplace/categories" onClick={() => setMenuOpen(false)}>
            Categories
          </Link>

          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
        </div>
      )}
    </header>
  );
}
