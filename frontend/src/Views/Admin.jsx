import React from "react";
import Searchbar from "../Components/Searchbar";
import ServiceCard from "../Components/ServiceCard";
import Carousel from "../Components/Carousel";

const Admin = () => {
  const users = JSON.parse(localStorage.getItem("users"));

  return (
    <div>
      {users.map((user) => {
        return (
          <div>
            <h1>Name: {user.name}</h1>
            <h2>Email: {user.email}</h2>
            <br />
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      {/* Hero section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Find freelancers for your projects
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              Get your projects done by talented freelancers from around the
              world.
            </p>
            <div className="mt-6 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/signup"
                  className="py-4 px-6 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white text-lg rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                  type="button"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Searchbar />
      </div>
      <div className="bg-white text-blue">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Popular services
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

export default Admin;
