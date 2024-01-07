"use client";
import { Search2Icon } from "@chakra-ui/icons";
import SearchIcon from "@mui/icons-material/Search";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

function SearchComp() {
  return (
    <div className=" bg-black text-white px-10 pt-3 w-full">
      <div className="flex flex-row w-full items-center gap-4 bg-gray-700 py-6 pl-3 rounded-lg">
        <SearchIcon className=" text-2xl md:text-4xl" />
        <input
          type="text"
          placeholder="What are you looking for?"
          className="w-full bg-transparent outline-none text-xl"
        />
      </div>
    </div>
  );
}

export default SearchComp;
