import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import useMediaQuery from "../Hooks/useMediaQuery";
import { getCookie } from "../Hooks/useCookies";
import axios from "axios";
import LoadingCard from "../Components/LoadingCard";
// import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams();
  console.log(categoryName);
  const categories = [
    "graphics-and-design",
    "video-and-animation",
    "writing-and-translation",
    "ai-services",
    "digital-marketing",
    "music-and-audio",
    "programming-and-tech",
    "business",
  ];
  const navigate = useNavigate();
  // const [ads, setAds] = useState([]);
  // {
  //   id: "6421749b53a93676f3f21689",
  //   user: "Tatva Kamdar",
  //   title: "Title: Full Stack App",
  //   aboutAd: "About the Ad: I will make a full stack application for you",
  //   price: 2000,
  //   link: "https://source.unsplash.com/random/1200x900",
  // },
  // {
  //   id: 2,
  //   user: "Tatva Kamdar",
  //   title: "Title: Full Stack App",
  //   aboutAd: "About the Ad: I will make a full stack application for you",
  //   price: 2000,
  //   link: "https://source.unsplash.com/random/400x300",
  // },
  // {
  //   id: 3,
  //   user: "Tatva Kamdar",
  //   title: "Title: Full Stack App",
  //   aboutAd: "About the Ad: I will make a full stack application for you",
  //   price: 2000,
  //   link: "https://source.unsplash.com/random/400x300",
  // },
  // {
  //   id: 4,
  //   user: "Tatva Kamdar",
  //   title: "Title: Full Stack App",
  //   aboutAd: "About the Ad: I will make a full stack application for you",
  //   price: 2000,
  //   link: "https://source.unsplash.com/random/400x300",
  // },
  // {
  //   id: 5,
  //   user: "Tatva Kamdar",
  //   title: "Title: Full Stack App",
  //   aboutAd: "About the Ad: I will make a full stack application for you",
  //   price: 2000,
  //   link: "https://source.unsplash.com/random/400x300",
  // },
  // {
  //   id: 6,
  //   user: "Tatva Kamdar",
  //   title: "Title: Full Stack App",
  //   aboutAd: "About the Ad: I will make a full stack application for you",
  //   price: 2000,
  //   link: "https://source.unsplash.com/random/400x300",
  // },
  // {
  //   id: 7,
  //   user: "Tatva Kamdar",
  //   title: "Title: Full Stack App",
  //   aboutAd: "About the Ad: I will make a full stack application for you",
  //   price: 2000,
  //   link: "https://source.unsplash.com/random/400x300",
  // },
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Styling Properties
  const isAboveSmallScreens = useMediaQuery("(min-width: 1730px)");

  // Filter Function
  const filterByPriceRanges = () => {
    let min = document.getElementById("minPrice").value;
    let max = document.getElementById("maxPrice").value;
    console.log(min, max);

    // Filter Logic
  };

  useEffect(() => {
    async function getAdsByCategory() {
      const apiUrl = `http://localhost:8080/api/ads/category/${categoryName}`;
      const headers = {
        authentication: `Bearer ${getCookie("JWT_AUTH")}`,
      };
      try {
        const response = await axios.get(apiUrl, { headers });
        console.log(response.data.data);
        setAds(response.data.data);
        setLoading(false);
        console.log(response.data.data[1]?._id);
        return response.data.data;
      } catch (error) {
        console.log("error", error);
        // alert(error.message);
        return [];
      }
    }
    getAdsByCategory();
    // async function setLocalStrorageCache() {
    //   if (localStorage.categories === undefined) {
    //     localStorage.setItem("categories", JSON.stringify({}));
    //   }

    //   let categories = JSON.parse(localStorage.getItem("categories"));

    //   if (categories[categoryName] === undefined) {
    //     categories[categoryName] = ads; //await getCategoryData();
    //   }

    //   setAds(categories[categoryName]);

    //   localStorage.setItem("categories", JSON.stringify(categories));
    // }

    // setLocalStrorageCache();
  }, []);

  useEffect(() => {
    // API to get all ads in the current category
    if (!categories.includes(categoryName)) {
      navigate("/home");
      // To send Params -> [categoryname]
    }
  }, [categoryName]);
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
        className={`w-full xs:w-5/6 grid ${
          isAboveSmallScreens
            ? "grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
        } justify-center mx-auto place-items-center gap-y-10 gap-x-2`}
      >
        {loading && (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        )}
        {ads.map((ad) => (
          <Link
            // key={ad._id}
            key={ad._id}
            to={`/categories/${categoryName}/${ad._id}`}
            state={{ ...ad }}
            className="shadow-md shadow-gray-400 max-w-[300px] sm:max-w-[400px] md:w-[350px] hover:scale-105 transition-all duration-500"
          >
            <img
              // src="https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=1600"
              src={"http://localhost:8080/" + ad?.coverPicPath}
              alt="gigimg"
              className="h-[150px] border border-gray-400"
            />
            <div className="flex justify-start place-items-center px-2 py-1 font-semibold">
              <FaUserCircle size={22} className="mr-2" />
              <h2>{ad?.freelancer?.name}</h2>
            </div>
            <p className="px-2 text-lg h-16 flex place-items-start text-justify mx-auto text-gray-900">
              {ad.title}
            </p>
            <p className="flex place-items-center text-sm px-2 py-1 h-10 font-serif text-gray-600">
              {ad.shortDescription}
            </p>
            <div className="flex justify-between place-items-center px-4 py-1">
              <BsBookmark size={22} className="fill-gray-800" />
              {/* <BsFillBookmarkFill size={22} className="fill-green-500" /> */}
              <div className="flex flex-col place-items-end ">
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
