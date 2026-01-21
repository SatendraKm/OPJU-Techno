import React from "react";

const gradientTextStyle =
  "text-transparent bg-clip-text bg-gradient-to-b from-[#FFAE3D] via-[#FFD188] to-[#A6660D]";

/* ---------- FIXED TYPE ---------- */
type SubEvent = {
  title: string;

  theme?: string;
  about?: string;
  venue?: string;

  rules?: string[];
  rounds?: string[];
  judgementCriteria?: string[];
};

type KalakritiSubEventProps = {
  events: SubEvent[];
};

const KalakritiSubEvent: React.FC<KalakritiSubEventProps> = ({ events }) => {
  return (
    <div className="p-6 mb-32 text-gray-300 lg:tracking-wide max-w-6xl mx-auto rounded-lg shadow-md">
      {events.map((event, index) => (
        <div key={index} className="mb-20">
          <h1
            className={`text-3xl md:text-4xl text-center font-medium ${gradientTextStyle}`}
          >
            {event.title}
          </h1>

          {event.theme && (
            <p className="mt-4 text-base md:text-lg">
              <span className={`font-bold ${gradientTextStyle}`}>Theme:</span>{" "}
              {event.theme}
            </p>
          )}

          {event.about && (
            <p className="mt-4 text-base md:text-lg">
              <span className={`font-bold ${gradientTextStyle}`}>About:</span>{" "}
              {event.about}
            </p>
          )}

          {event.venue && (
            <p className="mt-4 text-base md:text-lg">
              <span className={`font-bold ${gradientTextStyle}`}>Venue:</span>{" "}
              {event.venue}
            </p>
          )}

          {event.rules && event.rules.length > 0 && (
            <div className="mt-4 text-base md:text-lg">
              <p className={`font-bold ${gradientTextStyle}`}>Rules:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                {event.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          )}

          {event.rounds && event.rounds.length > 0 && (
            <div className="mt-4 text-base md:text-lg">
              <p className={`font-bold ${gradientTextStyle}`}>Rounds:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                {event.rounds.map((round, idx) => (
                  <li key={idx}>{round}</li>
                ))}
              </ul>
            </div>
          )}

          {event.judgementCriteria &&
            event.judgementCriteria.length > 0 && (
              <div className="mt-4 text-base md:text-lg">
                <p className={`font-bold ${gradientTextStyle}`}>
                  Judgement Criteria:
                </p>
                <ul className="list-disc list-inside ml-4">
                  {event.judgementCriteria.map((criteria, idx) => (
                    <li key={idx}>{criteria}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default KalakritiSubEvent;
