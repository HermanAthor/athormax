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
    <div className="bg-black">
      <div className="flex justify-between items-center px-5">
        <h1 className="text-white font-selif text-3xl pl-4 pb-2">{category}</h1>
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
                  <div className="bg-transparent relative">
                    <div className="h-[400px] w-full bg-transparent">
                      <Link href={`/${id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                          alt={title}
                          className="h-full w-full object-cover"
                        />
                      </Link>
                    </div>
                    <div className="absolute bottom-2 left-3 flex flex-row gap-4">
                      <Button
                        onClick={() => getMovieVideos(id)}
                        variant={"solid"}
                        colorScheme="blue"
                        bgColor={"blue"}
                        className="bg-blue-500"
                      >
                        Play
                      </Button>
                      <Link href={`/${id}`}>
                        <Button
                          bgColor={"gray.200"}
                          rightIcon={<ArrowForwardIcon />}
                          className="bg-gray-400"
                        >
                          More
                        </Button>
                      </Link>
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
