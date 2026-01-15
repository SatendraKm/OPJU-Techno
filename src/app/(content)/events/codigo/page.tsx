"use client";
import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import SubEventCard from "@/components/sub-component/sub-event-card";
import EventManagers from "@/components/sub-component/event-managers";
import Image from "next/image";
// import Link from "next/link";
import { FaCode, FaPenNib } from "react-icons/fa6";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const managers = [
    {
      imageUrl: "/managers/codigo/divakar.jpg",
      name: "Divakar Yadav",
      contact: 9691300315,
    },
    {
      imageUrl: "/managers/codigo/swapnil.jpg",
      name: "Swapnil Chatterjee",
      contact: 8085934908,
    },
    {
      imageUrl: "/managers/codigo/aniruddha.jpg",
      name: "Aniruddha Singh Gautam",
      contact: 6260225774,
    },
  ];

  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    getRegistrationCount("CODIGO").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  return (
    <div className="container mx-auto px-4 flex flex-col relative">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/background.svg"
          alt="Background"
          width={500}
          height={500}
          className="w-full h-auto opacity-100"
        />
      </div>

      {/* Event Intro */}
      <EventIntro
        imageUrl="/techno-events-logo/codigo.png"
        registrations={registrationCount}
        pricepool={0} // ✅ FIXED (To Be Announced)
        description="Unlock your coding potential at our University’s premier Coding Event!! Participate in challenges, network with peers, and enhance your skills."
        time="To Be Announced"
        venue="To Be Announced"
      />

      {/* Theme */}
      <section className="my-32 text-center">
        <h2 className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-4xl md:text-5xl font-medium mb-10">
          THEME
        </h2>
        <p className="text-white text-xl md:text-2xl tracking-wide">
          Dream your Fantasy, Code it in your Reality!!!
        </p>
      </section>

      {/* Sub Events */}
      <section className="my-32">
        <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-4xl md:text-5xl font-medium mb-10">
          SUB EVENTS
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-10">
          <SubEventCard
            Icon={FaCode}
            title="Code Challenge (Code & Conquer)"
            description="Test your coding skills through quizzes and real coding challenges. Compete with the best and prove your programming strength."
          />
          <SubEventCard
            Icon={FaPenNib}
            title="Design Master"
            description="Showcase your UI/UX creativity by designing intuitive and high-fidelity interfaces under real-time themes."
          />
        </div>
      </section>

      {/* Event 1 */}
      <section className="my-32">
        <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-4xl md:text-5xl font-medium mb-16">
          Event 1: Coding Challenge
        </h2>

        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto space-y-8">
          <div>
            <h3 className="text-2xl text-green-600 font-semibold">
              Round 1: Coding Quiz
            </h3>
            <ul className="list-disc pl-6 text-gray-300 text-lg">
              <li>Duration: 40 minutes</li>
              <li>30 MCQs</li>
              <li>Output-based & Error-finding questions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl text-green-600 font-semibold">
              Round 2: Real Coding Challenge
            </h3>
            <ul className="list-disc pl-6 text-gray-300 text-lg">
              <li>Duration: 60–90 minutes</li>
              <li>5 Coding Problems (Easy → Hard)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Event 2 */}
      <section className="my-32">
        <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-4xl md:text-5xl font-medium mb-16">
          Event 2: Design Master
        </h2>

        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto space-y-8">
          <div>
            <h3 className="text-2xl text-green-600 font-semibold">
              Round 1: UI/UX MCQ
            </h3>
            <ul className="list-disc pl-6 text-gray-300 text-lg">
              <li>30 Questions</li>
              <li>Passing Criteria: 60%</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl text-green-600 font-semibold">
              Round 2: High-Fidelity UI/UX Design
            </h3>
            <p className="text-gray-300 text-lg">
              Themes will be provided on the spot. Judges’ decision will be
              final.
            </p>
          </div>
        </div>
      </section>

      {/* Judging Criteria */}
      <section className="my-32">
        <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-4xl md:text-5xl font-medium mb-12">
          Judging Criteria
        </h2>

        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
          <ul className="list-disc pl-6 text-gray-300 text-lg space-y-2">
            <li>Correct Output</li>
            <li>Test Cases Passed</li>
            <li>Time & Efficiency</li>
            <li>Logic & Approach</li>
            <li>UI/UX Clarity & Presentation</li>
          </ul>
        </div>
      </section>

      {/* Event Managers */}
      <EventManagers managers={managers} />
    </div>
  );
};

export default Page;
