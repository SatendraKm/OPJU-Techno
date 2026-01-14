import React from "react";
import Image from "next/image";
import Link from "next/link";
import ButtonLanding from "@/components/sub-component/button-landing";

const eventsData = {
  technical: [
    { imageUrl: "/testfile/codigo.png", link: "/events/codigo" },   
    { imageUrl: "/testfile/techlab.png", link: "/events/techlab" },  
    { imageUrl: "/testfile/robovation.png", link: "/events/robovation" },
    //{ imageUrl: "/testfile/Reverse Eng.png", link: "/events/hackathon" },
    //{ imageUrl: "/techno-events-logo/aerodrone.png", link: "/events/aerodrone" },
    { imageUrl: "/testfile/ideathon.png", link: "/events/ideathon" },
    { imageUrl: "/testfile/ReverseEng.png", link: "/events/reverseEng" },
    { imageUrl: "/testfile/2Designathon.png", link: "/events/designathon" },
   
  ],
  
  nonTechnical: [
    { imageUrl: "/testfile/Kalakriti .png", link: "/events/kalakriti" },
    //{ imageUrl: "/techno-events-logo/spotlightsaga.png", link: "/events/spotlight-saga" },
   // { imageUrl: "/techno-events-logo/amongus.png", link: "/events/among-us" },
    { imageUrl: "/testfile/Masterchef .png", link: "/events/master_chef" },
    { imageUrl: "/testfile/Roadies .png", link: "/events/roadies" },
    { imageUrl: "/testfile/Antaragni 1.png", link: "/events/antaragni" },
    //{ imageUrl: "/techno-events-logo/gamefusion.png", link: "/events/game-fusion" },
    { imageUrl: "/testfile/Voice of Youth .png", link: "/events/yuva-sabha" },
    { imageUrl: "/testfile/Beat Battle.png", link: "/events/beat-battle" },
    { imageUrl: "/testfile/Start-up.png", link: "/events/start-up-business-plan" },
    { imageUrl: "/testfile/riywayat.png", link: "/events/riywayat" },
    { imageUrl: "/testfile/AIMA’s 1.png", link: "/events/aima" },
  ],
};

interface EventSectionProps {
  title: string;
  events: { imageUrl: string; link: string }[];
}

const EventSection: React.FC<EventSectionProps> = ({ title, events }) => (
  <>
    {/* Background image */}
    <div
      className="absolute top-0 left-0 w-full pointer-events-none -z-10"
      id="bg-container"
    >
     
    </div>
    <h2 className="text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-center mt-40">
      {title}
    </h2>
    <p className="mt-4 md:mt-10 w-full md:w-[943px] text-center text-white text-lg md:text-xl font-medium font-['Poppins'] uppercase mx-auto">
      Our fest offers a diverse range of technical and non-technical events,
      ensuring there&apos;s something for everyone. From innovative tech showcases to
      fun and engaging activities, we bring together creativity, skills, and
      excitement for an unforgettable experience!
    </p>
    {/* Responsive grid: two columns by default, three columns on medium screens */}
    <div className="mt-10 md:mt-28 ml-20 grid grid-cols-2 md:grid-cols-3 gap-2 px-3 md:px-8 lg:px-16">
      {events.map((event, index) => (
        <Link key={index} href={event.link} className={`block w-full ${event.link === '/events/game-fusion' ? 'col-start-2' : ''}`}>
          {/* Image container with fixed aspect ratio */}
          <div className="relative w-5/6 aspect-[4/5]">
            <Image
              src={event.imageUrl}
              alt={event.link}
              fill
              className="object-fit rounded-xl w-fit h-fit"
              priority
            />
          </div>
        </Link>
      ))}
    </div>
    <ButtonLanding label="Register" link="/dashboard" />
  </>
);

const Page = () => {
  return (
    <div className="relative min-h-screen">

      {/* 🌄 PAGE BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/testfile/bgevents.jpeg"
          alt="Events Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* CONTENT */}
      <div className="events mt-10 md:mt-28 px-4 md:px-0 relative z-10">
        <EventSection title="TECHNICAL EVENTS" events={eventsData.technical} />
        <EventSection title="NON-TECHNICAL EVENTS" events={eventsData.nonTechnical} />
      </div>

    </div>
  );
};

export default Page;
