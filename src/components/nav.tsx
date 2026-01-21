"use client"; // Needed for Next.js 13+ App Router if using useState

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropdown from "./user-dropdown";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-2 left-0 w-full z-20 bg-transparent px-6 md:px-8 lg:px-16 flex justify-between h-16 items-center shadow-black">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href={"/"}>
          <Image
            priority
            src="/opjulogo.png"
            alt="opju"
            width={90}
            height={40}
            className="md:h-[60px] md:w-auto" // setting width to auto when height changes
          />
        </Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {/* Icon */}
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-2 lg:space-x-6 bg-gradient-to-b from-[rgba(255,255,255,0.25)] to-[rgba(153,153,153,0)] backdrop-blur-md rounded-full p-2 pl-4 lg:pl-6 shadow-2xl">
        <div className="text-white text-sm lg:text-xl flex space-x-2 lg:space-x-6">
          <Link
            href="/"
            className={
              pathname === "/" ? "text-[#FFCF67]" : "hover:text-[#FFCF67]"
            }
          >
            Home
          </Link>
          <Link
            href="/events"
            className={
              pathname === "/events" ? "text-[#FFCF67]" : "hover:text-[#FFCF67]"
            }
          >
            Events
          </Link>
          <Link
            href="/about"
            className={
              pathname === "/about" ? "text-[#FFCF67]" : "hover:text-[#FFCF67]"
            }
          >
            About
          </Link>
          <Link
            href="/schedule"
            className={
              pathname === "/schedule"
                ? "text-[#FFCF67]"
                : "hover:text-[#FFCF67]"
            }
          >
            Schedule
          </Link>
          <Link
            href="/junoon"
            className={
              pathname === "/junoon" ? "text-[#FFCF67]" : "hover:text-[#FFCF67]"
            }
          >
            Junoon
          </Link>
          <Link
  href="/team"
  className={
    pathname === "/team" ? "text-[#FFCF67]" : "hover:text-[#FFCF67]"
  }
>
  Our Team
</Link>

        </div>

        {/* Login Button */}
        <UserDropdown />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-black bg-opacity-90 text-white p-4 rounded-lg space-y-4">
          <Link href="/" className="block hover:text-orange-500">
            Home
          </Link>
          <Link href="/events" className="block hover:text-[#FFCF67]">
            Events
          </Link>
          <Link href="/about" className="block hover:text-[#FFCF67]">
            About
          </Link>
          <Link href="/schedule" className="block hover:text-[#FFCF67]">
            Schedule
          </Link>
          <Link href="/junoon" className="block hover:text-[#FFCF67]">
            Junoon
          </Link>
          <Link href="/team" className="block hover:text-[#FFCF67]">
            Our team
          </Link>

          {/* Login Button */}
          <UserDropdown />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
