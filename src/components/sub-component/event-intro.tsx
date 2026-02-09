import React from "react";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import { GoClockFill } from "react-icons/go";

interface EventIntroProps {
  imageUrl: string;
  registrations: number;
  pricepool: number;
  description: string;
  time: string;
  venue: string;
}

const EventIntro: React.FC<EventIntroProps> = ({
  imageUrl,
  registrations,
  pricepool,
  description,
  time,
  venue,
}) => {
  return (
    <div className="">
      <div className="relative min-h-screen flex items-center justify-center bg-transparent">
        {/* Time and Venue Overlay */}
        <div className="absolute left-4 sm:left-14 top-16 sm:top-24 z-10 p-4 space-y-4 text-white text-xl sm:text-2xl text-left mb-6">
          <p className="flex items-center">
            <span className="mr-2 text-yellow-400">
              <GoClockFill />
            </span>
            {time}
          </p>
          <p className="flex items-center">
            <span className="mr-2 text-yellow-400">
              <FaLocationDot />
            </span>
            {venue}
          </p>
        </div>

        {/* Main Content */}
        <div className="relative z-10 bg-transparent flex flex-col items-center p-4 pt-24 sm:pt-32 rounded-lg shadow-lg text-white">
          <Image
            src={imageUrl}
            width={400}
            height={500}
            alt="event logo"
            className="w-full h-auto rounded-xl mt-12"
          />
          <div className="flex flex-col sm:flex-row items-center mt-8 justify-center text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-3xl sm:text-4xl font-normal font-['Inder']">
              Registrations:
            </span>
            <span className="px-4 text-white text-3xl sm:text-4xl font-normal font-['Inder']">
              {registrations}
            </span>
          </div>

          <div className="text-center mt-5 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-3xl sm:text-4xl mx-2 font-normal font-['Inder']">
              Prize Pool:
            </span>
            <span className="text-white text-3xl sm:text-4xl font-normal font-['Inder']">
              Rs.{pricepool}
            </span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="flex flex-col items-center px-4">
  <div className="w-full max-w-4xl text-center text-white text-xl sm:text-2xl font-medium font-['Inter'] tracking-[3.75px]">
    {description}
    <br />
  </div>
</section>

    </div>
  );
};

export default EventIntro;
