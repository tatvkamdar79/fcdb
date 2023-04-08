import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Carousel from "../../Components/Carousel";

const FreelancerHome = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "Loading...",
  });
  let { user } = useContext(UserContext);

  console.log("Home.User -> ", user);
  useEffect(() => {
    setCurrentUser(user.user);
  }, [user.user]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setCurrentUser(user.user);
  //     // console.log("waiting");
  //   }, 1000);
  // }, [user.user]);
  // // console.log(currentUser);
  // console.log("CU", currentUser);
  // console.log(conversations);
  // const x = "https://media.tenor.com/5JWmM_Hd3rIAAAAC/loading-windows98.gif";
  // const x = "https://media.tenor.com/FawYo00tBekAAAAC/loading-thinking.gif";
  // const x =
  // "";
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-white to-gray-300">
      <div className="w-screen lg:w-11/12 xl:w-5/6 mx-auto">
        <div className="flex flex-col">
          <p className="text-3xl font-serif font-bold text-gray-800 pt-5">
            Welcome, {currentUser?.name}
          </p>
          <div className="flex justify-center py-5">
            <div className="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 w-full place-items-center justify-between gap-y-5 transition-all">
              <Link to={"/freelancer/ads-in-progress"} state={user}>
                <div
                  className="border border-gray-500 rounded-md w-[300px] xs:w-[220px] sm:w-[300px] h-[200px] text-3xl font-bold font-serif bg-no-repeat bg-center bg-cover shadow-xl shadow-gray-500 bg-black text-black p-2 hover:scale-105 transition-all duration-500 hover:shadow-lg cursor-pointer group"
                  style={{
                    backgroundImage:
                      "url(" +
                      "https://i.pinimg.com/originals/9c/fb/09/9cfb09f0c029e1f8c938208a7e278d76.gif" +
                      ")",
                  }}
                >
                  <p className="flex justify-center w-fit px-4 pb-1 bg-white rounded-full place-items-center text-center opacity-60 group-hover:opacity-100 transition-all duration-300">
                    In Progress
                  </p>
                </div>
              </Link>
              <div
                className="border border-gray-500 rounded-md w-[300px] xs:w-[220px] sm:w-[300px] h-[200px] text-3xl font-bold font-serif bg-no-repeat bg-center bg-cover shadow-xl shadow-gray-500 bg-black text-black p-2 hover:scale-105 transition-all duration-500 hover:shadow-lg cursor-pointer group"
                style={{
                  backgroundImage:
                    "url(" +
                    "https://cdn.dribbble.com/users/1241550/screenshots/18301637/media/6f062219345707081809631a0cdda7c3.gif" +
                    ")",
                }}
              >
                <p className="flex justify-center w-fit px-4 pb-1 bg-white rounded-full place-items-center text-center opacity-60 group-hover:opacity-100 transition-all duration-300">
                  My Ads
                </p>
              </div>
              <Link
                to={"/freelancer/createAd"}
                className="border border-gray-500 rounded-md w-[300px] xs:w-[220px] sm:w-[300px] h-[200px] text-3xl font-bold font-serif bg-no-repeat bg-center bg-cover shadow-xl shadow-gray-500 text-black p-2 hover:scale-105 transition-all duration-500 hover:shadow-lg cursor-pointer group"
                style={{
                  backgroundImage:
                    "url(" +
                    "https://cdn.dribbble.com/users/945601/screenshots/18267115/media/a98d71a893184d112f2cbe0fb1d94119.gif" +
                    ")",
                }}
              >
                <p className="flex justify-center w-fit px-4 pb-1 bg-white rounded-full place-items-center text-center opacity-60 group-hover:opacity-100 transition-all duration-300">
                  Create Ad
                </p>
              </Link>
            </div>
          </div>
          <p className="text-2xl font-serif font-bold">Categories</p>
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default FreelancerHome;
