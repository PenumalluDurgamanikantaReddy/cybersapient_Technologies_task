
'use client'

import { useSelector } from 'react-redux'
import CircleProgress from '../CircleProgress'
import CircleProgressBar from '../../common/components/GamificationProgressBar'
import {Skeleton } from '../../common/components/Skelton' 
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";



const HeroSection=()=>{

const user = useSelector((state)=>{ return state.user.userData})
// console.log(user)
    return(
        // <div className=' relative w-full  flex flex-col justify-center items-center'>
         
        //  <div className="   h-[40vh] relative w-full bg-white text-black  rounded-b-[200px]">

        //     <div className=' flex flex-col justify-center items-center  absolute top-[70%] left-[10%]   '>
        //         <CircleProgress
        //          value={user?.percentage} color='#4ade80' size='200' icon={user?.avatar ? user?.avatar : null} alttext={'avatar'}/>
        //     </div>
        //  </div>
          
        //   <div className=" max-[700px]:mt-28 min-[700px]:mt-8  justify-center  md:w-[70%] md:items-center flex-col md:flex md:flex-row md:gap-2 gap-6  flex font-['Poppins']">
          

   
        //     <p className=' text-2xl min-[800px]:text-5xl md:mt-12 w-full'>{user?.name}</p>

        //       <div className=' flex flex-col  items-center  md:flex-row md:justify-between w-full'>
        //       <div className=' flex justify-center items-center'>
        //     <p className=' md:text-2xl'>Level {user?.level} / {user?.totalLevels}</p>
        //       </div>
        //     <CircleProgressBar currentXP={user?.level} totalXPForLevel={user?.totalLevels} />
        //       </div>



        //   </div>

        //     <div className=' flex max-[700px]:gap-1 gap-6 max:p-3  p-8 min-[700px]:mt-8  '>

        //     <div className='flex flex-col bg-white text-black rounded-md  justify-center items-center white  max-[700px]:p-3  p-8'>
        //         <p className=' font-semibold'>88</p>
        //         <p className='font-semibold'>Rewards</p>
        //     </div>
        //      <div className='flex flex-col bg-white text-black rounded-md  justify-center items-center white   max-[700px]:p-3  p-8'>
        //         <p className=' font-semibold'>88</p>
        //         <p className='font-semibold'>Rewards</p>
        //     </div>
        //      <div className='flex flex-col bg-white text-black rounded-md  justify-center items-center white  max-[700px]:p-3  p-8'>
        //         <p className=' font-semibold'>88</p>
        //         <p className='font-semibold'>Rewards</p>
        //     </div>

        //     </div>
            
        // </div>
        <div>
            <Skeleton className='h-[400px] w-[500px]'/>
        </div>
    )


}

export default HeroSection