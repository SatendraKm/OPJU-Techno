import React from "react";
import Image from "next/image";
import Link from "next/link";

const eventsData = {
  technical: [
    { imageUrl: "/testfile/codigo.svg", link: "/events/codigo" },
    { imageUrl: "/testfile/techlab.svg", link: "/events/techlab" },
    { imageUrl: "/testfile/robo.svg", link: "/events/robovation" },
    { imageUrl: "/testfile/ideathon.svg", link: "/events/ideathon" },
    { imageUrl: "/testfile/rev.svg", link: "/events/reverseEng" },
    { imageUrl: "/testfile/design.svg", link: "/events/designathon" },
  ],

  nonTechnical: [
    { imageUrl: "/testfile/kalakritinew.svg", link: "/events/kalakriti" },
    { imageUrl: "/testfile/master.svg", link: "/events/master_chef" },
    { imageUrl: "/testfile/roadies.svg", link: "/events/roadies" },
    { imageUrl: "/testfile/antaragini.svg", link: "/events/antaragni" },
    { imageUrl: "/testfile/voice.svg", link: "/events/yuva-sabha" },
    { imageUrl: "/testfile/beat.svg", link: "/events/beat-battle" },
    { imageUrl: "/testfile/startup.svg", link: "/events/start-up-business-plan" },
    { imageUrl: "/testfile/riwayat.svg", link: "/events/riywayat" },
    { imageUrl: "/testfile/aima.svg", link: "/events/aima" },
  ],
};

interface EventSectionProps {
  title: string;
  events: { imageUrl: string; link: string }[];
}

const EventSection: React.FC<EventSectionProps> = ({ title, events }) => (
  <div className="pb-32">
    <div
      className="absolute top-0 left-0 w-full pointer-events-none -z-10"
      id="bg-container"
    ></div>
    <h2 className="text-3xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-center mt-40">
      {title}
    </h2>
   <p className="mt-4 md:mt-10 w-full md:w-[943px] text-center text-black text-lg md:text-xl font-medium font-['Poppins'] uppercase mx-auto">
  Our fest offers a diverse range of technical and non-technical events,
  ensuring there&apos;s something for everyone. From innovative tech
  showcases to fun and engaging activities, we bring together creativity,
  skills, and excitement for an unforgettable experience!
</p>


    <div className="mt-10 md:mt-28 ml-20 grid grid-cols-2 md:grid-cols-3 gap-2 px-3 md:px-8 lg:px-16">
      {events.map((event, index) => (
        <Link key={index} href={event.link} className="block w-full">
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

    <div className="flex justify-center mt-10">
      <Link href="/dashboard">
        <Image
          src="/testfile/register1.svg"
          alt="Register Button"
          width={300}
          height={80}
          priority
          className="hover:scale-105 transition-transform"
        />
      </Link>
    </div>
  </div>
);

const Page = () => {
  return (
    <div className="relative w-full">
      {/* 🌄 BACKGROUND IMAGE THAT DEFINES PAGE HEIGHT */}
      <img
        src="/testfile/newevent.png"
        alt="Background"
        className="w-full h-auto block"
      />

      {/* 🧱 CONTENT FLOATING ABOVE BACKGROUND */}
      <div className="absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-between">
        <div className="events mt-10 md:mt-28 px-4 md:px-0">
          <EventSection
            title="TECHNICAL EVENTS"
            events={eventsData.technical}
          />
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
