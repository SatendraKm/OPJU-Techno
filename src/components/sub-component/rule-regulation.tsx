import React from 'react';

interface RulesAndRegulationProps {
  rules: string[];
}

const RulesAndRegulation: React.FC<RulesAndRegulationProps> = ({ rules }) => {
  return (
    <div className="text-white my-20 sm:my-40 px-4">
      <h2 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium font-['Poppins'] tracking-[3.75px] text-center mb-10 sm:mb-14">
        RULES & REGULATIONS
      </h2>
      <div className="bg-[#33010140] p-4 sm:p-6 rounded-lg shadow-lg max-w-5xl mx-auto tracking-[6.72px] sm:tracking-[3.75px]">
        <ul className="list-decimal pl-5 text-lg sm:text-2xl space-y-4 font-['Inter'] md:leading-10 tracking-[3.75px]">
          {rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RulesAndRegulation;
