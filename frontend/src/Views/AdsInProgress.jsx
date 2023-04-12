import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const AdsInProgress = () => {
  const { state } = useLocation();
  console.log("state -> ", state);
  const [user, setUser] = useState(state);
  const [currentUser, setCurrentUser] = useState(user.user);
  // console.log(currentUser);
  const categoryName = "graphics-and-design";

  useEffect(() => {
    console.log("user -> ", user);
    // console.log("user.user -> ", user.user);
    setCurrentUser(user.user);
  }, [user, currentUser]);

  return (
    <div className="w-full sm:w-11/12 h-screen mx-auto">
      Ads Currently In Progress
      <p className="text-3xl font-semibold font-serif py-5"></p>
      {currentUser?.workingWith?.length === 0 ? (
        <p className="text-2xl font-semibold font-serif">
          You have no ads to show currently
        </p>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 p-5 place-items-center gap-y-7">
          {currentUser?.workingWith.map(
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
                state={{
                  ad: {
                    id: adId,
                    title: adTitle,
                    aboutAd: "About the Ad",
                    price: 2000,
                    user: currentUser?.name,
                  },
                  freelancer: {
                    freelancerId: freelancerId,
                    freelancerEmail: freelancerEmail,
                    freelancerName: freelancerName,
                  },
                }}
                className="h-fit w-[290px] xs:w-[90%] border border-gray-700 shadow-lg shadow-gray-700 rounded-md hover:scale-105 transition-all duration-500 overflow-hidden"
              >
                <img
                  src="https://source.unsplash.com/random/400x200"
                  alt="Ad Cover"
                  className="border-inherit"
                />
                <p className="text`-justify font-semibold text-md px-1 pt-1">
                  Ad: {adTitle}
                </p>

                <p className="px-2 h-16 flex place-items-center text-md mx-auto text-gray-900">
                  {adTitle}
                </p>
                <div className="flex justify-start place-items-center px-2 py-1 font-semibold">
                  <FaUserCircle size={22} className="mr-2" />
                  <h2>{freelancerName}</h2>
                </div>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AdsInProgress;
