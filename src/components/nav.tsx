"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropdown from "./user-dropdown";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEventOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Smooth scroll for hash links if already on /events
  const scrollToHash = (hash: string) => {
    if (pathname === "/events") {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Close mobile menu and dropdown
  const closeAll = () => {
    setIsOpen(false);
    setEventOpen(false);
  };

  return (
    <nav className="fixed top-2 left-0 w-full z-[9999] bg-transparent px-6 md:px-8 lg:px-16 flex justify-between h-16 items-center">
      {/* Logo */}
      <Link href="/" onClick={closeAll}>
        <Image
          priority
          src="/opjulogo.png"
          alt="opju"
          width={90}
          height={40}
          className="md:h-[60px] md:w-auto"
        />
      </Link>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 bg-gradient-to-b from-[rgba(255,255,255,0.25)] to-[rgba(153,153,153,0)] backdrop-blur-md rounded-full p-2 pl-6 shadow-2xl">
        <div className="text-white text-lg flex space-x-6 relative">
          <Link href="/" onClick={closeAll} className={pathname === "/" ? "text-[#FFCF67]" : ""}>
            Home
          </Link>

          {/* Desktop Events Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setEventOpen(!eventOpen)}
              className={`flex items-center gap-1 ${
                pathname.startsWith("/events") ? "text-[#FFCF67]" : "hover:text-[#FFCF67]"
              }`}
            >
              Events
              <span className={`transition-transform ${eventOpen ? "rotate-180" : ""}`}>▾</span>
            </button>

            {eventOpen && (
              <div className="absolute top-8 left-0 bg-black/95 text-white rounded-lg w-56 shadow-xl p-3 space-y-2 z-[9999]">
                <Link
                  href="/events#tech-event"
                  className="block hover:text-[#FFCF67]"
                  onClick={() => { closeAll(); scrollToHash("#tech-event"); }}
                >
                  Technical Events
                </Link>
                <Link
                  href="/events#non-tech-event"
                  className="block hover:text-[#FFCF67]"
                  onClick={() => { closeAll(); scrollToHash("#non-tech-event"); }}
                >
                  Non-Technical Events
                </Link>
              </div>
            )}
          </div>

          <Link href="/about" onClick={closeAll}>About</Link>
          <Link href="/schedule" onClick={closeAll}>Schedule</Link>
          <Link href="/junoon" onClick={closeAll}>Junoon</Link>
          <Link href="/team" onClick={closeAll}>Contact US</Link>
        </div>

        <UserDropdown />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-black/95 backdrop-blur-xl text-white p-6 space-y-4 z-[10000] shadow-2xl rounded-b-2xl">
          <Link href="/" onClick={closeAll} className="block py-2 text-lg">
            Home
          </Link>

          {/* Mobile Events Dropdown */}
          <div>
            <a href="/events">
              <button
              className="w-full text-left py-2 text-lg flex justify-between items-center"
            >
              Events
    
            </button>
            </a>

          </div>

          <Link href="/about" onClick={closeAll} className="block py-2 text-lg">About</Link>
          <Link href="/schedule" onClick={closeAll} className="block py-2 text-lg">Schedule</Link>
          <Link href="/junoon" onClick={closeAll} className="block py-2 text-lg">Junoon</Link>
          <Link href="/team" onClick={closeAll} className="block py-2 text-lg">Contact </Link>

          <div className="pt-4 border-t border-white/20">
            <UserDropdown />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
