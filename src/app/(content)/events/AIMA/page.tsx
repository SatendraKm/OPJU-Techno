"use client";
import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import EventManagers from "@/components/sub-component/event-managers";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import Image from "next/image";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const managers = [
    { imageUrl: "/managers/SMQ/Bhoomika.jpg", name: "Bhoomika Agrawal", contact: 7580827172 },
    { imageUrl: "/managers/SMQ/Bhoomi.jpg", name: "Bhoomi Chandra", contact: 8103501661 },
    { imageUrl: "/managers/SMQ/Rimjhim.jpg", name: "Rimjhim Sahu", contact: 9303394225 },
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
    getRegistrationCount("SMQ-2025-26").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  return (
    <div className="relative space-y-10 px-4 py-8">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/background.svg"
          alt="Scrolling Background"
          width={500}
          height={500}
          className="w-full h-auto opacity-150"
        />
      </div>

      {/* Event Intro Section */}
      <EventIntro
        venue="Multipurpose Hall, O.P. Jindal University, Raigarh"
        time="21 February, 2026 | 09:00 AM - 05:00 PM"
        imageUrl="/techno-events-logo/smq.png"
        registrations={registrationCount}
        pricepool={10000}
        description="The Student Management Quiz (SMQ) offers an engaging and innovative platform to assess students’ understanding across diverse business domains, including branding, marketing, HR, finance, and prominent business leaders. Compete, learn, and win exciting rewards."
      />

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

      {/* Judgement Criteria / Schedule Section */}
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

      {/* Event Managers Section */}
      <EventManagers managers={managers} />

      {/* Faculty Coordinators Section */}
      <section className="mb-20">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium uppercase text-center tracking-[3.75px] mb-8">
          Faculty Coordinators
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto text-white text-2xl sm:text-3xl space-y-2 font-['Inter'] leading-relaxed">
          <p>Dr. Himanshu Vaishnaw: +91 97138 63587</p>
          <p>Dr. Saurabh Gupta: +91 97958 48506</p>
        </div>
      </section>
    </div>
  );
};

export default Page;
