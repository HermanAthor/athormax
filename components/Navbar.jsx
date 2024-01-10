"use client";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRecoilState } from "recoil";
import {
  menuState,
  movieDataState,
  searchComponentState,
  searchState,
} from "@/providers/state-providers/RecoilStateProviders/context/RecoilContextStore";
import { fetchFilms } from "@/libs/getMovies";
import { animateScroll as scroll } from "react-scroll";
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import Menu from "./LeftMenu";
import LeftMenu from "./LeftMenu";
import Link from "next/link";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/libs/firebase-config";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [movieData, setMovieData] = useRecoilState(movieDataState); //handling movieData from handleSearch results
  const [showSearchComponent, setShowSearchComponent] =
    useRecoilState(searchComponentState); // state to determine if i can show the search component or not

  const [search] = useRecoilState(searchState); // search state provided by recoil
  const [select, setSelect] = useState("multi");
  const [openMenu, setOpenMenu] = useRecoilState(menuState); //open menubar
  const [activeUser, setActiveUser] = useState({});
  const router = useRouter();
  const dummyUser = {};

  //getting logged in user
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user.uid);
      setActiveUser(user);
    }
  });
  const logOut = async () => {
    await signOut(auth);
    router.refresh();
  };

  const profileDisplay = activeUser.displayName
    ? activeUser?.displayName
    : activeUser?.email;
  console.log(profileDisplay);

  const displayImage = "/dummy-profile.jpg";

  //defining scroll effect when search button is clicked
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchUrl = `https://api.themoviedb.org/3/search/${select}?query=${search}&include_adult=false&language=en-US&page=1`;

    try {
      if (search.length > 2) {
        const data = await fetchFilms(searchUrl);
        setMovieData(data);
        setShowSearchComponent(true);
        scrollToTop();
      }
    } catch (error) {
      console.error("Error occurred while fetching results", error);
    }
  };

  return (
    <div
      className={`flex flex-col justify-start items-start md:items-center fixed top-0 w-full bg-gray-900 text-white px-5 md:px-10 py-5  z-50 `}
    >
      <div className="flex justify-between w-full items-center relative">
        <div className="flex flex-row items-center gap-4 md:gap-10 text-white">
          <IconButton onClick={() => setOpenMenu(true)}>
            <MenuIcon className="text-2xl md:text-4xl text-white" />
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
              className="h-full w-28 md:w-28 lg:w-full object-contain"
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
              className=" h-7 w-7 md:h-12 md:w-12 object-cover rounded-full"
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
