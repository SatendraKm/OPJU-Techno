"use client";

import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import EventManagers from "@/components/sub-component/event-managers";
import WhyParticipate from "@/components/sub-component/why-participate";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  /* ===================== EVENT DATA ===================== */

  const eventDescription = `
IDEATHON 2026 is an inspiring innovation-driven event where curiosity fuels creativity
and real-world challenges spark impactful, sustainable solutions.
`;

  const rounds = [
    {
      title: "1) Presentation Round",
      description:
        "Each team presents their idea within 10 minutes. A warning bell rings at 8 minutes, followed by a 2-minute Q&A session.",
    },
    {
      title: "2) SDGs Spin Wheel Challenge",
      description:
        "Spin the wheel featuring all 17 Sustainable Development Goals (SDGs) and identify the correct fact among two statements within the given time.",
    },
  ];

  const rules = [
    "Arrival: Be at the venue 15 minutes before the event begins.",
    "Registration: Only registered participants may present.",
    "Teams: Participate individually or in teams of up to 04 members.",
    "Abstract Submission: Submit a brief summary (maximum 400 words) before the event.",
    "One Idea Policy: Each team may submit only one idea. A new team leader is required for a second submission.",
    "Presentation Time: 10 minutes total.",
    "Warning Bell: Rings at 8 minutes.",
    "Q&A Session: 2 minutes after each presentation.",
  ];

  const reasons = [
    "Win prizes worth ₹18,000 across multiple categories.",
    "Enhance problem-solving, creativity, and design-thinking skills.",
    "Work on real-world sustainability challenges aligned with SDGs.",
    "Gain expert feedback to refine your idea.",
    "Strengthen leadership and entrepreneurial mindset.",
    "Add a prestigious innovation event to your resume.",
  ];

  const managers = [
    {
      imageUrl: "",
      name: "Rinesh Mohanty",
      contact: 9907708949,
    },
    {
      imageUrl: "",
      name: "Disha Nadam",
      contact: 9171320725,
    },
  ];

  /* ===================== STATE ===================== */

  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    getRegistrationCount("IDEATHON").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  /* ===================== UI ===================== */

  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#2A1414]" />

      {/* Event Intro with Theme */}
      <EventIntro
        imageUrl="/testfile/ideathon.svg"
        registrations={registrationCount}
        pricepool={50000}
        description="​“Building Solutions Through Innovation..”
​Welcome to IDEATHON—an inspiring platform where curiosity fuels creativity and real-world challenges spark innovative solutions. Be a part of a dynamic community of bold thinkers and change-makers who challenge conventions and create the remarkable.
​�� The Objective
​Ideathon is a collaborative, innovation-driven journey designed to empower creative minds to think beyond boundaries.
​· Ideate & Innovate: Collaborate to generate creative solutions for real-world challenges.
· Connect & Collaborate: Engage with students and innovators from diverse backgrounds and perspectives.
· Refine & Elevate: Present your ideas to experts, gain valuable feedback, and transform them into impactful, sustainable solutions.
· Learn & Lead: Strengthen your leadership abilities, build confidence, and cultivate an entrepreneurial mindset.
"
        time="19-02-2026, 11:30 AM"
        venue="EE Seminar Hall (FB-14)"
      />

      <div className="flex flex-col items-center text-white">
        <div className="bg-transparent p-6 md:p-12 space-y-32">

          {/* Theme (CENTER-ALIGNED – SAME FORMAT AS ROUNDS) */}
<section className="px-4 flex flex-col items-center space-y-12">
  <div className="text-center max-w-2xl bg-[#33010140] p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
    <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D]">
      THEME
    </h2>
    <p className="text-xl text-white">
      From Crisis to Conservation: Ideating a Sustainable Future
    </p>
  </div>
</section>


          {/* Rounds (CENTER-ALIGNED) */}
          <section className="px-4 flex flex-col items-center space-y-12">
            {rounds.map((round, index) => (
              <div
                key={index}
                className="text-center max-w-2xl bg-[#33010140] p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D]">
                  {round.title}
                </h2>
                <p className="text-xl text-white">{round.description}</p>
              </div>
            ))}
          </section>

          {/* Presentation Guidelines */}
<section>
  <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-12">
    PRESENTATION GUIDELINES
  </h2>

  <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
    <ul className="list-disc pl-5 text-2xl space-y-2">
      <li>Total Time: 10 minutes for your presentation.</li>
      <li>Warning Bell: A bell will ring at 08 minutes, giving you 2 minutes to summarize and conclude.</li>
      <li>Q&A: A 2-minute query round will follow each presentation.</li>
    </ul>
  </div>
</section>


          {/* Judging Criteria */}
          <section>
            <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-12">
              JUDGING CRITERIA
            </h2>

            <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
              <p className="mb-4 text-2xl">
                Each idea is evaluated on five parameters (20 points each, total 100 points):
              </p>

              <ul className="list-disc pl-5 text-2xl space-y-2">
                <li>Uniqueness of the idea</li>
                <li>Feasibility of the solution</li>
                <li>Quality of presentation</li>
                <li>Response during Q&A</li>
                <li>Scalability of the concept</li>
              </ul>
            </div>
          </section>

          {/* Available Awards */}
<section>
  <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-12">
    AVAILABLE AWARDS
  </h2>

  <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
    <p className="mb-4 text-2xl">
      There are six prizes to be won:
    </p>

    <ul className="list-disc pl-5 text-2xl space-y-2">
      <li>First, Second, & Third Prize.</li>
      <li>Best Feasible Idea.</li>
      <li>Best Innovative Idea (Unique & Original).</li>
      <li>Best Presentation.</li>
    </ul>
  </div>
</section>


          {/* Why Participate */}
          <WhyParticipate reasons={reasons} />

          {/* Rules */}
          <RulesAndRegulation rules={rules} />

          {/* Event Managers */}
          <EventManagers managers={managers} />

        </div>
      </div>
    </>
  );
};

export default Page;
