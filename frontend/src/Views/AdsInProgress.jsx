import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { getCookie } from "../Hooks/useCookies";

const AdsInProgress = () => {
  const { user, setUser } = useContext(UserContext);
  //   const [activeAds, setActiveAds] = useState([]);
  const currentUser = user.user;
  console.log(user.user.workingWith);
  const categoryName = "graphics-and-design";

  return (
    <div className="w-full sm:w-11/12 h-screen mx-auto">
      <p className="text-3xl font-semibold font-serif py-5">
        Ads Currently In Progress
      </p>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 p-5 place-items-center gap-y-7">
        {currentUser.workingWith.map(
          ({
            adId,
            adTitle,
            freelancerEmail,
            freelancerId,
            freelancerName,
            isAdActive,
            _id,
          }) => (
            <Link
              to={`/categories/${categoryName}/${adId}/chat`}
              key={_id}
              state={{ freelancer: {}, hi: 123 }}
              className="h-fit w-[290px] xs:w-[90%] border border-gray-700 shadow-lg shadow-gray-700 bg-gray-200 rounded-md hover:scale-105 transition-all duration-500 overflow-hidden"
            >
              <img
                src="https://source.unsplash.com/random/400x200"
                alt="Ad Cover"
                className="border-inherit"
              />
              <p className="text`-justify font-bold text-lg px-1 pt-1">
                {adTitle}
              </p>
              <p className="flex text-center font-playfair font-extrabold px-1">
                By: {freelancerName}
              </p>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default AdsInProgress;