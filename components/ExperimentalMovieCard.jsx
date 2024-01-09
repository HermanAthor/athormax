"use client";
import { fetchServerMovies } from "@/app/movies/actions";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Spinner } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { v4 as uuidv4 } from "uuid";

function ExperimentalMovieCard({ filteredMovieData, filteredGenre }) {
  const [movies, setMovies] = useState(filteredMovieData);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  // function to load more movies
  const loadMoreMovies = async () => {
    //const next = page + 3;
    const films = await fetchServerMovies(page);
    if (films.length) {
      setPage((prev) => prev + 1);
      setMovies((prev) => [...(prev && prev.length ? prev : []), ...films]);
    }
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 ">
          {moviesWithPosters?.map((movie) => {
            const { backdrop_path, title, id, poster_path } = movie;
            if (poster_path) {
              return (
                <div
                  key={id}
                  className="flex justify-between items-center pt-5"
                >
                  <div className="bg-transparent">
                    <div className="h-[400px]  w-full bg-transparent relative">
                      <Link href={`/${id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                          alt={title}
                          className="h-full w-[368px] object-cover"
                        />
                      </Link>
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
      )}
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
