"use client";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

function Genres({ filteredMovieData }) {
  //   const filteredMovieData = [
  //     { title: "title", id: 1, poster_path: "/friends.jpg" },
  //     { title: "title2", poster_path: "hermandp.jpg", id: 2 },
  //   ];
  return (
    <div className="py-5 pt-5 pl-2  bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71]">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 py-5 pt-0 bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71]">
        {filteredMovieData?.map((movie) => {
          const { backdrop_path, title, id, poster_path } = movie;
          if (poster_path) {
            return (
              <div key={id} className="flex justify-between items-center">
                <div className="bg-transparent">
                  <div className="h-[400px]  w-full bg-transparent relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                      alt={title}
                      className="h-full w-[368px] object-cover"
                    />
                    <div className=" absolute bottom-3 left-3 flex flex-row gap-4">
                      {/* <Button
                        onClick={() => getMovieVideos(id)}
                        variant={"solid"}
                        colorScheme="blue"
                        className="bg-blue-500"
                      >
                        Play
                      </Button> */}
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
    </div>
  );
}

export default Genres;
