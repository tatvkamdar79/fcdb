import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import Carousel from "../Components/Carousel";

const Home = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "Loading...",
  });
  let { user, setUser } = useContext(UserContext);
  
  console.log("Home.User -> ", user);
  useEffect(() => {
    setCurrentUser(user.user);
  }, []);
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
              <Link to={"/client/ads-in-progress"} state={user}>
                <div
                  className="border border-gray-500 rounded-md w-[300px] xs:w-[220px] sm:w-[300px] h-[200px] text-3xl font-bold font-serif bg-no-repeat bg-center bg-cover shadow-xl shadow-gray-500 bg-black text-white p-2 hover:scale-105 transition-all duration-500 hover:shadow-lg cursor-pointer"
                  style={{
                    backgroundImage:
                      "url(" +
                      "https://bestanimations.com/media/loading-gears/2074796765loading-gears-animation-3.gif" +
                      ")",
                  }}
                >
                  Ads in Progress
                </div>
              </Link>
              <div
                className="border border-gray-500 rounded-md w-[300px] xs:w-[220px] sm:w-[300px] h-[200px] text-3xl font-bold font-serif bg-no-repeat bg-center bg-cover shadow-xl shadow-gray-500 bg-black text-white p-2 hover:scale-105 transition-all duration-500 hover:shadow-lg cursor-pointer"
                style={{
                  backgroundImage:
                    "url(" +
                    "https://images.ctfassets.net/lzny33ho1g45/4fky3wOHSVpT8XJgm9duVg/356716caa0252a01be7e4961cc4e5611/move_kanban_card_to_list?w=1400" +
                    ")",
                }}
              >
                Completed Ads
              </div>
              <div
                className="border border-gray-500 rounded-md w-[300px] xs:w-[220px] sm:w-[300px] h-[200px] text-3xl font-bold font-serif bg-no-repeat bg-center bg-cover shadow-xl shadow-gray-500 bg-black text-white p-2 hover:scale-105 transition-all duration-500 hover:shadow-lg cursor-pointer"
                style={{
                  backgroundImage:
                    "url(" +
                    "https://cdn.dribbble.com/users/722246/screenshots/13583386/media/ad2aa9b15f63ded04fe6407693a9c2c2.gif" +
                    ")",
                }}
              >
                Bookmarked Ads
              </div>
            </div>
          </div>
          <p className="text-2xl font-serif font-bold">Categories</p>
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Home;
