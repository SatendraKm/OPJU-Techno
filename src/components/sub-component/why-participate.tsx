import React from 'react'

interface WhyParticipateProps {
  reasons: string[];
}

const WhyParticipate: React.FC<WhyParticipateProps> = ({ reasons }) => {
  return (
    <div className="text-white px-4">
      <h2 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium text-center font-['Poppins'] uppercase tracking-[3.75px] mb-10 sm:mb-14">
        WHY PARTICIPATE
      </h2>
      <div className="bg-[#33010140] p-4 sm:p-6 rounded-lg shadow-lg max-w-5xl mx-auto">
        <ul className="list-decimal pl-5 text-lg sm:text-2xl font-normal space-y-2 font-['Inter'] md:leading-10 tracking-[3.75px]">
          {reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WhyParticipate;
