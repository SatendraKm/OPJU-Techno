"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Volume2, VolumeX } from "lucide-react";

const cards = [
  { title: "Riwayat", desc: "Cultural Showcase", video: "/testfile/riwayat.mp4" },
  { title: "Antaragni", desc: "Dance & Performance", video: "/testfile/antaraginni.mp4" },
  { title: "Junoon", desc: "Music & Energy", video: "/testfile/event.mp4" },
  { title: "Techlab", desc: "Innovation", video: "/testfile/event.mp4" },
  { title: "Roadies", desc: "Adventure", video: "/testfile/event.mp4" },
  { title: "Beat Battle", desc: "Music", video: "/testfile/event.mp4" },
  { title: "Backtrace", desc: "Coding", video: "/testfile/event.mp4" },
  { title: "Designathon", desc: "Creativity", video: "/testfile/event.mp4" },
];

const EventsSection = () => {
  const [active, setActive] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [muted, setMuted] = useState(true);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  /* ---------- VIEW OBSERVER ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------- AUTO PLAY CENTER ---------- */
  useEffect(() => {
    if (!inView) {
      stopAll();
      return;
    }

    const video = videoRefs.current[active];
    if (video) {
      stopAll();
      video.currentTime = 0;
      video.muted = muted;
      video.play();
      setPlayingIndex(active);
    }
  }, [active, inView]);

  /* ---------- APPLY MUTE ---------- */
  useEffect(() => {
    const video = videoRefs.current[active];
    if (video) {
      video.muted = muted;
    }
  }, [muted, active]);

  const prev = () => setActive((p) => (p - 1 + cards.length) % cards.length);
  const next = () => setActive((p) => (p + 1) % cards.length);

  const stopAll = () => {
    videoRefs.current.forEach((v) => {
      if (!v) return;
      v.pause();
      v.currentTime = 0;
    });
    setPlayingIndex(null);
  };

  const handlePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingIndex === index) {
      video.pause();
      setPlayingIndex(null);
    } else {
      stopAll();
      video.muted = muted;
      video.play();
      setPlayingIndex(index);
    }
  };

  const toggleMute = () => setMuted((p) => !p);

  const getPosition = (index: number) => {
    const total = cards.length;
    if (index === active) return "center";
    if (index === (active - 1 + total) % total) return "left";
    if (index === (active + 1) % total) return "right";
    return "hidden";
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen px-4 sm:px-8 lg:px-16 py-14 overflow-hidden"
    >
      {/* BG */}
      <div className="absolute inset-0 -z-10 bg-[#376080]" />

      {/* HEADER */}
      <div className="max-w-xl space-y-3">
        <h1 className="text-2xl sm:text-4xl font-bold text-white">Events</h1>
        <p className="text-gray-300 text-sm sm:text-base">
          Experience culture, music and performance at TechnoAmbition.
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative mt-20 w-full h-[260px] sm:h-[300px] lg:h-[340px] flex items-center justify-center">

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
                  ${pos === "center" && "z-50 scale-110 sm:scale-125"}
                  ${pos === "left" && "z-20 -translate-x-44 sm:-translate-x-72 scale-95"}
                  ${pos === "right" && "z-20 translate-x-44 sm:translate-x-72 scale-95"}
                  ${pos === "hidden" && "opacity-0"}
                `}
              >
                <div
                  onClick={() => isCenter && handlePlay(i)}
                  className="relative cursor-pointer 
                  w-[260px] h-[170px] 
                  sm:w-[320px] sm:h-[210px] 
                  lg:w-[380px] lg:h-[240px]
                  rounded-2xl overflow-hidden 
                  border border-yellow-400/50 shadow-xl bg-black"
                >
                  <video
                    ref={(el) => {(videoRefs.current[i] = el)}}
                    src={card.video}
                    poster="/testfile/event.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                    playsInline
                    loop
                    muted
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                  {/* PLAY */}
                  {isCenter && playingIndex !== i && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center">
                      <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center hover:scale-110 transition">
                        <Play className="text-black ml-1" size={28} />
                      </div>
                    </div>
                  )}

                  {/* MUTE BUTTON */}
                  {isCenter && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="absolute top-3 right-3 z-30 bg-black/60 p-2 rounded-full hover:bg-black/80"
                    >
                      {muted ? (
                        <VolumeX size={18} className="text-white" />
                      ) : (
                        <Volume2 size={18} className="text-white" />
                      )}
                    </button>
                  )}

                  {/* TEXT */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
                    <h2 className="text-base sm:text-xl font-bold text-white">
                      {card.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-300">
                      {card.desc}
                    </p>
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
