"use client";
import React,{useState,useEffect} from "react";
import EventIntro from "@/components/sub-component/event-intro";
import SubEventCard from "@/components/sub-component/sub-event-card";
import WhyParticipate from "@/components/sub-component/why-participate";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import EventManagers from "@/components/sub-component/event-managers";
import { SiPubg, SiValorant } from "react-icons/si";
import { IoGameController } from "react-icons/io5";
import { SiFifa } from "react-icons/si";
import { getRegistrationCount } from "@/actions/event-actions";

import Image from "next/image";

const Page = () => {
  const rules = [
    "No third party tools or hacks are allowed in the game. If anyone is caught in suspicious activity, their team will be disqualified immediately.",
    "If any person is caught using third party tools, the whole match will be replayed.",
    "Bring your own headsets and earphones; the organizing committee won’t provide them.",
    "Stick to the timings; the organizing committee won’t wait for late teams. If you face issues joining the lobby, please contact the coordinators.",
    "Room ID and Password will be shared on the WhatsApp group of the BGMI/FreeFire teams.",
    "No emulator or tablet players are allowed in this tournament.",
    "Match results will be shared on the WhatsApp group after each match.",
    "Overall Points Table will be shared after all matches.",
    "For Valorant, every participant must bring their own laptop.",
    "For FIFA MOBILE only android and IOS devices are allowed."
  ];

  const reasons = [
    "Exciting prizes up to ₹20000",
    "Opportunity for funding innovative gaming projects (as per OPJU Innovation Centre terms)",
    "Recognition certificates for all participating universities",
    "Participation certificates for all gamers",
    "Special category-wise winning prizes",
    "Hands-on experience in competitive gaming, strategy, and teamwork",
    "Reimbursement of one-way Sleeper class fare for outside participants",
  ];

  const managers = [
    { imageUrl: "/managers/Game Fusion/Rohan.jpg", name: "Rohan Prasad", contact: 7903654631 },
    { imageUrl: "/managers/Game Fusion/Saket.jpg", name: "Saket Bhagat", contact: 6203182795 },
    { imageUrl: "/managers/Game Fusion/SARVESH.jpg", name: "Sarvesh Rathore", contact: 8349374721 },
    { imageUrl: "/managers/Game Fusion/SHUBHAM.jpg", name: "Shubham Baghel", contact: 6296507314 },
  ];

  const [registrationCount, setRegistrationCount] = useState(0)
  useEffect(() => {
    getRegistrationCount("GAMEFUSION").then((count) => {
      setRegistrationCount(count)
    })
  }, [])

  return (
    <div className="">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/background.svg"
          alt="Scrolling Background"
          width={500}
          height={500}
          className="w-full h-auto opacity-150 object-cover"
        />
      </div>

      {/* Event Intro Section */}
      <section>
        <a href="/dashboard">
        <EventIntro
          imageUrl="/techno-events-logo/gamefusion.png"
          registrations={registrationCount}
          pricepool={20000}
          description="The LAN event is a high-energy gaming extravaganza designed to bring together the gaming community within our college. It's an immersive experience that transcends traditional gaming, creating a platform for participants to showcase their skills, engage in friendly competition, and celebrate the spirit of gaming."
          time="21-03-25 , 12:00 pm"
          venue="TB01, TB05, TB07"
        />
        </a>
      </section>

      {/* Theme Section */}
      <section className="flex flex-col items-center justify-center px-4 my-32">
        <h2 className="text-transparent mb-10 bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-3xl sm:text-4xl md:text-5xl font-medium tracking-[3.75px] text-center">
          THEME
        </h2>
        <div className="text-white text-base sm:text-lg md:text-2xl font-medium text-center tracking-[3.75px]">
          <p>Unleash the Gaming Warriors: A Batt  le for Supremacy in the Virtual Realm of Gaming!</p>
        </div>
      </section>

      {/* Sub-Events Section */}
      <section className="mx-auto max-w-5xl px-4 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-['Poppins'] font-medium uppercase tracking-[3.75px] mb-4">
            Sub-events
          </h2>
          <p className="text-lg sm:text-2xl text-white font-medium ">
            Following are the sub-events of this main event. Read the details carefully and choose the ones that best match your interests and expertise. Don&apos;t miss your chance to participate and showcase your skills!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SubEventCard
            Icon={SiPubg}
            title="BGMI"
            description="Show off your shooting skills, tactical gameplay, and survival instincts in an intense battle royale. Whether you're a lone wolf or part of a squad, impress the judges and thrill the crowd. Loot, strategize, and outlast your opponents—let the battle begin!"
          />
          <SubEventCard
            Icon={IoGameController}
            title="FREEFIRE"
            description="Show off your shooting skills, tactical gameplay, and survival instincts in an intense battle royale. Whether you're a lone wolf or part of a squad, impress the judges and thrill the crowd. Loot, strategize, and outlast your opponents—let the battle begin!"
          />
          <SubEventCard
            Icon={SiValorant}
            title="VALORANT"
            description="Show off your shooting skills, tactical gameplay, and survival instincts in an intense battle royale. Whether you're a lone wolf or part of a squad, impress the judges and thrill the crowd. Loot, strategize, and outlast your opponents—let the battle begin!"
          />
          <SubEventCard
            Icon={SiFifa}
            title="FIFA MOBILE"
            description="Get Ready for the Ultimate FIFA Mobile LAN Showdown! Join us for an electrifying FIFA Mobile LAN event where skill, strategy, and passion collide! Compete against top players, showcase your talent, and experience the thrill of real-time matches in an intense, action-packed atmosphere. Whether you’re aiming for victory or just here for the love of the game, this is your chance to prove yourself on the big stage. Grab your device, bring you’re a-game, and let’s kick off an unforgettable tournament!"
          />
        </div>
      </section>

      {/* Rounds Section */}
      <section className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {[
              { title: "ROUND 1", subtitle: "QUALIFICATION ROUND" },
              { title: "ROUND 2", subtitle: "FINAL ROUND" },
            ].map((round, index) => (
              <div
                key={index}
                className="border-2 border-yellow-500 p-6 rounded-lg text-center text-white bg-opacity-20 bg-black"
              >
                <h2 className="text-lg lg:text-3xl font-medium font-['Poppins'] mb-2">
                  {round.title}
                </h2>
                <p className="text-sm lg:text-xl font-['Poppins']">{round.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section: Why Participate, Rules, and Event Managers */}
      <section className="mx-auto max-w-5xl px-4 my-10 space-y-12">
        <WhyParticipate reasons={reasons} />
        <RulesAndRegulation rules={rules} />
        <EventManagers managers={managers} />
      </section>
    </div>
  );
};

export default Page;
