import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="pl-20 flex space-x-8  border-b-4 border-indigo-500  items-center py-4 bg-[#171F3E] ">
      {/*py-4 -> some space at the logo (bottom & top space )  */}
      <Link to="/">
        <img
          className="w-10 "
          src="https://winaero.com/blog/wp-content/uploads/2019/09/Movies-and-TV-icon.png"
          alt="logo"
        />
      </Link>

      <Link
        to="/movies"
        className=" text-xl md:text-2xl text-blue-300 font-bold"
      >
        Movies
      </Link>
      <Link
        to="favourite"
        className={`text-xl md: text-2xl text-blue-300 font-bold`}
      >
        Favourite
      </Link>
    </div>
  );
};

export default Navbar;
