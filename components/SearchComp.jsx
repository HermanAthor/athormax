"use client";
import { Search2Icon } from "@chakra-ui/icons";
import SearchIcon from "@mui/icons-material/Search";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import SearchTerms from "./SearchTerms";
import { fetchFilms } from "@/libs/getMovies";
import { animateScroll as scroll } from "react-scroll";
import {
  movieDataState,
  searchComponentState,
  searchState,
} from "@/providers/state-providers/RecoilStateProviders/context/RecoilContextStore";
import { useRecoilState } from "recoil";
import Search from "./Search";

function SearchComp({ data, filteredGenre }) {
  const [search, setSearch] = useRecoilState(searchState);
  const [movieData, setMovieData] = useRecoilState(movieDataState); //handling movieData from handleSearch results
  const [showSearchComponent, setShowSearchComponent] =
    useRecoilState(searchComponentState); // state to determine if i can show the search component or not

  const searchTerms = data?.genres;
  //defining scroll effect when search button is clicked

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  //func to handle searching of movies
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchUrl = `https://api.themoviedb.org/3/search/${"multi"}?query=${search}&include_adult=false&language=en-US&page=1`;

    try {
      if (search.length > 2) {
        const movies = await fetchFilms(searchUrl);
        setMovieData(movies);
        setShowSearchComponent(true);
        scrollToTop();
      }
    } catch (error) {
      console.error("Error occurred while fetching results", error);
    }
  };
  return (
    <div className=" bg-black text-white px-2 md:px-10 pt-3 w-full">
      <div className="flex flex-row w-full items-center gap-4 bg-gray-700 py-3 md:py-6 pl-3 rounded-lg">
        <SearchIcon className=" text-2xl md:text-4xl" />
        <form onSubmit={handleSearch}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder={
              filteredGenre ? filteredGenre : "What are you looking for?"
            }
            className="w-full bg-transparent outline-none text-lg md:text-xl"
          />
        </form>
      </div>
      <SearchTerms searchTerms={searchTerms} />
      <Search />
    </div>
  );
}

export default SearchComp;
