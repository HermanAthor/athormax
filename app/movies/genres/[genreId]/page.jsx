import Genres from "@/components/Genres";

import { fetchFilms } from "@/libs/getMovies";
import React from "react";

async function GenrePage({ params }) {
  const genreId = params.genreId;
  console.log(genreId);
  const movies = await fetchFilms(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2"
  );
  const filteredMovieData = movies.filter((movie) =>
    movie.genre_ids.includes(+genreId)
  );
  return (
    <div className="pt-20 text-black">
      <Genres filteredMovieData={filteredMovieData} />
    </div>
  );
}

export default GenrePage;
