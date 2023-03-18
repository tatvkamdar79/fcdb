import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const Searchbar = () => {
  const searchFunction = () => {
    return; 
  };
  return (
    <div className="flex justify-center rounded-md mx-auto max-w-[75%] relative">
      <BiSearchAlt
        size={30}
        className="absolute top-1.5 -translate-x-[31vw] z-20 transition-all cursor-pointer"
        onClick={searchFunction}
      />
      <input
        className="w-4/5 border-2 border-blue text-center py-2 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue focus:border-orange-400 focus:z-10 sm:text-sm transition duration-500"
        type="search"
        name="search"
        placeholder="Search Services"
      />
    </div>
  );
};

export default Searchbar;
