"use client";
import React from "react";
import EventIntro from "@/components/sub-component/event-intro";
import EventManagers from "@/components/sub-component/event-managers";
import Image from "next/image";

const Page = () => {
  const managers = [
    // Add images later if available
    { imageUrl: "/managers/common/default.jpg", name: "Event Coordinator", contact: 0 },
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
        imageUrl="/techno-events-logo/reverse-engineering.png"
        registrations={0}
        pricepool={0}
        description="Reverse Engineering – Decode the Hardware is a logic-oriented technical event designed to test participants’ ability to analyze, interpret, and reason about unknown hardware systems using diagrams, tables, and system behavior representations."
        time="19, 20 & 21 Feb | 1:00 PM – 5:30 PM"
        venue="TB 01 & TB 07"
      />

      {/* About Event */}
      <section className="my-32 text-center">
        <h2 className="section-heading">ABOUT THE EVENT</h2>
        <p className="section-text">
          This event emphasizes observation, deduction, and conceptual understanding
          rather than physical assembly or instrumentation. Participants decode
          hardware behavior using logical reasoning in a classroom-friendly format.
        </p>
      </section>

      {/* Team Structure */}
      <section className="my-32">
        <h2 className="section-heading text-center">TEAM STRUCTURE</h2>
        <div className="card">
          <ul className="list">
            <li>Team Size: 2 Members</li>
            <li>Eligibility: Open to all undergraduate students</li>
            <li>Resources provided: Circuit diagrams, component images, I/O tables, system descriptions</li>
            <li>No personal tools or physical hardware allowed</li>
          </ul>
        </div>
      </section>

      {/* Rules */}
      <section className="my-32">
        <h2 className="section-heading text-center">RULES OF THE EVENT</h2>
        <div className="card">
          <ul className="list">
            <li>Teams must report 15 minutes before event start</li>
            <li>Only registered teams are allowed</li>
            <li>Multiple rounds with eliminations</li>
            <li>No mobile phones, internet, books, or external resources</li>
            <li>Answers must be written/drawn on provided sheets</li>
            <li>Any malpractice leads to disqualification</li>
            <li>Judges’ decisions are final</li>
          </ul>
        </div>
      </section>

      {/* Rounds */}
      <section className="my-32">
        <h2 className="section-heading text-center">ROUNDS OF THE EVENT</h2>

        {/* Round 1 */}
        <div className="card">
          <h3 className="round-title">Round 1: Component Logic (Fundamentals Round)</h3>
          <p className="round-theme">Objective: Test understanding of electronic components</p>
          <ul className="list">
            <li>Identify components and their functions</li>
            <li>Predict outputs for given inputs</li>
            <li>Answer short reasoning-based questions</li>
            <li>Pen & paper round</li>
            <li>Quick elimination</li>
          </ul>
        </div>

        {/* Round 2 */}
        <div className="card mt-10">
          <h3 className="round-title">Round 2: Black-Box Reasoning (System Thinking Round)</h3>
          <p className="round-theme">Objective: Decode internal system logic</p>
          <ul className="list">
            <li>Infer internal logic from input-output behavior</li>
            <li>Draw block-level explanation</li>
            <li>Classify system (combinational / sequential / control-based)</li>
            <li>No physical hardware</li>
          </ul>
        </div>

        {/* Round 3 */}
        <div className="card mt-10">
          <h3 className="round-title">Round 3: Design Interpretation (Advanced Reasoning Round)</h3>
          <p className="round-theme">Objective: Analyze and improve a given design</p>
          <ul className="list">
            <li>Identify logical flaws or inefficiencies</li>
            <li>Suggest conceptual improvements</li>
            <li>Justify improvements using electronics principles</li>
          </ul>
        </div>
      </section>

      {/* Judging Criteria */}
      <section className="my-32">
        <h2 className="section-heading text-center">JUDGING CRITERIA</h2>
        <div className="card">
          <ul className="list">
            <li>Logical accuracy</li>
            <li>Clarity of reasoning</li>
            <li>Depth of understanding</li>
            <li>Ability to explain decisions</li>
            <li>System-level interpretation skills</li>
          </ul>
        </div>
      </section>

      {/* Managers (Optional placeholder) */}
      <EventManagers managers={managers} />
    </div>
  );
};

export default Page;


