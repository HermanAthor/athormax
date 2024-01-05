import Genres from "@/components/Genres";
import React from "react";
import { fetchServerMovies } from "./actions";
import ExperimentalMovieCard from "@/components/ExperimentalMovieCard";

async function MoviesPage() {
  const movies = await fetchServerMovies(1);
  return (
    <div className="pt-20 text-black bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71]">
      <ExperimentalMovieCard filteredMovieData={movies} />
    </div>
  );
}

export default MoviesPage;
