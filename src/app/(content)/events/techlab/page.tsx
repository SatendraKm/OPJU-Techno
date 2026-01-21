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
import { getRegistrationCount } from "@/actions/event-actions";

// Evaluation Process Component (Styled like Why Participate)
const EvaluationProcess = () => {
  const evaluationPoints = [
    "Innovation and originality",
    "Technical understanding and implementation",
    "Practical application and feasibility",
    "Presentation and explanation skills",
    "Social, industrial or environmental relevance",
  ];

  return (
    <section className="px-4 mx-auto my-16 max-w-4xl">
      {/* Heading */}
      <h2 className="text-4xl sm:text-5xl font-medium uppercase text-center text-[#FFD188] mb-8 tracking-widest">
        Evaluation Process
      </h2>

      {/* List Container */}
      <div className="bg-[#2a1414] p-8 rounded-lg">
        <ol className="list-decimal list-inside space-y-4 text-white text-lg font-serif">
          {evaluationPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ol>
        <p className="mt-6 text-white font-serif">
          The judge's decision will be final and binding.
        </p>
      </div>
    </section>
  );
};

const Page = () => {
  const rules = [
    "All exhibits must reach the venue at least one hour before the scheduled time to install all necessary components of the model.",
    "A maximum of four participants are allowed in each team.",
    "The exhibit must be a student-created project that illustrates or demonstrates a novel idea or concept.",
    "Robo cars or drones must perform a specific task or demonstrate innovation to be included in the technical model presentation and to be eligible for reimbursement (for internal participants).",
    "Internal participants opting for model reimbursement must carry the reimbursement form (if required) with the item list and GST bills on the day of the event.",
    "Exhibits must be confined to the allotted area. Tables and electricity connections will be provided.",
    "No exhibit should be dismantled or removed until the end of the competition.",
    "Highly flammable or toxic substances are not allowed unless prior approval has been obtained.",
    "All participants must maintain the decorum of the event at all times.",
    "The decision of the internal and external judges’ panel will be final and binding.",
  ];

  const reasons = [
    "Exciting prizes for the winners worth ₹50,000.",
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
      imageUrl: "",
      name: "",
      contact: 123,
    },
    {
      imageUrl: "",
      name: "",
      contact: 91657,
    },
    {
      imageUrl: "",
      name: "",
      contact: 88239,
    },
  ];

  const [registrationCount, setRegistrationCount] = useState(0);
  useEffect(() => {
    getRegistrationCount("TECHLAB").then((count) => {
      setRegistrationCount(count);
    });
  }, []);

  return (
    <div className="relative flex flex-col">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[#2A1414]" />

      {/* Event Intro Section */}
      <section>
        <EventIntro
          imageUrl="/testfile/techlabnew.svg"
          registrations={registrationCount}
          pricepool={50000}
          description="Tech lab is the flagship event of the biggest tech festival in central India, TECHNOAIMBIATIONFF. It’s a vibrant showcase of innovation and ingenuity, where the brightest minds from various universities unleash their creative potential through their self-developed models. Creating a technical model presentation involves effectively communicating the details, functionality, and significance of a technical model to a diverse audience, which may include technical and non-technical stakeholders. This platform also opens doors to better funding opportunities for these innovative minds, paving the way to a future breakthrough"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8">
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
            title=" App Making"
            description="Showcase your innovative ideas and research in TechVision, the ultimate technical poster presentation event. Present your findings, prototypes, and groundbreaking concepts in a visually compelling format. Impress judges and peers with your creativity, clarity, and technical expertise."
          
          />
        </div>
      </section>

      {/* Additional Sections */}
      <section>
        <WhyParticipate reasons={reasons} textClassName="text-white" />
        <RulesAndRegulation rules={rules} textClassName="text-white" />
        <EventManagers managers={managers} />
      </section>
    </div>
  );
};

export default Page;
