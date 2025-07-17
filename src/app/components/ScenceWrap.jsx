'use client'
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene'; 

const SceneWrap = () => {
  const [height, setHeight] = useState('50vh'); 

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerWidth > 768 ? '100vh' : '50vh');
    };

    updateHeight(); 
    window.addEventListener('resize', updateHeight); 

    return () => window.removeEventListener('resize', updateHeight); 
  }, []);

  return (
    <Canvas shadows style={{ height }}>
      <Scene />
    </Canvas>
  );
};

export default SceneWrap;
