import ListCategories from "@/components/ListCategories";
import Search from "@/components/Search";
import SearchComp from "@/components/SearchComp";
import { fetchFilms } from "@/libs/getMovies";
import React from "react";

async function SearchPage() {
  const moviesUrl = "https://api.themoviedb.org/3/discover/movie";
  const seriesUrl = "https://api.themoviedb.org/3/discover/tv";
  const movies = await fetchFilms(moviesUrl);
  const series = await fetchFilms(seriesUrl);
  return (
    <div className="mt-20">
      <SearchComp />
      <Search />
      <ListCategories data={movies} category={"Trending Movies"} />
      <ListCategories data={series} category={"Trending Series"} />
    </div>
  );
}

export default SearchPage;
