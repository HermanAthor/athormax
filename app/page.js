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
    {
      queryKey: "toprated",
      queryFn: () =>
        fetchFilms(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2"
        ),
    },
    {
      queryKey: "upcoming2",
      queryFn: () =>
        fetchFilms(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=3"
        ),
    },
    {
      queryKey: "nowPlaying2",
      queryFn: () =>
        fetchFilms(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=3"
        ),
    },
    {
      queryKey: "popular2",
      queryFn: () =>
        fetchFilms(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=3"
        ),
    },
    {
      queryKey: "toprated2",
      queryFn: () =>
        fetchFilms(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=3"
        ),
    },
  ];

  const queryResults = useQueries(queries);

  const upComingMovies = queryResults[0];
  const nowPlayingMovies = queryResults[1];
  const popularMovies = queryResults[2];
  const topRated = queryResults[3];
  const upComingMovies2 = queryResults[4];
  const nowPlayingMovies2 = queryResults[5];
  const popularMovies2 = queryResults[6];
  const topRated2 = queryResults[7];

  if (
    upComingMovies.isLoading ||
    nowPlayingMovies.isLoading ||
    popularMovies.isLoading ||
    topRated.isLoading ||
    upComingMovies2.isLoading ||
    nowPlayingMovies2.isLoading ||
    popularMovies2.isLoading ||
    topRated2.isLoading
  ) {
    return <Loader />;
  }

  if (
    upComingMovies.isError ||
    nowPlayingMovies.isError ||
    popularMovies.isError ||
    topRated.isError ||
    upComingMovies2.isError ||
    nowPlayingMovies2.isError ||
    popularMovies2.isError ||
    topRated2.isError
  ) {
    return <p className="mt-32">Error fetching data </p>;
  }

  return (
    <main className="flex flex-col " onClick={() => setOpenMenu(false)}>
      <Search />
      <Hero />
      {/* <Search /> */}
      <section className="bg-gradient-to-b from-black via-[#2f1163] to-[#0d0d71] pb-10">
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
        <ListCategories
          data={topRated.data}
          error={topRated.error}
          isLoading={topRated.isLoading}
          category={"Top Rated"}
        />
        <ListCategories
          data={upComingMovies2.data}
          error={upComingMovies2.isError}
          isLoading={upComingMovies2.isLoading}
          category={"Inspired by most watched"}
        />
        <ListCategories
          data={nowPlayingMovies2.data}
          error={nowPlayingMovies2.error}
          isLoading={nowPlayingMovies2.isLoading}
          category={"Popular in your area"}
        />
        <ListCategories
          data={popularMovies2.data}
          error={popularMovies2.error}
          isLoading={popularMovies2.isLoading}
          category={"Top pics for you"}
        />
        <ListCategories
          data={topRated2.data}
          error={topRated2.error}
          isLoading={topRated2.isLoading}
          category={"Most rated"}
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
