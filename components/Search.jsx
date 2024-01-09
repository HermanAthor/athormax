"use client";
import { fetchFilms, fetchMovieVideo } from "@/libs/getMovies";
import {
  movieDataState,
  searchComponentState,
  searchState,
} from "@/providers/state-providers/RecoilStateProviders/context/RecoilContextStore";
import { Button, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import VideoModalHero from "./Modals/VideoModalHero";
import Link from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";

function Search() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [movieData, setMovieData] = useRecoilState(movieDataState);
  const [videos, setVideos] = useState([]);
  const [showSearchComponent] = useRecoilState(searchComponentState);

  // fetch movie video by its ID
  const getMovieVideos = async (id) => {
    const response = await fetchMovieVideo(id);
    setVideos(response);
    onOpen();
  };
  // filter the movies
  const filteredMovieData = movieData.filter((movie) => movie.poster_path);

  return (
    <div>
      {showSearchComponent && (
        <div className={`mt-0 bg-black`}>
          <div className="flex justify-center items-center flex-col">
            <p className=" text-xl md:text-6xl text-white py-2 md:py-5">
              {`Your Search Results(${filteredMovieData.length})`}
            </p>
          </div>
          <div>
            {filteredMovieData.length === 0 ? (
              <div className="flex justify-center items-center flex-col pb-10">
                <Text fontSize={"4xl"}>
                  Sorry, Nothing to show for your search
                </Text>
                <Text fontSize={"2xl"} fontStyle={"italic"}>
                  Try adjusting your select options accordingly
                </Text>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-5 pt-5 gap-2">
                {filteredMovieData?.map((movie) => {
                  const { backdrop_path, title, id, poster_path } = movie;
                  if (poster_path) {
                    return (
                      <div className="relative group h-72 md:h-96 hover:border-4 hover:border-purple-800">
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
                            <div className=" absolute bottom-3 left-40">
                              <div className="flex flex-row gap-1">
                                <button
                                  //onClick={() => getMovieVideos(id)}
                                  type="button"
                                  className="text-white bg-blue-700 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                  <PlayArrowIcon fontSize="small" />
                                  <span className="sr-only">
                                    Icon description
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                  <AddIcon fontSize="small" />
                                  <span className="sr-only">
                                    Icon description
                                  </span>
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
          </div>

          <VideoModalHero
            movieVideos={videos}
            isOpen={isOpen}
            onClose={onClose}
          />
        </div>
      )}
    </div>
  );
}

export default Search;
