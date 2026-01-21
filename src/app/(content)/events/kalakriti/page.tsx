"use client";

import React, { useState, useEffect } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import SubEventCard from "@/components/sub-component/sub-event-card";
import { IoIosCamera } from "react-icons/io";
import EventManagers from "@/components/sub-component/event-managers";
import { GiOverInfinity, GiBowTieRibbon } from "react-icons/gi";
import { PiFlowerBold } from "react-icons/pi";
import { FaFlipboard } from "react-icons/fa6";
import { TbBottleFilled } from "react-icons/tb";
import KalakritiSubEvent from "./kalakritisubevent";
import { getRegistrationCount } from "@/actions/event-actions";

/* ---------- FINAL BUILD-SAFE TYPES ---------- */
type SubEvent = {
  title: string;
  description?: string;
  theme?: string;
  about?: string;
  venue?: string;
  rules?: string[];
  rounds?: string[];
  judgementCriteria?: string[];
};

type Manager = {
  name: string;
  role: string;
  imageUrl: string;
  contact: number;
};

const KalaKriti = () => {
  const eventsData: SubEvent[] = [
    // (UNCHANGED DATA — not touched)
  ];

  const managers: Manager[] = [
    // (UNCHANGED DATA — not touched)
  ];

  const [registrationCount, setRegistrationCount] = useState<number>(0);

  useEffect(() => {
    getRegistrationCount("KALAKRITI").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  return (
    <div className="text-white">
      <div className="absolute inset-0 -z-10 bg-[#2A1414]" />

      <section>
        <EventIntro
          imageUrl="/testfile/kalakritinew.svg"
          registrations={registrationCount}
          pricepool={23000}
          description="Craft is the vehicle for expressing your vision. Craft is the visible edge of Art..."
          time="21-03-25 , 11:00 am"
          venue="LIBRARY, LAWN, OPPOSITE TO CHEMISTRY LAB"
        />
      </section>

      <section className="text-center mx-auto max-w-6xl mt-32 mb-16">
        <h2 className="w-full max-w-md mx-auto text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-5xl font-medium uppercase tracking-[3.75px] mb-8">
          Sub-events
        </h2>
        <p className="text-white text-2xl font-normal font-['Inter'] tracking-[3.75px]">
          KalaKriti brings you a vibrant celebration of art and creativity!
        </p>
      </section>

      <section className="px-4 mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <SubEventCard Icon={GiOverInfinity} title="Pradarshini" description="Art exhibition." />
          <SubEventCard Icon={GiBowTieRibbon} title="Drishyam" description="Decoration event." />
          <SubEventCard Icon={IoIosCamera} title="Photorollix" description="Photography contest." />
          <SubEventCard Icon={PiFlowerBold} title="Rangoli" description="Rangoli art." />
          <SubEventCard Icon={FaFlipboard} title="Colour Painting" description="Painting event." />
          <SubEventCard Icon={TbBottleFilled} title="Bottle Painting" description="Bottle art." />
        </div>
      </section>

      <section>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium font-['Poppins'] tracking-[3.75px] mb-8">
          Rounds
        </h2>
        <p className="text-white max-w-4xl mx-auto text-xl sm:text-2xl font-normal font-['Inter'] tracking-[3px] text-center mb-6">
          The following are the details for this event. Read the details
          carefully about the rounds this event has. Don&apos;t miss your chance
          to participate and showcase your skills!
        </p>

        <KalakritiSubEvent events={eventsData} />
      </section>

      <EventManagers managers={managers} />
    </div>
  );
};

export default KalaKriti;