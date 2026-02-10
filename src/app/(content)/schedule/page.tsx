import React from 'react';
import Image from 'next/image';

const Schedule = () => (
  <Image 
    src="/backgrounds/schedulex2.png" 
    width={500} 
    height={500} 
    alt="schedule" 
    className="w-full"
    priority
    loading="eager"
    layout="responsive"
  />
);

export default Schedule;
