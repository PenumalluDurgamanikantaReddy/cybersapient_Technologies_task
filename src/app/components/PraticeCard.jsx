
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StackCardsSection = () => {
  const sectionRef = useRef(null); 
  const cardsRef = useRef([]); 
const [activeCardIndex, setActiveCardIndex] = useState(0);

  
const cardsData = [
  {
    id: 1,
    title: "Exclusive Discounts",
    icon: "discount-icon", 
    description: "Enjoy special savings on a wide range of products and services.",
    ctaText: "Claim Now",
    bgColor: "rgb(64, 122, 255)" ,
     content: "Unlock Big Savings"
  },
  {
    id: 2,
    title: "Special Offers",
    icon: "offer-icon", 
    description: "Access limited-time offers tailored just for you.",
    ctaText: "View Offers",
    bgColor: "rgb(221, 62, 88)", 
         content: "Unlock Big Savings"

  },
  {
    id: 3,
    title: "Gift Vouchers",
    icon: "voucher-icon", 
    description: "Redeem exciting gift vouchers from your favorite brands.",
    ctaText: "Get Voucher",
    bgColor: "rgb(186, 113, 245)",
         content: "Unlock Big Savings"

  },
  {
    id: 4,
    title: "Priority Support",
    icon: "support-icon", 
    description: "Receive 24/7 priority support for all your queries.",
    ctaText: "Contact Us",
    bgColor: "rgb(247, 92, 208)", 
         content: "Unlock Big Savings"

  }
];

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || cards.length === 0) return;

   
    const scrollDistancePerCard = window.innerHeight * 0.6; 
    const totalScrollDuration = cardsData.length * scrollDistancePerCard;

    
    cards.forEach((card, index) => {
      gsap.set(card, {
        zIndex: cards.length - index, 
        
        rotation: -10 * index,
        transformOrigin: "bottom left", 
      });
    });

    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top", 
        end: () => `+=${totalScrollDuration}`,
        scrub: 0.5, 
        pin: true,
        anticipatePin: 1, 
        invalidateOnRefresh: true, 
  
      },
       onUpdate: (self) => {
          const progress = self?.progress; 
          const cardIndex = Math.min(
            Math.floor(progress * cardsData.length),
            cardsData.length - 1
          );
          setActiveCardIndex(cardIndex);
        }
    });

    
    cards.forEach((card, index) => {
   
      const startTime = index * (1 / cardsData.length); 

      tl.to(card, {
        y: -window.innerHeight * 1.2, 
        rotation: -48, 
        ease: "power2.out",
            duration: 0.5
      }, startTime); 
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [cardsData]); 

  const addToCardsRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen w-[80%]    font-['Poppins']">
 

      <div
        ref={sectionRef}
        className="stack-area w-full h-screen  flex   max-[700px]:flex-col justify-center     md:flex-row items-center  md:justify-between    relative   md:flex"
      >
        <div className="left h-screen flex-basis-1/2 top-0   flex items-center justify-center flex-col  top-0   max-[700px]:left-[80px] max-[900px]:left-[320px] p-8 box-border relative">
          <div className="title w-[420px] text-5xl xl:text-8xl font-bold leading-[88px] ">
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

<div className="right h-screen flex-basis-1/2  top-0 flex items-center justify-center relative md:left-0 max-[700px]:top-[50px] max-[700px]:left-[140px] max-[900px]:left-[320px]">
 

          {cardsData.map((card, index) => (
            <div
              key={card.id}
              ref={addToCardsRefs} 
              className="card absolute  max-[900px]:w-[250px] max-[900px]:h-[250px] w-[350px] h-[350px] rounded-[25px] p-8 box-border flex flex-col justify-evenly text-white"
              style={{
                backgroundColor: card.bgColor,
                top: 'calc(50% - 175px)', 
                left: 'calc(50% - 175px)', 
                
              }}
            >
              <div className="sub text-xl font-bold">{card.title}</div>
              <div className="content text-4xl  max-[900px]:text-lg  max-[900px]:leading-[25px] font-bold leading-[54px]">{card.description}</div>
            </div>
          ))}
        </div>
      </div>

 
    </div>
  );
};

export default StackCardsSection;
