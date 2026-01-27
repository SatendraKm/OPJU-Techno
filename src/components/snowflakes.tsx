"use client";

import { useEffect, useState } from "react";

type Snowflake = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
};

export default function Snowflakes() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 8 + 6,    // ❄️ 6px – 14px (smaller & realistic)
      duration: Math.random() * 12 + 12,
      delay: Math.random() * 10,
      rotation: Math.random() * 360,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-[-20px] animate-snowflake"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          {/* ❄️ Realistic tiny snowflake */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{
              transform: `rotate(${flake.rotation}deg)`,
              opacity: 0.75,
              filter: "drop-shadow(0 0 2px rgba(255,255,255,0.6))",
            }}
          >
            <g stroke="white" strokeWidth="2" strokeLinecap="round">
              {/* main arms */}
              <line x1="50" y1="5" x2="50" y2="95" />
              <line x1="5" y1="50" x2="95" y2="50" />
              <line x1="18" y1="18" x2="82" y2="82" />
              <line x1="82" y1="18" x2="18" y2="82" />

              {/* small branches */}
              <line x1="50" y1="20" x2="45" y2="30" />
              <line x1="50" y1="20" x2="55" y2="30" />

              <line x1="50" y1="80" x2="45" y2="70" />
              <line x1="50" y1="80" x2="55" y2="70" />

              <line x1="20" y1="50" x2="30" y2="45" />
              <line x1="20" y1="50" x2="30" y2="55" />

              <line x1="80" y1="50" x2="70" y2="45" />
              <line x1="80" y1="50" x2="70" y2="55" />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}
