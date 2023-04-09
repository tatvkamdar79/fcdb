import React from "react";
import { Link } from "react-router-dom";

const NotFound404Page = () => {
  return (
    <div
      className="w-screen text-center h-[90vh] flex flex-col justify-between bg-no-repeat mx-auto bg-center"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/originals/a8/12/1a/a8121abee959e18cbad25ad4046f76d8.gif)",
      }}
    >
      <p className="h-fit text-3xl font-semibold p-10 text-gray-700">
        Oops! You aren't supposed to be here!
      </p>
      <p className="m-28 text-2xl font-bold text-gray-700">
        Let's Take you{" "}
        <Link to={"/home"} className="text-green-500 underline">
          Home
        </Link>
      </p>
    </div>
  );
};

export default NotFound404Page;
