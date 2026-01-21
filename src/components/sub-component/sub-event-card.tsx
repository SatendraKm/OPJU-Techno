import React from "react";
import { IconType } from "react-icons";

interface SubEventCardProps {
  Icon: IconType;
  title: string;
  description: string;
  textClassName?: string; // ✅ added
}

const SubEventCard: React.FC<SubEventCardProps> = ({
  Icon,
  title,
  description,
  textClassName = "",
}) => {
  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-[#5D2019] border-4 rounded-lg shadow-md flex flex-col justify-center p-4 md:p-0 md:h-[400px]">
      
      <div className="flex justify-center pb-4">
        <Icon className="h-16 w-16 sm:h-20 sm:w-20 text-[#ffad3c]" />
      </div>

      {/* Title */}
      <div
        className={`text-center px-2 text-transparent bg-clip-text bg-gradient-to-b 
        from-[#FFAE3D] via-[#FFD188] to-[#A6660D] 
        text-2xl sm:text-3xl font-medium font-['Poppins'] uppercase tracking-[3.75px]
        ${textClassName}`}
      >
        {title}
      </div>

      {/* Description */}
      <div
        className={`text-center text-[#EDE0E0] text-base sm:text-lg p-4 font-medium 
        font-['Poppins'] overflow-hidden overflow-y-auto custom-scrollbar mt-2
        ${textClassName}`}
        style={{
          maxHeight: "7.5rem",
          display: "-webkit-box",
          WebkitLineClamp: 6,
          WebkitBoxOrient: "vertical",
        }}
      >
        {description}
      </div>
    </div>
  );
};

export default SubEventCard;
