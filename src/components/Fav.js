import { useEffect, useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Pagination from "./Pagination";

const Fav = () => {
  let genrides = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  const [currGenres, setCurrGenres] = useState("All Genres");
  const [fav, setFav] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);
  const [currPage, setCurrPage] = useState(1);

  // For localStorage/getting movies
  useEffect(() => {
    const favMovie = localStorage.getItem("imdb");
    const resFav = JSON.parse(favMovie) || [];
    setFav([...resFav]);
    console.log("setFav", setFav);
  }, []);

  // for genres get => to build those blue/gray buttons
  useEffect(() => {
    let temp = fav.map((movie) => genrides[movie.genre_ids[0]]);
    console.log("temp", temp);
    temp = new Set(temp);
    setGenres(["All Genres", ...temp]);
  }, [fav]);

  const remove = (movie) => {
    const newArray = fav.filter((m) => m.id !== movie.id);
    setFav([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray));
  };

  // Fiter function
  let filteredMovies = [];
  filteredMovies =
    currGenres === "All Genres"
      ? fav
      : fav.filter((movie) => genrides[movie.genre_ids[0]] === currGenres);

  // Sorting function
  if (rating === 1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average;
    });
  } else if (rating === -1) {
    filteredMovies = filteredMovies.sort((objA, objB) => {
      return objB.vote_average - objA.vote_average;
    });
  }

  if (popularity === 1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objA.popularity - objB.popularity;
    });
  } else if (popularity === -1) {
    filteredMovies = filteredMovies.sort((objA, objB) => {
      return objB.popularity - objA.popularity;
    });
  }

  // Searching function

  filteredMovies = filteredMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination

  const maxPage = Math.ceil(filteredMovies.length / rows);
  const startIdx = (currPage - 1) * rows;
  const endIdx = Number(startIdx) + Number(rows);
  filteredMovies = filteredMovies.slice(startIdx, endIdx);
  const goBack = () => {
    if (currPage > 1) setCurrPage(currPage - 1);
  };
  const goAhead = () => {
    if (currPage < maxPage) setCurrPage(currPage + 1);
  };

  return (
    <>
      <div className=" mt-4 px-2 flex justify-center flex-wrap space-x-3">
        {genres.map((genre) => (
          <button
            className={
              currGenres === genre
                ? `text-lg p-1 px-2  bg-blue-600 text-white rounded-xl font-bold`
                : `text-lg p-1 px-2 bg-gray-600 hover:bg-blue-600 text-white rounded-xl font-bold`
            }
            onClick={() => {
              setCurrPage(1);
              setCurrGenres(genre);
            }}
          >
            {genre}
          </button>
        ))}

        {/* <button
          className={
            currGenres === "Action"
              ? `text-lg p-1 px-2  bg-blue-600 text-white rounded-xl font-bold`
              : `text-lg p-1 px-2 bg-gray-600 hover:bg-blue-600 text-white rounded-xl font-bold`
          }
        >
          Action
        </button> */}
      </div>
      <div className="text-center">
        <input
          type="text"
          value={search}
          placeholder="Search"
          className="border-2 text-center p-1 m-2 caret-blue-500 md:caret-indigo-800"
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          value={rows}
          placeholder="Rows"
          className="border-2 text-center p-1 m-2 caret"
          onChange={(e) => setRows(e.target.value)}
        />
      </div>
      <div>
        <div className="flex flex-col m-4">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="flex">
                          <ArrowCircleUpIcon
                            className="m-2 cursor-pointer"
                            onClick={() => {
                              setPopularity(0);
                              setRating(-1);
                            }}
                          />

                          <p className="mt-2">Rating</p>

                          <ArrowCircleDownIcon
                            className="m-2 cursor-pointer"
                            onClick={() => {
                              setPopularity(0);
                              setRating(1);
                            }}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div className="flex">
                          <ArrowCircleUpIcon
                            className="m-2 cursor-pointer"
                            onClick={() => {
                              setRating(0);
                              setPopularity(-1);
                            }}
                          />

                          <p className="mt-2">Popularity</p>

                          <ArrowCircleDownIcon
                            className="m-2 cursor-pointer"
                            onClick={() => {
                              setRating(0);
                              setPopularity(1);
                            }}
                          />
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Genres
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredMovies.map((movie) => (
                      <tr key={movie.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                              <img
                                className="hidden md:block md:h-[100px] md:w-[180px]"
                                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 font-bold">
                                {movie.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {movie.vote_average}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {movie.popularity}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {genrides[movie.genre_ids[0]]}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => remove(movie)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div>Table container</div> */}
      <div>
        <Pagination page={currPage} goBack={goBack} goAhead={goAhead} />
      </div>
    </>
  );
};

export default Fav;
