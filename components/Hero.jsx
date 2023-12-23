"use client";
import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useQuery } from "react-query";
import { fetchMovieVideo, fetchMovies } from "@/libs/getMovies";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "./swipperstyles.css";
import VideoModalHero from "./Modals/VideoModalHero";
import { Box, Skeleton, Spinner, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import Loader from "./Loader";

function Hero() {
  // const [scrollBg, setScrollBg] = useState(false);                // Changing NavBar bg based on this state
  const [videos, setVideos] = useState({}); // Setting state for the video object returned from the getMovieVideos() --So it can be passed to the video modal
  const { isOpen, onClose, onOpen } = useDisclosure(); // VideoModalHero state from chakre ui

  const { data, error, isLoading } = useQuery("movies", fetchMovies);

  const getMovieVideos = async (id) => {
    const response = await fetchMovieVideo(id);
    setVideos(response);
    onOpen();

    return response;
  };

  if (isLoading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  console.log("Videos from the Hero section", videos);

  return (
    <div className="w-full h-screen relative overflow-clip ">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent  to-black"></div>
      {/* <Navbar /> */}
      {/* <Search /> */}
      <VideoModalHero isOpen={isOpen} onClose={onClose} movieVideos={videos} />
      <Swiper
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        className="w-full h-full"
      >
        {data.map((movie) => {
          const { overview, backdrop_path, title, id } = movie;
          return (
            <SwiperSlide key={id}>
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
                  <h5 className=" uppercase font-semibold text-xl pb-2">
                    {title}
                  </h5>
                  <div className="flex justify-center items-center mr-60 md:m-0">
                    <p className="pb-4 text-lg text-left mr-5">{overview}</p>
                  </div>

                  <div className="flex flex-row gap-3">
                    <button
                      onClick={() => getMovieVideos(id)}
                      className=" bg-gradient-to-r from-blue-600 to-blue-400 rounded-full p-3 border-none"
                    >
                      <PlayArrowIcon fontSize="large" />
                    </button>

                    <button className=" bg-gray-700 opacity-70 uppercase font-bold rounded-full py-0 px-10">
                      <Link href={`/${id}`}>More Info</Link>
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Hero;
