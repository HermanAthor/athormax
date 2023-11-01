import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2IwYThhMDlkYzNlNjNiZDk0ZDY0ODE4ZTY4ZDI2MCIsInN1YiI6IjY1MTZhNDMzYTE5OWE2MDExYjIyMThlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yQqzQachWahYuD0tE1g1mase3QhoE4SyvFKc-xRhANE`,
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
/*
THIS WAS A FUNCTION THAT WAS USED TO FETCH UPCOMING MOVIES BEFORE I WROTE A REUSABLE ONE

export const fetchUpComingMovies = async () => {
  const url =
    "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2";

  const response = await axios(url, options);
  const movies = response.data.results;
  return movies;
};

*/

// https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1

//https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1

//Nowplaying
export const fetchFilms = async (url) => {
  const response = await axios(url, options);
  const movies = response.data.results;
  return movies;
};
