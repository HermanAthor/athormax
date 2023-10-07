"use client";
import React, { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import "./swipperstyles.css";
import { useDisclosure } from "@chakra-ui/react";
import VideoModal from "./Modals/VideoModal";
import { fetchMovieVideo, fetchUpComingMovies } from "@/libs/getMovies";
import { useQuery } from "react-query";

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
        <button>Show all</button>
      </div>
      <Swiper
        navigation={true}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        // spaceBetween={5}
        // slidesPerView={6}
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
        {data?.map((movie) => {
          const { backdrop_path, title, id } = movie;
          if (backdrop_path) {
            return (
              <SwiperSlide key={id} onClick={() => getMovieVideos(id)}>
                <div className="bg-transparent">
                  <div className="h-[400px] w-full bg-transparent">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
                      alt="friends"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h6>{title}</h6>
                </div>
              </SwiperSlide>
            );
          }
        })}
        <VideoModal
          movieVideo={videos}
          data={data}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Swiper>
    </div>
  );
}

export default ListCategories;