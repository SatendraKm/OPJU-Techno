"use client";
import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import EventManagers from "@/components/sub-component/event-managers";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const managers = [
    { imageUrl: "/managers/Riwayat/Karishma.jpg", name: "Karishma Mehra", contact: 8720845925 },
    { imageUrl: "/managers/Riwayat/Ayush.jpg", name: "Ayush Raj Singh", contact: 9981065247 },
    { imageUrl: "/managers/Riwayat/Prachi.jpg", name: "Prachi Sharma", contact: 8103179203 },
  ];

  const rules = [
    "Participants must strictly adhere to the given themes and round formats.",
    "Reporting on time for rehearsals and rounds is mandatory.",
    "Use of fire, sharp objects, or any harmful or dangerous stunts is strictly prohibited.",
    "Judges’ decisions will be final and binding.",
  ];

  const criterias = [
    "Personality: Overall presence, communication, and individuality",
    "Concept: Clarity, interpretation, and relevance to the theme",
    "Confidence: Stage presence, ramp walk, and self-assurance",
    "Creativity: Originality and innovative expression in presentation",
  ];

  const [registrationCount, setRegistrationCount] = useState(0);
  useEffect(() => {
    getRegistrationCount("RIWAYAT-2.0").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  return (
    <div className="relative space-y-10 px-4 py-8">

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#2A1414]" />

      {/* Event Intro Section */}
      <a href="/dashboard">
      <EventIntro
        venue="Babuji Chowk & Football Ground Stage"
        time="11-19 Feb 2026"
        imageUrl="/testfile/riwayat.svg"
        registrations={registrationCount}
        pricepool={18000}
        description="An inter-college fashion show hosted by OP Jindal University, designed to promote creativity, confidence, and personality through structured rounds, workshops, and inclusive participation."
      /></a>

      {/* Event Category Section */}
      <section className="my-32 text-center">
        <h1 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium mb-8">
          EVENT CATEGORY
        </h1>
        <p className="text-2xl font-['Inter'] leading-relaxed tracking-[3.75px] text-white max-w-4xl mx-auto">
          Fashion Show
        </p>
      </section>

      {/* Rules Section */}
      <RulesAndRegulation rules={rules} />

      {/* Judgement Criteria Section */}
      <section className="mb-20">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium uppercase text-center tracking-[3.75px] mb-8">
          Judgement Criteria
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
          <ul className="list-decimal pl-5 text-2xl sm:text-3xl space-y-2 font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
            {criterias.map((criteria, index) => (
              <li key={index}>{criteria}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="mb-20">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-8">
          PRIZES
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
          <ul className="list-disc pl-5 text-2xl sm:text-3xl space-y-2 font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
            <li>1st: Miss ₹4000, Mr ₹4000</li>
            <li>2nd: Miss ₹3000, Mr ₹3000</li>
            <li>3rd: Miss ₹2000, Mr ₹2000</li>
            <li>Total Cash Pool: ₹18000</li>
          </ul>
        </div>
      </section>

      {/* Event Rounds Section */}
      <section className="mb-20">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-8">
          EVENT ROUNDS
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto text-white text-2xl sm:text-3xl space-y-4 font-['Inter'] leading-relaxed">
          <div>
            <h3 className="font-semibold text-3xl mb-2 text-[#FFD188]">1st Round</h3>
            <p>Venue: Babuji Chowk</p>
            <p>Date: 11th February (Wednesday)</p>
            <p>Time: 1 PM onwards</p>
          </div>
          <div>
            <h3 className="font-semibold text-3xl mb-2 text-[#FFD188]">2nd Round</h3>
            <p>Venue: Babuji Chowk</p>
            <p>Date: 16th February (Monday)</p>
            <p>Time: 1 PM onwards</p>
          </div>
          <div>
            <h3 className="font-semibold text-3xl mb-2 text-[#FFD188]">3rd Round</h3>
            <p>Venue: Football Ground Stage</p>
            <p>Date: 19th February (Thursday)</p>
            <p>Time: 6 PM onwards</p>
          </div>
        </div>
      </section>

      {/* Event Managers Section */}
      <EventManagers managers={managers} />

    </div>
  );
};

export default Page;
