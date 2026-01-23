"use client";
import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div className="relative w-full overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-[#2A1414]" />

      {/* CONTENT */}
      <div className="relative z-0 text-black flex flex-col mt-36 text-center items-center min-h-screen px-4 md:px-0">

        <h2 className="text-7xl bg-clip-text text-transparent bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D]">
          ABOUT
        </h2>

        {/* Intro Text */}
        <div className="glass-bg-dark p-6 mt-10 max-w-[943px] text-center rounded-xl">
          <p className="text-xl uppercase text-white">
            A fusion of technology, culture, and fun-filled activities, crafted to
            inspire and engage every participant!
          </p>
        </div>

        {/* First Section */}
        <div className="flex flex-col md:flex-row mt-20 items-center">
          <div className="mr-0 md:mr-20 mb-10 md:mb-0">
            <Image
              src="/opjucampus.jpg"
              alt="opju campus"
              width={500}
              height={500}
              className="w-full max-w-[700px] h-auto rounded-xl"
            />
          </div>

          <div className="glass-bg-dark p-6 rounded-xl max-w-[578px] text-left">
            <h5 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium">
              OPJU
            </h5>
            <p className="text-xl font-medium text-white mt-6 tracking-[3.4px]">
              OPJU was founded by the Jindal Education and Welfare Society...
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className="flex flex-col md:flex-row mt-36 items-center">
          <div className="glass-bg-dark p-6 rounded-xl max-w-[578px] text-left order-2 md:order-1">
            <h5 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium">
              TECHNOAIMBIATION 2026
            </h5>
            <p className="text-xl font-medium text-white mt-6 tracking-[3.4px]">
              TechnoaiMBiAtion is Central India&apos;s biggest techno-cultural extravaganza...
            </p>
          </div>

          <div className="ml-0 md:ml-20 mb-10 md:mb-0 order-1 md:order-2">
            <Image
              src="/testfile/technoambiation.png"
              alt="Techno Ambition"
              width={500}
              height={500}
              className="w-full max-w-[600px] max-h-[60vh] object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Third Section */}
        <div className="flex flex-col md:flex-row mt-36 items-center">
          <div className="mr-0 md:mr-20 mb-10 md:mb-0">
            <Image
              width={500}
              height={500}
              src="/junoonlogo.png"
              alt="junoon logo"
              className="w-full max-w-[600px] h-auto rounded-xl"
            />
          </div>

          <div className="glass-bg-dark p-6 rounded-xl max-w-[578px] text-left">
            <h5 className="text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium">
              JUNOON
            </h5>
            <p className="text-xl font-medium text-white mt-6 tracking-[3.4px]">
              OPJU Junoon is an annual cultural extravaganza...
            </p>
          </div>
        </div>

        <div className="h-[300px]" />
      </div>

      {/* Glass Style */}
      <style jsx>{`
        .glass-bg-dark {
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
};

export default About;
