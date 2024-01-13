"use client";
import { fetchServerMovies } from "@/app/movies/actions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { v4 as uuidv4 } from "uuid";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import { fetchMovieVideo } from "@/libs/getMovies";
import { Spinner, useDisclosure } from "@chakra-ui/react";
import VideoModalHero from "./Modals/VideoModalHero";

function ExperimentalMovieCard({ filteredMovieData, filteredGenre }) {
  const [movies, setMovies] = useState(filteredMovieData);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [videos, setVideos] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  // function to load more movies
  const loadMoreMovies = async () => {
    //const next = page + 3;
    const films = await fetchServerMovies(page);
    if (films.length) {
      setPage((prev) => prev + 1);
      setMovies((prev) => [...(prev && prev.length ? prev : []), ...films]);
    }
  };
  // fetch movie video by its ID
  const getMovieVideos = async (id) => {
    const response = await fetchMovieVideo(id);
    setVideos(response);
    onOpen();
  };
  // callback for loadMoreMovies function

  useEffect(() => {
    if (inView) {
      loadMoreMovies();
    }
  }, [inView]);

  const moviesWithPosters = movies.filter((movie) => movie.poster_path);
  return (
    <div className="md:py-5 pt-12 md:pt-0 pl-2 ">
      <div>
        <p className="md:text-3xl pt-3 text-xl text-gray-200">
          {filteredGenre}
        </p>
      </div>
      {moviesWithPosters.length === 0 ? (
        <div className="text-gray-400 text-2xl italic pl-7 pt-3">
          Sorry, Nothing to show here
        </div>
      ) : (
        <div
          key={uuidv4()}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {moviesWithPosters?.map((movie) => {
            const { backdrop_path, title, id, poster_path } = movie;
            if (poster_path) {
              return (
                <div className="relative group h-72 md:h-96 hover:border-2 hover:border-purple-800">
                  <div className="h-full w-full bg-transparent">
                    <Link href={`/${id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                  </div>
                  <div className="overlay absolute top-0 left-0 w-fit h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500 ">
                    <div className="relative">
                      <div className=" absolute bottom-3 left-48">
                        <div className="flex flex-row gap-1">
                          <button
                            onClick={() => getMovieVideos(id)}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            <PlayArrowIcon fontSize="small" />
                            <span className="sr-only">Icon description</span>
                          </button>
                          <button
                            type="button"
                            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            <AddIcon fontSize="small" />
                            <span className="sr-only">Icon description</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
      <VideoModalHero movieVideos={videos} isOpen={isOpen} onClose={onClose} />
      <div ref={ref} className=" text-center h-40 w-full pt-10 ">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    </div>
  );
}

export default ExperimentalMovieCard;
