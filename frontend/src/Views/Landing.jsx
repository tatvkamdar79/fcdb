import React from "react";
import Searchbar from "../Components/Searchbar";
import ServiceCard from "../Components/ServiceCard";
import Carousel from "../Components/Carousel";

const Landing = () => {
  return (
    <div className="pt-20">
      {/* Hero section */}
      <div className="bg-gray-50">
        <div className="mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Find freelancers for your projects
            </h1>
            <p className="mt-6 text-xl text-gray-500">
              Get your projects done by talented freelancers from around the
              world.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/signup"
                  className="py-4 px-6 bg-blue shadow-md shadow-gray-400 hover:scale-105 focus:ring-black text-white text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-500"
                  type="button"
                >
                  Get started
                </a>
              </div>
            </div>
            <div className="mt-10 w-full">
              <Searchbar />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white text-blue">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center my-10 py-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Popular services
            </h2>
          </div>
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
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Landing;
