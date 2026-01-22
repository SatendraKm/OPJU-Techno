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

  /* CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
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
  }, []);

  return (
    <nav className="fixed top-2 left-0 w-full z-[9999] bg-transparent px-6 md:px-8 lg:px-16 flex justify-between h-16 items-center">
      {/* Logo */}
      <Link href="/">
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
          className="text-white"
        >
          ☰
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

            {/* Dropdown */}
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
        <div className="md:hidden absolute top-16 left-0 w-full bg-black/90 text-white p-4 space-y-4">

          <Link href="/">Home</Link>

          {/* Mobile Events Dropdown */}
          <div>
            <button
              onClick={() => setEventOpen(!eventOpen)}
              className="w-full text-left"
            >
              Events ▾
            </button>

            {eventOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/events#tech-event">
                  Technical Events
                </Link>
                <Link href="/events#non-tech-event">
                  Non-Technical Events
                </Link>
              </div>
            )}
          </div>

          <Link href="/about">About</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/junoon">Junoon</Link>
          <Link href="/team">Our Team</Link>

          <UserDropdown />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
