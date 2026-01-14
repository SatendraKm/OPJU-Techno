"use client";
import React,{useState,useEffect} from "react";
import EventIntro from "@/components/sub-component/event-intro";
import EventManagers from "@/components/sub-component/event-managers";
import RulesAndRegulation from "@/components/sub-component/rule-regulation";
import Image from "next/image";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const managers = [
    { imageUrl: "/managers/MasterChef/NITIN.jpg", name: "Nitin Goyal", contact: 9669464118 },
  ];

  const rules = [
    "Teams must register in groups of 4 members.",
    "This is open to other Institutions outside OPJU.",
    "Each team must distribute tasks among members.",
    "Abusive, offensive, politically driven, gender-biased, or personal remarks will be dealt strictly.",
    "Costumes should be suitable for the event.",
    "Registration is mandatory.",
    "No outside ingredients are allowed.",
    "Teams must finish within the given time.",
    "Points will be deducted for messy stations.",
    "Participants must bring their own cooking vessels, utensils, cloths for handling heat and cleaning, and crockery.",
  ];

  const criterias = [
    "Taste 40%",
    "Creativity 30%",
    "Presentation 20%",
    "Cleanliness & Organization 10%",
    "The judges' decision is final.",
    "Winners will be declared on the same day.",
  ];
  const [registrationCount, setRegistrationCount] = useState(0)
  useEffect(() => {
    getRegistrationCount("MASTERCHEF").then((count) => {
      setRegistrationCount(count)
    })
  }, [])

  return (
    <div className="relative space-y-10 px-4 py-8">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/background.svg"
          alt="Scrolling Background"
          width={500}
          height={500}
          className="w-full h-auto opacity-150"
        />
      </div>

      {/* Event Intro Section */}
      <EventIntro
        venue="Cafeteria, Ground Floor"
        time="21-03-25, 10:00 am"
        imageUrl="/techno-events-logo/masterchef.png"
        registrations={registrationCount}
        pricepool={9000}
        description="OPJU invites you to an extraordinary culinary battleground, where flavors meet creativity and passion transforms into perfection. Step into MasterChef and let the world savor your signature taste."
      />

      {/* Theme Section */}
      <section className="my-32 text-center">
        <h1 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium mb-8">
          THEME
        </h1>
        <p className="text-2xl font-['Inter'] leading-relaxed tracking-[3.75px] text-white max-w-4xl mx-auto">
          Every dish is a chapter, every bite a sentence, and every flavor a memory waiting to be told.
        </p>
      </section>

      {/* Competition Format Section */}
      <section className="my-32">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-8">
          COMPETITION FORMAT
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
          <ul className="list-disc pl-5 text-2xl sm:text-3xl space-y-2 font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
            <li>Total Participants: 100 students</li>
            <li>Teams: 25 teams (4 students per team)</li>
            <li>Time & Number of Rounds: To be intimated later</li>
            <li>Registration Fee: ₹100 per group</li>
            <li>Eligibility: UG & PG students (Age: 18 - Below 30) from any college/university.</li>
          </ul>
        </div>
      </section>

      {/* Judgement Criteria Section */}
      <section className="mb-20">
        <RulesAndRegulation rules={rules} />
        <div className="text-white mt-10">
          <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium uppercase text-center tracking-[3.75px] mb-8">
            Judgement Criteria
          </h2>
          <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
            <ul className="list-decimal pl-5 text-2xl sm:text-3xl font-normal space-y-2 font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
              {criterias.map((criteria, index) => (
                <li key={index}>{criteria}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="mb-20">
        <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-8">
          PRIZES
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
          <ul className="list-disc pl-5 text-2xl sm:text-3xl space-y-2 font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
            <li>First, Second, and Third Place Winners, Three Consolation Prizes</li>
            <li>Certificate of Appreciation for All Participants</li>
          </ul>
        </div>
      </section>

      {/* Event Managers Section */}
      <EventManagers managers={managers} />
    </div>
  );
};

export default Page;
