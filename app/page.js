"use client";
import Hero from "@/components/Hero";
import ListCategories from "@/components/ListCategories";
import Loader from "@/components/Loader";
import Search from "@/components/Search";
import { fetchFilms } from "@/libs/getMovies";
import { menuState } from "@/providers/state-providers/RecoilStateProviders/context/RecoilContextStore";
import { useQueries, useQuery } from "react-query";
import { useRecoilState } from "recoil";

export default function Home() {
  const [openMenu, setOpenMenu] = useRecoilState(menuState);

  const queries = [
    {
      queryKey: "upcoming",
      queryFn: () =>
        fetchFilms(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=2"
        ),
    },
    {
      queryKey: "nowPlaying",
      queryFn: () =>
        fetchFilms(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
        ),
    },
    {
      queryKey: "popular",
      queryFn: () =>
        fetchFilms(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2"
        ),
    },
  ];

  const queryResults = useQueries(queries);

  const upComingMovies = queryResults[0];
  const nowPlayingMovies = queryResults[1];
  const popularMovies = queryResults[2];

  if (
    upComingMovies.isLoading ||
    nowPlayingMovies.isLoading ||
    popularMovies.isLoading
  ) {
    return <Loader />;
  }

  if (
    upComingMovies.isError ||
    nowPlayingMovies.isError ||
    popularMovies.isError
  ) {
    return <p className="mt-32">Error fetching data </p>;
  }

  return (
    <main className="flex flex-col " onClick={() => setOpenMenu(false)}>
      <Search />
      <Hero />
      {/* <Search /> */}
      <section className="bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71]">
        <ListCategories
          data={upComingMovies.data}
          error={upComingMovies.isError}
          isLoading={upComingMovies.isLoading}
          category={"Continue watching"}
        />
        <ListCategories
          data={nowPlayingMovies.data}
          error={nowPlayingMovies.error}
          isLoading={nowPlayingMovies.isLoading}
          category={"Popular in Denmark"}
        />
        <ListCategories
          data={popularMovies.data}
          error={popularMovies.error}
          isLoading={popularMovies.isLoading}
          category={"Popular"}
        />
        {/*<ListCategories
          data={data}
          error={error}
          isLoading={isLoading}
          category={"Comedy/Goofy"}
        />
       {/* <ListCategories
          data={data}
          error={error}
          isLoading={isLoading}
          category={"For kids"}
        />
        <ListCategories
          data={data}
          error={error}
          isLoading={isLoading}
          category={"Fiction"}
        />
        <ListCategories
          data={data}
          error={error}
          isLoading={isLoading}
          category={"Love & Romance"}
        />
        <ListCategories
          data={data}
          error={error}
          isLoading={isLoading}
          category={"Action"}
        /> */}
      </section>
    </main>
  );
}
