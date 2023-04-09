import axios from "axios";
import React, { useContext, useState } from "react";
import { BsBookmark, BsCardImage } from "react-icons/bs";
import { FaClock, FaUserCircle } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { getCookie } from "../../Hooks/useCookies";

const FreelancerMyAds = () => {
  const { user, setUser } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user.user);
  const [ads, setAds] = useState(currentUser.ads);
  const [filterArray, setFilterArray] = useState(["All"]);
  const navigate = useNavigate();
  console.log("Current User Ads ", ads);

  const changeViewState = async (ad) => {
    let confirmMessage = ad.viewState
      ? "Your Ad will no longer be visible"
      : "Do you want to enable this ad";

    if (window.confirm(confirmMessage) === false) {
      return;
    }

    ad.viewState = !ad.viewState;
    console.log("After viewState", ad);
    const res = await axios.post(
      `http://localhost:8080/api/ads/update/${ad._id}`,
      { ad },
      { headers: { Authorization: `Bearer ${getCookie("JWT_AUTH")}` } }
    );
    if (res.status === 200) {
      getUserDetails();
      alert("Ad updated Succesfully!");
    }
  };

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
          <p className="text-xl font-playfair font-semibold ml-7">{currentUser.name}'s Ads</p>
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
          <div className="my-4 w-full sm:w-5/6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-4">
            {ads.map(
              (ad) =>
                (filterArray.length === 0 ||
                  filterArray.includes("All") ||
                  filterArray.includes(ad.category)) && (
                  <div className="flex flex-col place-items-center">
                    <div
                      key={ad._id}
                      className="w-full sm:max-w-[450px] md:w-[300px] hover:scale-105 rounded-sm transition-all duration-500 shadow-xl shadow-gray-500"
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
                        <BsCardImage
                          className="h-[150px] w-full border-2 border-gray-500 opacity-60"
                          size={120}
                        />
                        {/* )} */}
                      </div>
                      <div className="flex justify-between place-items-center px-2 py-1 font-semibold">
                        <div className="flex">
                          <FaUserCircle size={22} className="mr-2" />
                          <h2>{currentUser?.name}</h2>
                        </div>
                        <div className="flex justify-end gap-x-5 px-2">
                          <div>
                            <FaClock size={15} className="inline" />{" "}
                            {ad.deliveryTime}
                          </div>
                          <div>
                            <GrUpdate size={13} className="inline" />{" "}
                            {ad.revisions}
                          </div>
                        </div>
                      </div>
                      <p className="px-2 text-lg flex place-items-start text-justify mx-auto text-gray-900">
                        {ad.title}
                      </p>
                      <p className="flex place-items-center text-sm px-2 py-1 font-serif text-gray-600">
                        {ad.shortDescription}
                      </p>
                      <div className="flex justify-between place-items-center px-4 py-1">
                        <BsBookmark size={22} className="fill-gray-800" />
                        {/* <BsFillBookmarkFill size={22} className="fill-green-500" /> */}
                        <div className="flex flex-col place-items-end ">
                          <p>Starting at</p>
                          <p>INR {ad.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex max-w-[350px] sm:max-w-[450px] md:w-[300px] justify-between place-items-center mt-1 border-t-2 border-gray-400">
                      <button
                        className={`p-2 border hover:scale-105 transition-all duration-300 rounded-lg m-1 ${
                          ad.viewState ? "bg-green-500" : "bg-orange-500"
                        }`}
                        // value={ad}
                        onClick={() => changeViewState(ad)}
                      >
                        {ad.viewState ? "Active" : "Disabled"}
                      </button>
                      <button
                        className="p-2 border border-gray-400 rounded-lg m-2 bg-[#ff3526]"
                        onClick={() => deleteAd(ad)}
                      >
                        Delete Ad
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
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
          <Link
            to={"/freelancer/createAd"}
            className="underline text-2xl text-blue -mt-7 hover:text-green-500 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Create Your First Ad Now!
          </Link>
        </p>
      )}
    </div>
  );
};

export default FreelancerMyAds;
