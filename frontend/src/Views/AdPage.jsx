import React, { useEffect, useState } from "react";
import "../Assets/css/AdCard.css";
import { Link, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import useMediaQuery from "../Hooks/useMediaQuery";
const AdPage = () => {
  const [ads, setAds] = useState([
    {
      id: 1,
      user: "Tatva Kamdar",
      Description: "This is my name bla bla bla some content",
      Price: "aukat ke bahar",
    },
    {
      id: 1,
      user: "Tatva Kamdar",
      Description: "This is my name bla bla bla some content",
      Price: "aukat ke bahar",
    },
    {
      id: 1,
      user: "Tatva Kamdar",
      Description: "This is my name bla bla bla some content",
      Price: "aukat ke bahar",
    },
    {
      id: 1,
      user: "Tatva Kamdar",
      Description: "This is my name bla bla bla some content",
      Price: "aukat ke bahar",
    },
    {
      id: 1,
      user: "Tatva Kamdar",
      Description: "This is my name bla bla bla some content",
      Price: "aukat ke bahar",
    },
    {
      id: 1,
      user: "Tatva Kamdar",
      Description: "This is my name bla bla bla some content",
      Price: "aukat ke bahar",
    },
    {
      id: 1,
      user: "Tatva Kamdar",
      Description: "This is my name bla bla bla some content",
      Price: "aukat ke bahar",
    },
  ]);
  const isAboveSmallScreens = useMediaQuery("(min-width: 1500px)");
  const filterByPriceRanges = () => {
    let min = document.getElementById("minPrice").value;
    let max = document.getElementById("maxPrice").value;

    console.log(min, max);
  };

  return (
    <div className="w-screen flex flex-col">
      <div className="flex flex-col px-16 py-10">
        <p className="text-3xl font-semibold font-playfair">
          FCDB Category Name
        </p>
        <p className="py-4 text-2xl font-playfair">
          Expore the Boundaries of art and technology with FCDB
        </p>
        <p className="font-semibold underline">Budget</p>
        <div className="flex gap-x-4 my-3">
          <input
            type="Number"
            id="minPrice"
            className="border-2 border-gray-500 px-4 w-[200px] rounded-md focus:outline-blue transition-all duration-300 ease-in-out"
            placeholder="Starting Range"
          />
          <input
            type="Number"
            id="maxPrice"
            className="border-2 border-gray-500 px-4 w-[200px] rounded-md focus:outline-blue transition-all duration-300 ease-in-out"
            placeholder="Max Range"
          />
          <input
            type="submit"
            className="border-2 border-black bg-gray-300 rounded-md px-2 py-1 cursor-pointer"
            onClick={filterByPriceRanges}
          />
        </div>
      </div>
      <div
        className={`w-screen grid ${
          isAboveSmallScreens ? "grid-cols-4" : "grid-cols-2 md:grid-cols-3"
        } justify-center mx-auto place-items-center gap-y-10`}
      >
        {ads.map(({ id, user, Description, price }) => (
          <Link
            to={"/categories/"}
            className="border-2 border-gray-500 rounded-lg shadow-lg shadow-gray-400 w-[350px]"
          >
            <img
              src="https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="gigimg"
              className=""
            />
            <div className="flex justify-start place-items-center px-2 my-2 py-2 font-semibold">
              <FaUserCircle size={22} className="mr-2" />
              <h2>Tatv Kamdar</h2>
            </div>
            <p className="px-1 py-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum.
            </p>
            <hr />
            <div className="flex justify-between place-items-center px-4">
              <SlLike size={22} />
              <div className="flex flex-col justify-end place-items-end">
                <p>Starting at</p>
                <p>99/-</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdPage;
