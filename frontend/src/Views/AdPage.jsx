import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import { BiUserCircle, BiRupee } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { FiRefreshCcw } from "react-icons/fi";
import { FcCheckmark } from "react-icons/fc";
import { RiStarSFill } from "react-icons/ri";

const AdPage = () => {
  const { categoryName, id } = useParams();
  console.log(id);
  let { state } = useLocation();
  const ad = state;
  console.log("from adpage of ad", ad, ad.freelancer);
  const freelancer = ad.freelancer;
  // state["freelancer"] = freelancer;
  let stars = [];
  for (let i = 0; i < freelancer.rating; i++) {
    stars.push(i);
  }
  return (
    <div className="flex flex-col xl:flex-row w-5/6 justify-center md:justify-between mx-auto">
      <div className="flex flex-col">
        <p>FCDB</p>
        <div className="flex flex-col pr-16 justify-center mx-auto md:mx-0">
          <p className="font-semibold text-3xl my-3">{ad.title}</p>
          <p className="flex place-items-center text-lg font-semibold font-playfair gap-x-2 my-2">
            <BiUserCircle size={23} />
            {ad.user}
          </p>
          <div className="flex justify-center place-items-center bg-gray-200 my-4">
            <img src={ad.link} alt="Ad Img" className="my-3 max-h-[500px]" />
          </div>
          <div>
            <p className="text-3xl font-semibold text-gray-700 underline">
              About This Ad
            </p>
            <p className="text-md my-2">{ad.description}</p>
          </div>
        </div>
        <br />
        <div className="w-11/12">
          <p className="my-2 font-semibold font-serif underline text-lg text-gray-800">
            About the Seller
          </p>
          {/* Profile Img and profile Page of Freelancer */}
          <Link to={"/freelancer/" + freelancer.id} className="flex w-fit">
            <img
              src="https://source.unsplash.com/random/80x80"
              alt="Freelancer Image"
              className="rounded-full my-2"
            />
            <div className="flex flex-col place-items-start justify-center px-4">
              <p>{freelancer.name}</p>
              <p className="flex place-items-center">
                {stars.map((id) => (
                  <RiStarSFill key={id} />
                ))}
                <span className="px-1">{freelancer.rating}</span>
              </p>
            </div>
          </Link>
          <p className="text-gray-600 mt-1">{freelancer.about}</p>
        </div>
      </div>
      {/* Purchase Card */}
      <div className="flex justify-center mt-20 md:mt-0">
        <div className="border border-gray-400 rounded-sm w-[500px] h-fit relative top-10">
          <p className="flex justify-between place-items-center font-serif text-lg px-5 py-3">
            <span>{ad.title}</span>
            <span>
              <BiRupee size={20} className="inline mb-1" />
              {ad.price}
            </span>
          </p>
          <div className="flex text-justify px-5 my-4">
            <p className="text-md text-gray-600 font-serif">{ad.aboutAd}</p>
          </div>
          <div className="flex justify-between place-items-center font-serif text-sm px-5 py-2">
            <p className="flex place-items-center">
              <BsClock size={17} className="mx-2" />
              {ad.deliveryTime} Days Delivery
            </p>
            <p className="flex">
              <FiRefreshCcw size={17} className="mx-2" />
              {ad.revisions} Revisions
            </p>
          </div>
          <div className="flex flex-col px-5 py-3 text-gray-500">
            <p className="flex place-items-center w-[100px] gap-x-1">
              <FcCheckmark size={20} />
              tag 1
            </p>
            <p className="flex place-items-center w-[100px] gap-x-1">
              <FcCheckmark size={20} />
              tag 2
            </p>
            <p className="flex place-items-center w-[100px] gap-x-1">
              <FcCheckmark size={20} />
              tag 3
            </p>
            <p className="flex place-items-center w-[100px] gap-x-1">
              <FcCheckmark size={20} />
              tag 4
            </p>
          </div>
          <Link
            to={`/categories/${categoryName}/${id}/chat`}
            state={{ ad: ad, freelancer: ad.freelancer }}
            className="flex justify-center bg-green-500 w-11/12 mx-auto font-serif text-center text-xl text-white opacity-90 py-1 my-3"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdPage;
