"use client";
import React, { useEffect, useState } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import EventManagers from "@/components/sub-component/event-managers";
import { getRegistrationCount } from "@/actions/event-actions";

const Roadies = () => {
  const studentmanagers = [
    {
      imageUrl: "",
      name: "Ritika Sahu",
      contact: 9078942095,
    },
    {
      imageUrl: "",
      name: "Harpreet Singh",
      contact: 9078942095,
    },
    {
      imageUrl: "",
      name: "Kumkum Kritika",
      contact: 9078942095,
    },
    {
      imageUrl: "",
      name: "Parinita Bahera",
      contact: 9078942095,
    },
  ];

  const [registrationCount, setRegistrationCount] = useState(0);
  useEffect(() => {
    getRegistrationCount("ROADIES").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  return (
    <div className="relative space-y-10 px-4 py-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#2A1414]" />

      {/* Event Intro Section */}
      <EventIntro
        venue="Bus Parking Area"
        time="19-02-26, 11:30 am" /* Event at 19-20-21 */
        imageUrl="/testfile/roadies.svg"
        registrations={registrationCount}
        pricepool={12000}
        description="Roadies is a flagship talent, innovation, and personality-based competition inspired by real-world problem solving, creativity, teamwork, and leadership. The event provides a platform for students to showcase their technical skills, innovative thinking, presentation ability, and competitive spirit through multiple engaging categories.
The event is designed to promote:
· Physical Strength
· Practical learning and application
· Teamwork and leadership qualities
· Confidence, communication, and problem-solving skills
"
      />

      {/* Theme Section */}
      <section className="text-center mx-auto max-w-4xl px-4">
        <h1 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-[poppins] mb-8">
          THEME
        </h1>
        <p className="text-2xl font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
          Adventure / Survival
        </p>
      </section>

      {/* Rounds Section */}
      <section className="mt-20 mx-auto max-w-5xl px-4">
        <h2 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-[poppins] text-center mb-8">
          RULES:
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg">
          <ul className="list-disc pl-5 text-2xl sm:text-3xl space-y-2 font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
            <li>1. Participants may participate individually</li>
            <li>2. Each member must register before the deadline.</li>
            <li>
              Participants must be present during the judging time; absence may
              lead to disqualification.
            </li>
            <li>
              4. Participants must maintain discipline and decorum throughout
              the event.
            </li>
          </ul>
        </div>
      </section>

      {/* Judgement Criteria Section */}
      <section className="mb-20 mx-auto max-w-5xl px-4">
        <h2 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-[poppins] text-center mb-8">
          JUDGEMENT CRITERIA:
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg">
          <ul className="list-disc pl-5 text-2xl sm:text-3xl space-y-2 font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
            <li>There is no judgement criteria</li>
          </ul>
        </div>
      </section>

      {/* Prize */}
<section className="mb-20">
  <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-8">
    PRIZE
  </h2>

  <div className="bg-[#33010140] p-6 sm:p-8 rounded-lg shadow-lg max-w-5xl mx-auto text-center">
    <ul className="list-disc pl-5 inline-block text-left text-2xl sm:text-3xl space-y-2 font-['Inter'] leading-relaxed tracking-[3.75px] text-gray-200">
      <li>1st Prize</li>
      <li>2nd Prize</li>
      <li>3rd Prize</li>
    </ul>

    <p className="mt-6 text-xl sm:text-2xl italic text-gray-300">
      (Certificates will be awarded to all participants)
    </p>
  </div>
</section>




      {/* Event Managers Section */}
      <section className="mx-auto max-w-5xl px-4">
        <EventManagers managers={studentmanagers} />
      </section>
    </div>
  );
};

export default Roadies;
