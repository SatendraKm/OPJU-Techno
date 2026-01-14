"use client";
import EventIntro from "@/components/sub-component/event-intro";
import React,{useState,useEffect} from "react";
import SubEventCard from "@/components/sub-component/sub-event-card";
import { FaCode, FaPenNib } from "react-icons/fa6";
import EventManagers from "@/components/sub-component/event-managers";
import Image from "next/image";
import Link from "next/link";
import { getRegistrationCount } from "@/actions/event-actions";

const Page = () => {
  const managers = [
    { imageUrl: "/managers/codigo/divakar.jpg", name: "Divakar Yadav", contact: 9691300315 },
    { imageUrl: "/managers/codigo/ritu.jpg", name: "Ritu Singh", contact: 8839463899 },
    { imageUrl: "/managers/codigo/akash.jpg", name: "Akash Kumar ", contact: 7985757151 },
  ];

  const [registrationCount, setRegistrationCount] = useState(0)
  useEffect(() => {
    getRegistrationCount("CODIGO").then((count) => {
      setRegistrationCount(count)
    })
  }, [])

  return (
    <div className="container mx-auto px-4 flex flex-col relative">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <Image
          src="/background.svg"
          className="w-full h-auto object-cover opacity-100"
          alt="Scrolling Background"
          width={500}
          height={500}
        />
      </div>

      {/* Event Intro Section */}
      <section className="w-full">
        <EventIntro
          imageUrl="/techno-events-logo/codigo.png"
          registrations={registrationCount}
          pricepool={20000}
          description="Unlock your coding potential at our University's premier Coding Event!! Participate in challenges, network with peers, and enhance your skills. Whether you are a beginner or a pro, join us for an unforgettable experience of innovation and collaboration."
          time="20-03-25 , 11:00 am"
          venue="TB 07"
        />
      </section>

      {/* Theme Section */}
      <section className="flex flex-col items-center justify-center px-4 my-32">
        <h2 className="text-transparent mb-10 bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-3xl sm:text-4xl md:text-5xl font-medium tracking-[3.75px] text-center">
          THEME
        </h2>
        <div className="text-white text-base sm:text-lg md:text-2xl font-medium text-center tracking-[3.75px]">
          <p>Dream your Fantasy, Code it in your Reality!!!</p>
        </div>
      </section>

      {/* Sub-Events Section */}
      <section className="px-4">
        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
          <div className="text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-3xl sm:text-4xl md:text-5xl font-medium font-['Poppins'] uppercase tracking-[3.75px]">
            sub-events
          </div>
          <div className="w-full max-w-4xl text-center text-white text-base sm:text-lg md:text-2xl font-normal font-['Inter'] tracking-[3.75px]">
            The following are the sub-events of this main event. Read the
            details carefully and choose the ones that best match your interests
            and expertise. Don&apos;t miss your chance to participate and
            showcase your skills!
          </div>
        </div>

        {/* Sub-Events Cards Section */}
        <div className="flex flex-col md:flex-row justify-evenly gap-8 mx-4 my-32">
          <SubEventCard
            Icon={FaCode}
            title="Code Challenge"
            description="Showcase your problem-solving skills, logic, and speed as you tackle challenging coding problems. Whether you're a beginner or a pro, this is your chance to impress the judges and compete with the best. Write efficient code, optimize solutions, and prove your mastery—let the challenge begin!"
          />
          <SubEventCard
            Icon={FaPenNib}
            title="Design Master"
            description="Unleash your creativity and craft intuitive, user-friendly designs that stand out. Whether it’s wireframes or full-fledged prototypes, this is your chance to impress the judges and wow the audience. Showcase your design thinking, usability skills, and aesthetic vision—let the challenge begin!"
          />
        </div>
        <div className="px-4 text-white mb-32">
          <div className="mb-20">
            <h2 className="text-transparent text-center bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-3xl sm:text-4xl md:text-5xl font-medium font-['Poppins'] uppercase tracking-[3.75px] mb-4 md:mb-20">
              Event 1: Code Challenge
            </h2>
            <div className="bg-[#33010140] rounded-lg pb-4 shadow-lg max-w-5xl mx-auto ">
              <div className=" max-w-5xl mx-auto md:mb-10">
                <h3 className="text-xl md:text-2xl lg:text-3xl md:mb-2 font-semibold text-green-600">
                  Round 1 (Screening Round):{" "}
                  <span className="text-red-500">Typing Showdown</span>
                </h3>
                <ul className="list-disc pl-6 text-gray-300 md:text-lg lg:text-xl]">
                  <li>
                    Typing Test - 1 Min (single chance){" "}
                    <Link
                      href="https://www.typingtest.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600"
                    >
                      (Typing Test Link)
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="max-w-5xl mx-auto md:mb-10">
                <h3 className="text-xl md:text-2xl lg:text-3xl md:mb-2 font-semibold text-green-600">
                  Round 2 (Screening Round II):{" "}
                  <span className="text-red-500">MCQs/Fill in the blanks</span>
                </h3>
                <ul className="list-disc pl-6 text-gray-300 md:text-lg lg:text-xl">
                  <li>MCQs + Fill in the blanks type </li>
                  <li>Basic Maths</li>
                  <li>Find Errors in the Code</li>
                  <li>Find Suitable Codes</li>
                </ul>
              </div>

              <div className="max-w-5xl mx-auto">
                <h3 className="text-xl md:text-2xl lg:text-3xl md:mb-2 font-semibold text-green-600">
                  Round 3 (Final Round):{" "}
                  <span className="text-red-500">
                    Technical Challenge
                  </span>
                </h3>
                <ul className="list-disc pl-6 text-gray-300 md:text-lg lg:text-xl">
                  <li>Maths</li>
                  <li>Patterns</li>
                  <li>Strings</li>
                  <li>Real Time Problems</li>
                  <li>Intermediate Programming</li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-transparent text-center bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-3xl sm:text-4xl md:text-5xl font-medium font-['Poppins'] uppercase tracking-[3.75px] mb-4 md:mb-20">
              Event 2: Design Master
            </h2>
            <div className="bg-[#33010140] rounded-lg shadow-lg pb-2 max-w-5xl mx-auto ">
              <div className="max-w-5xl mx-auto  md:mb-10">
                <h3 className="text-xl md:text-2xl lg:text-3xl md:mb-2 font-semibold text-green-600">
                  Round 1 (Final Round):{" "}
                  <span className="text-red-500">UX-Design</span>
                </h3>
                <ul className="list-disc pl-6 text-gray-300 md:text-lg lg:text-xl">
                  <li>Theme will provided at the Spot</li>
                </ul>
              </div>

              
            </div>
          </div>
        </div>

        <div className="mb-32">
          <h2 className="text-transparent text-center bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-3xl sm:text-4xl md:text-5xl font-medium font-['Poppins'] uppercase tracking-[3.75px] mb-4 md:mb-20">
            Rules of the Events
          </h2>

          <div className="bg-[#33010140] rounded-lg shadow-lg pb-2 max-w-5xl mx-auto md:mb-20">
            <h3 className="text-xl md:text-2xl lg:text-3xl md:mb-4 font-semibold text-green-600">
              Event 1 : Code Challenge
            </h3>

            <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-red-500">
              Round 1: Typing Showdown
            </h4>
            <p className="text-gray-300 md:text-lg lg:text-xl">
              1 Minute Typing Test in only 1 chance. You need{" "}
              <span className="text-blue-500 font-semibold">
                17 wpm + above 80% accuracy
              </span>{" "}
              to qualify for the next round.
            </p>

            <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-red-500 mt-4">
              Round 2: Quiz Challenge
            </h4>
            <p className="text-gray-300 md:text-lg lg:text-xl">
              30 questions, need{" "}
              <span className="text-blue-500 font-semibold">
                15 correct answers
              </span>{" "}
              to advance. Time limit - 30 min.
            </p>

            <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-red-500 mt-4">
              Round 3: Technical Challenge
            </h4>
            <p className="text-gray-300 md:text-lg lg:text-xl">
              5 questions provided, solve as many as possible within 30 min.
            </p>
          </div>

          <div className="bg-[#33010140] pb-2 rounded-lg shadow-lg max-w-5xl mx-auto md:mb-10">
            <h3 className="text-xl md:text-2xl lg:text-3xl md:mb-4 font-semibold text-green-600">
              Event 2 : Design Master
            </h3>

            <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-red-500">
              Round 1: 
            </h4>
            <p className="text-gray-300 md:text-lg lg:text-xl">
            Themes of the Event will be provided. Judges will decide.
              
            </p>

            
          </div>
        </div>
        <section className="mb-32">
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center mb-12">
            Winner & Judgement Criteria:
          </h2>
          <div className="bg-[#33010140] p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
            <ul className="list-disc pl-5 text-xl lg:text-2xl space-y-2 text-gray-300">
              <li>Maximum Questions Solved</li>
              <li>Maximum Test Cases Passed</li>
              <li>Submission Time</li>
              <li>Time & Space Complexity </li>
              <li>Overall Performance throughout the Competition</li>
            </ul>
          </div>
        </section>
        <EventManagers managers={managers} />
      </section>
    </div>
  );
};

export default Page;
