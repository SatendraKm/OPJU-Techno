import Image from "next/image";
import React from "react";

type FacultyPerson = {
  name: string;
  role: string;
  image: string;
};

const FacultySection = () => {
  const viceChancellor: FacultyPerson = {
    name: "Dr. R D Patidar Sir",
    role: "Vice Chancellor",
   image: "/faculty/VCopju.jpg",
  };

  const registrar: FacultyPerson = {
    name: "Dr. Anurag Vijaywargiya",
    role: "Registrar",
    image: "/faculty/registrar.jpg",
  };

  const chiefConvener: FacultyPerson = {
    name: "Dr. Rakesh Nayak",
    role: "Chief Convener - Techno-Ambition",
    image: "/faculty/chief.jpg",
  };

  const mentors: FacultyPerson[] = [
    {
      name: "Dr. Mahesh Bhiwapurkar",
      role: "Mentor",
      image: "/faculty/mentor1.jpg",
    },
    {
      name: "Dr. Sanjay Singh",
      role: "Mentor",
      image: "/faculty/mentor2.jpg",
    },
  ];

  const technoConveners: FacultyPerson[] = [
    {
      name: "Dr. Trinath Talapaneni",
      role: "Convener - Techno-Ambition",
      image: "/faculty/trinath.jpg",
    },
    {
      name: "Dr. Swati Verma",
      role: "Convener - Techno-Ambition",
      image: "/faculty/swati.jpg",
    },
    {
      name: "Prof. Sujata Panda",
      role: "Convener - Techno-Ambition",
      image: "/faculty/sujata.jpg",
    },
  ];

  const celebrityConveners: FacultyPerson[] = [
    {
      name: "Dr. Vikash Kumar",
      role: "Convener - Celebrity Night",
      image: "/faculty/vikash.jpg",
    },
    {
      name: "Dr. Mithilesh Sahu",
      role: "Convener - Celebrity Night",
      image: "/faculty/mithilesh.jpg",
    },
    {
      name: "Mrs. Meenakshi Rao Gaba",
      role: "Convener - Celebrity Night",
      image: "/faculty/meenakshi.jpg",
    },
  ];

  /* ================= CARD ================= */

  const Card = ({
    person,
    highlight = false,
    size = "normal",
  }: {
    person: FacultyPerson;
    highlight?: boolean;
    size?: "normal" | "large";
  }) => {
    const isLarge = size === "large";

    return (
      <div
        className={`group relative flex flex-col items-center text-center rounded-3xl transition-all duration-300 hover:-translate-y-2
        ${isLarge ? "p-12" : "p-8"}
        ${
          highlight
            ? "bg-gradient-to-b from-white/20 to-white/5 border border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            : "bg-white/10 border border-white/20"
        }
        backdrop-blur-xl shadow-xl`}
      >
        <div
          className={`relative rounded-full overflow-hidden border-4 border-sky-400/60 shadow-lg
          ${isLarge ? "w-56 h-56" : "w-40 h-40"}`}
        >
          <Image
            src={person.image}
            alt={person.name}
            fill
            className="object-cover"
          />
        </div>

        <h3
          className={`mt-8 font-semibold text-white tracking-wide
          ${isLarge ? "text-3xl" : "text-xl"}`}
        >
          {person.name}
        </h3>

        <p
          className={`text-sky-300 font-medium mt-2 uppercase tracking-wider
          ${isLarge ? "text-base" : "text-sm"}`}
        >
          {person.role}
        </p>

        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-sky-500/10 to-blue-500/10 pointer-events-none" />
      </div>
    );
  };

  /* ================= SECTION ================= */

  const Section = ({
    title,
    people,
    highlightSingle = false,
    largeCard = false,
  }: {
    title: string;
    people: FacultyPerson[] | FacultyPerson;
    highlightSingle?: boolean;
    largeCard?: boolean;
  }) => {
    const isArray = Array.isArray(people);
    const isTwoItems = isArray && people.length === 2;

    return (
      <div className="mb-28">
        <h3 className="text-2xl md:text-3xl font-semibold text-center text-white/90 mb-16 tracking-widest uppercase">
          {title}
        </h3>

        <div
          className={`grid gap-14 justify-center ${
            !isArray
              ? "grid-cols-1 place-items-center"
              : isTwoItems
              ? "grid-cols-1 sm:grid-cols-2 max-w-4xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
          }`}
        >
          {isArray
            ? people.map((p, i) => <Card key={i} person={p} />)
            : (
              <Card
                person={people}
                highlight={highlightSingle}
                size={largeCard ? "large" : "normal"}
              />
            )}
        </div>
      </div>
    );
  };

  /* ================= MAIN ================= */

  return (
    <section className="relative w-full overflow-hidden py-32 px-6 lg:px-20 bg-gradient-to-b from-[#050B1E] via-[#081A3A] to-[#0B2C5A]">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[120px]" />

      <h2 className="relative text-4xl md:text-5xl font-semibold text-center mb-32 text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-300 tracking-wider">
        Faculty & Conveners
      </h2>

      <Section
        title="Vice Chancellor"
        people={viceChancellor}
        highlightSingle
        largeCard
      />

      {/* ✅ REGISTRAR ADDED HERE */}
      <Section
        title="Registrar"
        people={registrar}
        highlightSingle
      />

      <Section title="Mentors" people={mentors} />

      <Section
        title="Chief Convener"
        people={chiefConvener}
        highlightSingle
      />

      <Section title="Techno-Ambition Conveners" people={technoConveners} />
      <Section title="Celebrity Night Conveners" people={celebrityConveners} />
    </section>
  );
};

export default FacultySection;
