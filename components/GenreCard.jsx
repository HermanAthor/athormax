import React from "react";
import Genres from "./Genres";
import { fetchFilms, fetchGenres } from "@/libs/getMovies";

async function GenreCard({ genreId }) {
  const genres = await fetchGenres();
  //fetching the movies
  const upcomingMovies = await fetchFilms(
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1"
  );
  const popularMovies = await fetchFilms(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=3"
  );
  const nowPlayingMovies = await fetchFilms(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=4"
  );
  //filtering the movies
  const filteredUpcomingMovies = upcomingMovies.filter((movie) =>
    movie.genre_ids.includes(+genreId)
  );
  const filteredPopularMovies = popularMovies.filter((movie) =>
    movie.genre_ids.includes(+genreId)
  );
  const filteredNowPlayingMovies = nowPlayingMovies.filter((movie) =>
    movie.genre_ids.includes(+genreId)
  );

  //getting the genre that matches the id extracted in the params
  const filteredGenre = genres.genres?.find(
    (genre) => genre.id === +genreId
  )?.name;

  return (
    <div className="pt-20 text-black bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71]">
      <Genres
        filteredGenre={`Upcoming ${filteredGenre}`}
        filteredMovieData={filteredUpcomingMovies}
      />
      <Genres
        filteredGenre={`Now Playing ${filteredGenre}`}
        filteredMovieData={filteredNowPlayingMovies}
      />
      <Genres
        filteredGenre={`Popular ${filteredGenre}`}
        filteredMovieData={filteredPopularMovies}
      />
    </div>
  );
}

export default GenreCard;
