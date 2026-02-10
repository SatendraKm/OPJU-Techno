import React from "react";
import Image from "next/image";
import Link from "next/link";


const eventsData = {
  technical: [
    { imageUrl: "/eventpagelogo/codigologo.svg", link: "/events/codigo" },
    { imageUrl: "/eventpagelogo/techlablogo.svg", link: "/events/techlab" },
    { imageUrl: "/eventpagelogo/robovationlogo.svg", link: "/events/robovation" },
    { imageUrl: "/eventpagelogo/ideathonlogo.svg", link: "/events/ideathon" },
    { imageUrl: "/eventpagelogo/backtracelogo.svg", link: "/events/reverseEng" },
    { imageUrl: "/eventpagelogo/designathonlogo.svg", link: "/events/designathon" },
  ],

  nonTechnical: [
    { imageUrl: "/eventpagelogo/kalakritilogo.svg", link: "/events/kalakriti" },
    { imageUrl: "/eventpagelogo/mastercheflogoevents.svg", link: "/events/master_chef" },
    { imageUrl: "/eventpagelogo/roadieslogo.svg", link: "/events/roadies" },
    { imageUrl: "/eventpagelogo/antaragnilogo.svg", link: "/events/antaragni" },
    { imageUrl: "/eventpagelogo/yuvasabhalogo.svg", link: "/events/yuva-sabha" },
    { imageUrl: "/eventpagelogo/beatbattlelogoevents.svg", link: "/events/beat-battle" },
    { imageUrl: "/eventpagelogo/startuplogo.svg", link: "/events/start-up-business-plan" },
    { imageUrl: "/eventpagelogo/riwayat.svg", link: "/events/riywayat" },
    { imageUrl: "/eventpagelogo/aimalogo.svg", link: "/events/aima" },
  ],
};

interface EventSectionProps {
  title: string;
  events: { imageUrl: string; link: string }[];
}

const EventSection: React.FC<EventSectionProps> = ({ title, events }) => (
  <div className="pb-24 px-4 md:px-12">

    <h2 className="text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-center mt-24 md:mt-40">
      {title}
    </h2>

    <p className="mt-4 md:mt-10 max-w-[943px] text-center text-white text-base md:text-xl font-medium font-['Poppins'] uppercase mx-auto px-2">
      Our fest offers a diverse range of technical and non-technical events,
      ensuring there&apos;s something for everyone. From innovative tech
      showcases to fun and engaging activities, we bring together creativity,
      skills, and excitement for an unforgettable experience!
    </p>

    {/* ✅ RESPONSIVE GRID */}
    <div className="mt-10 md:mt-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">

      {events.map((event, index) => (
        <Link key={index} href={event.link} className="block w-full">
          <div className="relative w-full aspect-[4/5]">
            <Image
              src={event.imageUrl}
              alt={event.link}
              fill
              className="object-contain rounded-xl hover:scale-105 transition-transform"
              priority
            />
          </div>
        </Link>
      ))}

    </div>

    {/* REGISTER BUTTON */}
    <div className="flex justify-center mt-12">
      <Link href="/dashboard">
        <Image
          src="/testfile/register2.svg"
          alt="Register Button"
          width={260}
          height={70}
          priority
          className="hover:scale-105 transition-transform"
        />
      </Link>
    </div>

  </div>
);

const Page = () => {
  return (
   <div
  className="w-full min-h-screen pt-24 md:pt-28 bg-no-repeat bg-top bg-cover"
  style={{ backgroundImage: "url('/testfile/events (3).svg')" }}
>

      <div className="w-full">
        <div id="tech-event">
        <EventSection
          title="TECHNICAL EVENTS"
          events={eventsData.technical}
        />
        </div>
        
        <div id="non-tech-event">
        <EventSection
          title="NON-TECHNICAL EVENTS"
          events={eventsData.nonTechnical}
        />
        </div>
      </div>
    </div>
  );
};

export default Page;
