import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import useMediaQuery from "../Hooks/useMediaQuery";
// import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams();
  // const [ads, setAds] = useState([]);
  const [ads, setAds] = useState([
    {
      id: 1,
      user: "Tatva Kamdar",
      description: "This is my name bla bla bla some content",
      price: 2000,
    },
    {
      id: 2,
      user: "Tatva Kamdar",
      description: "This is my name bla bla bla some content",
      price: 2000,
    },
    {
      id: 3,
      user: "Tatva Kamdar",
      description: "This is my name bla bla bla some content",
      price: 2000,
    },
    {
      id: 4,
      user: "Tatva Kamdar",
      description: "This is my name bla bla bla some content",
      price: 2000,
    },
    {
      id: 5,
      user: "Tatva Kamdar",
      description: "This is my name bla bla bla some content",
      price: 2000,
    },
    {
      id: 6,
      user: "Tatva Kamdar",
      description: "This is my name bla bla bla some content",
      price: 2000,
    },
    {
      id: 7,
      user: "Tatva Kamdar",
      description: "This is my name bla bla bla some content",
      price: 2000,
    },
  ]);

  // Styling Properties
  const isAboveSmallScreens = useMediaQuery("(min-width: 1730px)");

  // Filter Function
  const filterByPriceRanges = () => {
    let min = document.getElementById("minPrice").value;
    let max = document.getElementById("maxPrice").value;
    console.log(min, max);

    // Filter Logic
  };

  // useEffect(() => {
  //   async function getCategoryData() {
  //     const apiUrl = "";
  //     try {
  //       const data = await axios.get(apiUrl);
  //       return data;
  //     } catch (error) {
  //       console.log("error", error.response.status);
  //       return [];
  //     }
  //   }
  //   // getCategoryData();
  //   async function setLocalStrorageCache() {
  //     if (localStorage.categories === undefined) {
  //       localStorage.setItem("categories", JSON.stringify({}));
  //     }

  //     let categories = JSON.parse(localStorage.getItem("categories"));

  //     if (categories[categoryName] === undefined) {
  //       categories[categoryName] = ads; //await getCategoryData();
  //     }

  //     setAds(categories[categoryName]);

  //     localStorage.setItem("categories", JSON.stringify(categories));
  //   }

  //   setLocalStrorageCache();
  // }, []);

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
        <div className="flex flex-col sm:flex-row gap-y-1 sm:gap-y-0 gap-x-4 my-3">
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
            className="border-2 border-black bg-gray-300 rounded-md px-2 py-1 cursor-pointer w-[100px]"
            onClick={filterByPriceRanges}
          />
        </div>
      </div>
      <div
        className={`w-5/6 grid ${
          isAboveSmallScreens
            ? "grid-cols-4"
            : "grid-cols-1 xs:grid-cols-2 lg:grid-cols-3"
        } justify-center mx-auto place-items-center gap-y-10`}
      >
        {ads.map((ad) => (
          <Link
            key={ad.id}
            to={`/categories/${categoryName}/${ad.id}`}
            state={ad}
            className="shadow-md shadow-gray-400 w-[250px] sm:w-[300px] md:w-[350px] hover:scale-105 transition-all duration-500"
          >
            <img
              src="https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="gigimg"
              className=""
            />
            <div className="flex justify-start place-items-center px-2 my-2 py-2 font-semibold">
              <FaUserCircle size={22} className="mr-2" />
              <h2>{ad.user}</h2>
            </div>
            <p className="px-1 py-1">{ad.description}</p>
            <hr className="my-2" />
            <div className="flex justify-between place-items-center px-4 pb-1">
              <SlLike size={22} />
              <div className="flex flex-col justify-end place-items-end">
                <p>Starting at</p>
                <p>{ad.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
