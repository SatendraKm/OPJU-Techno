"use client";
import React,{useEffect,useState} from "react";
import EventIntro from "@/components/sub-component/event-intro";
import SubEventCard from "@/components/sub-component/sub-event-card";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";

import EventManagers from "@/components/sub-component/event-managers";
import { FaMusic, FaFilm, FaMicrophone, FaRunning } from "react-icons/fa";
import Image from "next/image";
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
    {
      title: "ROUND 1",
      description: "AUDITION - 1 (INTERNAL)",
    },
    {
      title: "ROUND 2",
      description: "AUDITION - 2 (OUTSIDERS)",
    },
    { title: "ROUND 3", description: "SCREENING" },
    { title: "ROUND 4", description: "FINAL DEMO" },
  ];

  const [registrationCount, setRegistrationCount] = useState(0)
  useEffect(() => {
    getRegistrationCount("ANTARAGNI").then((count) => {
      setRegistrationCount(count)
    })
  }, [])

  return (
    <div className="">
      {/* Background Image */}
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
      <section>
        <EventIntro
          imageUrl="/techno-events-logo/antaragni.png"
          registrations={registrationCount}
          pricepool={21500}
          description="ANTARAGNI is a vibrant platform for students to showcase their creative talents in a meaningful and expressive way. From dancing, mime, singing, and rapping to short film-making and fusion performances, the event brings together diverse art forms on one stage. It celebrates passion, creativity, and cultural diversity, giving students an opportunity to express themselves through music, movement, and storytelling. Whether performing solo or in groups, participants get a chance to shine, entertain, and inspire the audience."
          time="19-02-26 , 7:30 pm"
          venue="UNIVERSITY PLAYGROUND"
        />
      </section>
      <p className="mt-20 text-2xl md:text-4xl font-protest-revolution text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-white to-gray-400 tracking-[0.15em] text-center">
      Feel the beat, own the street
        </p>



      {/* Sub-Events Section */}
      <section className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-['Poppins'] font-medium uppercase tracking-wide mb-4">
            Sub-events
          </h2>
          <p className="text-xl sm:text-2xl text-white font-normal tracking-wide">
            Following are the sub-events of this main event. Read the details carefully and choose the ones that best match your interests and expertise. Don&apos;t miss your chance to participate and showcase your skills!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SubEventCard
            Icon={FaRunning}
            title="Solo Dance / Group Dance"
            description="Unleash your passion for dance at Antaragni! Show off your moves, rhythm, and expression as you captivate the audience with your performance. Impress the judges with your energy, creativity, and stage presence!"
          />
          <SubEventCard
            Icon={FaMusic}
            title="Solo Singing"
            description="Sing your heart out and mesmerize the audience with your voice. Showcase your vocal talent and emotional expression."
          />
          <SubEventCard
            Icon={FaFilm}
            title="Short Film"
            description="Tell a compelling story through film. Create a short film that captivates, inspires, and leaves a lasting impression."
          />
          <SubEventCard
            Icon={FaMicrophone}
            title="Rap / Beat-boxing"
            description="Battle it out with words and rhythm. Show off your lyrical prowess, flow, and stage presence in this electrifying rap battle."
          />
        </div>
      </section>

      {/* Rounds Section (Using RoundSection Component) */}
      <RoundSection rounds={rounds} />

      {/* Bottom Section: Why Participate, Rules, and Event Managers */}
      
        
        <RulesAndRegulation rules={rules} />
        <EventManagers managers={managers} />
  
    </div>
  );
};

export default Antaragni;
