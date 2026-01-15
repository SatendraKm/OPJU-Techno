"use client";
import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import EventManagers from "@/components/sub-component/event-managers";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import Image from "next/image";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const managers = [
    {
      imageUrl: "/managers/BeatBattle/Somya.jpg",
      name: "Somya Patel",
      contact: 9479218521,
    },
    {
      imageUrl: "/managers/BeatBattle/Gaurav.jpg",
      name: "Gaurav Adhikari",
      contact: 8319915571,
    },
    {
      imageUrl: "/managers/BeatBattle/Suraj.jpg",
      name: "Suraj Das",
      contact: 7974639663,
    },
  ];

  const rules = [
    "Solo participation only (no duets or groups).",
    "Participants must register before the deadline.",
    "Props are not allowed unless provided by organizers.",
    "No offensive or inappropriate moves; maintain event decorum.",
  ];

  const criterias = [
    "Musicality & Rhythm 25%",
    "Creativity & Originality 25%",
    "Energy & Stage Presence 20%",
    "Execution & Technique 20%",
    "Overall Impact 10%",
  ];

  const [registrationCount, setRegistrationCount] = useState(0);
  useEffect(() => {
    getRegistrationCount("BEAT-BATTLE").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  return (
    <div className="relative space-y-10 px-4 py-8">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/background.svg"
          alt="Scrolling Background"
          width={500}
          height={500}
          className="w-full h-auto opacity-150"
        />
      </div>

      {/* Event Intro Section */}
      <EventIntro
        venue="Babuji Chowk, OPJU"
        time="20 Feb 2026, 2:00 PM - 5:30 PM"
        imageUrl="/testfile/BeatBattle.png"
        registrations={registrationCount}
        pricepool={0} // Can update prize if known
        description="Step into a high-energy clash of rhythm, creativity, and raw talent at Beat Battle. Dancers face off in head-to-head rounds, trading explosive footwork, sharp musicality, and fearless improvisation. The crowd fuels the momentum, judges watch for originality and control, and every beat drop is a chance to shine."
      />

      {/* Event Format Section */}
      <section className="my-32">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-8">
          EVENT CATEGORIES
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto space-y-6 text-white text-xl sm:text-2xl">
          <div>
            <h3 className="font-bold mb-2">Prelims Round</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>All participants perform a solo set (45 seconds each).</li>
              <li>Music is randomly selected by the DJ.</li>
              <li>Top 16 dancers advance.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Top 16 (1 vs 1)</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Head-to-head battles; matchups selected by the community.</li>
              <li>45 seconds per dancer to perform the same song.</li>
              <li>Winners advance to Top 8.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Top 8 (1 vs 1)</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Head-to-head battles; matchups selected by the community.</li>
              <li>45 seconds per dancer to perform the same song.</li>
              <li>Winners advance to Semi-Finals.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Semi-Finals (Top 4)</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>1 vs 1 battles; matchups selected by the community.</li>
              <li>Each dancer performs 2 rounds of 45 seconds each.</li>
              <li>Two different songs randomly played by the DJ.</li>
              <li>Winners advance to Finals.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-2">Finals (Top 2)</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>1 vs 1 face-off; matchup chosen by the community.</li>
              <li>Each dancer performs 2 rounds (1 min per round).</li>
              <li>Two different songs randomly played by the DJ.</li>
              <li>Winner is crowned Event Champion; the other is Runner-Up.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <RulesAndRegulation rules={rules} />

      {/* Judgement Criteria Section */}
      <section className="mb-20">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium uppercase text-center tracking-[3.75px] mb-8">
          Judgement Criteria
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
          <ul className="list-decimal pl-5 text-2xl sm:text-3xl font-normal space-y-2 font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
            {criterias.map((criteria, index) => (
              <li key={index}>{criteria}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Event Managers Section */}
      <EventManagers managers={managers} />
    </div>
  );
};

export default Page;
