"use client";
import React from "react";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section className="w-full min-h-screen bg-gray-200 px-6 sm:px-10 lg:px-16 py-14 lg:py-20 flex items-start">
      <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-14">
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-1/2 space-y-8 lg:space-y-10">
          {/* HEADING */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black">
            About
          </h1>

         {/* logo */}
          <Image
            src="/testfile/newlogo2.png"
            alt="logo"
            width={260}
            height={260}
            className="w-28 sm:w-36 lg:w-[260px]"
          />

          {/* CONTENT */}
          <p className="text-gray-700 text-base sm:text-lg lg:text-2xl leading-relaxed max-w-xl">
            Technoaimbiation is Central India’s biggest techno-cultural
            extravaganza, bringing together innovation, creativity, and
            entertainment on a grand scale.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full lg:w-[45%] h-64 sm:h-80 lg:h-[500px] overflow-hidden rounded-xl">
          <Image
            src="/testfile/newpic2.png"
            width={600}
            height={600}
            alt="about"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
