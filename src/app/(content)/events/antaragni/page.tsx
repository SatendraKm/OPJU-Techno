"use client";
import React, { useEffect, useState } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import EventManagers from "@/components/sub-component/event-managers";
import { FaMusic, FaFilm, FaMicrophone, FaRunning, FaTheaterMasks, } from "react-icons/fa";
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
    {
    imageUrl: "/managers/Antaragni/Antaragni/priya.jpg",
    name: "Priya Singh",
    contact: 8709538215,
  },
    {
      imageUrl: "/managers/Antaragni/Antaragni/rudraksh.jpg",
      name: "Rudraksh Dubey",
      contact: 8827986525,
    },
    {
      imageUrl: "/managers/Antaragni/Antaragni/vanshika.jpg",
      name: "Vanshika Gupta",
      contact: 9039896991,
    },
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
        {/* <a href="/dashboard"> */}
        <EventIntro
          imageUrl="/testfile/Antragini3.svg"
          registrations={registrationCount}
          pricepool={21500}
          description="ANTARAGNI is a vibrant platform for students to showcase their creative talents..."
          time="19-02-26 , 7:30 pm"
          venue="UNIVERSITY PLAYGROUND"
        />
        {/* </a> */}
      </section>

      <p className="mt-20 text-2xl md:text-4xl font-protest-revolution text-white tracking-[0.15em] text-center">
        Feel the beat, own the street
      </p>

      {/* Sub-Events Section */}
<section className="mx-auto max-w-6xl px-4 mt-24">
  <div className="flex flex-col items-center text-center mb-12">
    <h2 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium uppercase tracking-wide mb-4">
      Sub-events
    </h2>
    <p className="text-xl sm:text-2xl text-[#ffffff] font-normal tracking-wide">
  Following are the sub-events of this main event...
