import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const Searchbar = () => {
  return (
    <div className="rounded-md shadow-sm w-full mx-auto flex justify-center">
      <BiSearchAlt
        size={30}
        className="relative top-1.5 left-9 z-20 max-[450px]:left-0"
      />
      <input
        className="w-1/2 border-2 border-indigo-500 text-center py-2 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue focus:border-blue focus:z-10 sm:text-sm transition duration-500"
        type="search"
        name="search"
        placeholder="Search freelancers"
      />
    </div>
  );
};

export default Searchbar;
