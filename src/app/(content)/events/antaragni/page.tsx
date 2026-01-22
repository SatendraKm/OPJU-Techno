"use client";
import React, { useEffect, useState } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import SubEventCard from "@/components/sub-component/sub-event-card";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import EventManagers from "@/components/sub-component/event-managers";
import { FaMusic, FaFilm, FaMicrophone, FaRunning } from "react-icons/fa";
import RoundSection from "@/components/sub-component/RoundSection";
import { getRegistrationCount } from "@/actions/event-actions";

const Antaragni = () => {
  const rules = [
    "All participants must arrive at least 30 minutes before the event starts. Latecomers will not be allowed to perform",
    "No student can directly participate in the final round without clearing the previous rounds",
    "Inappropriate or vulgar clothing and songs are not allowed.",
    "Participants must submit their chosen song and background video to the event coordinator one day before their audition and performance.",
    "Students should be fully prepared with their song and outfit before the event.",
    "Performances will be judged based on talent, decency, and discipline.",
    "Judges' decision is final and must be accepted by all participants. No appeals or objections will be entertained.",
    "Participants will be eliminated after each round based on the judges' evaluation.",
    "Participants must respect the event coordinators, judges, and fellow contestants at all times. Any misbehavior may lead to disqualification.",
  ];

  const managers = [
    { imageUrl: "/managers/Antaragini/Nikhil Singh.jpg", name: "Nikhil Singh Jatwar", contact: 9399907335 },
    { imageUrl: "/managers/Antaragini/Pallavi.jpg", name: "Pallavi Singh", contact: 9201046402 },
    { imageUrl: "/managers/Antaragini/Vanshika.jpg", name: "Vanshika Gupta", contact: 9039896991 },
  ];

  const rounds = [
    { title: "ROUND 1", description: "AUDITION - 1 (INTERNAL)" },
    { title: "ROUND 2", description: "AUDITION - 2 (OUTSIDERS)" },
    { title: "ROUND 3", description: "SCREENING" },
    { title: "ROUND 4", description: "FINAL DEMO" },
  ];

  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    getRegistrationCount("ANTARAGNI").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#2A1414]" />

      {/* Event Intro Section */}
      <section>
        <a href="/dashboard">
        <EventIntro
          imageUrl="/testfile/antaragini.svg"
          registrations={registrationCount}
          pricepool={21500}
          description="ANTARAGNI is a vibrant platform for students to showcase their creative talents..."
          time="19-02-26 , 7:30 pm"
          venue="UNIVERSITY PLAYGROUND"
        />
        </a>
      </section>

      <p className="mt-20 text-2xl md:text-4xl font-protest-revolution text-white tracking-[0.15em] text-center">
        Feel the beat, own the street
      </p>

      {/* Sub-Events Section */}
      <section className="mx-auto max-w-5xl px-4 mt-24">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium uppercase tracking-wide mb-4">
            Sub-events
          </h2>
          <p className="text-xl sm:text-2xl text-gray-200 font-normal tracking-wide">
            Following are the sub-events of this main event...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SubEventCard Icon={FaRunning} title="Solo Dance / Group Dance" description="Unleash your passion for dance..." />
          <SubEventCard Icon={FaMusic} title="Solo Singing" description="Sing your heart out..." />
          <SubEventCard Icon={FaFilm} title="Short Film" description="Tell a compelling story..." />
          <SubEventCard Icon={FaMicrophone} title="Rap / Beat-boxing" description="Battle it out with words and rhythm..." />
        </div>
      </section>

      {/* Rounds Section */}
      <RoundSection rounds={rounds} />

      {/* Rules & Managers */}
      <RulesAndRegulation rules={rules} />
      <EventManagers managers={managers} />
    </div>
  );
};

export default Antaragni;
