"use client";

import Image from "next/image";
import AboutSection from "@/components/aboutSection";
import EventSection from "@/components/eventsSection";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full min-h-screen overflow-hidden isolate">

        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#021a3a] via-[#053b6f] to-[#0a5c8f]" />

        {/* ========== HUGE CENTER PILLAR ========== */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none z-30 w-[420px] md:w-[520px] lg:w-[600px] h-[80vh]">
          <Image
            src="/testfile/torch3.svg"
            alt="Divine Pillar"
            fill
            priority
            className="object-contain object-bottom translate-y-[6%]"
          />
        </div>

        {/* ========== LEFT TEXT + LOGO + MOBILE BUTTON ========== */}
        <div className="absolute left-6 md:left-16 bottom-[14%] z-[80] flex flex-col items-start gap-6 max-w-[90%] md:max-w-md">

       <p className="text-white text-xs sm:text-sm md:text-xl font-light opacity-95 leading-snug max-w-[220px] sm:max-w-[300px] md:max-w-md">
  Central India&apos;s Biggest Annual Techno-Cultural Management Fest
</p>



          <Image
            src="/testfile/newlogo.png"
            alt="Techno Ambition Logo"
            width={400}
            height={120}
            priority
            className="object-contain w-[260px] md:w-[400px]"
          />

          {/* MOBILE REGISTER BUTTON */}
          <Link href="/dashboard" className="md:hidden">
  <button className="mt-2 px-6 py-2 rounded-full bg-white text-black font-semibold shadow-xl text-center active:scale-95 transition">
    Register
  </button>
</Link>

        </div>

        {/* ========== RIGHT REGISTER BUTTON (DESKTOP ONLY) ========== */}
        <div className="hidden md:block absolute right-6 md:right-16 bottom-[14%] z-[80]">
          <Link href="/dashboard"> <button className="px-10 py-3 md:px-12 md:py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition shadow-xl">
              Register
            </button>
          </Link>
        </div>

        {/* ========== CLOUD SECTION ========== */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none z-50 h-[700px] md:h-[900px]">
          <Image
            src="/testfile/cloudnew4.svg"
            alt="Cloud Layer"
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>

      </section>

      {/* ================= REST OF SITE ================= */}

      <section className="relative mt-0">
        <EventSection />
      </section>

      <section>
        <AboutSection />
      </section>

      <Footer />

      {/* MARQUEE STYLES */}
      <style>{`
        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 16s linear infinite;
        }
        .marquee-track span {
          white-space: nowrap;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

    </div>
  );
}
