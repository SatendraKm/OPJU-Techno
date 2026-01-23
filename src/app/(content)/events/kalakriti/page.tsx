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
      title: "Drishyam (Decoration)",
      theme: "Harry Potter World, Meme Corner, Halloween, Sport Fan Club, Bollywood Retro, Incredible India",
      rules: [
        "Theme of the competition is restricted to 'Festivals of India'.",
        "In a group, there must be a minimum of 4 and a maximum of 6 members, and boys’ participation in a group is not mandatory.",
        "There will be only one round of competition.",
        "Everything will be provided by the organizers.",
        "The participants will have to decorate their respective sets on or before the 1st day of Technorollix.",
        "Cash prizes will be awarded to First, Second, and Third position holders, along with Certificates of Achievement. A Certificate of Participation will be given to all present participants.",
        "The participants must strictly adhere to the timings.",
        "The decision of the jury shall remain final, and no correspondence will be entertained.",
        "Last-minute changes in the above rules, if necessary, can be made.",
      ],
      about:
        "India is a land of diverse cultures, reflected in its vibrant array of festivals, with major celebrations including Holi (Festival of Colors), Diwali (Festival of Lights), Ganesh Chaturthi (celebrating Lord Ganesha's birth), Durga Puja (worshipping Goddess Durga), Onam (Kerala harvest festival), and Maha Shivratri (dedicated to Lord Shiva). Each festival is marked by unique rituals, food, and festivities across the country, showcasing India's rich heritage and unity in diversity.",
      venue: "OPJU Campus",
      rounds: ["1 Round"],
      judgementCriteria: ["Judges’ marks"],
    },
    {
      title: "Photorollix",
      theme: "Raigarh, JSP, OPJU Campus, and Nature",
      rules: [
        "The event will happen in 2 rounds and continue for two days.",
        "Round 1 will be conducted before 1st March, and Round 2 on 2nd February 2023.",
        "Every participant will have to submit a single photo at the end of the day via Google Form, which will be framed in the gallery.",
        "Last-minute changes in the above rules, if necessary, can be made.",
      ],
      about:
        "Photorollix is a recreational event where participants are welcomed to openly showcase their 'third eye handling skill.' As it is said, 'The picture that you took with your camera is the imagination you want to create with reality.' It will be the hall of fame, displaying different beautiful moments captured by photographers. It will allow you to relive amazing moments again and again.",
      venue: "Online",
      rounds: ["2 Rounds"],
      judgementCriteria: ["Judges"],
    },
    {
      title: "Rangoli",
      theme: "On the Spot",
      rules: [
        "Theme of the competition is restricted to 'On the Spot'.",
        "In a group, there must be a minimum of 4 and a maximum of 6 members, and boys’ participation in a group is mandatory.",
        "There will be only one round of competition.",
        "The participants have to bring their own materials required for making Rangoli. Colors will be provided by the organizers.",
        "The participants will be given 2 hours for making Rangoli. No extra time will be given in any case.",
        "Prizes will be awarded to First, Second, and Third position holders, along with Certificates of Achievement. A Certificate of Participation will be given to all present participants.",
        "The participants must strictly adhere to the timings.",
        "The decision of the jury shall remain final, and no correspondence will be entertained.",
        "Last-minute changes in the above rules, if necessary, can be made.",
      ],
      about:
        "Rangoli is a very popular folk art that has several connotations across India. It is a spiritual distribution of colors, representing the happiness, positivity, and liveliness of a household. It is intended to welcome the goddess of wealth and prosperity.",
      venue: "In front of Chemistry Lab,10:00 am",
      rounds: ["1 Round"],
      judgementCriteria: ["Judges’ marks"],
    },
    {
      title: "Colour Painting / Sketching",
      theme: "On the Spot",
      rules: [
        "Theme of the competition is restricted to 'On the Spot'.",
        "There will be only one round of competition.",
        "The participants have to bring their own requirements. Paper/Canvas will be provided by the organizers.",
        "The participants will be given 2 hours for making the art. No extra time will be given in any case.",
        "Prizes will be awarded to First, Second, and Third position holders, along with Certificates of Achievement. A Certificate of Participation will be given to all present participants.",
        "The participants must strictly adhere to the timings.",
        "The decision of the jury shall remain final, and no correspondence will be entertained.",
        "Last-minute changes in the above rules, if necessary, can be made.",
      ],
      about:
        "In order to create, we draw from our inner well. This inner well, an artistic reservoir, is ideally like a well-stocked fish pond… If we don’t give some attention to upkeep, our well is apt to become depleted, stagnant, or blocked… As artists, we must learn to be self-nourishing. We must become alert enough to consciously replenish our creative resources as we draw on them — to restock the trout pond. Speak up… Just Speak up… on Canvas.",
      venue: "Library",
      rounds: ["1 Round"],
      judgementCriteria: ["Judges’ marks"],
    },
    {
      title: "Bottle Painting",
      theme: "On the Spot",
      rules: [
        "Theme of the competition is restricted to 'On the Spot'.",
        "There will be only one round of competition.",
        "The participants have to bring their own painting materials. Bottles will be provided by the organizers.",
        "The participants will be given 2 hours for painting. No extra time will be given in any case.",
        "Prizes will be awarded to First, Second, and Third position holders, along with Certificates of Achievement. A Certificate of Participation will be given to all present participants.",
        "The participants must strictly adhere to the timings.",
        "The decision of the jury shall remain final, and no correspondence will be entertained.",
        "Last-minute changes in the above rules, if necessary, can be made.",
      ],
      about:
        "Bottle Painting is a creative art form that transforms ordinary bottles into beautiful decorative pieces. This event encourages participants to unleash their imagination and artistic skills to create unique designs on bottles, reflecting their creativity and craftsmanship.",
      venue: "Library",
      rounds: ["1 Round"],
      judgementCriteria: ["Judges’ marks"],
    },
  ];

  const managers = [
    {
      imageUrl: "/managers/Kalakriti/nupur.jpg",
      name: "Nupur",
      contact: 9301254290,
    },
    {
      imageUrl: "/managers/Kalakriti/AnkitK.jpeg",
      name: "Ankit",
      contact: 8839171099,
    },
    {
      imageUrl: "/managers/Kalakriti/Bhavya.jpg",
      name: "Bhavya",
      contact: 8839171099,
    },
    {
      imageUrl: "/managers/Kalakriti/Aditi.jpg",
      name: "Aditi",
      contact: 8839171099,
    },
    {
      imageUrl: "/managers/Kalakriti/pranav.webp",
      name: "Pranav",
      contact: 8839171099,
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
            description=""
          />
          <SubEventCard
            Icon={PiFlowerBold}
            title="Color Painting"
            description="Glimpses of India@2025."
          />
          <SubEventCard
            Icon={PiFlowerBold}
            title="Rangoli"
            description="Vikashit Bharat/Cartoon Characters"
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
