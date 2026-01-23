import React from "react";
import Image from "next/image";
import Link from "next/link";

const eventsData = {
  technical: [
    { imageUrl: "/testfile/codigo3.svg", link: "/events/codigo" },
    { imageUrl: "/testfile/techlab3.svg", link: "/events/techlab" },
    { imageUrl: "/testfile/robovation3.svg", link: "/events/robovation" },
    { imageUrl: "/testfile/ideathon3.svg", link: "/events/ideathon" },
    { imageUrl: "/testfile/backtrace3.svg", link: "/events/reverseEng" },
    { imageUrl: "/testfile/Designathon3.svg", link: "/events/designathon" },
  ],

  nonTechnical: [
    { imageUrl: "/testfile/kalakriti3.svg", link: "/events/kalakriti" },
    { imageUrl: "/testfile/masterchef3.svg", link: "/events/master_chef" },
    { imageUrl: "/testfile/rodies3.svg", link: "/events/roadies" },
    { imageUrl: "/testfile/Antragini3.svg", link: "/events/antaragni" },
    { imageUrl: "/testfile/voiceofyouth.svg", link: "/events/yuva-sabha" },
    { imageUrl: "/testfile/beatbattle.svg", link: "/events/beat-battle" },
    { imageUrl: "/testfile/startup3.svg", link: "/events/start-up-business-plan" },
    { imageUrl: "/testfile/riwayat4.svg", link: "/events/riywayat" },
    { imageUrl: "/testfile/aima3.svg", link: "/events/AIMA" },
  ],
};

interface EventSectionProps {
  title: string;
  events: { imageUrl: string; link: string }[];
}

const EventSection: React.FC<EventSectionProps> = ({ title, events }) => (
  <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12">

    {/* TITLE */}
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-center">
      {title}
    </h2>

    {/* DESCRIPTION */}
    <p className="mt-6 md:mt-10 max-w-4xl mx-auto text-center text-white text-sm sm:text-base md:text-lg font-medium uppercase leading-relaxed px-2">
      Our fest offers a diverse range of technical and non-technical events,
      ensuring there&apos;s something for everyone. From innovative tech
      showcases to fun and engaging activities, we bring together creativity,
      skills, and excitement for an unforgettable experience!
    </p>

    {/* EVENTS GRID (BIGGER CARDS) */}
    <div className="mt-10 md:mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto">

      {events.map((event, index) => (
        <Link
          key={index}
          href={event.link}
          className="group block w-full"
        >
          <div className="relative w-full aspect-[2/3]">
            <Image
              src={event.imageUrl}
              alt={event.link}
              fill
              sizes="(max-width:768px) 90vw, (max-width:1024px) 45vw, 30vw"
              className="object-contain rounded-xl transition-transform duration-300 group-hover:scale-110"
              priority
            />
          </div>
        </Link>
      ))}

    </div>

    {/* REGISTER BUTTON */}
    <div className="flex justify-center mt-12 md:mt-16">
      <Link href="/dashboard">
        <Image
          src="/testfile/register2.svg"
          alt="Register Button"
          width={260}
          height={70}
          className="w-[180px] sm:w-[220px] md:w-[260px] hover:scale-105 transition-transform"
          priority
        />
      </Link>
    </div>

  </section>
);

const Page = () => {
  return (
    <div
      className="w-full min-h-screen pt-24 md:pt-32 bg-no-repeat bg-top bg-cover"
      style={{ backgroundImage: "url('/testfile/events (3).svg')" }}
    >
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
  );
};

export default Page;
