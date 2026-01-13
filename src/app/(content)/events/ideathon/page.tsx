"use client";

import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import RoundSection from "@/components/sub-component/RoundSection";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import EventManagers from "@/components/sub-component/event-managers";
import WhyParticipate from "@/components/sub-component/why-participate";
import Image from "next/image";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  /* ===================== EVENT DATA ===================== */

  const eventDescription = `
IDEATHON 2026 is an inspiring innovation-driven event where curiosity meets creativity
and real-world challenges spark impactful solutions.

Theme:
"From Crisis to Conservation: Ideating a Sustainable Future"

Participants collaborate to ideate, innovate, and present sustainable ideas while
receiving expert feedback and recognition.
`;

  const rounds = [
    {
      title: "1) Presentation Round",
      description:
        "Each team presents their idea within 10 minutes. A warning bell rings at 8 minutes, followed by a 2-minute Q&A session with the judges.",
    },
    {
      title: "2) SDGs Spin Wheel Challenge",
      description:
        "Spin the wheel featuring all 17 Sustainable Development Goals (SDGs). Identify the correct fact among two statements within the given time.",
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
    "Win prizes worth ₹18,000 along with special category awards.",
    "Enhance problem-solving, creativity, and design thinking skills.",
    "Work on real-world sustainability challenges.",
    "Network with experts and innovative peers.",
    "Strengthen leadership and entrepreneurial mindset.",
    "Add a prestigious achievement to your resume.",
  ];

  const managers = [
    {
      imageUrl: "/managers/Ideathon/Aryan.jpg",
      name: "Aryan Mishra",
      contact: 7205993715,
    },
    {
      imageUrl: "/managers/Ideathon/Ashutosh.jpg",
      name: "Ashutosh Sahu",
      contact: 9776565942,
    },
    {
      imageUrl: "/managers/Ideathon/Kumkum.jpg",
      name: "KumKum Singh",
      contact: 8889702577,
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
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/background.svg"
          width={500}
          height={500}
          className="w-full h-auto opacity-150"
          alt="Background"
        />
      </div>

      {/* Event Intro */}
      <EventIntro
        imageUrl="/techno-events-logo/ideathon.png"
        registrations={registrationCount}
        pricepool={18000}
        description={eventDescription}
        time="19-02-2026, 11:30 AM"
        venue="EE Seminar Hall (FB-14)"
      />

      <div className="flex flex-col items-center">
        <div className="bg-transparent text-white p-6 md:p-12 space-y-32">
          {/* Rounds */}
          <section className="px-4">
            <RoundSection rounds={rounds} />
          </section>

          {/* Judging Criteria */}
          <section>
            <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-12">
              JUDGING CRITERIA
            </h2>

            <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
              <p className="mb-4 text-2xl">
                Each idea is evaluated on five parameters (20 points each, total
                100 points):
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

          {/* Other Sections */}
          <WhyParticipate reasons={reasons} />
          <RulesAndRegulation rules={rules} />
          <EventManagers managers={managers} />
        </div>
      </div>
    </>
  );
};

export default Page;
