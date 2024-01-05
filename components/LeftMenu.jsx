"use client";
import { fetchGenres } from "@/libs/getMovies";
import { menuState } from "@/providers/state-providers/RecoilStateProviders/context/RecoilContextStore";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const menuData = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "TV", href: "/tv" },
  { name: "My Watch List", href: "#" },
];

function LeftMenu() {
  const [openMenu, setOpenMenu] = useRecoilState(menuState);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const getGenres = async () => {
      const data = await fetchGenres();
      setGenres(data.genres);
    };
    getGenres();
  }, []);

  const workingOnit = () => {
    setOpenMenu(false);
    alert(
      "Sorry, we are working on this please try again later to be able to manage your account"
    );
  };
  return (
    <div className="fixed top-6 left-0 md:w-fit w-full  text-black flex flex-col justify-between rounded-xl bg-slate-300 dark:bg-inherit h-screen overflow-auto pl-5 animate__animated animate__fadeInLeft">
      <div className="flex flex-col text-2xl">
        <div className="flex justify-between items-center text-black px-3 pt-2">
          <div></div>
          <IconButton onClick={() => setOpenMenu(false)}>
            <CloseIcon className="text-2xl md:text-4xl hover:text-red-400" />
          </IconButton>
        </div>
        <div className="pr-10 rounded pt-8">
          <Menu>
            <MenuButton
              fontSize={"3xl"}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              Genres
            </MenuButton>
            <MenuList fontSize={"3xl"}>
              {genres?.map((genre) => (
                <MenuItem key={genre.id} onClick={() => setOpenMenu(false)}>
                  <Link href={`/movies/genres/${genre.id}`}>{genre.name}</Link>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </div>
        <div className="flex gap-1 flex-col pr-10">
          {menuData?.map((genre) => (
            <Link
              href={genre.href}
              className=" cursor-auto hover:bg-slate-500 hover:rounded-3xl pl-5"
              value={genre.name}
              key={genre.id}
              onClick={() => setOpenMenu(false)}
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col pb-10 gap-7">
        <div
          className="flex flex-row items-center gap-3 "
          onClick={() => workingOnit()}
        >
          <img
            src="/hermandp.jpg"
            alt="herman"
            className=" h-5 w-5 md:h-12 md:w-12 object-cover border-2 border-blue-600 rounded-full"
          />
          <h6>Herman</h6>
        </div>
        <p>
          &copy;
          {`${new Date().getFullYear()} HAGmax. All rights reserved.`}
        </p>
      </div>
    </div>
  );
}

export default LeftMenu;
