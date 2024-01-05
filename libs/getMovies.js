import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY_TMDB}`,
  },
};

export const fetchMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";

  const response = await axios(url, options);
  const movies = response.data.results;

  return movies;
};

export const fetchMovieVideo = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos,image`;

  const response = await axios(url, options);
  const movies = response.data;
  return movies;
};

export const fetchGenres = async (id) => {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";

  const response = await axios(url, options);
  const movies = response.data;
  return movies;
};

//function to fetch movies
export const fetchFilms = async (url) => {
  const response = await axios(url, options);
  const movies = response.data.results;
  return movies;
};
