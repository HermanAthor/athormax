"use client";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRecoilState } from "recoil";
import { menuState } from "@/providers/state-providers/RecoilStateProviders/context/RecoilContextStore";

import { IconButton } from "@chakra-ui/react";
import LeftMenu from "./LeftMenu";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/libs/firebase-config";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useRecoilState(menuState); //open menubar
  const [activeUser, setActiveUser] = useState({});
  const router = useRouter();

  //getting logged in user
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setActiveUser(user);
    }
  });
  const logOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  const profileDisplay = activeUser?.displayName
    ? activeUser?.displayName
    : activeUser?.email;
  console.log(profileDisplay);

  const displayImage = "/dummy-profile.jpg";

  return (
    <div
      className={`flex flex-col justify-start items-start md:items-center fixed top-0 w-full bg-gray-900 text-white px-5 md:px-10 py-5  z-50 `}
    >
      <div className="flex justify-between w-full items-center relative">
        <div className="flex flex-row items-center gap-4 md:gap-10 text-white">
          <IconButton onClick={() => setOpenMenu(true)}>
            <MenuIcon className="text-xl md:text-2xl text-white" />
          </IconButton>
          <div className=" hidden md:flex flex-row items-center gap-3">
            <div>Movies</div>
            <div>Series</div>
          </div>
        </div>
        <div className="h-12">
          <Link href={"/"}>
            <img
              src="/hagmax.png"
              alt="hagmax"
              className="h-full w-16 md:w-20 lg:w-full object-contain"
            />
          </Link>
        </div>
        <div className="flex flex-row items-center gap-3 ">
          <Link href={"/search"}>
            <SearchOutlinedIcon className=" text-2xl md:text-4xl text-black" />
          </Link>
          <div
            className="border-4 rounded-full border-purple-600"
            onClick={logOut}
          >
            <img
              src={activeUser?.photoURL ? activeUser?.photoURL : displayImage}
              alt="herman"
              className=" h-7 w-7 md:h-10 md:w-10 object-cover rounded-full"
            />
          </div>
          <div className="hidden md:inline">
            {profileDisplay === undefined || profileDisplay === null ? (
              <div>
                <Link href={"/register/signin"}>Sign in</Link>
              </div>
            ) : (
              <div>{profileDisplay}</div>
            )}
          </div>
        </div>
      </div>
      {openMenu && <LeftMenu />}
    </div>
  );
}
