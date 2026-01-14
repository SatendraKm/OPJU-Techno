"use client";
import React,{useEffect,useState} from "react";
import EventIntro from "@/components/sub-component/event-intro";
import EventManagers from "@/components/sub-component/event-managers";
import Image from "next/image";
import { getRegistrationCount } from "@/actions/event-actions";

const Roadies = () => {
  const studentmanagers = [
    {
      imageUrl: "/managers/Roadies/Pranjal.jpg",
      name: "Ritika Sahu",
      contact: 9078942095,
    },{
      imageUrl: "/managers/Roadies/Pranjal.jpg",
      name: "Sumit Rana",
      contact: 9078942095,
    },{
      imageUrl: "/managers/Roadies/Pranjal.jpg",
      name: "Harpreet Singh",
      contact: 9078942095,
    },{
      imageUrl: "/managers/Roadies/Pranjal.jpg",
      name: "Kumkum Kritika",
      contact: 9078942095,
    },{
      imageUrl: "/managers/Roadies/Pranjal.jpg",
      name: "Parinita Bahera",
      contact: 9078942095,
    },
  ];
  const FacultyCoordinators = [
    {
      imageUrl: "/managers/Roadies/Pranjal.jpg",
      name: "Dr. Amit Paras",
      contact: 7879610288,
    },{
      imageUrl: "/managers/Roadies/Pranjal.jpg",
      name: "Dr Akash Pandey",
      contact: 9078942095,
    },{
      imageUrl: "/managers/Roadies/Pranjal.jpg",
      name: "Dr. Rahul Sharma",
      contact: 9078942095,
    },
  ];
  const StaffCoordinators = [
    {
      imageUrl: "/managers/Roadies/Pranjal.jpg",
      name: "y Santhosh",
      contact: 7879610288,
    },{
      imageUrl: "/managers/Roadies/Pranjal.jpg",
      name: "Abhishek Thakur",
      contact: 9078942095,
    },{
      imageUrl: "/managers/Roadies/Pranjal.jpg",
      name: "Jyoti Sahu",
      contact: 9078942095,
    },
  ];

  const [registrationCount, setRegistrationCount] = useState(0)
  useEffect(() => {
    getRegistrationCount("ROADIES").then((count) => {
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
        venue="Bus Parking Area"
        time="19-02-26, 10:00 am"/* Event at 19-20-21 */
        imageUrl="/techno-events-logo/roadies.png"
        registrations={registrationCount}
        pricepool={10000}
        description="Roadies is a flagship talent, innovation, and personality-based competition inspired by real-world problem solving, creativity, teamwork, and leadership. The event provides a platform for students to showcase their technical skills, innovative thinking, presentation ability, and competitive spirit through multiple engaging categories.
The event is designed to promote:
· Physical Strength
· Practical learning and application
· Teamwork and leadership qualities
· Confidence, communication, and problem-solving skills
"
      />

      {/* Theme Section */}
      <section className="text-center mx-auto max-w-4xl px-4">
        <h1 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-[poppins] mb-8">
          THEME
        </h1>
        <p className="text-2xl font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
          Adventure / Survival
        </p>
      </section>

      {/* Rounds Section */}
      <section className="mt-20 mx-auto max-w-5xl px-4">
        <h2 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-[poppins] text-center mb-8">
          RULES:
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg">
          <ul className="list-disc pl-5 text-2xl sm:text-3xl space-y-2 font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
            <li>1. Participants may participate individually</li>
            <li>2. Each member must register before the deadline.</li>
            <li>Participants must be present during the judging time; absence may lead to disqualification.</li>
            <li>4. Participants must maintain discipline and decorum throughout the event.</li>
          </ul>
        </div>
      </section>

      {/* Judgement Criteria Section */}
      <section className="mb-20 mx-auto max-w-5xl px-4">
        <h2 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-[poppins] text-center mb-8">
          JUDGEMENT CRITERIA:
        </h2>
        <div className="bg-[#33010140] p-6 rounded-lg shadow-lg">
          <ul className="list-disc pl-5 text-2xl sm:text-3xl space-y-2 font-['Inter'] leading-relaxed tracking-[3.75px] text-white">
            <li>There is no judgement criteria</li>
          </ul>
        </div>
      </section>

      {/* Event Managers Section */}
      <section className="mx-auto max-w-5xl px-4">
        <EventManagers managers={studentmanagers} />
      </section>
    </div>
  );
};

export default Roadies;
