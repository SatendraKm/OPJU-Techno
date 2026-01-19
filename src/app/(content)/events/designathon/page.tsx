"use client";
import React, { useEffect, useState } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import WhyParticipate from "@/components/sub-component/why-participate";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import EventManagers from "@/components/sub-component/event-managers";
import Image from "next/image";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    getRegistrationCount("DESIGNATHON").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  const rules = [
    "The theme/problem statement for Round 2 will be announced at the venue.",
    "Participants must complete the design within the given time limit.",
    "Any design medium is allowed (hand-drawn or digital).",
    "Designs must be original; plagiarism is strictly prohibited.",
    "Internet usage is allowed only for reference purposes.",
    "Participants may be asked to briefly explain their design.",
    "Judging will be based on creativity, relevance to theme, and visual clarity.",
    "Judges' decision will be final.",
  ];

  const reasons = [
    "Showcase your creativity and visual storytelling skills.",
    "Enhance your design thinking and presentation abilities.",
    "Get judged by experienced faculty members.",
    "Certificates for all participants.",
    "Recognition for top creative designers.",
    "Hands-on experience in creative problem-solving.",
  ];

  const managers = [
    {
      imageUrl: "/managers/designathon/priya.jpg",
      name: "Priya Kumari",
      contact: 9234531358,
    },
    {
      imageUrl: "/managers/designathon/shruti.jpg",
      name: "Shruti Niwas",
      contact: 7024120039,
    },
    {
      imageUrl: "/managers/designathon/aashta.jpg",
      name: "Aashta Choudhary",
      contact: 7898260105,
    },
    {
      imageUrl: "/managers/designathon/pooja.jpg",
      name: "Pooja Mahto",
      contact: 9693397426,
    },
  ];

  return (
    <div className="relative flex flex-col">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          width={500}
          height={500}
          src="/background.svg"
          className="w-full h-auto opacity-100"
          alt="Background"
        />
      </div>

      {/* Event Intro */}
      <EventIntro
        imageUrl="/techno-events-logo/designathon.png"
        registrations={registrationCount}
        pricepool={10000} // 1st, 2nd, 3rd (no amount mentioned)
        description="Designathon – Creative Expression Challenge is a design-focused event where participants respond to a theme using visual storytelling and design thinking. The emphasis is on clarity of ideas, originality, and communication rather than software mastery."
        time="19th & 20th | 3:00 PM – 4:00 PM"
        venue="TB 07"
      />

      {/* About */}
      <section className="my-32 text-center">
        <h2 className="section-heading">ABOUT THE EVENT</h2>
        <p className="section-text">
          Designathon encourages creative thinkers to translate ideas into
          visuals. Participants showcase originality, storytelling, and design
          rationale through posters, UI screens, illustrations, or social
          creatives.
        </p>
      </section>

      {/* Team Structure */}
      <section className="my-32 text-center">
        <h2 className="section-heading">TEAM STRUCTURE</h2>
        <p className="section-text">
          Individual participation or teams of up to 2 members.
        </p>
      </section>

      {/* Rounds */}
      <section className="my-32">
        <h2 className="section-heading text-center">ROUND STRUCTURE</h2>

        <div className="card">
          <h3 className="round-title">Round 1: Concept to Canvas</h3>
          <p className="round-theme">Theme: New Age India</p>
          <ul className="list">
            <li>
              Create one design output (poster, UI screen, illustration, or
              social media creative)
            </li>
            <li>Submit a short written explanation of concept and intent</li>
          </ul>
        </div>

        <div className="card mt-10">
          <h3 className="round-title">Round 2: Design Rationale</h3>
          <p className="round-theme">Theme: On the Spot</p>
          <ul className="list">
            <li>Create a poster based on the given theme</li>
            <li>Justify relevance to the theme</li>
            <li>Answer questions from judges</li>
          </ul>
        </div>
      </section>

      {/* Rules */}
      <section className="my-32">
        <h2 className="section-heading text-center">RULES & REGULATIONS</h2>
        <div className="card">
          <ul className="list">
            <li>Round 2 theme will be announced at the venue</li>
            <li>Design must be completed within the given time</li>
            <li>Hand-drawn and digital designs are allowed</li>
            <li>Plagiarism is strictly prohibited</li>
            <li>Internet allowed only for reference</li>
            <li>Participants may be asked to explain their design</li>
            <li>Judging based on creativity, relevance, and clarity</li>
            <li>Judges’ decision will be final</li>
          </ul>
        </div>
      </section>

      {/* About Section */}
      <section className="px-4 mx-auto mb-32">
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-full max-w-3xl text-center text-white text-base sm:text-2xl font-normal font-['Inter'] tracking-[3px]">
            Designathon is a creative design event where participants respond to
            a theme or problem statement through visual design. The focus is on
            idea clarity, originality, storytelling, and justification of design
            choices.
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section>
        <WhyParticipate reasons={reasons} />
        <RulesAndRegulation rules={rules} />
        <EventManagers managers={managers} />
      </section>
    </div>
  );
};

export default Page;
