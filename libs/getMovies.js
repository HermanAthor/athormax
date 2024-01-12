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

export const fetchGenres = async () => {
  const url = "https://api.themoviedb.org/3/genre/movie/list?language=en";

  const response = await axios(url, options);
  const movies = response.data;
  return movies;
};

//function to fetch movies
export const fetchFilms = async (url) => {
  const response = await axios(url, options, {
    cache: "no-cache",
  });
  const movies = response.data.results;
  return movies;
};

export const fetchMyMovies = async () => {
  const url = "https://www.athormax.online/api/mylist";
  try {
    const response = await axios(url);
    const movies = response.data;
    return movies;
  } catch (error) {
    console.log("Error fetching data", error);
  }
};
