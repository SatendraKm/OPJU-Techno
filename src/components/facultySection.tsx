import Image from "next/image";
import React from "react";

type FacultyPerson = {
  name: string;
  role: string;
  image: string;
};

const FacultySection = () => {
  const viceChancellor: FacultyPerson = {
    name: "Dr. Patidar Sir",
    role: "Vice Chancellor",
    image: "/faculty/vc.jpg",
  };

  const chiefConvener: FacultyPerson = {
    name: "Dr. (Chief Convener Name)",
    role: "Chief Convener - Techno-Ambition",
    image: "/faculty/chief.jpg",
  };

  const mentors: FacultyPerson[] = [
    { name: "Dr. Mentor 1", role: "Mentor", image: "/faculty/mentor1.jpg" },
    { name: "Dr. Mentor 2", role: "Mentor", image: "/faculty/mentor2.jpg" },
    { name: "Dr. Mentor 3", role: "Mentor", image: "/faculty/mentor3.jpg" },
  ];

  const technoConveners: FacultyPerson[] = [
    { name: "Dr. Trinath Talapaneni", role: "Convener - Techno-Ambition", image: "/faculty/trinath.jpg" },
    { name: "Dr. Swati Verma", role: "Convener - Techno-Ambition", image: "/faculty/swati.jpg" },
    { name: "Prof. Sutata Panda", role: "Convener - Techno-Ambition", image: "/faculty/sutata.jpg" },
  ];

  const celebrityConveners: FacultyPerson[] = [
    { name: "Dr. Vikash Kumar", role: "Convener - Celebrity Night", image: "/faculty/vikash.jpg" },
    { name: "Dr. Mithilesh Sahu", role: "Convener - Celebrity Night", image: "/faculty/mithilesh.jpg" },
    { name: "Mrs. Meenakshi Rao Gaba", role: "Convener - Celebrity Night", image: "/faculty/meenakshi.jpg" },
  ];

  const Card = ({ person, highlight = false }: { person: FacultyPerson; highlight?: boolean }) => (
    <div
      className={`group relative flex flex-col items-center text-center rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2
      ${highlight
        ? "bg-gradient-to-b from-white/20 to-white/5 border border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
        : "bg-white/10 border border-white/20"}
      backdrop-blur-xl shadow-xl`}
    >
      <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-sky-400/60 shadow-lg">
        <Image src={person.image} alt={person.name} fill className="object-cover" />
      </div>

      <h3 className="mt-6 text-xl font-semibold text-white tracking-wide">
        {person.name}
      </h3>
      <p className="text-sky-300 font-medium mt-1 text-sm uppercase tracking-wider">
        {person.role}
      </p>

      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-sky-500/10 to-blue-500/10 pointer-events-none" />
    </div>
  );

  const Section = ({
    title,
    people,
    highlightSingle = false,
  }: {
    title: string;
    people: FacultyPerson[] | FacultyPerson;
    highlightSingle?: boolean;
  }) => (
    <div className="mb-32">
      <h3 className="text-2xl md:text-3xl font-semibold text-center text-white/90 mb-14 tracking-widest uppercase">
        {title}
      </h3>

      <div
        className={`grid gap-12 ${
          Array.isArray(people)
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "grid-cols-1 place-items-center"
        }`}
      >
        {Array.isArray(people)
          ? people.map((p, i) => <Card key={i} person={p} />)
          : <Card person={people} highlight={highlightSingle} />}
      </div>
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden py-32 px-6 lg:px-20 bg-gradient-to-b from-[#050B1E] via-[#081A3A] to-[#0B2C5A]">
      
      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-500/20 rounded-full blur-[120px]" />

      <h2 className="relative text-4xl md:text-5xl font-semibold text-center mb-32 text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-300 tracking-wider">
        Faculty & Conveners
      </h2>

      <Section title="Vice Chancellor" people={viceChancellor} highlightSingle />
      <Section title="Chief Convener" people={chiefConvener} highlightSingle />
      <Section title="Mentors" people={mentors} />
      <Section title="Techno-Ambition Conveners" people={technoConveners} />
      <Section title="Celebrity Night Conveners" people={celebrityConveners} />
    </section>
  );
};

export default FacultySection;
