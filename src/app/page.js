"use client";

import { useState } from "react";
import HomeScreen from "./home/page";

import Offers from './rewards/page'
import RewardsSection from './components/Rewards'
import CardsSection from './components/CardsSection'
export default function Home() {

  return (
    <>
      


        <HomeScreen/>
        <Offers/>
      
<RewardsSection/>
   
    
    </>
  );
}
