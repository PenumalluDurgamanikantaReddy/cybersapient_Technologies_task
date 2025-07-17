// components/LevelProgressBar.jsx
'use client';

import React, { useState, useEffect } from 'react';

const LevelProgressBar = ({
  currentXP,
  totalXPForLevel =100,
  barHeight = '18px', 
  className = '' ,
  
}) => {
  const [progressWidth, setProgressWidth] = useState(40);

  const rawPercentage = totalXPForLevel > 0 ? (currentXP / totalXPForLevel) * 100 : 0;
  const clampedPercentage = Math.max(0, Math.min(100, rawPercentage));

  useEffect(() => {
    // setProgressWidth(clampedPercentage);
  }, [clampedPercentage]); 

  return (
    <div
      className={`relative w-full md:w-[70%] rounded-md overflow-hidden shadow-md ${className}`}
      style={{ height: barHeight, backgroundColor: '#555' }} 
    >
      <div
        className="absolute top-0 left-0 h-full rounded-md"
        style={{
          width: `${progressWidth}%`,
          // This creates the yellow-orange split effect.
          // You might need to adjust the percentages based on your desired visual.
          background: `linear-gradient(to right, #FFD700 0%, #FFD700 60%, #FF8C00 100%)`, // Yellow to Orange gradient
          transition: 'width 0.8s ease-out', // Smooth animation for width change
        }}
      ></div>
    </div>
  );
};

export default LevelProgressBar;