"use client";

import AboutSection from "@/components/aboutSection";
import EventSection from "@/components/eventsSection";
import Footer from "@/components/footer";
import Image from "next/image";

export default function Home() {
  const heroImages = [
    "/testfile/Hero1.png",
    "/testfile/Hero2.png",
    "/testfile/Hero3.png",
    "/testfile/Hero4.png",
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* PILLAR */}
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none z-10">
        <div
          className="
            absolute 
            top-[-8%] sm:top-[-10%] lg:top-[-12%]
            left-1/2 
            w-[150%] sm:w-[95%] lg:w-[85%] xl:w-[75%]
            h-[300%] sm:h-[120%] lg:h-[125%]
            -translate-x-[19%]
            sm:-translate-x-[30%]
            md:-translate-x-[30%]
            xl:-translate-x-[19%]
            lg:-translate-x-[19%]
          "
        >
          <Image
            src="/testfile/pillar.png"
            alt="Divine Pillar"
            fill
            priority
            className="object-contain object-top"
          />
        </div>
      </div>

      {/* TEXT OVERLAY */}
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none z-20">
        <div className="relative w-full h-screen flex items-center justify-center">
          <p
            className="
            text-white text-center font-serif font-semibold
            text-2xl sm:text-sm md:text-base lg:text-lg xl:text-xl
            px-4 max-w-lg sm:max-w-lg lg:max-w-xl
            leading-relaxed tracking-wide
            absolute
            top-[45%] sm:top-[38%] md:top-[40%] lg:top-[20%]
            left-1/2 -translate-x-1/2
          "
          >
            Central India&apos;s Biggest Annual Techno-Cultural Management Fest
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative">
        {/* HERO */}
        <div className="w-full min-h-[100svh] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full min-h-[100svh]">
            {heroImages.map((src, i) => (
              <div
                key={i}
                className={`relative w-full h-full overflow-hidden ${
                  i > 0 ? "hidden md:block" : ""
                } ${i > 1 ? "hidden lg:block" : ""}`}
              >
                <Image
                  src={src}
                  alt={`Hero ${i + 1}`}
                  fill
                  priority
                  unoptimized
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CONTINUOUS MARQUEE */}
        <div className="w-full overflow-hidden bg-white py-6 sm:py-8">
          <div className="marquee-wrapper">
            <div className="marquee-track text-black text-3xl sm:text-4xl lg:text-6xl font-serif font-semibold tracking-wide">
              
              <span>
                THE DIVINE CORE &nbsp;&nbsp;&nbsp;&nbsp;
                THE DIVINE CORE &nbsp;&nbsp;&nbsp;&nbsp;
                THE DIVINE CORE &nbsp;&nbsp;&nbsp;&nbsp;
              </span>

              <span>
                THE DIVINE CORE &nbsp;&nbsp;&nbsp;&nbsp;
                THE DIVINE CORE &nbsp;&nbsp;&nbsp;&nbsp;
                THE DIVINE CORE &nbsp;&nbsp;&nbsp;&nbsp;
              </span>

            </div>
          </div>
        </div>

        {/* SECTIONS */}
        <section className="relative mt-20 sm:mt-28">
          <EventSection />
        </section>

        <section>
          <AboutSection />
        </section>
      </div>

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
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
