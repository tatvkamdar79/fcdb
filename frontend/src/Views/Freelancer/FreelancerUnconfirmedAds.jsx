import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BsBookmark, BsCardImage } from "react-icons/bs";
import { FaClock, FaUserCircle } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { getCookie } from "../../Hooks/useCookies";

const FreelancerUnconfirmedAds = () => {
  const { user, setUser } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user.user);
  const [ads, setAds] = useState(["loading"]);
  const [filterArray, setFilterArray] = useState(["All"]);
  const navigate = useNavigate();
  console.log("Current User Ads ", ads);

  const deleteAd = async (ad) => {
    if (
      window.confirm(
        "Are you sure you want to delete this Ad!\nThis Process is irreversible"
      ) === false
    ) {
      return;
    }
    const response = await axios.post(
      `http://localhost:8080/api/ads/delete/${ad._id}`,
      {},
      { headers: { Authorization: `Bearer ${getCookie("JWT_AUTH")}` } }
    );
    console.log(response);
    if (response.status === 200) {
      await getUserDetails();
      alert("Ad Deleted Successfully! Redirecting to Home");
      navigate("/home");
    }
    // } catch (err) {
    //   console.log(err);
    //   let errorMessage = err.response.data.message;
    //   alert(errorMessage);
    // }
  };

  async function getUnconfirmedAds() {
    let jwt = getCookie("JWT_AUTH");
    if (jwt.length === 0) {
      return;
    }

    const headers = {
      authorization: `Bearer ${jwt}`,
    };
    const response = await axios.get(
      "http://localhost:8080/api/ads/unconfirmedAds",
      {
        headers,
      }
    );
    const fetchedData = response.data.data;
    // fetchedData["loggedIn"] = true;
    // setUser(fetchedData);
    // console.log("fetched After Ad Updation", fetchedData);
    // setCurrentUser(user.user);
    // console.log(response.data);
    console.log(response.data.data);
    setAds(fetchedData);
    return;
  }

  useEffect(() => {
    getUnconfirmedAds();
  }, []);

  async function getUserDetails() {
    let jwt = getCookie("JWT_AUTH");
    if (jwt.length === 0) {
      return;
    }

    const headers = {
      authorization: `Bearer ${jwt}`,
    };
    const response = await axios.get(
      "http://localhost:8080/api/getUserDetails",
      {
        headers,
      }
    );
    const fetchedData = response.data.data;
    fetchedData["loggedIn"] = true;
    setUser(fetchedData);
    console.log("fetched After Ad Updation", fetchedData);
    setCurrentUser(user.user);
    setAds(currentUser.ads);
    return;
  }

  const categories = [
    { id: 0, name: "All", value: "All" },
    { id: 1, name: "Graphics and Design", value: "graphicsAndDesign" },
    { id: 2, name: "Video and Animation", value: "videoAndAnimation" },
    {
      id: 3,
      name: "Writing",
      value: "writingAndTranslation",
    },
    { id: 4, name: "AI Services", value: "aiServices" },
    { id: 5, name: "Digital Marketing", value: "digitalMarketing" },
    { id: 6, name: "Music and Audio", value: "musicAndAudio" },
    { id: 7, name: "Programming and tech", value: "programmingAndTech" },
    { id: 8, name: "Business", value: "business" },
  ];
  // const categoryArray = [];
  return (
    <div className="flex flex-col w-full justify-center place-items-center p-2">
      {currentUser.ads.length && (
        <div className="w-5/6">
          <p className="text-xl font-playfair font-semibold ml-7">
            {currentUser.name}'s Ads
          </p>
          <p className="ml-8 my-2 text-xl font-semibold">Filter</p>
          <div className="grid grid-cols-3 lg:grid-cols-4 justify-evenly place-items-center gap-x-5 gap-y-2">
            {categories.map(({ is, name, value }) => (
              <button
                value={value}
                onClick={() => {
                  let categoryArray = Array(...filterArray);
                  if (categoryArray.includes(value)) {
                    categoryArray.splice(categoryArray.indexOf(value), 1);
                  } else {
                    categoryArray.push(value);
                  }
                  // console.log(categoryArray);
                  setFilterArray(categoryArray);
                }}
                className={`flex justify-center place-items-center hover:scale-105 border-2 border-gray-400 rounded-xl w-5/6 h-14 px-2 py-0.5 font-semibold text-gray-600 transition-all duration-300 ${
                  filterArray.includes(value) && "bg-green-400"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
      {currentUser.ads.length > 0 ? (
        ads.length > 0 ? (
          ads[0] != "loading" ? (
            <div className="my-4 w-full sm:w-5/6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4">
              {ads.map(
                (ad) =>
                  (filterArray.length === 0 ||
                    filterArray.includes("All") ||
                    filterArray.includes(ad.category)) && (
                    <Link
                      to={"/freelancer/unconfirmedAds/chat"}
                      state={ad}
                      className="flex flex-col place-items-center"
                    >
                      <div
                        key={ad._id}
                        className="w-full sm:max-w-[450px] md:w-[300px] hover:scale-105 rounded-sm transition-all duration-500 shadow-xl shadow-gray-500 h-full"
                      >
                        <div className="flex justify-center place-items-center">
                          {/* {adImage ?? adImage !== "" ? (
                    <img
                      // src="https://images.pexels.com/photos/5708069/pexels-photo-5708069.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      // src={"http://localhost:8080/" + ad?.coverPicPath}
                      alt="gigimg"
                      src={adImage}
                      className="h-[150px] w-full border border-gray-400 bg-no-repeat"
                    />
                  ) : ( */}
                          <img src={ad.adId.coverPicPath} alt="" />
                          <BsCardImage
                            className="h-[150px] w-full border-2 border-gray-500 opacity-60"
                            size={120}
                          />
                          {/* )} */}
                        </div>
                        <div className="flex justify-between place-items-center px-2 py-1 font-semibold">
                          <div className="flex">
                            <FaUserCircle size={22} className="mr-2" />
                            <h2>{ad.clientId.name}</h2>
                          </div>
                        </div>
                        <p className="px-2 text-lg flex place-items-start text-justify mx-auto text-gray-900">
                          {ad.adId.title}
                        </p>
                      </div>
                      {/* <div className="flex max-w-[350px] sm:max-w-[450px] md:w-[300px] justify-between place-items-center mt-1 border-t-2 border-gray-400">
                        <button
                          className="p-2 border border-gray-400 rounded-lg m-2 bg-[#ff3526]"
                          onClick={() => deleteAd(ad)}
                        >
                          Decline
                        </button>
                      </div> */}
                    </Link>
                  )
              )}
            </div>
          ) : (
            <img
              src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
              alt="Loading..."
            />
          )
        ) : (
          <p className="text-2xl font-semibold my-10">
            You have no ads in this category
          </p>
        )
      ) : (
        <p className="flex flex-col place-items-center text-3xl font-semibold mt-20 mx-2">
          You do not have Any Ads Yet!
          <img
            src="https://cdn.dribbble.com/users/1939393/screenshots/6392286/dribbble-404-error.gif"
            alt="No Ads"
            className="w-96 p-2 hover:scale-105 transition-all duration-300"
          />
          <br />
          <div className="underline text-2xl text-blue -mt-7 hover:text-green-500 hover:scale-105 transition-all duration-300 ease-in-out text-center">
            Stay Tight :) <br />
            We're Working on getting clients!
          </div>
        </p>
      )}
    </div>
  );
};

export default FreelancerUnconfirmedAds;
