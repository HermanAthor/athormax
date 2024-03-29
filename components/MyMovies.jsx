"use client";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RemoveIcon from "@mui/icons-material/Remove";
import VideoModalHero from "./Modals/VideoModalHero";
import { fetchMovieVideo } from "@/libs/getMovies";
import axios from "axios";
import useCurrentUser from "@/libs/getCurrentUser";
import { toast } from "react-toastify";

function MyMovies() {
  const [movies, setMovies] = useState([]);
  const { user } = useCurrentUser();

  const filteredMovieData = movies?.filter((item) => {
    if (item.userId === user?.uid) {
      return item;
    }
  });
  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get("/api/mylist");
        if (res) {
          const data = res.data;
          setMovies(data?.results);
        } else {
          console.log("Failed to get data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [filteredMovieData]);

  console.log();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [videos, setVideos] = useState([]); // state to keep truck of movies fetched by ID

  // fetch movie video by its ID
  const getMovieVideos = async (id) => {
    const response = await fetchMovieVideo(id);
    setVideos(response);
    onOpen();
  };
  //Deleting movie from watch list
  const notify = () => toast(`Movie has been removed from your watch list`);
  const userId = user?.uid;
  const removeMovieFromWatchList = async (id) => {
    if (userId) {
      try {
        const response = await axios.delete("/api/mylist", { data: { id } });
        notify();
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    } else {
      alert("You need to be logged in to delete movies from your watch list");
    }
  };

  return (
    <div className="md:py-5 pt-12 md:pt-0 pl-2 ">
      <div>
        <p className="md:text-3xl pt-3 text-xl text-gray-200">{"My movies"}</p>
      </div>
      {filteredMovieData.length === 0 ? (
        <div
          className={`${
            filteredMovieData.length === 0 ? "h-screen" : "h-full"
          } text-gray-400 text-2xl text-center italic pl-7 pt-3 md:pt-10`}
        >
          Sorry, Nothing to show here consider adding movies to your list
          <span className="text-blue-400 px-5 hover:underline">
            <Link href={"/search"}>Browse movies</Link>
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredMovieData?.map((movie) => {
            const { backdrop_path, title, id, poster_path } = movie.movie;
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
                            onClick={() => removeMovieFromWatchList(movie?._id)}
                            type="button"
                            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            <RemoveIcon fontSize="small" />
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
    </div>
  );
}

export default MyMovies;
