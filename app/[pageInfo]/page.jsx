import { fetchFilms, fetchMovieVideo } from "@/libs/getMovies";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "next/link";
import ListCategories from "@/components/ListCategories";

async function MoviePage({ params }) {
  const { pageInfo } = params;
  const video = await fetchMovieVideo(pageInfo);
  // https://api.themoviedb.org/3/movie/{movie_id}/similar
  //

  const getSimilarMovies = async (pageInfo) => {
    const movieUrl = `https://api.themoviedb.org/3/movie/${pageInfo}/similar`;
    const results = await fetchFilms(movieUrl);
    return results;
  };

  const getRecommendedMovies = async (pageInfo) => {
    const movieUrl = `
https://api.themoviedb.org/3/movie/${pageInfo}/recommendations`;
    const results = await fetchFilms(movieUrl);
    return results;
  };

  const similarMovies = await getSimilarMovies(pageInfo);
  const recommendedMovies = await getRecommendedMovies(pageInfo);
  console.log(recommendedMovies);
  console.log(similarMovies);

  console.log(video);
  const {
    backdrop_path,
    genres,
    homepage,
    original_title,
    overview,
    title,
    runtime,
    tagline,
    videos,
  } = video;

  return (
    <div>
      <div className="mt-28 md:mt-20">
        <div className="w-full h-screen relative overflow-clip ">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent  to-black"></div>{" "}
          <img
            src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
            alt="friends"
            className=" object-fill md:object-cover h-auto w-full"
          />
          <div className="flex flex-col items-start justify-start w-[600px] absolute bottom-36 text-white text-lg left-10 z-40">
            <div className="w-96  mb-10 text-center -rotate-12">
              <h3 className="hidden md:flex bg-clip-text  stroke-4 stroke-transparent str bg-gradient-to-r from-red-500 via-yellow-500 to-blue-700 text-clip text-transparent text-5xl">
                {title}
              </h3>
            </div>
            <h5 className=" uppercase font-semibold text-xl pb-2">{title}</h5>
            <div className="flex justify-center items-center mr-60 md:m-0">
              <p className="pb-4 text-lg text-left mr-5">{overview}</p>
            </div>

            <div className="flex flex-row gap-3">
              <button className=" bg-gradient-to-r from-blue-600 to-blue-400 rounded-full p-3 border-none">
                <PlayArrowIcon fontSize="large" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ListCategories data={similarMovies} category={"Similar Movies"} />
      <ListCategories
        data={recommendedMovies}
        category={"Recommended Movies"}
      />
    </div>
  );
}

export default MoviePage;
