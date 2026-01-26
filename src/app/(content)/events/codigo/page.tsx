"use client";

import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import SubEventCard from "@/components/sub-component/sub-event-card";
import EventManagers from "@/components/sub-component/event-managers";

// import Link from "next/link";
import { FaCode, FaPenNib } from "react-icons/fa6";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  /* ===================== EVENT MANAGERS ===================== */
  const managers = [
    {
      imageUrl: "/managers/CodiGo/CodiGo 2026/div.jpeg",
      name: "Divakar Yadav",
      contact: 9691300315,
    },
    {
      imageUrl: "/managers/CodiGo/CodiGo 2026/Swapnil Chatterjee 8085934908 Codigo Manager.jpeg",
      name: "Swapnil Chatterjee",
      contact: 8085934908,
    },
    {
      imageUrl: "/managers/CodiGo/CodiGo 2026/anj.jpeg",
      name: "Aniruddha Singh Gautam",
      contact: 6260225774,
    },
  ];

  /* ===================== STATE ===================== */
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    getRegistrationCount("CODIGO").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  /* ===================== UI ===================== */
  return (
    <div className="relative w-full text-black">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#2A1414]" />

      {/* Event Intro */}
      {/* <a href="/dashboard"> */}
      <EventIntro
        imageUrl="/testfile/codigo3.svg"
        registrations={registrationCount}
        pricepool={20000}
        description="Unlock your coding potential at our University’s premier Coding Event! Participate in challenges, network with peers, and enhance your skills. Whether you are a beginner or a pro, join us for an unforgettable experience of innovation and collaboration."
        time="19-02-2026, 11:00 AM"
        venue="TB-09"
      />
      {/* </a> */}
      {/* Theme */}
      <section className="my-32 text-center">
        <h2 className="text-white text-4xl md:text-5xl font-medium mb-10">
          THEME
        </h2>
        <p className="text-white text-xl md:text-2xl tracking-wide">
          Dream your Fantasy, Code it in your Reality!!!
        </p>
      </section>

      {/* Sub Events */}
      <section className="my-32">
        <h2 className="text-center text-white text-4xl md:text-5xl font-medium mb-10">
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
        <h2 className="text-center text-white text-4xl md:text-5xl font-medium mb-16">
          Event 1: Coding Challenge
        </h2>

        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto space-y-10">
          <div className="text-center">
            <h3 className="text-2xl text-white font-semibold mb-4">
              Round 1: Coding Quiz
            </h3>
            <ul className="list-none text-white text-lg space-y-2">
              <li>Duration: 40 minutes</li>
              <li>30 MCQs</li>
              <li>Output-based & Error-finding questions</li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-2xl text-white font-semibold mb-4">
              Round 2: Real Coding Challenge
            </h3>
            <ul className="list-none text-white text-lg space-y-2">
              <li>Duration: 60–90 minutes</li>
              <li>5 Coding Problems (Easy → Hard)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Event 2 */}
      <section className="my-32">
        <h2 className="text-center text-white text-4xl md:text-5xl font-medium mb-16">
          Event 2: Design Master
        </h2>

        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto space-y-10">
          <div className="text-center">
            <h3 className="text-2xl text-white font-semibold mb-4">
              Round 1: UI/UX MCQ
            </h3>
            <ul className="list-none text-white text-lg space-y-2">
              <li>30 Questions</li>
              <li>Passing Criteria: 60%</li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="text-2xl text-white font-semibold mb-4">
              Round 2: High-Fidelity UI/UX Design (Final Round)
            </h3>
            <p className="text-white text-lg">
              Themes will be provided on the spot. Judges’ decision will be
              final.
            </p>
          </div>
        </div>
      </section>

      {/* Judging Criteria */}
      <section className="my-32">
        <h2 className="text-center text-white text-4xl md:text-5xl font-medium mb-12">
          Judging Criteria
        </h2>

        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
          <ul className="list-none text-white text-lg space-y-2 text-center">
            <li>Correct Output</li>
            <li>Test Cases Passed</li>
            <li>Time & Efficiency</li>
            <li>Logic & Approach</li>
            <li>UI/UX Clarity & Presentation</li>
          </ul>
        </div>
      </section>

      {/* Event Managers (ONLY 3) */}
      <EventManagers managers={managers} />
    </div>
  );
};

export default Page;
