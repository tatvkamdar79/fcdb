import React from "react";
import Searchbar from "../Components/Searchbar";
import ServiceCard from "../Components/ServiceCard";
import Carousel from "../Components/Carousel";
import CategoryIcons from "../Components/CategoryIcons";
import { BsCheck2Circle } from "react-icons/bs";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="pt-20">
      {/* Hero section */}
      <div>
        <div className="mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className=" mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Find freelancers for your projects
            </h1>
            <p className="mt-6 text-xl text-gray-500">
              Get your projects done by talented freelancers from around the
              world.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to={"/signup"}
                  // href="/signup"
                  className="py-4 px-6 bg-blue shadow-md shadow-gray-400 hover:scale-105 focus:ring-black text-white text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-500"
                  type="button"
                >
                  Get started
                </Link>
              </div>
            </div>
            <div className="mt-10 w-full">
              <Searchbar />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="w-screen h-20 flex justify-center place-items-center">
        <p className="hidden xs:flex text-gray-400">Trusted By:</p>
        <div className="flex justify-between gap-x-5">
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/meta.12b5e5c.png"
            alt="Meta"
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/google.61e78c8.png"
            alt="Google"
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/netflix.96c5e3f.png"
            alt="Netflix"
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/pandg.0f4cfc2.png"
            alt="P&G"
          />
          <img
            src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/paypal.305e264.png"
            alt="PayPal"
          />
        </div>
      </div>
      <hr />
      <div className="bg-white text-blue">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" mx-auto text-center my-5">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Popular services
            </h2>
          </div>
          <hr />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 my-8">
            <ServiceCard
              ServiceName={"Website development"}
              Link={"/"}
              Description={"Custom website development for your business"}
              StartingPrice={50}
            />
            <ServiceCard
              ServiceName={"Website development"}
              Link={"/"}
              Description={"Custom website development for your business"}
              StartingPrice={50}
            />
            <ServiceCard
              ServiceName={"Website development"}
              Link={"/"}
              Description={"Custom website development for your business"}
              StartingPrice={50}
            />
            <ServiceCard
              ServiceName={"Website development"}
              Link={"/"}
              Description={"Custom website development for your business"}
              StartingPrice={50}
            />
          </div>
        </div>
      </div>
      <Carousel />
      <div className="w-screen flex flex-col sm:flex-row bg-[#e2ffeca2] text-gray-600 justify-evenly place-items-center overflow-visible">
        <div className="w-fit my-20 flex flex-col justify-center place-items-center">
          <p className="font-bold text-3xl text-gray-900 pl-1">
            The best part? Everything.
          </p>
          <ul className="flex flex-col py-8 gap-y-8">
            <li className="max-w-[400px]">
              <p className="text-xl font-semibold text-gray-700">
                <BsCheck2Circle
                  className="text-green-400 inline pb-1"
                  size={32}
                />
                Stick to your budget
              </p>
              Find the right service for every price point. No hourly rates,
              just project-based pricing.
            </li>
            <li className="max-w-[400px]">
              <p className="text-xl font-semibold text-gray-700">
                <BsCheck2Circle
                  className="text-green-400 inline pb-1"
                  size={32}
                />
                Get quality work done quickly
              </p>
              Hand your project over to a talented freelancer in minutes, get
              long-lasting results.
            </li>
            <li className="max-w-[400px]">
              <p className="text-xl font-semibold text-gray-700">
                <BsCheck2Circle
                  className="text-green-400 inline pb-1"
                  size={32}
                />
                Pay when you're happy{" "}
              </p>
              Upfront quotes mean no surprises.
            </li>
            <li className="max-w-[400px]">
              <p className="text-xl font-semibold text-gray-700">
                <BsCheck2Circle
                  className="text-green-400 inline pb-1"
                  size={32}
                />
                Payments only get released when you approve.
              </p>
              Count on 24/7 support Our round-the-clock support team is
              available to help anytime, anywhere.
            </li>
          </ul>
        </div>
        <div className="w-1/2 ">
          <img
            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_600,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png"
            alt="best part"
            className="w-screen sm:w-full mb-16 sm:mb-0"
            // width={750}
          />
        </div>
      </div>
      <hr />
      <CategoryIcons />
    </div>
  );
};

export default Landing;
