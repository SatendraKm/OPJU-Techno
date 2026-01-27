import React from "react";

interface Round {
  title: string;
  description: string;
}

interface RoundSectionProps {
  rounds: Round[];
}

interface RoundCardProps {
  title: string;
  description: string;
}

const RoundCard: React.FC<RoundCardProps> = ({ title, description }) => {
  return (
    <div className="border-2 border-yellow-500 p-6 rounded-lg w-full max-w-sm text-white bg-opacity-20 bg-black h-72 flex flex-col">
      {/* Title with custom blue color */}
      <div className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] px-4">{title}</div>
      {/* Scrollable description with adjusted text styles */}
      <div className="mt-2 flex-grow overflow-y-auto custom-scrollbar px-4">
        <p className="text-sm sm:text-base leading-relaxed text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const RoundSection: React.FC<RoundSectionProps> = ({ rounds }) => {
  return (
    <section className="flex flex-col items-center px-4 my-32 max-w-7xl mx-auto">
      <h2 className="text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] font-medium font-['Poppins'] tracking-[3.75px] mb-8">
        Rounds
      </h2>
      <p className="text-white text-2xl font-normal font-['Inter'] tracking-[3.75px] text-center mb-10">
        Following are the details for this event. Read the details carefully about the rounds this event has. Don&apos;t miss your chance to participate and showcase your skills!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rounds.map((round, index) => (
          <RoundCard
            key={index}
            title={round.title}
            description={round.description}
          />
        ))}
      </div>
    </section>
  );
};

export default RoundSection;
