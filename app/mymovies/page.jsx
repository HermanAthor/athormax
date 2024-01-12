import MyMovies from "@/components/MyMovies";
import { fetchMyMovies } from "@/libs/getMovies";
import React from "react";

async function MyMoviesPage() {
  const data = await fetchMyMovies();
  return (
    <div className="pt-20 text-black bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71]">
      <MyMovies filteredMovieData={data?.results} />
    </div>
  );
}

export default MyMoviesPage;
