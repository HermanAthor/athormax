"use client";
import { fetchFilms, fetchMovieVideo } from "@/libs/getMovies";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Link from "next/link";
import ListCategories from "@/components/ListCategories";
import VideoModalHero from "@/components/Modals/VideoModalHero";
import { useDisclosure } from "@chakra-ui/react";
import Search from "@/components/Search";

function MoviePage({ params }) {
  const [video, setVideo] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [movies, setMovies] = useState([]);

  const { pageInfo } = params;

  useEffect(() => {
    // fetching a single movie and all the needed details.
    async function fetchVideo() {
      try {
        const videoResponse = await fetchMovieVideo(pageInfo);
        if (videoResponse) {
          setVideo(videoResponse);
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    }
    // fetching similar movies by the movie id
    async function fetchSimilarMovies() {
      try {
        const movieUrl = `https://api.themoviedb.org/3/movie/${pageInfo}/similar`;
        const videosResponse = await fetchFilms(movieUrl);
        setSimilarMovies(videosResponse);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    }
    // fetching recommended movies by the movie Id
    async function fetchRecommendedMovies() {
      try {
        const movieUrl = `https://api.themoviedb.org/3/movie/${pageInfo}/recommendations`;
        const videosResponse = await fetchFilms(movieUrl);
        setRecommendedMovies(videosResponse);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    }
    fetchRecommendedMovies();
    fetchSimilarMovies();
    fetchVideo();
  }, [pageInfo]);
  // fetching the videos for the movies when a user clicks to watch the video
  const getMovieVideos = async (pageInfo) => {
    const response = await fetchMovieVideo(pageInfo);
    setMovies(response);
    onOpen();

    return response;
  };

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
      <div className=" mt-24 md:mt-20 ">
        <Search />
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
          </div>
          <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex ">
              <button
                onClick={() => getMovieVideos(pageInfo)}
                className=" bg-transparent text-blue-400 rounded-full p-3 border-2 border-blue-400"
              >
                <PlayArrowIcon fontSize="large" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <VideoModalHero isOpen={isOpen} onClose={onClose} movieVideos={movies} />
      <ListCategories data={similarMovies} category={"Similar Movies"} />
      <ListCategories
        data={recommendedMovies}
        category={"Recommended Movies"}
      />
    </div>
  );
}

export default MoviePage;
