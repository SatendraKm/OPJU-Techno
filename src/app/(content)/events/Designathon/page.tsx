"use client";
import React from "react";
import EventIntro from "@/components/sub-component/event-intro";
import EventManagers from "@/components/sub-component/event-managers";
import Image from "next/image";

const Page = () => {
  const studentManagers = [
    { imageUrl: "/managers/designathon/priya.jpg", name: "Priya Kumari", contact: 9234531358 },
    { imageUrl: "/managers/designathon/shruti.jpg", name: "Shruti Niwas", contact: 7024120039 },
    { imageUrl: "/managers/designathon/aashta.jpg", name: "Aashta Choudhary", contact: 7898260105 },
    { imageUrl: "/managers/designathon/pooja.jpg", name: "Pooja Mahto", contact: 9693397426 },
  ];

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
        imageUrl="/techno-events-logo/designathon.png"
        registrations={0}
        pricepool={0} // 1st, 2nd, 3rd (no amount mentioned)
        description="Designathon – Creative Expression Challenge is a design-focused event where participants respond to a theme using visual storytelling and design thinking. The emphasis is on clarity of ideas, originality, and communication rather than software mastery."
        time="19th & 20th | 3:00 PM – 4:00 PM"
        venue="TB 07"
      />

      {/* About */}
      <section className="my-32 text-center">
        <h2 className="section-heading">ABOUT THE EVENT</h2>
        <p className="section-text">
          Designathon encourages creative thinkers to translate ideas into visuals.
          Participants showcase originality, storytelling, and design rationale
          through posters, UI screens, illustrations, or social creatives.
        </p>
      </section>

      {/* Team Structure */}
      <section className="my-32 text-center">
        <h2 className="section-heading">TEAM STRUCTURE</h2>
        <p className="section-text">Individual participation or teams of up to 2 members.</p>
      </section>

      {/* Rounds */}
      <section className="my-32">
        <h2 className="section-heading text-center">ROUND STRUCTURE</h2>

        <div className="card">
          <h3 className="round-title">Round 1: Concept to Canvas</h3>
          <p className="round-theme">Theme: New Age India</p>
          <ul className="list">
            <li>Create one design output (poster, UI screen, illustration, or social media creative)</li>
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

      {/* Judging Criteria */}
      <section className="my-32">
        <h2 className="section-heading text-center">JUDGING CRITERIA</h2>
        <div className="card">
          <ul className="list">
            <li>Originality of concept</li>
            <li>Relevance to the theme</li>
            <li>Visual aesthetics</li>
            <li>Clarity of message</li>
            <li>Ability to explain design decisions</li>
          </ul>
        </div>
      </section>

      {/* Prizes */}
      <section className="my-32 text-center">
        <h2 className="section-heading">PRIZES</h2>
        <p className="section-text">1st Prize • 2nd Prize • 3rd Prize</p>
      </section>

      {/* Faculty Coordinators */}
      <section className="my-32">
        <h2 className="section-heading text-center">FACULTY COORDINATORS</h2>
        <div className="card">
          <ul className="list">
            <li>Dr. Pradeep Kumar Shriwas – CSE (9770112039)</li>
            <li>Dr. Deepankar Sharma – SOS (7084519954)</li>
            <li>Dr. Bharat Verma – META (7383918079)</li>
            <li>Dr. Anand Kumar Shrivastava – SOM (9302239922)</li>
          </ul>
        </div>
      </section>

      {/* Student Coordinators */}
      <EventManagers managers={studentManagers} />
    </div>
  );
};

export default Page;
