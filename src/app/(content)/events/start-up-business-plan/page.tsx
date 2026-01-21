"use client";
import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import EventManagers from "@/components/sub-component/event-managers";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const managers = [
    {
      imageUrl: "/managers/Startup/Sonali.jpg",
      name: "Sonali Pradhan",
      contact: 8260226364,
    },
    {
      imageUrl: "/managers/Startup/Palak.jpg",
      name: "Palak Agrawal",
      contact: 6264671771,
    },
    {
      imageUrl: "/managers/Startup/Manish.jpg",
      name: "Manish Yadav",
      contact: 9109892675,
    },
  ];

  const rules = [
    "Strict adherence to time limits: Each team must complete its pitch within the allotted time. Exceeding the limit may lead to score deduction or disqualification.",
    "Team representation: Only registered team members are allowed to pitch and respond during the Q&A session.",
    "Originality of idea: The idea presented must be original and owned by the pitching team. Plagiarism or copied concepts will result in immediate disqualification.",
    "Presentation format compliance: Participants must follow the prescribed format (PPT/PDF, slide limit, font size, etc.) as communicated by the organizers.",
    "Judges’ decision is final: The evaluation and results declared by the jury are final and binding on all participants.",
  ];

  const criterias = [
    "Innovation & Problem Relevance",
    "Feasibility & Business Potential",
    "Presentation & Team Capability",
  ];

  const [registrationCount, setRegistrationCount] = useState(0);
  useEffect(() => {
    getRegistrationCount("STARTUP-BUSINESS-PLAN").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  return (
    <div className="relative space-y-10 px-4 py-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#2A1414]" />

      {/* Event Intro Section */}
      <EventIntro
        venue="Live Classroom"
        time="20-02-26, 10:30 am"
        imageUrl="/testfile/startup.svg"
        registrations={registrationCount}
        pricepool={18000}
        description="The Startup Pitching Event is designed to provide early-stage innovators and entrepreneurs a platform to present their ideas to a panel of experts, investors, and industry leaders. Participants will showcase innovative solutions addressing real-world problems, demonstrate business viability, and receive constructive feedback to refine their concepts. The event aims to encourage innovation, entrepreneurship, and collaboration while identifying high-potential startups for mentorship, incubation, and further support."
      />

      {/* Event Category Section */}
      <section className="my-32 text-center">
        <h1 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium mb-8">
          EVENT CATEGORY
        </h1>
        <p className="text-2xl font-['Inter'] leading-relaxed tracking-[3.75px] text-white max-w-4xl mx-auto">
          Poster Point Presentations for Working and Non-Working models
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
          <ul className="list-decimal pl-5 text-2xl sm:text-3xl font-normal space-y-2 font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
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
            <li>1st, 2nd, and 3rd Place Winners</li>
          </ul>
        </div>
      </section>

      {/* Event Managers Section */}
      <EventManagers managers={managers} />
    </div>
  );
};

export default Page;
