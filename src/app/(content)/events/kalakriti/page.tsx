"use client";
import React,{useState,useEffect} from "react";
import EventIntro from "@/components/sub-component/event-intro";
import SubEventCard from "@/components/sub-component/sub-event-card";
import { IoIosCamera } from "react-icons/io";
import EventManagers from "@/components/sub-component/event-managers";
import { GiOverInfinity } from "react-icons/gi";
import Image from "next/image";
import { GiBowTieRibbon } from "react-icons/gi";
import { PiFlowerBold } from "react-icons/pi";
import { FaFlipboard } from "react-icons/fa6";
import { TbBottleFilled } from "react-icons/tb";
import KalakritiSubEvent from "./kalakritisubevent";
import { getRegistrationCount } from "@/actions/event-actions";

const KalaKriti = () => {
  const eventsData = [
    // (UNCHANGED DATA — not touched)
  ];

  const managers = [
    // (UNCHANGED DATA — not touched)
  ];

  const [registrationCount, setRegistrationCount] = useState(0)
  useEffect(() => {
    getRegistrationCount("KALAKRITI").then((count) => {
      setRegistrationCount(count)
    })
  }, [])

  return (
    <div className="">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/testfile/singleeventbg2.svg"
          className="w-full h-auto opacity-150"
          alt="Scrolling Background"
          width={500}
          height={500}
        />
      </div>

      {/* Event Intro Section */}
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

      {/* Sub-Events Section Header */}
      <section className="text-center mx-auto max-w-6xl mt-32 mb-16">
        <h2 className="w-full max-w-md mx-auto text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-5xl font-medium font-['Poppins'] uppercase tracking-[3.75px] mb-8">
          Sub-events
        </h2>
        <p className="text-black text-2xl font-normal font-['Inter'] tracking-[3.75px]">
          KalaKriti brings you a vibrant celebration of art and creativity!
          Explore the exciting sub-events—Pradarshini (Exhibition), Drishyaam
          (Decoration), Photorollix, Rangoli, Colour Painting, and Bottle
          Painting. Unleash your imagination, showcase your artistic skills, and
          be part of this colorful extravaganza!
        </p>
      </section>

      {/* Sub-Events Cards Section */}
      <section className="px-4 mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <SubEventCard
            Icon={GiOverInfinity}
            title="Pradarshini (Exhibition)"
            description="KalaKriti presents Pradarshini, an art exhibition where colors, creativity, and expression come to life. Immerse yourself in a world of art that captivates."
          />
          <SubEventCard
            Icon={GiBowTieRibbon}
            title="Drishyam (Decoration)"
            description="India's rich heritage and vibrant culture come alive in Drishyaam by KalaKriti. Witness the essence of tradition through stunning artistic decor!"
          />
          <SubEventCard
            Icon={IoIosCamera}
            title="Photorollix"
            description="Photorollix is a celebration of captured moments and creative vision. Showcase your ‘third eye’ skills and bring imagination to life through the lens. Relive and cherish timeless memories!"
          />
          <SubEventCard
            Icon={PiFlowerBold}
            title="Rangoli"
            description="Rangoli is more than just art—it's a vibrant expression of joy, positivity, and tradition. Let your colors weave stories and welcome prosperity with every design!"
          />
          <SubEventCard
            Icon={FaFlipboard}
            title="Colour Painting"
            description="Colour Painting/Sketching is the art of bringing imagination to life. Dip into your creative reservoir and let your brush or pencil speak on canvas—express, create, and inspire."
          />
          <SubEventCard
            Icon={TbBottleFilled}
            title="Bottle Painting"
            description="Bottle Painting transforms the ordinary into art. Let your creativity flow as you turn simple bottles into vibrant masterpieces, blending colors with imagination!"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium font-['Poppins'] tracking-[3.75px] mb-8">
          Rounds
        </h2>
        <p className="text-black max-w-4xl mx-auto text-xl sm:text-2xl font-normal font-['Inter'] tracking-[3px] text-center mb-6">
          The following are the details for this event. Read the details
          carefully about the rounds this event has. Don&apos;t miss your chance
          to participate and showcase your skills!
        </p>
        <KalakritiSubEvent events={eventsData} />
      </section>

      {/* Event Managers Section */}
      <EventManagers managers={managers} />
    </div>
  );
};

export default KalaKriti;