</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Solo Dance / Duet / Group Dance */}
    <div className="bg-gradient-to-br from-[#3d1a1a] to-[#2A1414] rounded-xl p-6 border border-[#FFAE3D]/30 hover:border-[#FFAE3D] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFAE3D]/20">
      <div className="flex flex-col items-center text-center">
        <div className="text-[#FFAE3D] text-5xl mb-4">
          <FaRunning />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Solo Dance / Duet / Group Dance</h3>
        <p className="text-gray-300 mb-4">Unleash your passion for dance in any form - Classical, Folk, Western, Contemporary, Hip-Hop, or Fusion.</p>
        
        <div className="w-full mb-4">
          <h4 className="text-[#FFAE3D] font-semibold mb-2">Categories:</h4>
          <ul className="list-disc list-inside text-gray-200 space-y-1 text-sm text-left">
            <li>Solo Dance - Any dance form (Classical / Folk / Western / Contemporary / Hip-Hop / Fusion)</li>
            <li>Duet - Synchronized performance by two dancers</li>
            <li>Group Dance - Synchronized choreography with theme-based presentation (Fusion of classical and modern)</li>
          </ul>
        </div>
        
        <div className="bg-[#FFAE3D]/10 border border-[#FFAE3D]/30 rounded-lg px-4 py-2 w-full">
          <span className="text-[#FFAE3D] font-semibold text-sm">⏱️ Solo: 3:00-3:30min | Duet: 3:30-4:00min | Group: 5:00-6:00min</span>
        </div>
      </div>
    </div>

    {/* Solo Singing */}
    <div className="bg-gradient-to-br from-[#3d1a1a] to-[#2A1414] rounded-xl p-6 border border-[#FFAE3D]/30 hover:border-[#FFAE3D] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFAE3D]/20">
      <div className="flex flex-col items-center text-center">
        <div className="text-[#FFAE3D] text-5xl mb-4">
          <FaMusic />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Solo Singing</h3>
        <p className="text-gray-300 mb-4">Sing your heart out in any genre - from classical melodies to western hits.</p>
        
        <div className="w-full mb-4">
          <h4 className="text-[#FFAE3D] font-semibold mb-2">Categories:</h4>
          <ul className="list-disc list-inside text-gray-200 space-y-1 text-sm text-left">
            <li>Classical / Semi-classical / Folk / Bollywood / Western / Indian</li>
          </ul>
        </div>
        
        <div className="bg-[#FFAE3D]/10 border border-[#FFAE3D]/30 rounded-lg px-4 py-2 w-full">
          <span className="text-[#FFAE3D] font-semibold text-sm">⏱️ 2:30-3:00min</span>
        </div>
      </div>
    </div>

    {/* Rap / Beat-boxing */}
    <div className="bg-gradient-to-br from-[#3d1a1a] to-[#2A1414] rounded-xl p-6 border border-[#FFAE3D]/30 hover:border-[#FFAE3D] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFAE3D]/20">
      <div className="flex flex-col items-center text-center">
        <div className="text-[#FFAE3D] text-5xl mb-4">
          <FaMicrophone />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Rap / Beat-boxing</h3>
        <p className="text-gray-300 mb-4">Battle it out with words and rhythm in original or adapted performances.</p>
        
        <div className="w-full mb-4">
          <h4 className="text-[#FFAE3D] font-semibold mb-2">Categories:</h4>
          <ul className="list-disc list-inside text-gray-200 space-y-1 text-sm text-left">
            <li>Original or adapted rap performances with clean and appropriate lyrics</li>
          </ul>
        </div>
        
        <div className="bg-[#FFAE3D]/10 border border-[#FFAE3D]/30 rounded-lg px-4 py-2 w-full">
          <span className="text-[#FFAE3D] font-semibold text-sm">⏱️ 2:30-3:00min</span>
        </div>
      </div>
    </div>

    {/* Mime / Mimicry */}
    <div className="bg-gradient-to-br from-[#3d1a1a] to-[#2A1414] rounded-xl p-6 border border-[#FFAE3D]/30 hover:border-[#FFAE3D] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFAE3D]/20">
      <div className="flex flex-col items-center text-center">
        <div className="text-[#FFAE3D] text-5xl mb-4">
          <FaTheaterMasks />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Mime / Mimicry</h3>
        <p className="text-gray-300 mb-4">Express powerful messages through silent acts and creative expressions.</p>
        
        <div className="w-full mb-4">
          <h4 className="text-[#FFAE3D] font-semibold mb-2">Categories:</h4>
          <ul className="list-disc list-inside text-gray-200 space-y-1 text-sm text-left">
            <li>Expression-based performance conveying a message without dialogue</li>
          </ul>
        </div>
        
        <div className="bg-[#FFAE3D]/10 border border-[#FFAE3D]/30 rounded-lg px-4 py-2 w-full">
          <span className="text-[#FFAE3D] font-semibold text-sm">⏱️ 3:00-4:00min</span>
        </div>
      </div>
    </div>

    {/* Short Film / Reel Making */}
    <div className="bg-gradient-to-br from-[#3d1a1a] to-[#2A1414] rounded-xl p-6 border border-[#FFAE3D]/30 hover:border-[#FFAE3D] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFAE3D]/20">
      <div className="flex flex-col items-center text-center">
        <div className="text-[#FFAE3D] text-5xl mb-4">
          <FaFilm />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Short Film / Reel Making</h3>
        <p className="text-gray-300 mb-4">Tell compelling stories through visual storytelling with the theme: Dream vs Reality.</p>
        
        <div className="w-full mb-4">
          <h4 className="text-[#FFAE3D] font-semibold mb-2">Categories:</h4>
          <ul className="list-disc list-inside text-gray-200 space-y-1 text-sm text-left">
            <li>Short Film - Visual storytelling (Theme: Dream vs Reality)</li>
            <li>Reel Making - Creative short-form content (Theme: Dream vs Reality)</li>
          </ul>
        </div>
        
        <div className="bg-[#FFAE3D]/10 border border-[#FFAE3D]/30 rounded-lg px-4 py-2 w-full">
          <span className="text-[#FFAE3D] font-semibold text-sm">⏱️ Short Film: 6:00-7:00min | Reel: 30sec-1:00min</span>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Rounds Section */}
      <RoundSection rounds={rounds} />

      {/* Evaluation Process */}
      <section className="mb-20">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-8">
          EVALUATION PROCESS
        </h2>

        <div className="bg-[#33010140] p-6 sm:p-8 rounded-lg shadow-lg max-w-6xl mx-auto space-y-10">
          {/* Judging Criteria */}
          <div>
            <h3 className="text-3xl sm:text-4xl font-semibold text-center mb-6 text-gray-100">
              1. Judging Criteria
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-gray-200 text-xl sm:text-2xl">
                <thead>
                  <tr className="border-b border-gray-500">
                    <th className="py-3">Criteria</th>
                    <th className="py-3 text-right">Weightage</th>
                  </tr>
                </thead>
                <tbody className="space-y-2">
                  <tr className="border-b border-gray-700">
                    <td className="py-3">
                      Performance & Talent (Singing / Dancing / Acting Skills)
                    </td>
                    <td className="py-3 text-right">30 Marks</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3">
                      Expression & Creativity (Emotions, Originality, Stage
                      Presence)
                    </td>
                    <td className="py-3 text-right">20 Marks</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3">
                      Song / Act Selection (Appropriateness & Uniqueness)
                    </td>
                    <td className="py-3 text-right">15 Marks</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3">
                      Costume & Presentation (Dress, Props, Overall Appearance)
                    </td>
                    <td className="py-3 text-right">15 Marks</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3">
                      Discipline & Decorum (Punctuality, Behavior, Rule
                      Compliance)
                    </td>
                    <td className="py-3 text-right">10 Marks</td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      Audience Engagement (Confidence, Interaction, Energy)
                    </td>
                    <td className="py-3 text-right">10 Marks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Evaluation Stages */}
          <div>
            <h3 className="text-3xl sm:text-4xl font-semibold text-center mb-4 text-gray-100">
              2. Evaluation Stages
            </h3>

            <ul className="list-disc pl-6 text-2xl sm:text-3xl space-y-2 text-gray-200 text-center sm:text-left">
              <li>Audition Round</li>
              <li>Elimination Rounds</li>
              <li>Final Round</li>
            </ul>
          </div>

          {/* Decision Making */}
          <div>
            <h3 className="text-3xl sm:text-4xl font-semibold text-center mb-4 text-gray-100">
              3. Decision Making & Results
            </h3>

            <p className="text-2xl sm:text-3xl text-gray-200 text-center leading-relaxed">
              The judges’ decision will be final and binding. Results will be
              declared based on cumulative scores across all evaluation stages.
            </p>
          </div>
        </div>
      </section>

      {/* Rules & Managers */}
      <RulesAndRegulation rules={rules} />
      <EventManagers managers={managers} />
    </div>
  );
};

export default Antaragni;
