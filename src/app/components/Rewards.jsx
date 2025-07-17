'use client'
import { motion, useAnimation, useTransform, useScroll } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import Image from "next/image";
import ProgressChart from "../common/components/ProgressBar"; // Assuming this path is correct
import RewardCard from './RewardCard' // Assuming this path is correct
import Lenis from "@studio-freight/lenis"; // Keep Lenis for smooth scrolling

const RewardsSection = () => {
    const sectionRef = useRef(null); 
    const rewardsContainerRef = useRef(null);
    const inView = useInView(sectionRef, { once: true }); 
    const controls = useAnimation();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'] 
    });
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  handleResize(); // Set initial value
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);    // Data for the cards (your existing data)
    const RewardsMissions = [
        {
            task: "Missions",
            subtitle: "Rewards",
            percentage: "+15.50%",
            percentageTitle: "Reward per Task",
            perTask: "500$",
            rewardsmissions: 44,
            misssions: 90,
            gradient: "bg-gradient-to-b from-[#2a2a6b] to-[#4c4cf0]",
            buttonColor: "#4c4cf0",
            icon: "https://cdn-icons-png.flaticon.com/512/6645/6645280.png"
        },
        {
            task: "Coins Earned",
            subtitle: "Coins",
            percentage: "+95.50%",
            percentageTitle: "Coins per Task",
            perTask: "500$",
            rewardsmissions: 43,
            misssions: 134,
            gradient: "bg-gradient-to-b from-[#8b2b2b] to-[#ec4c4c]",
            buttonColor: "#ec4c4c",
            icon: 'https://cdn-icons-png.flaticon.com/512/272/272525.png'
        },
        {
            task: "Points Earned",
            subtitle: "Points",
            percentage: "+25.52%",
            percentageTitle: "Points per Task",
            perTask: "50$",
            rewardsmissions: 52,
            misssions: 124,
            gradient: "bg-gradient-to-b from-[#2b8b2b] to-[#4cec4c]",
            buttonColor: "#4cec4c",
            icon: 'https://cdn-icons-png.flaticon.com/512/599/599416.png'
        },
    ];

    // desktop 

    const initialStackOffset = 20; // Visual offset for initial stack (e.g., in pixels or vw)
    const spreadDistance = 400; // How far each card spreads out horizontally in pixels (adjust as needed)

    const cardTransforms = RewardsMissions.map((_, index) => {
        const numCards = RewardsMissions.length;
       
        const animationStart = index * (0.15); 
        const animationEnd = animationStart + 0.4; 

     
        let initialX = (index - (numCards - 1) / 2) * initialStackOffset;
        let finalX = (index - (numCards - 1) / 2) * spreadDistance; 

        // Correctly apply the initial horizontal offset so all cards are visually distinct
        // but still appear 'stacked' before they fully spread.
        // The `x` property from `useTransform` will now handle the *full* translation.
        const x = useTransform(scrollYProgress,
            [0, animationStart, animationEnd],
            [initialX, initialX, finalX]
        );

        // Scale transform: Start slightly smaller, animate to 1
        const scale = useTransform(scrollYProgress,
            [0, animationStart, animationEnd],
            [0.9, 0.9, 1] // Start at 0.9, remain 0.9 until animationStart, then animate to 1
        );

        // Opacity transform: Fade in initially, then stay at 1
        const opacity = useTransform(scrollYProgress,
            [0, 0.1], // Fade in very early
            [0, 1]
        );

        return { x, scale, opacity };
    });



  // mobile
  
    const mobileX = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

    useEffect(() => {
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }, []);

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <div ref={sectionRef} className="w-full mx-auto min-[700px]:px-6 lg:px-6 relative h-[300vh]">
            <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden"> {/* Added overflow-hidden to prevent scrollbars during initial position */}
                <div className="w-full  flex flex-col justify-center items-center px-6 md:px-10 mb-10"> {/* Adjusted margin-bottom */}
                    <p className="text-left text-5xl font-semibold font-['Poppins'] ">Rewards</p>
                    <p className="text-left text-base mt-2 text-gray-600">
                        Earn exciting rewards and bonuses by completing tasks, collecting coins, and reaching milestones.
                    </p>
                </div>


{
  isMobile ?

<div className="sticky top-0 h-screen flex items-center overflow-hidden" ref={rewardsContainerRef}>
        <motion.div
          className="flex gap-10 px-4"
          style={{ x:mobileX }}
        >
          {RewardsMissions.map((cardDetails, index) => (
            
                                           <RewardCard cardDetails={cardDetails} key={cardDetails.task} />

          
          ))}
        </motion.div>
      </div>

  :

                <div
                    ref={rewardsContainerRef}
                    className="relative flex justify-center items-center w-full h-[400px]" // Fixed height for card container
                >
                    {RewardsMissions?.map((cardDetails, index) => {
                        const { x, scale, opacity } = cardTransforms[index];
                        return (
                            <motion.div
                                key={cardDetails?.task}
                                style={{
                                    position: 'absolute',
                                    // NO STATIC `translateX` here. Framer Motion's `x` handles everything.
                                    // Also remove `top: '50%', left: '50%', y: '-50%'` as the parent `rewardsContainerRef` is handling centering.
                                    x, // Directly apply the animated x from useTransform
                                    scale,
                                    opacity,
                                    zIndex: RewardsMissions.length - index, // Ensure correct stacking order
                                }}
                                initial={{ opacity: 0, scale: 0.8 }} // Initial state for cards
                                animate={controls}
                                variants={{
                                    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: index * 0.1 } },
                                }}
                                className="w-full max-w-[350px] md:max-w-[300px] lg:max-w-[380px] origin-center" // Ensure origin-center for scaling
                            >
                                <RewardCard cardDetails={cardDetails} />
                            </motion.div>
                        );
                    })}
                </div>}
            </div>
        </div>
    );
};

export default RewardsSection;