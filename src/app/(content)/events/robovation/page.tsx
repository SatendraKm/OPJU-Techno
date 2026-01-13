"use client";

import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import EventManagers from "@/components/sub-component/event-managers";
import SubEventCard from "@/components/sub-component/sub-event-card";
import Image from "next/image";
import { BsRobot } from "react-icons/bs";
import { FaFlagCheckered } from "react-icons/fa";
import { IoFootballOutline } from "react-icons/io5";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  /* ===================== MANAGERS ===================== */
  const managers = [
    { imageUrl: "/managers/Robovation/Harsh tiwari.jpg", name: "Harsh Tiwari", contact: 8815612698 },
    { imageUrl: "/managers/Robovation/Nikhil Prasad.jpg", name: "Nikhil Prasad", contact: 7488057104 },
    { imageUrl: "/managers/Robovation/Kushal Kumar.jpg", name: "Kushal Kumar Barsiwal", contact: 7987829224 },
    { imageUrl: "/managers/Robovation/udit vardhan.jpg", name: "Udit Vardhan Singh", contact: 8298558875 },
  ];

  /* ===================== RULEBOOK ===================== */
  const pdfPath = "/rulebookrobovation.pdf";

  /* ===================== STATE ===================== */
  const [registrationCount, setRegistrationCount] = useState(0);

  useEffect(() => {
    getRegistrationCount("ROBOVATION").then(setRegistrationCount);
  }, []);

  return (
    <div className="relative flex flex-col">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/background.svg"
          width={500}
          height={500}
          className="w-full h-auto opacity-100"
          alt="Background"
        />
      </div>

      {/* ===================== EVENT INTRO ===================== */}
      <EventIntro
        venue="BABUJI CHOWK (OPJU)"
        time="20–21 Feb 2026"
        imageUrl="/techno-events-logo/robovation.png"
        registrations={registrationCount}
        pricepool={36000}
        description="ROBOVATION 2026 is an electrifying robotics competition where innovation meets combat, speed, and precision. Participants design, build, and control robots to compete in high-intensity challenges including Robo Soccer, Robo Race, Fast Line Follower, and Robo War."
      />

      <div className="my-16" />

      {/* ===================== SUB EVENTS ===================== */}
      <h1 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-14">
        SUB EVENTS
      </h1>

      <p className="text-2xl tracking-[3.75px] text-white text-center max-w-5xl mx-auto mb-20 px-4">
        Robovation consists of four competitive robotics challenges designed to
        test engineering skills, control, speed, strategy, and innovation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-7xl mx-auto">
        <SubEventCard
          Icon={IoFootballOutline}
          title="ROBO SOCCER"
          description="Teams compete with a single wireless robot to score maximum goals by pushing or kicking a ball into the opponent’s goal. The event tests maneuvering, control, flipping, and kicking skills across elimination and final rounds."
        />

        <SubEventCard
          Icon={FaFlagCheckered}
          title="ROBO RACE"
          description="Design a manually controlled wireless robot capable of navigating a 28-meter obstacle-filled track. Speed, balance, and checkpoint clearance determine winners across qualifying and final rounds."
        />

        <SubEventCard
          Icon={BsRobot}
          title="FAST LINE FOLLOWER"
          description="Build a fully autonomous robot that follows a black line on a white track with maximum speed and accuracy. The robot completing the course in minimum time wins."
        />

        <SubEventCard
          Icon={BsRobot}
          title="ROBO WAR"
          description="A high-intensity combat robotics event where teams battle using wireless robots to push, flip, or knock opponents out of the arena. Performance is judged on dominance and time efficiency."
        />
      </div>

      {/* ===================== RULEBOOK DOWNLOAD ===================== */}
      <section className="mt-32 px-4 text-center">
        <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium mb-14">
          RULES & REGULATIONS
        </h2>

        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
          <p className="text-2xl mb-6">
            Download the official ROBOVATION 2026 rulebook for complete event
            rules, robot specifications, evaluation criteria, prizes, and schedules.
          </p>

          <a
            href={pdfPath}
            download
            className="bg-[#FFAE3D] hover:bg-[#e29a2e] transition text-white py-3 px-6 rounded-lg text-lg font-medium inline-block"
          >
            Download Rulebook (PDF)
          </a>
        </div>
      </section>

      {/* ===================== MANAGERS ===================== */}
      <div className="mt-32">
        <EventManagers managers={managers} />
      </div>
    </div>
  );
};

export default Page;
