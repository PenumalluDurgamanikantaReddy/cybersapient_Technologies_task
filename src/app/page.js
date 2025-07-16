"use client";

import { useState } from "react";
import HomeScreen from "./home/page";

import Rewards from './rewards/page'
import RewardsSection from './components/Rewards'

export default function Home() {

  return (
    <>
      


        <HomeScreen/>
        <Rewards/>
        {/* <Cards/> */}
<RewardsSection/>
   
    
    </>
  );
}
