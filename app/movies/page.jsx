import Genres from "@/components/Genres";
import React from "react";
import { fetchServerMovies } from "./actions";
import ExperimentalMovieCard from "@/components/ExperimentalMovieCard";
import { v4 as uuidv4 } from "uuid";

async function MoviesPage() {
  const movies = await fetchServerMovies(1);
  return (
    <div
      key={uuidv4()}
      className="pt-20 text-black bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71]"
    >
      <ExperimentalMovieCard
        filteredGenre={"Movies"}
        filteredMovieData={movies}
      />
    </div>
  );
}

export default MoviesPage;
