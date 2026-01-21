"use client";
import React, { useState, useRef, } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

const cards = [
  {
    title: "Riwayat",
    desc: "Cultural Showcase",
    video: "/testfile/riwayat.mp4",
  },
  {
    title: "Antaragni",
    desc: "Dance & Performance",
    video: "/testfile/antaraginni.mp4",
  },
  {
    title: "Junoon",
    desc: "Music & Energy",
    video: "/testfile/event.mp4",
  },
];

const EventsSection = () => {
  const [active, setActive] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const prev = () => {
    setActive((p) => (p - 1 + cards.length) % cards.length);
    stopAll();
  };

  const next = () => {
    setActive((p) => (p + 1) % cards.length);
    stopAll();
  };

  const stopAll = () => {
    videoRefs.current.forEach((video) => {
      if (!video) return;
      video.pause();
      video.currentTime = 0;
    });
    setPlayingIndex(null);
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = (index: number) => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;

      if (i === index) {
        if (playingIndex === index) {
          video.pause();
          setPlayingIndex(null);
        } else {
          video.currentTime = 0;
          video.play();
          setPlayingIndex(index);
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  const getPosition = (index: number) => {
    const total = cards.length;
    if (index === active) return "center";
    if (index === (active - 1 + total) % total) return "left";
    if (index === (active + 1) % total) return "right";
    return "hidden";
  };

  return (
    <section className="relative w-full min-h-screen px-6 sm:px-10 lg:px-16 py-14 lg:py-20 overflow-hidden">
      {/* Gradient Background */}
     <div className="absolute inset-0 -z-10 bg-[#376080]" />


      {/* HEADER */}
      <div className="max-w-xl space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">Events</h1>
        <p className="text-gray-300">
          Experience culture, music and performance at TechnoAmbition.
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative mt-24 w-full h-[340px] flex items-center justify-center">
        {/* LEFT */}
        <button
          onClick={prev}
          className="absolute left-6 z-50 bg-white/10 hover:bg-white/20 p-3 rounded-full"
        >
          <ChevronLeft size={28} />
        </button>

        {/* RIGHT */}
        <button
          onClick={next}
          className="absolute right-6 z-50 bg-white/10 hover:bg-white/20 p-3 rounded-full"
        >
          <ChevronRight size={28} />
        </button>

        {/* CARDS */}
        <div className="relative w-full h-full flex items-center justify-center">
          {cards.map((card, i) => {
            const pos = getPosition(i);
            const isCenter = pos === "center";

            return (
              <div
                key={i}
                className={`
                  absolute transition-all duration-700 ease-in-out
                  ${pos === "center" && "z-50 scale-125"}
                  ${pos === "left" && "z-20 -translate-x-72 scale-95"}
                  ${pos === "right" && "z-20 translate-x-72 scale-95"}
                  ${pos === "hidden" && "opacity-0"}
                `}
              >
                {/* CARD */}
                <div
                  onClick={() => isCenter && handlePlay(i)}
                  className="relative cursor-pointer w-[380px] h-[240px] rounded-2xl overflow-hidden border border-yellow-400/50 shadow-xl bg-black"
                >
                  {/* VIDEO */}
                  <video
                    ref={(el) => {
  videoRef.current = el;
}}

                    src={card.video}
                    poster="/testfile/event.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                    playsInline
                    loop
                  />

                  {/* DARK GRADIENT */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                  {/* PLAY BUTTON */}
                  {isCenter && playingIndex !== i && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center hover:scale-110 transition">
                        <Play className="text-black ml-1" size={40} />
                      </div>
                    </div>
                  )}

                  {/* TEXT */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <h2 className="text-xl font-bold text-white">{card.title}</h2>
                    <p className="text-sm text-gray-300">{card.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
