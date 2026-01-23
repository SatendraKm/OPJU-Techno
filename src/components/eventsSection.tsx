"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const technical = [
  { imageUrl: "/testfile/codigo.svg", link: "/events/codigo" },
  { imageUrl: "/testfile/techlabnew.svg", link: "/events/techlab" },
  { imageUrl: "/testfile/robo.svg", link: "/events/robovation" },
  { imageUrl: "/testfile/ideathon.svg", link: "/events/ideathon" },
  { imageUrl: "/testfile/backtrace3.svg", link: "/events/reverseEng" },
  { imageUrl: "/testfile/design.svg", link: "/events/designathon" },
];

const nonTechnical = [
  { imageUrl: "/testfile/kalakritinew.svg", link: "/events/kalakriti" },
  { imageUrl: "/testfile/master.svg", link: "/events/master_chef" },
  { imageUrl: "/testfile/roadies.svg", link: "/events/roadies" },
  { imageUrl: "/testfile/antaragini.svg", link: "/events/antaragni" },
  { imageUrl: "/testfile/voice.svg", link: "/events/yuva-sabha" },
  { imageUrl: "/testfile/beat.svg", link: "/events/beat-battle" },
  { imageUrl: "/testfile/startup.svg", link: "/events/start-up-business-plan" },
  { imageUrl: "/testfile/riwayat4.svg", link: "/events/riywayat" },
  { imageUrl: "/testfile/aima3.svg", link: "/events/aima" },
];

const cards = [...technical, ...nonTechnical];

const EventsSection = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive((p) => (p - 1 + cards.length) % cards.length);
  const next = () => setActive((p) => (p + 1) % cards.length);

  const getPosition = (index: number) => {
    const total = cards.length;
    if (index === active) return "center";
    if (index === (active - 1 + total) % total) return "left";
    if (index === (active + 1) % total) return "right";
    return "hidden";
  };

  return (
    <section className="relative w-full min-h-screen px-10 sm:px-10 lg:px-16 py-14 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 -z-10 bg-[#376080]" />

      {/* HEADER */}
      <div className="max-w-xl space-y-3">
        <h1 className="text-2xl sm:text-4xl font-bold text-white">Events</h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Explore all technical and non-technical events of TechnoAmbition.
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative mt-40 w-full h-[260px] sm:h-[300px] lg:h-[340px] flex items-center justify-center mb-20">
        <button
          onClick={prev}
          className="absolute left-2 sm:left-6 z-50 bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={next}
          className="absolute right-2 sm:right-6 z-50 bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-full"
        >
          <ChevronRight size={22} />
        </button>

        {/* IMAGES */}
        <div className="relative w-full h-full flex items-center justify-center mt-15">
          {cards.map((card, i) => {
            const pos = getPosition(i);

            return (
              <div
                key={i}
                className={`
                  absolute transition-all duration-700 ease-in-out
                  ${pos === "center" && "z-20 scale-110 sm:scale-125"}
                  ${pos === "left" && "z-10 -translate-x-44 sm:-translate-x-72 scale-90 opacity-60"}
                  ${pos === "right" && "z-10 translate-x-44 sm:translate-x-72 scale-90 opacity-60"}
                  ${pos === "hidden" && "opacity-0 pointer-events-none scale-75"}
                `}
              >
                <Link href={card.link}>
                  <Image
                    src={card.imageUrl}
                    alt="event"
                    width={380}
                    height={240}
                    className="object-contain cursor-pointer hover:scale-105 transition"
                    priority={pos === "center"}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
