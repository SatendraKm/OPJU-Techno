"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";

const FooterSection = () => {
  return (
    <footer className="w-full bg-black text-white px-6 sm:px-10 lg:px-16 py-14 lg:py-20">
      {/* MAIN WRAPPER */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-8">

          {/* NAV LINKS */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base">
            <Link href="/about" className="hover:text-gray-400">
              About
            </Link>
            <Link href="/gallery" className="hover:text-gray-400">
              Gallery
            </Link>
            <Link href="/team" className="hover:text-gray-400">
              Team
            </Link>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex space-x-6">
            <Link
              href="https://www.facebook.com/share/15rh7M4fp4/"
              target="_blank"
            >
              <FaFacebookF
                className="hover:text-red-400 transition"
                size={22}
              />
            </Link>

            <Link href="https://wa.me/+918839171099" target="_blank">
              <FaWhatsapp className="hover:text-red-400 transition" size={22} />
            </Link>

            <Link
              href="https://www.instagram.com/technorollix?igsh=NTFybXp2bmVuOWFo"
              target="_blank"
            >
              <FaInstagram
                className="hover:text-red-400 transition"
                size={22}
              />
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
       <div className="w-full sm:w-44 lg:w-[50%] self-start lg:self-auto">
  <Image
    src="/testfile/technoambiation.png"
    alt="Techno Footer"
    width={300}
    height={300}
    className="object-contain w-full"
  />
</div>

      </div>

      {/* BOTTOM BAR */}
      <div className="mt-12 lg:mt-20 border-t border-white/10 pt-6 text-xs sm:text-sm text-gray-500">
        © 2026 TechnoAmbiation. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
