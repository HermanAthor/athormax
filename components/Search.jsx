"use client";
import { fetchFilms } from "@/libs/getMovies";
import {
  movieDataState,
  searchState,
} from "@/providers/state-providers/RecoilStateProviders/context/searchContext";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

function Search() {
  const [movieData, setMovieData] = useRecoilState(movieDataState);

  return (
    <div className="mt-[96px]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 px-14 bg-slate-700">
        {movieData?.map((movie) => {
          const { backdrop_path, title, id } = movie;
          if (backdrop_path) {
            return (
              <div key={id} className="flex justify-between items-center px-5">
                <div className="bg-transparent">
                  <div className="h-[400px] w-full bg-transparent">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                      alt="friends"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h6>{title}</h6>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default Search;
