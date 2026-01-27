import React from "react";
import Image from "next/image";
import Link from "next/link";
import ManagerCard from "./manager-card";

interface Manager {
  imageUrl: string;
  name: string;
  contact: number;
}

interface EventManagersProps {
  managers: Manager[];
  showRegister?: boolean;
}

const EventManagers: React.FC<EventManagersProps> = ({
  managers,
  showRegister = true,
}) => {
  return (
    <div className="flex flex-col items-center justify-center mb-20 px-4">
      {/* Header */}
      <div className="w-full max-w-xl h-20 flex items-center justify-center text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] text-3xl sm:text-4xl lg:text-5xl font-medium font-['Poppins'] uppercase tracking-[3.75px]">
        EVENT MANAGERS
      </div>

      {/* Description */}
      <div className="w-full max-w-4xl px-2 text-center text-white text-lg sm:text-2xl font-normal font-['Inter'] md:tracking-[3.75px] mt-4">
        For any queries regarding the event, feel free to reach out to any
        of the managers listed below. They are here to help and ensure a smooth
        experience for you!
      </div>

      {/* Manager Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center my-10">
        {managers.map((manager, index) => (
          <ManagerCard
            key={index}
            imageUrl={manager.imageUrl}
            name={manager.name}
            contact={manager.contact}
          />
        ))}
      </div>

      {/* Register Button (SVG style) */}
      {showRegister && (
        <div className="flex justify-center mt-12">
          <Link href="/dashboard">
            <Image
              src="/testfile/register2.svg"
              alt="Register Button"
              width={260}
              height={70}
              priority
              className="hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventManagers;
