"use client";
import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import RoundSection from "@/components/sub-component/RoundSection";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import EventManagers from "@/components/sub-component/event-managers";
import WhyParticipate from "@/components/sub-component/why-participate";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const rules = [
    "Teams must report at the venue at least 15 minutes before the event begins.",
    "Only registered teams are allowed to participate.",
    "The event consists of multiple rounds with eliminations.",
    "Use of mobile phones, internet, books, or external resources is strictly prohibited.",
    "All answers must be written or drawn on the sheets provided.",
    "Any form of malpractice will result in immediate disqualification.",
    "Judges' decisions shall be final and binding.",
  ];

  const reasons = [
    "Enhance logical reasoning and system-level thinking skills.",
    "Test your understanding of electronics without physical hardware.",
    "Participate in a low-logistics, classroom-friendly technical event.",
    "Open to students from diverse technical backgrounds.",
    "Improve problem-solving and analytical reasoning abilities.",
    "Gain experience in decoding real-world hardware logic.",
  ];

  const rounds = [
     {
  title: "ROUND 1: Pattern Finder",
  description:
    "Fundamentals round focused on observing patterns and identifying hidden logic connecting inputs to outputs. Participants analyze multiple input-output examples to deduce the underlying rules. Pen and paper based with quick elimination.",
    },
    {
  title: "ROUND 2: Black Box Breakdown",
  description:
    "System thinking round where teams reverse-engineer an unknown multi-step system using only observable input-output behavior. Using multiple test cases and timing tables, teams must decode the internal logic and explain how the system works.",
    },
    {
  title: "ROUND 3: System Reconstruction",
  description:
    "Advanced reasoning round involving analysis of partial system diagrams and incomplete logical flows. Teams identify logical flaws, complete missing components, suggest improvements, and justify their solutions using systematic reasoning principles.",
    },
  ];

  const managers = [
    {
      imageUrl: "/managers/RE/yuvi.jpeg",
      name: "Yuvraj Agarwal",
      contact: 9926324840,
    },
    {
      imageUrl: "/managers/RE/gaurav.jpeg",
      name: "Gaurav Tiwari",
      contact: 7898862970,
    },
    {
      imageUrl: "/managers/RE/arjun.jpeg",
      name: "Arjun Tiwari",
      contact: 7974650487,
    },
  ];

  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    getRegistrationCount("BACKTRACE")
      .then((count) => {
        setRegistrationCount(count);
      })
      .catch(() => {
        setRegistrationCount(0);
      });
  }, []);

  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#2A1414]" />

      {/* Event Introduction */}
      {/* <a href="/dashboard"> */}
      <EventIntro
        imageUrl="/testfile/backtrace3.svg"
        registrations={registrationCount}
        pricepool={11000}
        description="Reverse Engineering – Decode the Hardware is a logic-oriented technical event designed to evaluate participants’ ability to analyze, interpret, and reason about unknown hardware systems. The event emphasizes observation, deduction, and conceptual understanding rather than physical assembly or complex instrumentation."
        time="19, 20 & 21 Feb | 1:00 PM – 5:30 PM"
        venue="TB 01 & TB 07"
      />
      {/* </a> */}

      <div className="flex flex-col items-center">
        <div className="bg-transparent text-white p-6 md:p-12 space-y-32 w-full">
          {/* Rounds Section */}
          <section className="px-4">
            <RoundSection rounds={rounds} />
          </section>

          {/* Judging Criteria */}
          <section>
            <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-12">
              JUDGING CRITERIA
            </h2>

            <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto text-white">
              <ul className="list-disc pl-5 text-2xl space-y-2">
                <li>Logical accuracy</li>
                <li>Clarity of reasoning</li>
                <li>Depth of understanding</li>
                <li>Ability to clearly explain decisions</li>
                <li>System-level interpretation skills</li>
              </ul>
            </div>
          </section>

          {/* Additional Sections */}
          <WhyParticipate reasons={reasons} />
          <RulesAndRegulation rules={rules} />
          <EventManagers managers={managers} />
        </div>
      </div>
    </>
  );
};

export default Page;
