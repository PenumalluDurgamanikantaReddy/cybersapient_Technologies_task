"use client";

import { useSelector } from "react-redux";
import CircleProgress from "../CircleProgress";
import CircleProgressBar from "../../common/components/GamificationProgressBar";
import Skeleton from "../../../components/ui/skeleton";
import { BiBorderRadius } from "react-icons/bi";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => {
    return state.user.userData || {};
  });
  const { theme ,systemTheme} = useTheme();
   const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
    const currentTheme = theme === 'system' ? systemTheme : theme;
const bgAndTextClasses = mounted
    ? currentTheme === 'light'
      ? 'bg-black text-white'
      : 'bg-white text-black'
    : 'bg-transparent text-transparent'; 
  return (
    <div className=" relative w-full  flex flex-col justify-center items-center">
      {/* <Skeleton className="h-[200px] w-[200px]  "  /> */}
      <div className={`h-[40vh] relative w-full ${bgAndTextClasses}  rounded-b-[200px]`}>
        <div className=" flex flex-col justify-center items-center  absolute top-[70%] left-[10%]   ">
          {isLoading ? (
            <div
            style={{
      
        position: 'relative',
        display: 'inline-block',
      }}>
        <div
        style={{
          position: 'relative',
          bottom: '2rem',
          left: '25%',
          // transform: 'translate(-50%, -50%)',
          fontSize: 20,
          fontWeight: 'bold',
        }}
      >
              <Skeleton
                className="h-[200px] w-[200px] rounded-[50px]"
                style={{ borderRadius: "50%" }}
              />
            </div>
             </div>
          ) : (
            <CircleProgress 
              value={user?.percentage}
              color="#4ade80"
              size="200"
              icon={user?.avatar ? user?.avatar : null}
              alttext={"avatar"}
            />
          )}
        </div>
      </div>
      {isLoading ? (
        <div className=" max-[700px]:mt-28 min-[700px]:mt-8  justify-center  md:w-[70%] md:items-center flex-col md:flex md:flex-row md:gap-2 gap-6  flex font-['Poppins']">
          <Skeleton className=" h-10 text-2xl min-[800px]:text-5 xl md:mt-22 w-full" />

          <div className=" flex flex-col  items-center gap-2  md:flex-row md:justify-between w-full">
            <div className=" flex justify-center items-center">
              <Skeleton className=" h-7 md:text-2xl w-[200px]" />
            </div>
            <Skeleton className="  h-7  w-[200px] md:w-[350px]" />
          </div>
        </div>
      ) : (
        <div className=" max-[700px]:mt-28 min-[700px]:mt-8  justify-center  md:w-[70%] md:items-center flex-col md:flex md:flex-row md:gap-2 gap-6  flex font-['Poppins']">
          <p className=" text-2xl min-[800px]:text-5xl md:mt-16 w-full">
            {user?.name}
          </p>

          <div className=" flex flex-col  items-center  md:flex-row md:justify-between w-full">
            <div className=" flex justify-center items-center">
              <p className=" md:text-2xl">
                Level {user?.level} / {user?.totalLevels}
              </p>
            </div>
            <CircleProgressBar
              currentXP={user?.level}
              totalXPForLevel={user?.totalLevels}
            />
          </div>
        </div>
      )}

      {isLoading ? (
        <div className=" flex max-[700px]:gap-1 gap-6 max:p-3  p-8 min-[700px]:mt-8  ">
          <Skeleton className=" w-[50px] h-[50px] max-[700px]:p-3  p-8" />
                    <Skeleton className=" w-[50px] h-[50px] max-[700px]:p-3  p-8" />

          <Skeleton className=" w-[50px] h-[50px] max-[700px]:p-3  p-8" />

        </div>
      ) : (
        <div className=" flex max-[700px]:gap-1 gap-6 max:p-3  p-8 min-[700px]:mt-8  ">
          {user?.earnings && Object.entries(JSON.parse(user?.earnings)).map((earing, idx) => {
            // console.log(earing);
            return (
              <div
                className={`flex flex-col ${bgAndTextClasses} rounded-md  justify-center items-center white  max-[700px]:w-[80px] max-[700px]:h-[60px]  h-[80px] w-[100px]`}
                key={idx}  
              >
                <p className=" font-semibold text-captilize">{earing[0]}</p>
                <p className="font-semibold">{earing[1]}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HeroSection;
