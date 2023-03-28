import React from "react";
import { Link } from "react-router-dom";

export const Card = ({
  id,
  ServiceName,
  ImageLink,
  Description,
  RedirectLink,
}) => {
  return (
    <Link
      key={id}
      to={RedirectLink}
      className="rounded-lg hover:scale-105 transition-all duration-700 group"
    >
      <div
        className="bg-white w-[280px] h-[400px] m-2 rounded-lg shadow-lg bg-no-repeat bg-cover relative"
        style={{
          backgroundImage: `url(${ImageLink})`,
        }}
      >
        <div className="bottom flex flex-col justify-center items-start p-3">
          <div className="font-playfair font-extrabold text-2xl text-white my-1">
            {ServiceName}
          </div>

          <div className="flex items-center text-white font-semibold">
            {Description}
          </div>
          {/* <div className="flex items-center my-2 text-white absolute bottom-0">Click here to explore!</div> */}
        </div>
      </div>
    </Link>
  );
};
