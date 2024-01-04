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
        <div
          className={`mt-0 pt-32 md:pt-20 bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71]`}
        >
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-5 pt-5">
                {filteredMovieData?.map((movie) => {
                  const { backdrop_path, title, id, poster_path } = movie;
                  if (poster_path) {
                    return (
                      <div
                        key={id}
                        className="flex justify-between items-center"
                      >
                        <div className="bg-transparent">
                          <div className="h-[400px]  w-full bg-transparent relative">
                            <img
                              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                              alt={title}
                              className="h-full w-[368px] object-cover"
                            />
                            <div className=" absolute bottom-3 left-3 flex flex-row gap-4">
                              <Button
                                onClick={() => getMovieVideos(id)}
                                variant={"solid"}
                                colorScheme="blue"
                                className="bg-blue-500"
                              >
                                Play
                              </Button>
                              <Link href={`/${id}`}>
                                <Button
                                  className="bg-gray-400"
                                  rightIcon={<ArrowForwardIcon />}
                                >
                                  More
                                </Button>
                              </Link>
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
