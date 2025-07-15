'use client'  
  
  import { motion, useAnimation, useMotionValue,useScroll  } from "framer-motion"
import ProgressChart from "../common/components/ProgressBar";
import Image from "next/image";

  
  
  const RewardCard = function ({cardDetails}) {
    return (

      <motion.div 
  id="scroll-indicator"
      className={`flex flex-col relative gap-4 p-8  rounded-sm max-w-[350px] ${cardDetails?.gradient} `}>
        <div className=" flex  justify-between    ">
          <div className=" left-side flex flex-col gap-8">
            <p className=" font-semibold">{cardDetails?.task}</p>

            <div>
              <p className="font-medium">{cardDetails?.subtitle} </p>
              <p className=" font-bold text-5xl">{cardDetails?.percentage} </p>
              <p className=" font-normal">{cardDetails?.percentageTitle}</p>
              <p>
                {" "}
                <span className="font-medium ">{cardDetails?.perTask}</span> $22.54
              </p>
            </div>
          </div>
          <div className=" right-section">
            <Image
              width={50}
              height={50}
              alt="spark"
              src={cardDetails?.icon}
            />
          </div>
        </div>

        <div className=" w-full">
          <ProgressChart value={50} color={cardDetails?.buttonColor} />
          <div className=" flex gap-2">
            <p className=" font-semibold">Misson's Left:</p>
            <p>77/100</p>
          </div>
        </div>

        <div>
          <div className=" flex justify-between">
            <p>Reward Missions</p> <p>{cardDetails?.rewardsmissions}</p>
          </div>
          <div className=" flex justify-between">
            <p>Missions</p> <p>{cardDetails?.misssions}</p>
          </div>

          <div className={`flex justify-center px-2 py-2  font-semibold rounded-sm mt-2`}
          
          style={{backgroundColor:cardDetails?.buttonColor}}>
            <p>Complete Missions</p>
          </div>
        </div>
      </motion.div>
    );
  };

  export default RewardCard;