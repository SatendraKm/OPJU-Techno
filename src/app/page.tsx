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
    <div className="relative w-full">

{/* PILLAR – middle layer */}
<div className="absolute inset-y-0 left-1/2 -ml-[40%] w-10/12 z-10 pointer-events-none">


  <div className="relative w-full h-full">
    <Image
      src="/testfile/pillar.svg"
      alt="Divine Pillar"
      fill
      priority
      className="object-contain"
      style={{ objectPosition: "top center" }}
    />
  </div>
</div>

      {/* ALL CONTENT ABOVE PILLAR */}
      <div className="relative">

        {/* HERO SECTION */}
        <div className="w-full h-screen overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full h-screen">
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

        {/* SCROLL TEXT */}
        <div className="w-full overflow-hidden bg-white py-8">
          <div className="whitespace-nowrap animate-marquee text-black text-6xl font-serif font-semibold tracking-wide">
            THE DIVINE CORE &nbsp;&nbsp;&nbsp;&nbsp; THE DIVINE CORE &nbsp;&nbsp;&nbsp;&nbsp; THE DIVINE CORE
          </div>

          <style jsx>{`
            .animate-marquee {
              display: inline-block;
              animation: marquee 25s linear infinite;
            }
            @keyframes marquee {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
          `}</style>
        </div>

        {/* EVENT SECTION */}
<section className="relative mt-28">

          <EventSection />
        </section>

        {/* ABOUT SECTION */}
        <section>
          <AboutSection />
        </section>
      </div>

      {/* FOOTER */}
      <section>
        <Footer />
      </section>
    </div>
  );
}
