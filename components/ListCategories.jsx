"use client";
import React, { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "./swipperstyles.css";
import { Button, useDisclosure } from "@chakra-ui/react";
import VideoModal from "./Modals/VideoModal";
import { fetchMovieVideo, fetchUpComingMovies } from "@/libs/getMovies";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";

import Link from "next/link";
import VideoModalHero from "./Modals/VideoModalHero";

function ListCategories({ data, category }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  // const { data, error, isLoading } = useQuery("movies", fetchUpComingMovies);

  const [videos, setVideos] = useState([]); // state to keep truck of movies fetched by ID

  // fetch movie video by its ID
  const getMovieVideos = async (id) => {
    const response = await fetchMovieVideo(id);
    setVideos(response);
    onOpen();
  };
  return (
    <div className="bg-black px-10">
      <div className="flex justify-between items-center">
        <h1 className="text-white font-selif text-3xl pb-2 pt-3">{category}</h1>
      </div>
      <Swiper
        navigation={true}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        breakpoints={{
          350: {
            slidesPerView: 2,
            spaceBetween: 2,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 2,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 3,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 5,
          },
        }}
      >
        {data ? (
          data.map((movie) => {
            const { backdrop_path, title, id, poster_path } = movie;
            if (backdrop_path) {
              return (
                <SwiperSlide key={id}>
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
                        <div className=" absolute bottom-3 left-32">
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
                </SwiperSlide>
              );
            }
          })
        ) : (
          <p className="text-white text-9xl">No movies found</p>
        )}

        <VideoModalHero
          movieVideos={videos}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Swiper>
    </div>
  );
}

export default ListCategories;
