const Pagination = ({ page, goBack, goAhead }) => {
  return (
    <div className="w-full flex justify-center  py-4">
      <button
        className=" p-2 border-2 border-sky-500 border-r-0 text-indigo-900 font-medium rounded-l-xl"
        onClick={goBack}
      >
        Prev
      </button>
      <button className=" p-2 border-2 border-sky-500 text-indigo-900 font-medium bg-gray-300">
        <p>{page} </p>
      </button>
      <button
        className=" p-2 border-2 border-sky-500 border-l-0 text-indigo-900 font-medium rounded-r-xl"
        onClick={goAhead}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
