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
    "The judges decision is final.",
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
          time="20-02-26, 10:00 am"
          imageUrl="/techno-events-logo/masterchef.png"
          registrations={registrationCount}
          pricepool={9000}
          description="MASTERCHEF 2026 is OPJU’s most exciting culinary showdown where talent meets taste and passion meets presentation. Participants transform simple ingredients into unforgettable stories, proving that great food isn’t just cooked — it’s created."
        />


     {/* Competition Format - Rounds */}
<section className="my-32">
  <h2 className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-12">
    COMPETITION FORMAT
  </h2>

  {/* ROUND 1 */}
  <div className="bg-[#33010140] p-8 rounded-lg shadow-lg max-w-5xl mx-auto mb-12">
    <h3 className="text-3xl sm:text-4xl text-[#FFD188] font-semibold mb-4">
      ROUND 1 – HOME CHEF CHALLENGE
    </h3>

    <p className="text-xl text-white mb-4">
      Bring your signature style straight from your kitchen!
    </p>

    <ul className="list-disc pl-5 text-xl sm:text-2xl space-y-2 text-white">
      <li>Prepare a millet-based dish at home</li>
      <li>Dish must represent a specific cuisine</li>
      <li>Record a short cooking video (maximum 1 minute)</li>
      <li>Present the dish and video for evaluation</li>
    </ul>

    <p className="mt-4 text-lg text-[#FFD188]">
      Judged on: Taste • Presentation • Creativity
    </p>

    <p className="mt-2 text-white italic">
      This round focuses on plating perfection and first impressions.
    </p>
  </div>

  {/* ROUND 2 */}
  <div className="bg-[#33010140] p-8 rounded-lg shadow-lg max-w-5xl mx-auto">
    <h3 className="text-3xl sm:text-4xl text-[#FFD188] font-semibold mb-4">
      ROUND 2 – FLAMELESS COOKING CHALLENGE
    </h3>

    <p className="text-xl text-white mb-4">
      Think smart. Cook smarter.
    </p>

    <ul className="list-disc pl-5 text-xl sm:text-2xl space-y-2 text-white">
      <li>Live cooking on campus</li>
      <li>Flameless cooking only</li>
      <li>Ingredients will be provided by the University</li>
      <li>Teams must bring their own induction and induction-compatible utensils</li>
      <li>Ingredient requirements must be submitted in advance</li>
    </ul>

    <p className="mt-4 text-lg text-[#FFD188]">
      Judged on: Innovation • Technique • Taste • Execution
    </p>
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
