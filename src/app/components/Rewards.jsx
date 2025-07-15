'use client'
import { motion, useAnimation, useMotionValue,useScroll  } from "framer-motion"
import { useEffect, useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image";
import ProgressChart from "../common/components/ProgressBar";
import RewardCard from './RewardCard'
import Lenis from "@studio-freight/lenis";
const RewardsSection = () => {

 const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const controls = useAnimation()



    const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })



  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

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
      buttonColor:"#4c4cf0",
      icon:"https://cdn-icons-png.flaticon.com/512/6645/6645280.png"
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
            buttonColor:"#ec4c4c",
            icon:'https://cdn-icons-png.flaticon.com/512/272/272525.png'

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
            buttonColor:"#4cec4c",
            icon:'https://cdn-icons-png.flaticon.com/512/599/599416.png'

    },
  ];



//   const Card = function ({cardDetails}) {
//     return (

//       <motion.div 
//   id="scroll-indicator"
//       className={`flex flex-col relative gap-4 p-8  rounded-sm max-w-[350px] ${cardDetails?.gradient} `}>
//         <div className=" flex  justify-between    ">
//           <div className=" left-side flex flex-col gap-8">
//             <p className=" font-semibold">{cardDetails?.task}</p>

//             <div>
//               <p className="font-medium">{cardDetails?.subtitle} </p>
//               <p className=" font-bold text-5xl">{cardDetails?.percentage} </p>
//               <p className=" font-normal">{cardDetails?.percentageTitle}</p>
//               <p>
//                 {" "}
//                 <span className="font-medium ">{cardDetails?.perTask}</span> $22.54
//               </p>
//             </div>
//           </div>
//           <div className=" right-section">
//             <Image
//               width={50}
//               height={50}
//               alt="spark"
//               src={cardDetails?.icon}
//             />
//           </div>
//         </div>

//         <div className=" w-full">
//           <ProgressChart value={50} color={cardDetails?.buttonColor} />
//           <div className=" flex gap-2">
//             <p className=" font-semibold">Misson's Left:</p>
//             <p>77/100</p>
//           </div>
//         </div>

//         <div>
//           <div className=" flex justify-between">
//             <p>Reward Missions</p> <p>{cardDetails?.rewardsmissions}</p>
//           </div>
//           <div className=" flex justify-between">
//             <p>Missions</p> <p>{cardDetails?.misssions}</p>
//           </div>

//           <div className={`flex justify-center px-2 py-2  font-semibold rounded-sm mt-2`}
          
//           style={{backgroundColor:cardDetails?.buttonColor}}>
//             <p>Complete Missions</p>
//           </div>
//         </div>
//       </motion.div>
//     );
//   };




  return(
     <div ref={container}>

       <div>
        <p className=" text-left  px-10  text-5xl font-semibold">Rewards</p>
        <p className="text-left px-10 text-base text-gray-300 mt-2">
    Earn exciting rewards and bonuses by completing tasks, collecting coins, and reaching milestones.
  </p>
    </div>

<div className="flex flex-col gap-6 items-center md:flex-row md:justify-around lg:justify-around px-6 py-8">
     
        {
          RewardsMissions?.map((cardDetails)=>{

            return<RewardCard cardDetails={cardDetails}
           
                key={cardDetails?.task}/>
          })  
        }
    </div>
  </div>)
};

export default RewardsSection;
