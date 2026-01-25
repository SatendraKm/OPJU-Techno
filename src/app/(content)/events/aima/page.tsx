"use client";
import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import EventManagers from "@/components/sub-component/event-managers";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const managers = [
    {
      imageUrl: "/placeholder-pic.jpeg",
      name: "Bhoomika Agrawal",
      contact: 7580827172,
    },
    {
      imageUrl: "/placeholder-pic.jpeg",
      name: "Bhoomi Chandra",
      contact: 8103501661,
    },
    
  ];

  const rules = [
    "Any School, UG and PG student who is interested in learning more about the business world and testing their knowledge of various aspects of it.",
    "Team of 2 Students, No bar on Number of teams participating from an institute.",
    "Questions are crafted to mirror real-world business scenarios.",
    "Expect a blend of multiple-choice and true or false questions covering a spectrum of topics such as renowned brands, effective marketing strategies, HR methodologies, financial intricacies, significant business occurrences, and prominent personalities making headlines.",
  ];

  const criterias = [
    "Regional Prelim (Mobile based on mentimeter) 11:00 to 12:00 hrs",
    "Regional Qualifier (Paper based MCQ) 12:00 to 13:00 hrs",
    "Result Announcement: Post Lunch",
    "Regional Semi finale 1(On Stage) 14:00 to 14:30 hrs",
    "Regional Semi finale 2 (On Stage) 14:45 to 15:15 hrs",
    "Regional finale (On Stage) 15:30 to 16:00 hrs",
  ];

  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    getRegistrationCount("AIMA").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  return (
    <div className="relative space-y-10 px-4 py-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#2A1414]" />

      {/* Event Intro Section */}
      {/* <a href="/dashboard"> */}
      <EventIntro
        venue="Multipurpose Hall, O.P. Jindal University, Raigarh"
        time="21 February, 2026 | 09:00 AM - 05:00 PM"
        imageUrl="/testfile/aima3.svg"
        registrations={registrationCount}
        pricepool={10000}
        description="The Student Management Quiz (SMQ) offers an engaging and innovative platform to assess students’ understanding across diverse business domains, including branding, marketing, HR, finance, and prominent business leaders. Compete, learn, and win exciting rewards."
      />
      {/* </a> */}

      {/* Event Category Section */}
      <section className="my-32 text-center">
        <h1 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium mb-8">
          EVENT CATEGORY
        </h1>
        <p className="text-2xl font-['Inter'] leading-relaxed tracking-[3.75px] text-white max-w-4xl mx-auto">
          Management Quiz
        </p>
      </section>

      {/* Rules Section */}
      <RulesAndRegulation rules={rules} />

      {/* Schedule Section */}
      <section className="mb-20">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium uppercase text-center tracking-[3.75px] mb-8">
          Schedule & Judgement Criteria
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
            <li>Exciting prizes for the winner worth ₹10,000</li>
            <li>Certificate of Participation for all participants</li>
          </ul>
        </div>
      </section>

      {/* Event Managers */}
      <EventManagers managers={managers} />
    </div>
  );
};

export default Page;
