"use client";
import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import WhyParticipate from "@/components/sub-component/why-participate";
import EventManagers from "@/components/sub-component/event-managers";
import Image from "next/image";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const rules = [
    "Teams consist of 2–4 members per side (Affirmative & Opposition).",
    "Speakers must strictly follow allotted speaking time for each round.",
    "No interruptions except structured interjections or POIs.",
    "Arguments must be logical, fact-based, and well-structured.",
    "Offensive language, discrimination, or personal attacks are prohibited.",
    "Rebuttals must focus on arguments, not individuals.",
    "Evidence must be genuine; fabrication or misrepresentation is prohibited.",
    "Judges’ decisions are final and binding.",
  ];

  const reasons = [
    "Sharpen your critical thinking and public speaking skills.",
    "Engage in high-energy debates on business, socio-political, and current issues.",
    "Learn to defend ideas and counter arguments strategically.",
    "Gain exposure to competitive debating formats.",
    "Win exciting cash prizes and recognition.",
  ];

  const managers = [
    { imageUrl: "/managers/common/user.png", name: "Anushree Maity", contact: 9685434119 },
    { imageUrl: "/managers/common/user.png", name: "Shivam Arora", contact: 9109245599 },
    { imageUrl: "/managers/common/user.png", name: "Shubham Sharma", contact: 6207360156 },
    { imageUrl: "/managers/common/user.png", name: "Avinash Agrawal", contact: 9691846192 },
    { imageUrl: "/managers/common/user.png", name: "Navin Giri", contact: 8889183669 },
    { imageUrl: "/managers/common/user.png", name: "Aniket Dash", contact: 0 },
    { imageUrl: "/managers/common/user.png", name: "Shakshyee Sharma", contact: 6371965128 },
    { imageUrl: "/managers/common/user.png", name: "Shivani Rathore", contact: 9343973942 },
    { imageUrl: "/managers/common/user.png", name: "Madhurima Sidar", contact: 9752941333 },
    { imageUrl: "/managers/common/user.png", name: "Kirti Upadhyay", contact: 9752072299 },
    { imageUrl: "/managers/common/user.png", name: "Sushma Yadav", contact: 8319946166 },
  ];

  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    getRegistrationCount("VOICE-OF-YOUTH")
      .then((count) => setRegistrationCount(count))
      .catch(() => setRegistrationCount(0));
  }, []);

  return (
    <div className="relative space-y-10 px-4 py-8">
      {/* Background Image */}
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
        imageUrl="/techno-events-logo/voice-of-youth.png"
        registrations={registrationCount}
        pricepool={15000}
        description="Voice of Youth is a high-energy debate competition where logic meets leadership. Participants debate on business trends, corporate ethics, financial strategies, socio-political issues, and current affairs. The event tests critical thinking, persuasive communication, and strategic rebuttals."
        time="19th & 20th Feb 2026 | 11:00 AM onwards"
        venue="MP Hall"
      />

      {/* About / How It Works */}
      <section className="flex flex-col items-center px-4 my-10">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-8">
          ABOUT THE EVENT
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl w-full">
          <p className="text-xl sm:text-2xl font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
            Step into the intellectual battlefield where arguments shape innovation.
            Voice of Youth challenges aspiring managers, entrepreneurs, and thinkers
            to present bold perspectives, defend ideas, and counter opponents through
            structured debates on real-world issues.
          </p>
        </div>
      </section>

      {/* Judging Criteria */}
      <section className="flex flex-col items-center px-4 my-10">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-8">
          JUDGING CRITERIA
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl w-full">
          <ul className="list-disc pl-5 text-xl sm:text-2xl space-y-3 font-['Inter'] tracking-[3.75px] text-white">
            <li>Content quality & relevance</li>
            <li>Delivery & articulation</li>
            <li>Rebuttal effectiveness</li>
            <li>Structure & logical flow</li>
            <li>Audience engagement (tie-breaker)</li>
          </ul>
        </div>
      </section>

      {/* Why Participate */}
      <WhyParticipate reasons={reasons} />

      {/* Rules */}
      <RulesAndRegulation rules={rules} />

      {/* Student Coordinators */}
      <EventManagers managers={managers} />
    </div>
  );
};

export default Page;
