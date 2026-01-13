import { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    Days: 0,
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date(2026, 1, 19, 0, 0, 0).getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        return {
          Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          Hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          Minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          Seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      }
      return { Days: 0, Hours: 0, Minutes: 0, Seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-10">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center">
          <div
            className="relative flex flex-col items-center justify-center bg-contain bg-center bg-no-repeat w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32"
            style={{ backgroundImage: "url('/card.png')" }}
          >
            <p
              className="text-center text-[#ffad3c] font-bold text-2xl md:text-3xl lg:text-5xl"
              style={{
                textShadow: "0px 4px 10px rgba(0, 0, 0, 0.78)",
                letterSpacing: "3.75px",
                fontFamily: "'Inria Serif', serif",
              }}
            >
              {value < 10 ? `0${value}` : value}
            </p>
          </div>
          <p
            className="text-center text-[#aea8a8] text-base md:text-lg lg:text-xl"
            style={{
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "3.75px",
            }}
          >
            {label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
