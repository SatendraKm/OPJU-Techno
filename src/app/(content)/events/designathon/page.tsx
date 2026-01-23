"use client";

import React, { useEffect, useState } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import RoundSection from "@/components/sub-component/RoundSection";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import EventManagers from "@/components/sub-component/event-managers";
import WhyParticipate from "@/components/sub-component/why-participate";

const Page = () => {
 const [registrationCount, setRegistrationCount] = useState<number>(0);

useEffect(() => {
  const fetchCount = async () => {
    try {
      const res = await fetch("/api/registrations?event=DESIGNATHON");
      const data = await res.json();
      setRegistrationCount(data.count || 0);
    } catch (err) {
      console.error("Failed to load registration count", err);
    }
  };

  fetchCount();
}, []);


  const studentManagers = [
    { imageUrl: "/placeholder-pic.jpeg", name: "Shruti Niwas", contact: 7024120039 },
    { imageUrl: "/placeholder-pic.jpeg", name: "Aashta Choudhary", contact: 7898260105 },
    { imageUrl: "/placeholder-pic.jpeg", name: "Pooja Mahto", contact: 9693397426 },
  ];

  const rounds = [
    {
      title: "ROUND 1: Concept to Canvas",
      description:
        "Participants create one design output (poster, UI screen, illustration, or social creative) based on the theme 'New Age India' and submit a short written explanation describing the concept and intent.",
    },
    {
      title: "ROUND 2: Design Rationale",
      description:
        "Participants create a poster on an on-the-spot theme and justify their design choices in front of judges, explaining relevance and creative reasoning.",
    },
  ];

  const rules = [
    "Round 2 theme will be announced at the venue.",
    "Design must be completed within the given time.",
    "Hand-drawn and digital designs are allowed.",
    "Plagiarism is strictly prohibited.",
    "Internet allowed only for reference.",
    "Participants may be asked to explain their design.",
    "Judging based on creativity, relevance, and clarity.",
    "Judges’ decision will be final.",
  ];

  const reasons = [
    "Showcase your creativity and visual storytelling skills.",
    "Improve your design thinking and presentation ability.",
    "Get feedback from experienced faculty and judges.",
    "Compete with creative minds across the campus.",
    "Build confidence in explaining your design decisions.",
    "Enhance your portfolio with competition-level work.",
  ];

  return (
    <>
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#2A1414]" />

      {/* Event Introduction */}
      <a href="/dashboard">
        <EventIntro
          imageUrl="/testfile/Designathon3.svg"
          registrations={registrationCount}
          pricepool={10000}
          description="Designathon – Creative Expression Challenge is a creative design event where participants respond to a given theme or problem statement through visual design. The event focuses on idea clarity, visual storytelling, and design thinking, rather than advanced software mastery."
          time="19th & 20th | 3:00 PM – 4:00 PM"
          venue="TB 07"
        />
      </a>

      <div className="flex flex-col items-center">
        <div className="bg-transparent text-white p-6 md:p-12 space-y-32">

          <section className="text-center max-w-5xl mx-auto">
            <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium mb-8">
              ABOUT THE EVENT
            </h2>
            <p className="text-2xl text-gray-200">
              Designathon encourages creative thinkers to translate ideas into visuals.
            </p>
          </section>

          <section className="text-center max-w-5xl mx-auto">
            <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium mb-8">
              TEAM STRUCTURE
            </h2>
            <p className="text-2xl text-gray-200">
              Individual participation or teams of up to 2 members.
            </p>
          </section>

          <RoundSection rounds={rounds} />
          <WhyParticipate reasons={reasons} />
          <RulesAndRegulation rules={rules} />
          <EventManagers managers={studentManagers} />
        </div>
      </div>
    </>
  );
};

export default Page;
