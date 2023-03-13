import React, { useState } from "react";
import client from "../Assets/client.png";
import freelancer from "../Assets/freelancer.png";
const Signup = () => {
  const [btn, setBtn] = useState("Create Account");

  const setTypeOfUser = (e) => {
    console.log(e.target.id);
    setBtn(e.target.id);
  };

  return (
    <div className="h-[80vh] sm:h-[60vh] max-w-[800px] flex flex-col justify-self-center items-center place-content-center m-auto">
      <h1 className="font-playfair font-semibold text-5xl text-center my-6 p-4">
        Join as a client or freelancer
      </h1>
      <div className="z-50 w-full flex flex-col sm:flex-row gap-3 my-4 font-playfair font-semibold text-xl justify-center items-center sm:justify-evenly">
        {/* Client Card */}
        <button
          onClick={setTypeOfUser}
          id="client"
          className="flex h-full justify-center items-center max-w-[400px] px-6 sm:w-5/12 py-4 border-4 border-blue rounded-xl"
        >
          <img id="client" src={client} alt="client" width={140} />
          <div id="client" className="flex flex-col h-full justify-evenly">
            <input
              type="radio"
              id="client"
              className="relative cursor-pointer w-[30px] h-[18px] left-[85%] bottom-2"
              value={"client"}
            />
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
          className="flex h-full justify-center items-center max-w-[400px] px-6 sm:w-5/12 py-4 border-4 border-blue rounded-xl"
        >
          <img id="freelancer" src={freelancer} alt="client" width={140} />
          <div id="freelancer" className="flex flex-col h-full justify-evenly">
            <input
              type="radio"
              name="typeOfUser"
              id="freelancer"
              className="relative cursor-pointer w-[30px] h-[18px] left-[85%] bottom-2"
              value={"freelancer"}
            />
            <p
              id="freelancer"
              className="text-center flex place-items-center h-full"
            >
              I'm a freelancer, looking for work
            </p>
          </div>
        </button>
      </div>
      <a
        className={`bg-blue ${
          btn === "Create Account" ? "opacity-25" : ""
        } border-2 border-black text-center w-[250px] h-[40px] rounded-xl font-semibold text-xl font-playfair`}
      >
        {btn}
      </a>
    </div>
  );
};

export default Signup;
