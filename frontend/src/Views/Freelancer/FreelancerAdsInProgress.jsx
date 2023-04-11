import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import { getCookie } from "../../Hooks/useCookies";

const FreelancerAdsInProgress = () => {
  const { user, setUser } = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user.user);
  const workingWith = currentUser.workingWith;
  console.log("ww", workingWith);
  console.log("ww", Object.keys(workingWith));
  const categoryName = "graphics-and-design";

  // useEffect(() => {
  //   console.log("user -> ", user);
  //   // console.log("user.user -> ", user.user);
  //   setCurrentUser(user.user);

  //   async function getAllAds() {
  //     const data = await axios.get(
  //       `http://localhost:8080/api/client/getAdsInProgress`,
  //       { headers: { authorization: `Bearer ${getCookie("JWT_AUTH")}` } }
  //     );
  //     console.log("All Ads", data);
  //   }

  //   getAllAds();
  // }, [user, currentUser]);

  return (
    <div className="w-full sm:w-11/12 h-screen mx-auto">
      Ads Currently In Progress
      <p className="text-3xl font-semibold font-serif py-5"></p>
      {currentUser?.workingWith?.length === 0 ? (
        <p className="text-2xl font-semibold font-serif">
          You have no ads in progress to show currently
        </p>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-2 p-5 place-items-center gap-y-7">
          {currentUser?.workingWith.map(
            ({
              clientId,
              clientName,
              clientEmail,
              adId,
              adTitle,
              isAdActive,
              _id,
            }) => (
              <Link
                to={`/categories/${categoryName}/${adId}`}
                key={_id}
                state={{
                  ad: {
                    id: adId,
                    title: adTitle,
                    aboutAd: "About the Ad",
                    price: 2000,
                    user: clientName,
                    freelancer: {
                      freelancerId: currentUser._id,
                      freelancerEmail: currentUser.email,
                      freelancerName: currentUser.name,
                    },
                  },
                }}
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
                  For Client: {clientName}
                </p>
              </Link>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FreelancerAdsInProgress;
