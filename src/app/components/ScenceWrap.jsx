'use client'
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene'; // adjust path as needed

const SceneWrap = () => {
  const [height, setHeight] = useState('50vh'); // Default for SSR

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerWidth > 768 ? '100vh' : '50vh');
    };

    updateHeight(); // Set on mount
    window.addEventListener('resize', updateHeight); // Listen for resize

    return () => window.removeEventListener('resize', updateHeight); // Clean up
  }, []);

  return (
    <Canvas shadows style={{ height }}>
      <Scene />
    </Canvas>
  );
};

export default SceneWrap;
