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
import { GiFlowerStar } from "react-icons/gi";
import KalakritiSubEvent from "./kalakritisubevent";
import { getRegistrationCount } from "@/actions/event-actions";



const KalaKriti = () => {
 const eventsData = [
  {
    title: "Pradarshini (Exhibition)",
    theme: "All Kinds of Art and Collection",
    rules: [
      "All the participants must register before the event.",
      "All should submit their artistic piece, art, or craft 2-3 days before the event.",
      "Last-minute changes in the above rules, if necessary, can be made.",
    ],
    about:
      "Imagine what life would have been without colors, art, and aesthetics—boring, right? And what would Techno be without an art exhibition? But don't worry, we would not give you a millisecond of it. So, to dazzle your eyes, we have 'Pradarshini', an art exhibition by Kalakriti, to quench the thirst of your imagination and take you on a bewildering journey worth remembering. Get yourself a pair of sunglasses and come engulf yourself in the art and aesthetics.",
    venue: "CENTRAL LIBRARY,OPJU Library",
    rounds: ["1 Round"],
    judgementCriteria: ["No Grading"],
  },
  {
    title: "DARBAR-E-BHARAT (Decoration)",
    theme: "Historic Monuments of India",
    rules: [
      "Theme of the competition is restricted to 'Historic Monuments of India'.",
      "No ready-made decorative items allowed.",
      "In group there must be minimum 3 and maximum 6 members.",
      "There will be only one round of competition.",
      "Everything will be provided by Organizers.",
      "The participants will have to Decorate their respective Sets On or before the 1st day of TechnoaiMBiAtion.",
      "Cash prizes will be awarded to First, Second and Third position holders, along with Certificates of Achievement. A Certificate of Participation will be given to all present participants.",
      "The participant strictly adhere to the timings.",
      "The decision of the jury shall remain final, and no correspondence will be entertained.",
      "Last-minute changes in the above rules, if necessary, can be made.",
    ],
    about:
      "India is a land of diverse cultures, reflected in its vibrant array of festivals, with major celebrations including Holi (Festival of Colors), Diwali (Festival of Lights), Ganesh Chaturthi (celebrating Lord Ganesha's birth), Durga Puja (worshipping Goddess Durga), Onam (Kerala harvest festival), and Maha Shivratri (dedicated to Lord Shiva). Each festival is marked by unique rituals, food, and festivities across the country, showcasing India's rich heritage and unity in diversity.",
    venue: "OPJU Campus",
    rounds: ["1 Round"],
    judgementCriteria: ["Judges' marks"],
  },
  {
    title: "Waste to Wow",
    theme: "Open",
    rules: [
      "The event will happen in only 1 round.",
      "In a group, there must be a minimum of 2 and a maximum of 4 members (one male participant is mandatory).",
      "Participants will create the product on the spot or present a pre-made item.",
      "Materials Allowed: Dry waste only (plastic, paper, fabric, metal, cardboard, etc.).",
      "Participants must bring their own waste materials.",
      "Basic stationery (glue, scissors, tape, thread, colors) are allowed.",
      "No ready-made decorative items allowed.",
      "Cash prizes will be awarded to First, Second, and Third position holders, along with Certificates of Achievement. A Certificate of Participation will be given to all present participants.",
      "The participants must strictly adhere to the timings.",
      "The decision of the jury shall remain final, and no correspondence will be entertained.",
      "Last-minute changes in the above rules, if necessary, can be made.",
    ],
    about:
      "Best Out of Waste is a creative and eco-friendly event that challenges participants to transform everyday waste materials into useful, decorative, or artistic items. The event aims to promote sustainability, innovation, and environmental responsibility by encouraging participants to see waste not as garbage, but as a valuable resource.",
    venue: "Library",
    rounds: ["1 Round"],
    judgementCriteria: ["Judges' marks"],
  },
  {
    title: "Colour Painting",
    theme: "Open",
    rules: [
      "Theme of the competition is restricted to 'Open'.",
      "There will be only one round of competition.",
      "The participants have to bring their own requirements. Paper/Canvas will be provided by the organizers.",
      "The participants will be given 2 hours for making the art. No extra time will be given in any case.",
      "Prizes will be awarded to First, Second, and Third position holders, along with Certificates of Achievement. A Certificate of Participation will be given to all present participants.",
      "The participants must strictly adhere to the timings.",
      "The decision of the jury shall remain final, and no correspondence will be entertained.",
      "Last-minute changes in the above rules, if necessary, can be made.",
    ],
    about:
      "In order to create, we draw from our inner well. This inner well, an artistic reservoir, is ideally like a well-stocked fish pond… If we don't give some attention to upkeep, our well is apt to become depleted, stagnant, or blocked… As artists, we must learn to be self-nourishing. We must become alert enough to consciously replenish our creative resources as we draw on them — to restock the trout pond. Speak up… Just Speak up… on Canvas.",
    venue: "Library",
    rounds: ["1 Round"],
    judgementCriteria: ["Judges' marks"],
  },
  {
    title: "Rangoli",
    theme: "On the Spot",
    rules: [
      "Theme of the competition is restricted to 'On the Spot'.",
      "In a group, there must be a minimum of 4 and a maximum of 6 members, and boys' participation in a group is mandatory.",
      "There will be only one round of competition.",
      "The participants have to bring their own material which they require in making rangoli. Colors will be provided by the organizers.",
      "The participants will be given 2 hours for making rangoli. No extra time will be given in any case.",
      "Prizes will be awarded to First, Second, and Third position holders, along with Certificates of Achievement. A Certificate of Participation will be given to all present participants.",
      "The participants must strictly adhere to the timings.",
      "The decision of the jury shall remain final, and no correspondence will be entertained.",
      "Last-minute changes in the above rules, if necessary, can be made.",
    ],
    about:
      "Rangoli is a very popular folk art that has several connotations across India. It is a spiritual distribution of colors which represents the happiness, positivity, and liveliness of a household, and is intended to welcome the goddess of wealth and prosperity.",
    venue: "In front of Chemistry Lab",
    rounds: ["1 Round"],
    judgementCriteria: ["Judges' marks"],
  },

  {
    title: "Alpana (Floor Art)",
    theme: "On the Spot",
    rules: [
      "The theme of the competition will be provided on the spot.",
      "Each group must consist of a minimum of 4 and a maximum of 6 members.",
      "Participation of boys in each group is mandatory.",
      "There will be only one round of competition.",
      "Participants must bring their own materials required for making Alpana.",
      "A total of 2 hours will be given to complete the artwork. No extra time will be allotted.",
      "Participants must strictly adhere to the given time limits.",
      "Prizes will be awarded to First, Second, and Third position holders along with Certificates of Achievement.",
      "All participants will receive a Certificate of Participation.",
      "The decision of the jury will be final and binding.",
      "Last-minute changes in the rules, if necessary, can be made.",
    ],
    about:
      "Alpana is a vibrant floor art event at Techno Rollix where creativity meets tradition. Participants transform open spaces into stunning visual stories using rice, intricate patterns, and themes provided on the spot. The event celebrates cultural aesthetics, teamwork, imagination, and artistic expression under time-bound challenges.",
    venue: "In front of Chemistry Lab",
    rounds: ["1 Round"],
    judgementCriteria: ["Judges Marks"],
  },
  {
    title: "Faces That Speak (Face Painting)",
    theme: "Open (ex: Mythological Characters, Tribal Art Faces, Anime characters, etc.)",
    rules: [
      "This is an individual event. Participants may paint on self or a model.",
      "The event will happen in only 1 round.",
      "Materials Allowed: Face paints (safe, skin-friendly only), brushes, sponges, mirrors, water containers, and basic accessories.",
      "Participants must bring their own accessories.",
      "Prizes will be awarded to First, Second, and Third position holders, along with Certificates of Achievement. A Certificate of Participation will be given to all present participants.",
      "The participants must strictly adhere to the timings.",
      "The decision of the jury shall remain final, and no correspondence will be entertained.",
      "Last-minute changes in the above rules, if necessary, can be made.",
    ],
    about:
      "Faces That Speak is a creative face painting competition where participants use the human face as a canvas to convey emotions, stories, themes, and social messages. This event encourages artists to go beyond beauty and focus on expression, meaning, and visual storytelling.",
    venue: "In front of Chemistry Lab",
    rounds: ["1 Round"],
    judgementCriteria: ["Judges' marks"],
  },
];

  const managers = [
    
    {
      imageUrl: "/managers/kalakriti/poonam.jpeg",
      name: "Poonam Mahato",
      contact: 9630203650,
    },
    {
      imageUrl: "/managers/kalakriti/ritesh.jpeg",
      name: "Ritesh Yadav",
      contact: 8144603832,
    },
    
    
  ];


  const [registrationCount, setRegistrationCount] = useState<number>(0);

  useEffect(() => {
    getRegistrationCount("KALAKRITI").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  return (
    <div className="text-white">
      <div className="absolute inset-0 -z-10 bg-black" />

      <section>
        {/* <a href="/dashboard"> */}
        <EventIntro
          imageUrl="/testfile/kalakriti3.svg"
          registrations={registrationCount}
          pricepool={25500}
          description="Craft is the vehicle for expressing your vision. Craft is the visible edge of Art..."
          time="19-02-26 , 12:30 am"
          venue="LIBRARY, LAWN, OPPOSITE TO CHEMISTRY LAB"
        />
        {/* </a> */}
      </section>

      <section className="text-center mx-auto max-w-6xl mt-16 sm:mt-24 lg:mt-32 mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-6">
        <h2 className="w-full max-w-md mx-auto text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-2xl sm:text-3xl lg:text-5xl font-medium uppercase tracking-[2px] sm:tracking-[3.75px] mb-4 sm:mb-6 lg:mb-8 font-['Georgia']">
          Sub-events
        </h2>
        <p className="text-white text-base sm:text-lg lg:text-2xl font-normal font-['Arial'] tracking-[1.5px] sm:tracking-[2px] lg:tracking-[3.75px] px-2">
          KalaKriti brings you a vibrant celebration of art and creativity!
        </p>
      </section>

      <section className="px-4 mb-16 sm:mb-24 lg:mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          <SubEventCard
            Icon={GiOverInfinity}
            title="Pradarshini"
            description="Art exhibition."
          />
          <SubEventCard
            Icon={GiBowTieRibbon}
            title="Darbar-e-Bharat"
            description="Decoration event."
          />
          <SubEventCard
            Icon={IoIosCamera}
            title="Waste to wow"
            description="Create innovation from waste."
          />
          <SubEventCard
            Icon={PiFlowerBold}
            title="Color Painting"
            description="Glimpses of India@2025."
          />
          <SubEventCard
            Icon={FaFlipboard}
            title="Alpana"
            description="Traditional Floor art"
          />
          <SubEventCard
            Icon={TbBottleFilled}
            title="Faces that Speak"
            description="(Mythological Characters, Tribal Art Faces, Anime characters, bridal make up)"
          />

          <SubEventCard
            Icon={GiFlowerStar}
            title="Rangoli"
            description="Traditional Floor art"
          />
          
        </div>
      </section>

      <section className="px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium font-['Georgia'] tracking-[2px] sm:tracking-[2.5px] lg:tracking-[3.75px] mb-4 sm:mb-6 lg:mb-8">
          Rounds
        </h2>
        <p className="text-white max-w-4xl mx-auto text-sm sm:text-base lg:text-2xl font-normal font-['Arial'] tracking-[1px] sm:tracking-[1.5px] lg:tracking-[3px] text-center mb-8 sm:mb-10 lg:mb-12 px-2">
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