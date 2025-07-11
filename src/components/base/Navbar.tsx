"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!dropdownRef.current) return;

    if (!menuTl.current) {
      menuTl.current = gsap.timeline({ paused: true });
      menuTl.current
        .fromTo(
          dropdownRef.current,
          {
            clipPath: "inset(0% 50% 100% 50% round 12px)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 12px)",
            opacity: 1,
            duration: 0.2,
            ease: "power3.out",
          }
        )
        .fromTo(
          ".nav-link",
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.1,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.3"
        );
    }

    if (isOpen) {
      menuTl.current.play();
    } else {
      menuTl.current.reverse();
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-50">
      <div className="text-white text-2xl font-floopa">Floopa</div>

      <div className="relative">
        <button
          onClick={toggleMenu}
          className="relative z-50 text-white text-2xl p-2 rounded-full transition-transform duration-300"
        >
          {isOpen ? (
            <RxCross1 className="rotate-0 scale-110 transition-transform duration-300" />
          ) : (
            <RxHamburgerMenu className="rotate-0 scale-100 transition-transform duration-300" />
          )}
        </button>

        <div
          ref={dropdownRef}
          className="absolute right-0 mt-4 w-48 py-4 px-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl overflow-hidden pointer-events-none"
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          {[
            { label: "About", target: "about-section" },
            { label: "Tokenomics", target: "tokenomics-section" },
            { label: "FAQ", target: "faq-section" },
          ].map((item) => (
            <a
              key={item.label}
              href={`#${item.target}`}
              className="nav-link block text-lg mb-2 text-white font-floopa hover:underline transition"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
