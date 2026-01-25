"use client";
import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import WhyParticipate from "@/components/sub-component/why-participate";
import EventManagers from "@/components/sub-component/event-managers";
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
    {
      imageUrl: "/placeholder-pic.jpeg",
      name: "Shakshyee Sharma",
      contact: 6371965128,
    },
    {
      imageUrl: "/placeholder-pic.jpeg",
      name: "Shivam Arora",
      contact: 9109245599,
    },
    {
      imageUrl: "/placeholder-pic.jpeg",
      name: "Avinash Agarwal",
      contact: 9691846192,
    },
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
      <div className="absolute inset-0 -z-10 bg-[#2A1414]" />

      {/* Event Intro Section */}
      {/* <a href="/dashboard"> */}
      <EventIntro
        imageUrl="/testfile/voiceofyouth.svg"
        registrations={registrationCount}
        pricepool={15000}
        description="A fun flagship event where participants showcase talents like singing, dancing, comedy, or magic while also predicting their own score. An exact match with the judges' score wins instantly, making it a unique test of skill, confidence, and self-awareness. Entertain, guess, and win."
        time="19-02-26 , 12:00 pm"
        venue="MP HALL "
      />
      {/* </a> */}

      {/* About / How It Works */}
      <section className="flex flex-col items-center px-4 my-10">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-8">
          ABOUT THE EVENT
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl w-full">
          <p className="text-xl sm:text-2xl font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
            Step into the intellectual battlefield of tarkash, where logic meets
            leadership, and arguments shape innovation. This high-energy debate
            competition is designed for aspiring managers, entrepreneurs, and
            business enthusiasts as well as others to challenge conventional
            wisdom and present ground breaking perspectives. Participants will
            engage in thought-provoking debates on current business trends,
            corporate ethics, financial strategies, and emerging market
            dynamics, Socio political matters and also current happening.
            Whether you&apos;re defending or opposing, your ability to think
            critically, articulate persuasively, and counter strategically will
            determine your victory.
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
