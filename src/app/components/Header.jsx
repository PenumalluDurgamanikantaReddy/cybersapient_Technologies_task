"use client";
import Link from "next/link";
import React, { FC, useState,useEffect } from "react";
import NavItems from "../utils/NavItems";
import { HiMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import Image from "next/image";
import { avatar } from "../assets";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import {fetchCurrentUser} from '../../lib/user-api'
import { useDispatch } from "react-redux";
import {getUserData}  from '../../lib/redux/userActions'
const Header = (props) => {

  const { activeItem, route, setRoute, open, setOpen } = props;  
  const dispatch = useDispatch()


  const getuserDetails=()=>{

     dispatch(getUserData('1'))
  }

  getuserDetails()
  const user = true;

  const [active, setActive] = useState(false);
  const [openSidear, setOpenSidebar] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setActive(window.scrollY > 85);
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  const handleClose = (e) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full h-full relative">
      <div
        className={` ${
          active
            ? " dark:bg-opacity-50 dark:bg-black fixed top-0 left-0 w-full h-[80] z-[80]   transition duration-500 "
            : "w-full    h-[80] "
        } `}
      >
        <div className="w-[95%] m-auto h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
           <Link  href='/profile'>
            <Image
                    src={user.avatar ? user.avatar?.url : avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="w-8 h-8 rounded-full"
                  />
</Link>
            <div className="flex items-center ">
              <NavItems activeItem={0} isMobile={false} />
              <ThemeSwitcher />
              {/* <HiMenuAlt3
                size={25}
                className="sm:hidden block cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenSidebar(true);
                }}
              /> */}

              {/* {user ? (
                <Link href={"/profile"}>
                  <Image
                    src={user.avatar ? user.avatar?.url : avatar}
                    alt=""
                    width={40}
                    height={40}
                    className="w-8 h-8 rounded-full"
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="sm:block hidden cursor-pointer"
                  onClick={() => setOpen(true)}
                />
              )} */}
            </div>
          </div>
        </div>
      </div>
      <div>
        {openSidear && (
          <div
            className="fixed w-full h-screen  top-0 left-0 z-[99999]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-3/5 px-4 flex flex-col gap-5 fixed z-[999999] text-white dark:text-white bg-gradient-to-tr from-slate-700 to-slate-900 dark:bg-indigo-500 dark:bg-opacity-30 h-screen top-0 right-0">
              <NavItems activeItem={0} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer"
                onClick={() => setOpen(true)}
              />
              <div className="absolute bottom-4">
                <p className="text-white dark:text-white">
                  CopyRight &copy; 2024 LMS
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
