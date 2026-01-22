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
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none z-30 w-[420px] md:w-[520px] lg:w-[620px] h-[260vh]">
          <Image
            src="/testfile/torch2.png"
            alt="Divine Pillar"
            fill
            priority
            className="object-contain object-bottom translate-y-[6%]"
          />
        </div>

        {/* ========== LEFT TEXT CONTENT ========== */}
       {/* ========== LEFT CONTENT STACK (TEXT + LOGO + BUTTON) ========== */}
<div className="absolute left-6 md:left-16 bottom-[14%] z-[80] flex flex-col items-start gap-6 max-w-[90%] md:max-w-md">

 <p className="text-white text-lg md:text-2xl font-semibold opacity-95 leading-snug">
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

  <Link href="/dashboard">
    <button className="px-10 py-3 md:px-12 md:py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition shadow-xl">
      Register
    </button>
  </Link>

</div>

        {/* ========== CLOUD LAYERS ========== */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none z-50">

          {/* cloud.svg */}
          <div className="absolute left-0 bottom-0">
            <Image
              src="/testfile/cloud.svg"
              alt="Cloud Left"
              width={900}
              height={300}
              priority
              className="opacity-80"
            />
          </div>

          {/* cloud2.svg */}
          <div className="absolute right-0 bottom-0">
            <Image
              src="/testfile/cloud2.svg"
              alt="Cloud Right"
              width={900}
              height={300}
              priority
              className="opacity-95"
            />
          </div>

          {/* cloud3.svg NEW */}
          <div className="absolute left-1/3 bottom-6">
            <Image
              src="/testfile/cloud3.svg"
              alt="Cloud Center"
              width={800}
              height={280}
              priority
              className="opacity-85"
            />
          </div>

        </div>

      </section>

      {/* ================= REST OF SITE ================= */}

      <section className="relative ">
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
