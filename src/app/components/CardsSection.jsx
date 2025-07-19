// components/StickyScrollSection.js
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Example data for your cards
const cardData = [
  {
    id: 1,
    title: "First Card Title",
    description: "This is the description for the first card. It will appear when you start scrolling.",
    image: "/images/bg-image-1.jpg" // Example background image for the sticky section
  },
  {
    id: 2,
    title: "Second Card Title",
    description: "Here's the content for the second card. Scroll further to reveal this one.",
    image: "/images/bg-image-1.jpg" // Same background for simplicity, or change if desired
  },
  {
    id: 3,
    title: "Third Card Title",
    description: "And finally, the details for the third card. This is the last piece of changing content.",
    image: "/images/bg-image-1.jpg" // Same background
  },
];

const StickyScrollSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const cardProgress = useTransform(
    scrollYProgress,
    [0, 1],
    [0, cardData.length - 1]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full" // Removed overflow-hidden from here
      style={{ height: `${cardData.length * 100}vh` }} // This creates the scrollable height
    >
      {/* Sticky Background - Now fixed position relative to viewport */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-cover bg-center" // Changed `sticky` to `fixed`
        style={{ backgroundImage: `url(${cardData[0].image})` }}
      >
        {/* You can optionally add an overlay or content directly to the background */}
      </motion.div>

      {/* Content Cards Wrapper - Absolute position, so it scrolls over the fixed background */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center pointer-events-none">
        {cardData.map((card, index) => {
          const opacity = useTransform(
            cardProgress,
            [index - 0.5, index, index + 0.5],
            [0, 1, 0]
          );

          const y = useTransform(
            cardProgress,
            [index - 1, index, index + 1],
            [-50, 0, 50]
          );

          return (
            <motion.div
              key={card.id}
              style={{ opacity, y }}
              className="w-full max-w-md p-8 text-center text-red-400 pointer-events-auto"
              // Ensure content is interactive when visible
            >
              <h2 className="text-4xl font-bold mb-4">{card.title}</h2>
              <p className="text-lg">{card.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StickyScrollSection;