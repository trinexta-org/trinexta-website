"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s, backdrop-filter 0.3s",
        background: scrolled ? "rgba(246,251,255,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(226,232,240,0.7)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 4px rgba(10,35,62,0.06)" : "none",
      }}
    >
      <nav
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #0a233e 0%, #5c92b8 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8L8 2L14 8L8 14L2 8Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="8" cy="8" r="2" fill="white" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#0a233e",
              letterSpacing: "-0.02em",
            }}
          >
            TRINEXTA
          </span>
        </a>

        {/* Links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {["Services", "Processus", "Témoignages", "Contact"].map((label) => (
            <li key={label}>
              <a
                href={`#${label.toLowerCase().replace("é", "e").replace("î", "i")}`}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#64748b",
                  textDecoration: "none",
                  padding: "6px 12px",
                  borderRadius: 6,
                  transition: "color 0.15s, background 0.15s",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#0a233e";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(10,35,62,0.04)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#64748b";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13.5,
            fontWeight: 600,
            color: "white",
            background: "#0a233e",
            borderRadius: 8,
            padding: "9px 18px",
            textDecoration: "none",
            transition: "background 0.18s, transform 0.18s, box-shadow 0.18s",
          }}
          onMouseOver={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "#102f4d";
            el.style.transform = "translateY(-1px)";
            el.style.boxShadow = "0 4px 16px rgba(10,35,62,0.22)";
          }}
          onMouseOut={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = "#0a233e";
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "none";
          }}
        >
          Prendre rendez-vous
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
