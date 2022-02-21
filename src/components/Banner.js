import axios from "axios";
import { useEffect, useState } from "react";
// import banner from "../assets/banner.jpg";

const Banner = () => {
  const [movieBanner, setMovieBanner] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=c1582ffcec67b20c7e454bdd6dc26d35&page=2"
      );
      console.table(res.data.results);
      setMovieBanner(res.data.results[2]);
    } catch (err) {
      console.log("APIError", err);
    }
  };

  return (
    <div
      className={`bg-[url(https://image.tmdb.org/t/p/original/${movieBanner?.backdrop_path})] h-[40vh] md:h-[60vh] bg-center bg-cover flex items-end justify-center`}
      //   justify-center -> horizontal center
    >
      <div className=" text-2xl  md:text-5xl text-white p-4 bg-gray-900 bg-opacity-50 w-full flex justify-center">
        Movies: Collection
      </div>
    </div>
  );
};

export default Banner;
