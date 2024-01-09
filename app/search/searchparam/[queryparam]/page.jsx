import GenreCard from "@/components/GenreCard";
import SearchComp from "@/components/SearchComp";
import { fetchGenres } from "@/libs/getMovies";
import React from "react";

async function QueryGenrePage({ params }) {
  const genres = await fetchGenres();
  const genreId = params.queryparam;

  //getting the genre that matches the id extracted in the params
  const filteredGenre = genres.genres?.find(
    (genre) => genre.id === +genreId
  )?.name;

  return (
    <div className="mt-20">
      <SearchComp data={genres} filteredGenre={filteredGenre} />
      <GenreCard genreId={genreId} />
    </div>
  );
}

export default QueryGenrePage;
