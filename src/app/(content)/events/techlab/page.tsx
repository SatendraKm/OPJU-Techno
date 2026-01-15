"use client";
import React, { useEffect, useState } from "react";
import EventIntro from "@/components/sub-component/event-intro";
import SubEventCard from "@/components/sub-component/sub-event-card";
import WhyParticipate from "@/components/sub-component/why-participate";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import { GiTargetPoster, GiRobotLeg } from "react-icons/gi";
import { PiPathBold } from "react-icons/pi";
import { FaAppStore } from "react-icons/fa";
import EventManagers from "@/components/sub-component/event-managers";
import Image from "next/image";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const rules = [
    "All the exhibits must reach the venue one hour before the prescribed time to install all the necessary components for their model.",
    "A maximum of 4 participants are allowed in each team.",
    "The exhibit should be a creation of the student, which either illustrates or demonstrates a novel cause.",
    "Robo cars or drones should perform some task or exhibit some innovation to be included in the technical model presentation.",
    "Exhibits must be confined to an area. Tables and Electricity connection will be provided.",
    "No exhibits should be dismantled or removed till the end of the competition.",
    "Highly flammable and toxic substances are not allowed, if so, the application must be submitted prior.",
    "Every participant must maintain the decorum of the event.",
    "External and Internal judges panel will take the final call.",
  ];
  const reasons = [
    "Exciting prizes for the winners worth ₹45,000.",
    "Funding opportunity for innovative prototypes.",
    "Recognition certificates for all participating Universities from OPJU innovation centre.",
    "Participation Certificates will be given to all the participants.",
    "Special category-wise winning prizes.",
    "Time to get new-age experience and innovation.",
    "Reimbursement of a one-way Sleeper class fair for all the outside participants of Tech Lab.",
    "Subjected to terms and conditions of OPJU Innovation Centre.",
  ];

  const managers = [
    {
      imageUrl: "/managers/Techlab/Priya Kumari (Tech Lab).jpg",
      name: "Priya kumari",
      contact: 9234531358,
    },
    {
      imageUrl: "/managers/Techlab/Shruti Kumari (Tech lab).jpg",
      name: "Shruti kumari",
      contact: 9165245727,
    },
    {
      imageUrl: "/managers/Techlab/Ankit Kumar Sah (TechLab).JPG",
      name: "Ankit kumar sah ",
      contact: 8825365939,
    },
  ];

  const [registrationCount, setRegistrationCount] = useState(0)
  useEffect(() => {
    getRegistrationCount("TECHLAB").then((count) => {
      setRegistrationCount(count)
    })
  }, [])
  

  return (
    <div className="relative flex flex-col">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          width={500}
          height={500}
          src="/background.svg"
          className="w-full h-auto opacity-100"
          alt="Scrolling Background"
        />
      </div>

      {/* Event Intro Section */}
      <section>
        <EventIntro
          imageUrl="/techno-events-logo/techlab.png"
          registrations={registrationCount}
          pricepool={50000}
          description="Tech lab is the flagship event of the biggest tech festival in central India, TECHNOROLLIX. It’s a vibrant showcase of innovation and ingenuity, where the brightest minds from various universities unleash their creative potential through their self-developed models. Creating a technical model presentation involves effectively communicating the details, functionality, and significance of a technical model to a diverse audience, which may include technical and non-technical stakeholders. This platform also opens doors to better funding opportunities for these innovative minds, paving the way to a future breakthrough"
          time="19-02-26 ,10:00 am"
          venue="BABUJI CHOWK"
        />
      </section>

      {/* Sub-Events Section */}
      <section className="px-4 mx-auto mb-32">
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-full max-w-md h-16 sm:h-20 text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-4xl sm:text-5xl font-medium font-['Poppins'] uppercase tracking-[3.75px]">
            sub-events
          </div>
          <div className="w-full max-w-4xl mt-4 text-center text-white text-base sm:text-2xl font-normal font-['Inter'] tracking-[3.75px]">
            The following are the sub-events of this main event. Read the details carefully and choose the ones that best match your interests and expertise. Don&apos;t miss your chance to participate and showcase your skills!
          </div>
        </div>

        {/* Sub-Events Cards Section */}
        <div className="grid grid-cols-1  md:grid-cols-2 gap-8 px-4 py-8">
          <SubEventCard
            Icon={GiTargetPoster}
            title="POSTER PRESENTATION"
            description="Showcase your innovative ideas and research in TechVision, the ultimate technical poster presentation event. Present your findings, prototypes, and groundbreaking concepts in a visually compelling format. Impress judges and peers with your creativity, clarity, and technical expertise."
          />
          <SubEventCard
            Icon={GiRobotLeg}
            title="WORKING MODEL PRESENTATION"
            description="Showcase your innovative ideas and research in TechVision, the ultimate technical poster presentation event. Present your findings, prototypes, and groundbreaking concepts in a visually compelling format. Impress judges and peers with your creativity, clarity, and technical expertise."
          />
          <SubEventCard
            Icon={PiPathBold}
            title="PROTOTYPE PRESENTATION"
            description="Showcase your innovative ideas and research in TechVision, the ultimate technical poster presentation event. Present your findings, prototypes, and groundbreaking concepts in a visually compelling format. Impress judges and peers with your creativity, clarity, and technical expertise."
          />
          <SubEventCard
            Icon={FaAppStore}
            title="Codex (App and Web development)"
            description="Showcase your innovative ideas and research in TechVision, the ultimate technical poster presentation event. Present your findings, prototypes, and groundbreaking concepts in a visually compelling format. Impress judges and peers with your creativity, clarity, and technical expertise."
          />
        </div>
      </section>

      {/* Additional Sections */}
      <section>
        <WhyParticipate reasons={reasons} />
        <RulesAndRegulation rules={rules} />
        <EventManagers managers={managers} />
      </section>
    </div>
  );
};

export default Page;
