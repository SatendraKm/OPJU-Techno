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
        contact: "+91 82650 13186",
        image: "/placeholder-pic.jpeg",
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
        contact: "+91 9430160416",
        image: "/placeholder-pic.jpeg",
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
        name: "AAditya Prabhakar",
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
        name: "Sushree Srutirupa Pradhan",
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
        name: "Himesh Raj Barik",
        contact: "+91 9907740054",
        image: "/placeholder-pic.jpeg",
      },
      {
        name: "Preeti Behera",
        contact: "+91 8984329966",
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
        image: "/placeholder-pic.jpeg",
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
        name: "RShyam Sahu",
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
        name: "Swasti Behra",
        contact: "+91 9522893333",
        image: "/placeholder-pic.jpeg",
      },
    ],
  },
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">
      {/* Centered Content with Left & Right Margin */}
      <div className="mx-auto max-w-6xl">
        {/* Main Heading */}
        <h1 className="text-7xl font-medium font-['Poppins'] text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] mb-24 mt-24">
          Team Behind TechnoAiMBiAtion
        </h1>

        {/* Team Sections */}
        {teamSections.map((section, index) => (
          <div
            key={index}
            className={`flex font-['Poppins'] flex-col md:flex-row items-center md:items-start mb-48 gap-12 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Section Title - Positioned to Align with Cards */}
            <h2 className="text-4xl mt-6 md:text-5xl uppercase font-medium text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D] md:w-1/2 w-full text-center md:text-left flex items-center justify-center md:justify-start md:pl-8 break-words whitespace-normal">
              {section.title}
            </h2>

            {/* Profile Cards - Positioned to Align with Next Section Title */}
            <div className="grid md:grid-cols-2 gap-10 md:w-2/3 md:pr-8">
              {section.members.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800 rounded-3xl shadow-xl border-4 border-yellow-500 w-72 h-96 flex flex-col"
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={350}
                    height={350}
                    className="rounded-2xl mb-1"
                  />
                  <h3 className="text-2xl font-medium text-center">{member.name}</h3>
                  <p className="text-md text-gray-400 mt-2 pl-4">
                    Contact: <br/>{member.contact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
