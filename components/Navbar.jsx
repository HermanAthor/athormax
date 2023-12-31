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

export default function Navbar() {
  const [movieData, setMovieData] = useRecoilState(movieDataState); //handling movieData from handleSearch results
  const [showSearchComponent, setShowSearchComponent] =
    useRecoilState(searchComponentState); // state to determine if i can show the search component or not

  const [search] = useRecoilState(searchState); // search state provided by recoil
  const [select, setSelect] = useState("multi");
  const [openMenu, setOpenMenu] = useRecoilState(menuState); //open menubar

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
            {/* <SearchComp handleSearch={handleSearch} setSelect={setSelect} /> */}
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
          <img
            src="/hermandp.jpg"
            alt="herman"
            className=" h-7 w-7 md:h-12 md:w-12 object-cover border-2 border-blue-600 rounded-full"
          />
          <h6 className="hidden md:inline">Herman</h6>
        </div>
      </div>
      {/* <div>
        <div className="md:hidden flex justify-start flex-row items-center gap-3">
          <SearchComp handleSearch={handleSearch} setSelect={setSelect} />
        </div>
      </div> */}
      {openMenu && <LeftMenu />}
    </div>
  );
}

const SearchComp = ({ handleSearch, setSelect }) => {
  const [search, setSearch] = useRecoilState(searchState);

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="flex justify-start flex-row items-center">
          <div className="pr-5">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchOutlinedIcon />
              </InputLeftElement>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search Movies and TV Shows"
                border={"0"}
                outline={"none"}
                color={"whiteAlpha.800"}
              />
              <InputRightElement>
                <SelectComp setSelect={setSelect} />
              </InputRightElement>
            </InputGroup>
          </div>
          <IconButton type="submit">
            <SearchOutlinedIcon className=" text-2xl md:text-4xl" />
          </IconButton>
        </div>
      </form>
    </>
  );
};

const SelectComp = ({ setSelect }) => {
  return (
    <div>
      <Select
        onChange={(e) => setSelect(e.target.value)}
        color={"gray.900"}
        width={"100%"}
        outline={"none"}
        border={"0px"}
        focusBorderColor="transparent"
      >
        <option value="multi">All</option>
        <option value="movie">Movie</option>
        <option value="person">Person</option>
        <option value="tv">TV</option>
        <option value="collection">Collection</option>
        <option value="person">Keyword</option>
      </Select>
    </div>
  );
};
