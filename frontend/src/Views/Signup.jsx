import React, { useState } from "react";
import client from "../Assets/client.png";
import freelancer from "../Assets/freelancer.png";
const Signup = () => {
  const options = {
    default: "Create Account",
    client: "Signup as a Client",
    freelancer: "Apply as a Freelancer",
  };
  const [btn, setBtn] = useState("default");

  const setTypeOfUser = (e) => {
    console.log(e.target.id);
    setBtn(e.target.id);
  };

  return (
    <div className="h-screen bg-white">
      <div className="h-[80vh] sm:h-[60vh] max-w-[800px] flex flex-col justify-self-center items-center place-content-center m-auto">
        <h1 className="font-playfair font-semibold text-5xl text-center my-6 p-4">
          Join as a client or freelancer
        </h1>
        <div className="z-50 w-full flex flex-col sm:flex-row gap-3 my-4 font-playfair font-semibold text-xl justify-center items-center sm:justify-evenly">
          {/* Client Card */}
          <button
            onClick={setTypeOfUser}
            id="client"
            className={`flex h-full justify-center items-center max-w-[400px] px-6 sm:w-5/12 py-4 border-4  rounded-xl transition duration-500 ease-out ${
              btn === "client"
                ? "bg-green-500 border-gray-900"
                : "bg-sky-100 border-blue"
            }`}
          >
            <img id="client" src={client} alt="client" width={140} />
            <div id="client" className="flex flex-col h-full justify-evenly">
              <p
                id="client"
                className="text-center flex place-items-center h-full"
              >
                I'm a client, hiring for a project
              </p>
            </div>
          </button>
          {/* Freelancer Card */}
          <button
            id="freelancer"
            onClick={setTypeOfUser}
            className={`flex h-full justify-center items-center max-w-[400px] px-6 sm:w-5/12 py-4 border-4  rounded-xl transition duration-500 ease-in-out ${
              btn === "freelancer"
                ? "bg-green-500 border-gray-900"
                : "bg-sky-100 border-blue"
            }`}
          >
            <img id="freelancer" src={freelancer} alt="client" width={140} />
            <div
              id="freelancer"
              className="flex flex-col h-full justify-evenly"
            >
              <p
                id="freelancer"
                className="text-center flex place-items-center h-full"
              >
                I'm a freelancer, looking for work
              </p>
            </div>
          </button>
        </div>
        <a href={`${btn === "default" ? "#" : "/signup/" + btn}`}>
          <button
            disabled={btn === "Create Account"}
            className={`bg-black text-white ${
              btn === "default" ? "opacity-25" : ""
            } transition duration-500 ease-in-out border-2 border-black text-center w-[280px] h-[45px] rounded-xl font-semibold text-xl font-playfair`}
            onClick={() => console.log("clicking")}
          >
            {options[btn]}
          </button>
        </a>
      </div>
    </div>
  );
};

export default Signup;
