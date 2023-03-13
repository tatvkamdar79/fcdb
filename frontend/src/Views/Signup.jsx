import React, { useState } from "react";
import client from "../Assets/client.png";
import freelancer from "../Assets/freelancer.png";
const Signup = () => {
  const [btn, setBtn] = useState("Create Account");
  const [route, setRoute] = useState("");
  const [disabled, SetDisabled] = useState(false);
  const optionChange = (e) => {
    SetDisabled(true);
    console.log(e.target.value);
    setRoute(e.target.value);
    setBtn("Join as a " + e.target.value);
  };
  const clicked = () => {
    console.log("clicked");
  };
  return (
    <div className="h-[90vh] w-full sm:w-5/6 flex flex-col justify-self-center items-center place-content-center m-auto">
      <h1 className="font-playfair font-semibold text-5xl text-center my-6 p-4">
        Join as a client or freelancer
      </h1>
      <div className="w-full flex flex-col sm:flex-row gap-3 my-4 font-playfair font-semibold text-xl justify-center items-center sm:justify-evenly">
        {/* Client Card */}
        <div className="flex h-full justify-center items-center max-w-[400px] sm:w-5/12 py-4 border-4 border-blue rounded-xl">
          <img src={client} alt="client" width={140} />
          <div className="flex flex-col h-full justify-evenly">
            <input
              type="radio"
              name="typeOfUser"
              id=""
              className="relative cursor-pointer w-[30px] h-[18px] left-[85%] bottom-2"
              value={"client"}
              onClick={optionChange}
            />
            <p className="text-center">I'm a client, hiring for a project</p>
          </div>
        </div>
        {/* Client Card */}
        <div className="flex h-full justify-center items-center max-w-[400px] px-6 sm:w-5/12 py-4 border-4 border-blue rounded-xl">
          <img src={freelancer} alt="client" width={140} />
          <div className="flex flex-col h-full justify-evenly">
            <input
              type="radio"
              name="typeOfUser"
              id=""
              className="relative cursor-pointer w-[30px] h-[18px] left-[85%] bottom-2"
              value={"freelancer"}
              onClick={optionChange}
            />
            <p className="text-center">I'm a freelancer, looking for work</p>
          </div>
        </div>
      </div>
      <a
        className={`bg-blue ${
          btn === "Create Account" ? "opacity-25" : ""
        } border-2 border-black text-center w-[250px] h-[40px] rounded-xl font-semibold text-xl font-playfair`}
        disabled={true}
        onClick={clicked}
        href={`signup/${route}`}
      >
        {btn}
      </a>
    </div>
  );
};

export default Signup;
