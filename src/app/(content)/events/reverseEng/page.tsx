"use client";
import React,{useState,useEffect} from "react";
import EventIntro from "@/components/sub-component/event-intro";
import RoundSection from "@/components/sub-component/RoundSection";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import EventManagers from "@/components/sub-component/event-managers";
import WhyParticipate from "@/components/sub-component/why-participate";
import Image from "next/image";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const rules = [
    "Arrive at the venue 15 minutes before the event starts.",
    "Submit an abstract (max 400 words) summarizing the idea before the event.",
    "The idea must be innovative and address existing problems.",
    "Participants can compete individually or in teams.",
    "Winners are determined based on points earned.",
    "Presentations must be completed within 8 minutes.",
    "A warning bell will ring at 6 minutes, signaling the last 2 minutes.",
    "A 2-minute query round follows each presentation.",
  ];
  const managers = [
    {
      imageUrl: "/managers/Ideathon/Aryan.jpg",
      name: "Aryan Mishra",
      contact: 7205993715,
    },
    {
      imageUrl: "/managers/Ideathon/Ashutosh.jpg",
      name: "Ashutosh Sahu",
      contact: 9776565942,
    },
    {
      imageUrl: "/managers/Ideathon/Kumkum.jpg",
      name: "KumKum Singh",
      contact: 8889702577,
    },
  ];
  const reasons = [
    "Win ₹18,000 and gain recognition.",
    "Boost skills in problem-solving, design thinking, and presentation.",
    "Create real-world impact with innovative solutions.",
    "Network with experts and like-minded innovators.",
    "Enhance your resume with a standout achievement.",
    "Challenge yourself to think creatively under pressure.",
  ];
  const rounds = [
    {
      title: "ROUND 1",
      description: "There will be a single round.",
    },
  ];

    const [registrationCount, setRegistrationCount] = useState(0)
  useEffect(() => {
    getRegistrationCount("IDEATHON").then((count) => {
      setRegistrationCount(count)
    })
  }, [])

  return (
    <>
      {/* Background Image Optimized */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          width={500}
          height={500}
          src="/background.svg"
          className="w-full h-auto opacity-150"
          alt="Scrolling Background"
        />
      </div>

      {/* Event Introduction */}
      <EventIntro
        imageUrl="/techno-events-logo/ideathon.png"
        registrations={registrationCount}
        pricepool={18000}
        description="Ideathon is an engaging brainstorming event where individuals collaborate to address pressing challenges through innovative solutions. Participants work in teams, utilizing design thinking to develop viable ideas across diverse subjects like marketing, philosophy, and science."
        time="20-03-2025, 11:30 AM"
        venue="EE Seminar Hall(FB-14)"
      />

      <div className="flex flex-col items-center">
        <div className="bg-transparent text-white p-6 md:p-12 space-y-32">
          {/* Rounds Section */}
          <section className="px-4">
            <RoundSection rounds={rounds} />
          </section>

          {/* Judging Criteria Section */}
          <section>
            <h2 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-12">
              JUDGING CRITERIA
            </h2>
            <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
              <p className="mb-4 text-2xl ">
                Each idea is evaluated on the following criteria, with a maximum
                of 20 points per category (Total 100 points):
              </p>
              <ul className="list-disc pl-5 text-2xl space-y-2 ">
                <li>Uniqueness of the idea</li>
                <li>Feasibility of the proposed solution</li>
                <li>Presentation style</li>
                <li>Response to questions from judges</li>
                <li>Scalability of the idea</li>
              </ul>
            </div>
          </section>

          {/* Event Managers Section */}
          <WhyParticipate reasons={reasons} />
          <RulesAndRegulation rules={rules} />
          <EventManagers managers={managers} />
        </div>
      </div>
    </>
  );
};

export default Page;
