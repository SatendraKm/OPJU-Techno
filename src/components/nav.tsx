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

  /* CLOSE DESKTOP DROPDOWN ON OUTSIDE CLICK */
  useEffect(() => {
    if (isOpen) return; // ⛔ Don't attach outside click when mobile menu is open

    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setEventOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen]);

  return (
    <nav className="fixed top-2 left-0 w-full z-[9999] bg-transparent px-6 md:px-8 lg:px-16 flex justify-between h-16 items-center">
      {/* Logo */}
      <Link href="/" onClick={() => setIsOpen(false)}>
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
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 bg-gradient-to-b from-[rgba(255,255,255,0.25)] to-[rgba(153,153,153,0)] backdrop-blur-md rounded-full p-2 pl-6 shadow-2xl">
        <div className="text-white text-lg flex space-x-6 relative">
          <Link href="/" className={pathname === "/" ? "text-[#FFCF67]" : ""}>
            Home
          </Link>

          {/* EVENTS CLICK DROPDOWN */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setEventOpen(!eventOpen)}
              className={`flex items-center gap-1 ${
                pathname.startsWith("/events")
                  ? "text-[#FFCF67]"
                  : "hover:text-[#FFCF67]"
              }`}
            >
              Events
              <span
                className={`transition-transform ${
                  eventOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {/* Desktop Dropdown */}
            {eventOpen && (
              <div className="absolute top-8 left-0 bg-black/90 text-white rounded-lg w-56 shadow-xl p-3 space-y-2 animate-fadeIn">
                <Link
                  href="/events#tech-event"
                  className="block hover:text-[#FFCF67]"
                  onClick={() => setEventOpen(false)}
                >
                  Technical Events
                </Link>

                <Link
                  href="/events#non-tech-event"
                  className="block hover:text-[#FFCF67]"
                  onClick={() => setEventOpen(false)}
                >
                  Non-Technical Events
                </Link>
              </div>
            )}
          </div>

          <Link href="/about">About</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/junoon">Junoon</Link>
          <Link href="/team">Our Team</Link>
        </div>

        <UserDropdown />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-black/95 backdrop-blur-xl text-white p-6 space-y-4 z-[10000] rounded-b-2xl shadow-2xl">
          <Link
            onClick={() => setIsOpen(false)}
            className="block py-2 text-lg"
            href="/"
          >
            Home
          </Link>

          {/* Mobile Events Dropdown */}
          <div>
            <button
              onClick={() => setEventOpen(!eventOpen)}
              className="w-full text-left py-2 text-lg flex justify-between items-center"
            >
              Events
              <span
                className={`${eventOpen ? "rotate-180" : ""} transition-transform`}
              >
                ▾
              </span>
            </button>

            {eventOpen && (
              <div className="ml-4 mt-2 space-y-2 border-l border-white/20 pl-4">
                <Link
                  href="/events#tech-event"
                  className="block py-2"
                  onClick={() => {
                    setIsOpen(false);
                    setEventOpen(false);
                  }}
                >
                  Technical Events
                </Link>

                <Link
                  href="/events#non-tech-event"
                  className="block py-2"
                  onClick={() => {
                    setIsOpen(false);
                    setEventOpen(false);
                  }}
                >
                  Non-Technical Events
                </Link>
              </div>
            )}
          </div>

          <Link
            onClick={() => setIsOpen(false)}
            className="block py-2 text-lg"
            href="/about"
          >
            About
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            className="block py-2 text-lg"
            href="/schedule"
          >
            Schedule
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            className="block py-2 text-lg"
            href="/junoon"
          >
            Junoon
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            className="block py-2 text-lg"
            href="/team"
          >
            Our Team
          </Link>

          <div className="pt-4 border-t border-white/20">
            <UserDropdown />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
