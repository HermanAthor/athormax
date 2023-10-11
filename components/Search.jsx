"use client";
import { fetchFilms, fetchMovieVideo } from "@/libs/getMovies";
import {
  movieDataState,
  searchState,
} from "@/providers/state-providers/RecoilStateProviders/context/searchContext";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import VideoModalHero from "./Modals/VideoModalHero";
import Link from "next/link";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function Search() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [movieData, setMovieData] = useRecoilState(movieDataState);
  const [videos, setVideos] = useState([]);

  // fetch movie video by its ID
  const getMovieVideos = async (id) => {
    const response = await fetchMovieVideo(id);
    setVideos(response);
    onOpen();
  };

  return (
    <div className="mt-[80px] pt-5 bg-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-5 bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71] space-x-4 space-y-4">
        {movieData?.map((movie) => {
          const { backdrop_path, title, id, poster_path } = movie;
          if (backdrop_path) {
            return (
              <div key={id} className="flex justify-between items-center">
                <div className="bg-transparent">
                  <div className="h-[400px] w-full bg-transparent relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                      alt={title}
                      className="h-full w-full object-cover"
                    />
                    <div className=" absolute bottom-3 left-3 flex flex-row gap-4">
                      <Button
                        onClick={() => getMovieVideos(id)}
                        variant={"solid"}
                        colorScheme="blue"
                      >
                        Play
                      </Button>
                      <Link href={`/${id}`}>
                        <Button rightIcon={<ArrowForwardIcon />}>More</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <VideoModalHero movieVideos={videos} isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default Search;
