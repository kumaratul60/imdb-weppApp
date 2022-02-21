import banner from "../assets/banner.jpg";
import axios from "axios";
import { useEffect, useState } from "react";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";
import Pagination from "./Pagination";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [hover, setHover] = useState("");
  const [favourite, setFavourite] = useState([]);

  const handelPrev = () => {
    if (pageNo > 1) {
      setPageNo((prev) => prev - 1);
    }
  };
  const handleNext = () => {
    setPageNo((next) => next + 1);
  };

  useEffect(() => {
    // Accessing localStorage
    // To save some thing in localstorage -> json.strigify
    //  To read some thing from localstorage -> json.parse

    let oldFav = localStorage.getItem("imdb");
    oldFav = JSON.parse(oldFav) || [];
    setFavourite([...oldFav]);
    console.log("oldFav", oldFav);

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=c1582ffcec67b20c7e454bdd6dc26d35&page=${pageNo}`
        );
        console.table(res.data.results);
        setMovies(res.data.results);
      } catch (err) {
        console.log("APIError", err);
      }
    };

    fetchData();
  }, [pageNo]);

  const add = (movie) => {
    let newArray = [...favourite, movie];
    setFavourite([...newArray]);
    console.log(newArray);

    // Store data in LocalStorage
    // used json.stringify here bcoz in this strorage store only string
    localStorage.setItem("imdb", JSON.stringify(newArray));
  };

  const remove = (movie) => {
    const newArray = favourite.filter((m) => m.id !== movie.id);
    setFavourite([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray));
  };
  return (
    <div className="mt-6 mb-2 text-center">
      <div className="mt-8 mb-8 text-2xl font-bold text-center ">
        Trending Movies
      </div>
      {movies.length === 0 ? (
        <div className="flex justify-center">
          <Oval
            color="#00BFFF"
            secondaryColor="green"
            areaLabel="loading"
            height={100}
            width={100}
          />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center">
          {movies.map((movie) => (
            <div
              className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] h-[25vh] w-[150px] md:h-[30vh] md:w-[200px] m-2 bg-center bg-cover rounded-xl flex items-end hover:scale-110 ease-out duration-300 hover:scale-110 ease-out duration-300 relative`}
              onMouseEnter={() => setHover(movie.id)}
              onMouseLeave={() => setHover("")}
            >
              {hover === movie.id && (
                <>
                  {!favourite.find((m) => m.id === movie.id) ? (
                    <div
                      className=" absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer"
                      onClick={() => add(movie)}
                    >
                      ❤️
                    </div>
                  ) : (
                    <div
                      className=" absolute top-2 right-2 p-2 bg-gray-800 rounded-xl text-xl cursor-pointer"
                      onClick={() => remove(movie)}
                    >
                      ❌
                    </div>
                  )}
                </>
              )}
              <p className="text-white text-center text-xl bg-gray-900  w-full rounded-b-xl ">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      )}
      <Pagination page={pageNo} goBack={handelPrev} goAhead={handleNext} />
    </div>
  );
};

export default Movies;
