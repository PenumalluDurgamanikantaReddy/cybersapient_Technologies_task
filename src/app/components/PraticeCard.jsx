// src/app/page.js
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StackCardsSection = () => {
  const sectionRef = useRef(null); // Ref for the main stack-area div
  const cardsRef = useRef([]); // Ref to hold references to individual card divs

  // Data for the cards, directly from your HTML
const cardsData = [
  {
    id: 1,
    title: "Exclusive Discounts",
    icon: "discount-icon", // Placeholder for an icon representing discounts
    description: "Enjoy special savings on a wide range of products and services.",
    ctaText: "Claim Now",
    bgColor: "rgb(64, 122, 255)" // Blue
  },
  {
    id: 2,
    title: "Special Offers",
    icon: "offer-icon", // Placeholder for an icon representing offers
    description: "Access limited-time offers tailored just for you.",
    ctaText: "View Offers",
    bgColor: "rgb(221, 62, 88)" // Red
  },
  {
    id: 3,
    title: "Gift Vouchers",
    icon: "voucher-icon", // Placeholder for an icon representing vouchers
    description: "Redeem exciting gift vouchers from your favorite brands.",
    ctaText: "Get Voucher",
    bgColor: "rgb(186, 113, 245)" // Purple
  },
  {
    id: 4,
    title: "Priority Support",
    icon: "support-icon", // Placeholder for an icon representing support
    description: "Receive 24/7 priority support for all your queries.",
    ctaText: "Contact Us",
    bgColor: "rgb(247, 92, 208)" // Pink
  }
];

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || cards.length === 0) return;

    // Calculate the total scroll duration needed for all cards to move "away"
    // Each card needs a certain amount of scroll distance to animate.
    // We'll make the total scroll duration for the pinned section
    // equal to (number of cards) * (a chosen scroll distance per card).
    const scrollDistancePerCard = window.innerHeight * 0.6; // Example: 80% of viewport height per card
    const totalScrollDuration = cardsData.length * scrollDistancePerCard;

    // Set initial positions and z-index for cards
    // This runs once on mount
    cards.forEach((card, index) => {
      gsap.set(card, {
        zIndex: cards.length - index, // Higher index means lower z-index (appears on top)
        // Initial rotation for the stack
        rotation: -10 * index,
        transformOrigin: "bottom left", // Important for rotation origin
      });
    });

    // Create the main timeline for the scroll effect
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", // Pin the section when its top hits the viewport top
        end: () => `+=${totalScrollDuration}`, // End pinning after scrolling through all cards
        scrub: 0.5, // Smoothly link scroll to animation
        pin: true, // Pin the main section
        anticipatePin: 1, // Helps with smoother start/end
        invalidateOnRefresh: true, // Recalculate on window resize
        // markers: true, // Uncomment for debugging scroll triggers
      }
    });

    // Animate each card sequentially
    cards.forEach((card, index) => {
      // Define the point at which this card should start moving "away"
      // This is based on the overall timeline progress
      const startTime = index * (1 / cardsData.length); // e.g., 0, 0.25, 0.5, 0.75 for 4 cards

      tl.to(card, {
        y: -window.innerHeight * 1.2, // Move up and away (120vh)
        rotation: -48, // Rotate away
        ease: "power2.out",
            duration: 0.5 // Duration of the individual card's "away" animation
      }, startTime); // Start this animation at 'startTime' in the main timeline
    });

    // Cleanup function for ScrollTrigger instances
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [cardsData]); // Re-run effect if cardsData changes

  // Helper to add refs to each card div
  const addToCardsRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen w-[80%]    font-['Poppins']">
      {/* Spacer content before the pinned section */}
 

      {/* Main stack area - this will be pinned */}
      <div
        ref={sectionRef}
        className="stack-area w-full h-screen justify-between    relative   md:flex"
      >
        {/* Left side - Static content */}
        <div className="left h-screen flex-basis-1/2 sticky top-0 left-0 flex items-center justify-center flex-col p-8 box-border">
          <div className="title w-[420px] text-8xl font-bold leading-[88px] ">
        Enjoy the Perks
            </div>
          <div className="sub-title w-[420px] text-sm mt-8 text-gray-700">
               Discover the exclusive advantages and rewards waiting for you. We've crafted a range of benefits, from special discounts to personalized offers, to enhance your experience and give you more value.

            <br />
            <button className="mt-5 px-8 py-4 bg-black text-white rounded-full border-none outline-none cursor-pointer text-sm">
            Explore All Benefits
            </button>
          </div>
        </div>

        {/* Right side - Stacked Cards */}
        <div className="right h-screen flex-basis-1/2 sticky top-0 flex items-center justify-center relative">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              ref={addToCardsRefs} // Add ref to each card
              className="card absolute w-[350px] h-[350px] rounded-[25px] p-8 box-border flex flex-col justify-evenly text-white"
              style={{
                backgroundColor: card.bgColor,
                top: 'calc(50% - 175px)', // Center vertically
                left: 'calc(50% - 175px)', // Center horizontally
                // Initial transform and zIndex will be set by GSAP in useEffect
              }}
            >
              <div className="sub text-xl font-bold">{card.title}</div>
              <div className="content text-4xl font-bold leading-[54px]">{card.description}</div>
            </div>
          ))}
        </div>
      </div>

 
    </div>
  );
};

export default StackCardsSection;
