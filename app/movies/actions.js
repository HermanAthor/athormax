"use server";

import { fetchFilms } from "@/libs/getMovies";

export async function fetchServerMovies(page) {
  const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page};`;
  const movies = fetchFilms(url);
  return movies;
}
