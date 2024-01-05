import Genres from "@/components/Genres";
import { fetchFilms } from "@/libs/getMovies";
import React from "react";

async function MoviesPage() {
  const url =
    "https://api.themoviedb.org/3/discover/movie?language=en-US&page=9";
  const movies = await fetchFilms(url);
  return (
    <div className="pt-20 text-black bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71]">
      <Genres filteredMovieData={movies} />
    </div>
  );
}

export default MoviesPage;
