'use client'

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleProgressBar = ({ value, color, size,icon,alttext }) => {

  const { theme ,systemTheme} = useTheme();
   const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
    const currentTheme = theme === 'system' ? systemTheme : theme;
const bgAndTextClasses = mounted
    ? currentTheme === 'light'
      ? ' text-white'
      : ' text-black'
    : 'bg-transparent text-transparent'; 


  const data = {
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: [color, '#e5e7eb'], 
        borderWidth: 0,
        cutout: '80%', 
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180 + 180, 
    cutout: '80%',
    responsive: false,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: true },
    },
  };

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
        {icon && <Image src={icon} width={110} height={150} alt={alttext} />}
        
      </div>

      <div
         style={{
          position: 'absolute',
          top: '110%',
          left: '52%',
          transform: 'translate(-50%, -50%)',
          fontSize: 20,
          fontWeight: 'bold',
        }}
className={`${bgAndTextClasses}`}      >
<p className={`${bgAndTextClasses}`}>{value}%</p>
      </div>
    </div>
  );
};

export default CircleProgressBar;
