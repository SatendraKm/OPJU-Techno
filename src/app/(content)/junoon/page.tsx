import Image from "next/image";
import EventManagers from "@/components/sub-component/event-managers";

export default function Junoon() {
  const managers = [
    {
      imageUrl: "/managers/junoon/devendra.jpeg",
      name: "Devendra",
      contact: 9755305060,
    },

    {
      imageUrl: "/managers/junoon/sumit.jpeg",
      name: "Sumit Singh",
      contact: 7974944091,
    },
    {
      imageUrl: "/managers/junoon/jeet.jpeg",
      name: "Jeet Jain",
      contact: 9827177970,
    },
  ];

  const guests = [
    {
  name: "Rishi Singh",
  role: "Celeb - Rishi Singh",
  image: "/junoon/rishinew.svg",
  description: `Rishi Singh is one of India’s most promising young vocalists, widely recognized as the winner of Indian Idol Season 13. Rooted deeply in classical music, his singing blends technical excellence with heartfelt emotion, creating performances that resonate across generations.
Known for his romantic melodies, soulful expressions, and flawless sur control, Rishi Singh brings a calm yet captivating presence to the stage. His journey on Indian Idol was marked by consistency, discipline, and an ability to transform every song into an emotional experience. Whether it’s a soft romantic number or a powerful classical-based rendition, his voice connects instantly with the audience.
At Junoon, Rishi Singh promises an evening filled with pure musical passion, timeless Bollywood classics, and soul-stirring performances, making the night truly unforgettable.`,
  imageOnRight: true,
},

    {
      name: "Rishi Singh & Band",
      role: "Music - Rishi Singh & Band",
      image: "/junoon/bandnew.svg",
       description: `Led by Rishi Singh, this power-packed musical act brings together soulful vocals and dynamic live instrumentation to create an unforgettable concert experience. Known for winning Indian Idol Season 13, Rishi Singh’s performances beautifully blend classical depth, romantic melodies, and contemporary Bollywood energy.
Accompanied by his talented band, the act delivers high-energy live arrangements, emotional ballads, and crowd-engaging performances that transform the stage into a musical celebration. From timeless classics to modern chartbusters, Rishi Singh & Band promise a night filled with passion, rhythm, and pure musical magic at OPJU Junoon.`,
      imageOnRight: false,
      largerImage: true,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-600/30 to-pink-600/30 text-white">
      {/* Logo Section */}
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <Image
          src="/junoon/junoonlogo.png"
          alt="Junoon Logo"
          width={1000}
          height={1000}
          className="max-w-[80%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[74%] h-auto"
          priority
        />
        <div className="text-center w-full max-w-3xl mt-4">
          
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 py-16">
        <div className="w-full lg:w-1/2">
          <Image
            src="/junoon/aboutjunoon.png"
            alt="Junoon Event"
            width={600}
            height={400}
            className="w-full rounded-lg"
            priority
          />
        </div>
        <div className="w-full lg:w-1/2 text-white text-center lg:text-left max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#E944FF] to-[#FFFFFFFA] shadow-lg mb-6">
            ABOUT JUNOON
          </h2>
          <p className="text-xl font-medium font-['Poppins']">
            OPJU Junoon is an annual cultural extravaganza hosted by the O.P.
            Jindal University in Chhattisgarh, India. This vibrant event
            showcases the diverse talents of people across various domains
            including music and dance. In 2018, we had Shirley Setia. In 2020,
            we had Jubin Nautiyal and Sunburn, and in 2023, we had DJ Perisha.
          </p>
        </div>
      </div>

      {/* Guest Sections */}
      {guests.map((guest, index) => (
        <section
          key={index}
          className={`flex flex-col md:flex-row ${
            guest.imageOnRight ? "md:flex-row-reverse" : ""
          } items-center justify-center py-16`}
        >
          <div className="w-full md:w-1/3 flex justify-center">
            <Image
              src={guest.image}
              alt={guest.name}
              width={guest.largerImage ? 500 : 400} // Increased size for DJ Hemant
              height={guest.largerImage ? 500 : 400}
              className="rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
          <div className="w-full md:w-1/2 text-white text-center md:text-left max-w-3xl px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#E944FF] to-[#FFFFFFFA] shadow-lg mb-6">
              {guest.role}
            </h2>
            <p className="text-xl font-medium font-['Poppins']">
              {guest.description}
            </p>
          </div>
        </section>
      ))}

      {/* Bottom Padding */}
      <div className="pb-32">
        <EventManagers managers={managers} showRegister={false} />
      </div>
    </div>
  );
}
