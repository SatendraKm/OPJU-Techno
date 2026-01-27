import Image from "next/image";

const teamSections = [
  {
    title: "Information, Publicity & Invitation",
    members: [
      {
        name: "Ajay Patel",
        contact: "+91 8839171099",
        image: "/teams/information-publicity-invitation/ajay.png",
      },
      {
        name: "Hussain Kapadia",
        contact: "+91 8265013186",
        image: "/teams/information-publicity-invitation/hussain.jpeg",
      },
    ],
  },
  {
    title: "Design, Print & Media",
    members: [
      {
        name: "Ritul Raj Bhagat",
        contact: "+91 9432875971",
        image: "/placeholder-pic.jpeg",
      },
      {
        name: "Navya Tiwari",
        contact: "+91 8109216433",
        image: "/teams/design-print-media/navya.jpeg",
      },
    ],
  },
  {
    title: "Registration & Reception",
    members: [
      {
        name: "Saniya Thakur",
        contact: "+919343489230",
        image: "/placeholder-pic.jpeg",
      },
      {
        name: "Megha Sahu",
        contact: "+91 9348561048",
        image: "/placeholder-pic.jpeg",
      },
    ],
  },
  {
    title: "Accommodation",
    members: [
      {
        name: "Aprajita Pandey",
        contact: "+91 9907401010",
        image: "/placeholder-pic.jpeg",
      },
      {
        name: "Aditya Prabhakar",
        contact: "+91 7008254263",
        image: "/placeholder-pic.jpeg",
      },
    ],
  },
  {
    title: "Stage, Light, Sound & Stall",
    members: [
      {
        name: "Parth Singh Thakur",
        contact: "+91 8889055521",
        image: "/teams/stage-light-sound-stall/parth.png",
      },
      {
        name: "Ayush Gupta",
        contact: "+91 7869108678",
        image: "/placeholder-pic.jpeg",
      },
    ],
  },
  {
    title: "Catering",
    members: [
      {
        name: "Ankit Kumar",
        contact: "+91 9039046503",
        image: "/placeholder-pic.jpeg",
      },
      {
        name: "Sushree Srutipriya Pradhan",
        contact: "+91 7847891954",
        image: "/placeholder-pic.jpeg",
      },
    ],
  },
  {
    title: "Venue Preparation",
    members: [
      {
        name: "Aryan Mishra",
        contact: "+91 7205993715",
        image: "/placeholder-pic.jpeg",
      },
      {
        name: "Garima Mishra",
        contact: "+91 7047039028",
        image: "/teams/hospitality/garima.png",
      },
    ],
  },
  {
    title: "Transportation",
    members: [
      {
        name: "Preeti Behera",
        contact: "+91 8984329966",
        image: "/placeholder-pic.jpeg",
      },
      {
        name: "Mayank Sharma",
        contact: "+91 7024189586",
        image: "/placeholder-pic.jpeg",
      },
    ],
  },
  {
    title: "Hospitality",
    members: [
      {
        name: "Saliha Ahmed",
        contact: "+91 8085592679",
        image: "/placeholder-pic.jpeg",
      },
      {
        name: "Garima Vastarkar",
        contact: "+91 9981285475",
        image: "/placeholder-pic.jpeg",
      },
    ],
  },
  {
    title: "Website Maintenance",
    members: [
      {
        name: "Satendra Kumar",
        contact: "+91 9301196473",
        image: "/teams/website-maintenance/sattu.jpg",
      },
      {
        name: "Surya Prakash Sharma",
        contact: "+91 8602577270",
        image: "/placeholder-pic.jpeg",
      },
    ],
  },
  {
    title: "Certificate & Prize",
    members: [
      {
        name: "Shivam Sharma",
        contact: "+91 9179165697",
        image: "/teams/certificate-prize/shivam.png",
      },
      {
        name: "Pratham Panchal",
        contact: "+91 8109771525",
        image: "/placeholder-pic.jpeg",
      },
    ],
  },
  {
    title: "Discipline",
    members: [
      {
        name: "Ashutosh Sahu",
        contact: "+91 9776565942",
        image: "/placeholder-pic.jpeg",
      },
      {
        name: "Charulata Chouhan",
        contact: "+91 7987399785",
        image: "/placeholder-pic.jpeg",
      },
    ],
  },
  {
    title: "Stationery & Logistics",
    members: [
      {
        name: "R Shyam Sahu",
        contact: "+91 7501758622",
        image: "/placeholder-pic.jpeg",
      },
      {
        name: "Vivek Sharma",
        contact: "+91 9031714978",
        image: "/placeholder-pic.jpeg",
      },
    ],
  },
  {
    title: "Health & First Aid",
    members: [
      {
        name: "Vishnu Kumar Gupta",
        contact: "+91 754000243",
        image: "/placeholder-pic.jpeg",
      },
      {
        name: "Naina Meghani",
        contact: "+91 9522893333",
        image: "/placeholder-pic.jpeg",
      },
    ],
  },
];

export default function TeamPage() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#050B1A] via-[#081833] to-[#020617]" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        {/* ✅ FIXED HERO TITLE */}
        <h1 className="font-semibold text-center mb-24 text-transparent bg-clip-text bg-gradient-to-b from-[#FFD88A] to-[#B8860B] leading-tight">
          <span className="block text-3xl sm:text-4xl md:text-5xl">
            Team Behind
          </span>
          <span className="block text-4xl sm:text-5xl md:text-7xl tracking-wide">
            TechnoAiMBiAtion
          </span>
        </h1>

        {/* Sections */}
        {teamSections.map((section, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-12 md:gap-16 mb-32 ${
              index % 2 === 0 ? "" : "md:flex-row-reverse"
            }`}
          >
            {/* Section Title */}
            <h2 className="md:w-1/3 text-2xl md:text-4xl font-semibold uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#FFD88A] to-[#B8860B] text-center md:text-left">
              {section.title}
            </h2>

            {/* Cards */}
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              {section.members.map((member, idx) => (
                <div
                  key={idx}
                  className="group bg-white/5 backdrop-blur-xl rounded-3xl p-5 border border-white/10 hover:border-yellow-400/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,200,80,0.15)]"
                >
                  <div className="relative p-[6px] rounded-3xl bg-gradient-to-br from-[#FFD88A] via-[#B8860B] to-[#FFD88A] shadow-[0_0_25px_rgba(255,200,80,0.35)]">
                    <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-[#020617]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold text-center mt-4">
                    {member.name}
                  </h3>

                  <p className="text-sm text-gray-400 text-center mt-2">
                    Contact <br /> {member.contact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
