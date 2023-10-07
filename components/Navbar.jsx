"use client";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRecoilState } from "recoil";
import {
  movieDataState,
  searchState,
} from "@/providers/state-providers/RecoilStateProviders/context/searchContext";
import { fetchFilms } from "@/libs/getMovies";

function Navbar() {
  const [movieData, setMovieData] = useRecoilState(movieDataState); //handling movieData from handleSearch results
  // search state provided by recoil
  const [scrollBg, setScrollBg] = useState(false); // State used to handle background color on the Navbar
  // function to determine the backgroud color of the Navbar

  const [search, setSearch] = useState("");

  const changBgColor = () => {
    if (window.scrollY >= 600) {
      setScrollBg(true);
    } else {
      setScrollBg(false);
    }
  };
  window.addEventListener("scroll", changBgColor);

  // function to handle the fetching of search data

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${search}&include_adult=false&language=en-US&page=1`;

    try {
      const data = await fetchFilms(searchUrl);
      console.log("Search Movies", data);
      setMovieData(data);
    } catch (error) {
      console.error("Error occurred while fetching results", error);
    }
  };

  const SearchComp = () => {
    return (
      <>
        <SearchOutlinedIcon className=" text-2xl md:text-4xl" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search Movies and TV Shows"
          className="text-black"
        />
        <button onClick={handleSearch}>Search</button>
      </>
    );
  };

  return (
    <div
      className={`flex flex-col justify-start items-start md:items-center fixed top-0 w-full ${
        scrollBg ? " bg-gray-900" : "bg-gray-700"
      } text-white px-5 md:px-10 py-5  z-50`}
    >
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-row items-center gap-4 md:gap-10">
          <SortIcon className="text-2xl md:text-4xl" />
          <div className=" hidden md:flex flex-row items-center gap-3">
            <SearchComp />
          </div>
        </div>
        <div className="h-12">
          <img
            src="/hagmax.svg"
            alt="hagmax"
            className="h-full w-28 md:w-28 lg:w-full object-contain"
          />
        </div>
        <div className="flex flex-row items-center gap-3 ">
          <img
            src="/hermandp.jpg"
            alt="herman"
            className=" h-7 w-7 md:h-12 md:w-12 object-cover border-2 border-blue-600 rounded-full"
          />
          <h6>Herman</h6>
        </div>
      </div>
      <div>
        <div className="md:hidden flex justify-start flex-row items-center gap-3">
          <SearchComp />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
