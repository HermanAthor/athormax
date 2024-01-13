import ExperimentalMovieCard from "@/components/ExperimentalMovieCard";
import Genres from "@/components/Genres";
import { fetchFilms } from "@/libs/getMovies";
import React from "react";

async function TvPage() {
  const url = "https://api.themoviedb.org/3/discover/tv";
  const movies = await fetchFilms(url);
  return (
    <div className="pt-20 text-black bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71]">
      <ExperimentalMovieCard
        filteredGenre={"Series"}
        filteredMovieData={movies}
      />
    </div>
  );
}

export default TvPage;
