'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const StackCardsSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]); 

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const cardsData = [
    {
      id: 1,
      title: "Exclusive Discounts",
      icon: "🎯",
      description: "Enjoy special savings on products with our premium membership benefits.",
      ctaText: "Claim Now",
      bgColor: "rgb(64, 122, 255)",
      leftContent: {
        title: "Unlock Big Savings",
        subtitle: "Premium Discounts Await",
        description: "Experience exclusive discounts tailored for premium members. Save up to 40% on your favorite brands and services.",
        highlight: "Up to 40% Off"
      }
    },
    {
      id: 2,
      title: "Special Offers",
      icon: "⚡",
      description: "Access limited-time offers tailored just for you with personalized recommendations.",
      ctaText: "View Offers",
      bgColor: "rgb(221, 62, 88)",
      leftContent: {
        title: "Limited Time Magic",
        subtitle: "Personalized Just for You",
        description: "Discover offers crafted specifically for your preferences. Each deal is carefully selected to match your interests.",
        highlight: "Personalized Deals"
      }
    },
    {
      id: 3,
      title: "Gift Vouchers",
      icon: "🎁",
      description: "Redeem exciting gift vouchers from your favorite brands and share them with loved ones.",
      ctaText: "Get Voucher",
      bgColor: "rgb(186, 113, 245)",
      leftContent: {
        title: "Gift the Experience",
        subtitle: "Vouchers & More",
        description: "Share the joy with premium gift vouchers. Perfect for special occasions and showing you care.",
        highlight: "Premium Vouchers"
      }
    },
    {
      id: 4,
      title: "Priority Support",
      icon: "💎",
      description: "Receive 24/7 priority support for all your queries with dedicated expert assistance.",
      ctaText: "Contact Us",
      bgColor: "rgb(247, 92, 208)",
      leftContent: {
        title: "Always Here for You",
        subtitle: "24/7 Premium Support",
        description: "Get instant help from our dedicated support team. Your success is our priority, anytime you need us.",
        highlight: "24/7 Available"
      }
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const rightCards = cardsRef.current;

    if (!section || rightCards.length === 0) return;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const cardAnimationDuration = 0.5; 
    const delayBetweenCards = 0.5;       
    const totalDurationPerCardStep = cardAnimationDuration + delayBetweenCards;

    
    const scrollDistancePerCard = window.innerHeight * 0.6; 

   
    const totalScrollJourney = cardsData.length * scrollDistancePerCard;


    rightCards.forEach((card, index) => {
      gsap.set(card, {
        zIndex: rightCards.length - index, 
        rotation: -10 * index,
        transformOrigin: "bottom left",
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScrollJourney}`, 
        scrub: 0.5, 
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          
          const progress = self?.progress;
          const cardIndex = Math.min(
            Math.floor(progress * cardsData.length), 
            cardsData.length - 1
          );
          setActiveCardIndex(cardIndex);
        }
      }
    });

    rightCards.forEach((card, index) => {
   
      const startTime = index * (scrollDistancePerCard / totalScrollJourney); 

      tl.to(card, {
        y: -window.innerHeight * 1.2, 
        rotation: -48,
        ease: "power2.out",
        duration: cardAnimationDuration 
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

  const textVariants = {
    enter: (direction) => ({
      y: direction > 0 ? 50 : -50, 
      opacity: 0,
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)', 
    }),
    center: {
      y: 0,
      opacity: 1,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', 
      transition: {
        duration: 0.5,
        ease: [0.36, 0.66, 0.04, 1], 
      }
    },
    exit: (direction) => ({
      y: direction > 0 ? -50 : 50, 
      opacity: 0,
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      transition: {
        duration: 0.5,
        ease: [0.36, 0.66, 0.04, 1],
      }
    })
  };

  const directionRef = useRef(0);
  useEffect(() => {
  
    const prevIndex = directionRef.current;
    if (activeCardIndex > prevIndex) {
      directionRef.current = 1; 
    } else if (activeCardIndex < prevIndex) {
      directionRef.current = -1; 
    } else {
      directionRef.current = 0; 
    }
    directionRef.current = activeCardIndex;
  }, [activeCardIndex]);


  return (
    <div className="min-h-screen w-[80%] font-['Poppins']">
      <div
        ref={sectionRef}
        className="stack-area w-full h-screen flex max-[700px]:flex-col justify-center md:flex-row items-center md:justify-between relative md:flex"
      >
        {/* Left Side: Framer Motion for content transitions */}
        <div className="left h-screen left-side-text-cards flex-basis-1/2 top-0 flex items-center justify-center flex-col max-[700px]:left-[40px] max-[900px]:left-[320px] p-8 box-border relative">
          <AnimatePresence initial={false} mode='wait'>
            {cardsData[activeCardIndex] && (
              <motion.div
                key={cardsData[activeCardIndex].id} 
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={directionRef.current} 
                // className="card absolute max-[900px]:w-[250px] max-[900px]:h-[250px] w-[350px] h-[350px] rounded-[25px] p-8 box-border flex flex-col justify-evenly text-white"
                style={{
                  // backgroundColor: cardsData[activeCardIndex].bgColor,
                  top: 'calc(50% - 175px)',
                  left: 'calc(50% - 175px)',
                }}
              >
                <div className="title w-[220px] md:w-[340px] md:w-[420px] text-3xl md:text-5xl xl:text-8xl font-bold leading-[88px] ">
                  {cardsData[activeCardIndex].leftContent.title}
                </div>
                <div className="sub-title md:w-[420px] text-sm md:mt-8 text-gray-700">
                  {cardsData[activeCardIndex].leftContent.description}
                  <br />
                  <button className="mt-5 px-8 py-4 bg-black text-white rounded-full border-none outline-none cursor-pointer text-sm">
                    Explore All Benefits
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: GSAP for stacking card animation */}
        <div className="right right-side-cards h-screen flex-basis-1/2 top-0 flex items-center justify-center relative md:left-0 max-[700px]:top-[50px] max-[700px]:left-[150px] max-[900px]:left-[320px]">
          {cardsData.map((card, index) => (
            <div
              key={card.id}
              ref={addToCardsRefs}
              className="card absolute max-[900px]:w-[250px] max-[900px]:h-[250px] w-[350px] h-[350px] rounded-[25px] p-8 box-border flex flex-col justify-evenly text-white"
              style={{
                backgroundColor: card.bgColor,
                top: 'calc(50% - 175px)',
                left: 'calc(50% - 175px)',
              }}
            >
              <div className="sub text-xl font-bold">{card.icon}{card.title}</div>
              <div className="content text-4xl max-[900px]:text-lg max-[900px]:leading-[25px] font-bold leading-[44px]">{card.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackCardsSection;