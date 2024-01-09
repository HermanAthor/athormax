import { fetchGenres } from "@/libs/getMovies";
import React from "react";

function SearchTerms({ searchTerms }) {
  return (
    <div className="bg-black text-white pt-3 w-full">
      <ul className="px-3 flex flex-row items-center overflow-x-auto gap-3 w-full no-scrollbar">
        {searchTerms.map((term) => (
          <li
            className="whitespace-nowrap border border-gray-600 rounded-full px-3 hover:border-2 hover:border-purple-600"
            key={term.id}
          >
            {term.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchTerms;
