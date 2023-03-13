import axios from "axios";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignUpForm = () => {
  const initialFormDetails = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formDetails, setFormDetails] = useState(initialFormDetails);

  const changeDetails = (e) => {
    let updatedValue = { ...formDetails };
    updatedValue[e.target.name] = e.target.value;
    setFormDetails(updatedValue);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formDetails);
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    };

    const url = "http://localhost:8080/client/sign-up";
    await axios
      .post(url, formDetails, { headers })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-blue">F C D B</h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-700 undefined"
              >
                Name
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="text"
                  name="name"
                  value={formDetails.name}
                  onChange={changeDetails}
                  className="block w-full mt-1 border-2 border-solid border-gray-400 rounded-md focus:border-black focus:outline-none transition-colors duration-500 ease-in-out px-2 py-1"
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  value={formDetails.email}
                  onChange={changeDetails}
                  className="block w-full mt-1 border-2 border-solid border-gray-400 rounded-md focus:border-black focus:outline-none transition-colors duration-500 ease-in-out px-2 py-1"
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  value={formDetails.password}
                  onChange={changeDetails}
                  className="block w-full mt-1 border-2 border-solid border-gray-400 rounded-md focus:border-black focus:outline-none transition-colors duration-500 ease-in-out px-2 py-1"
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="confirmPassword"
                className="block text-md font-medium text-gray-700 undefined"
              >
                Confirm Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="confirmPassword"
                  value={formDetails.confirmPassword}
                  onChange={changeDetails}
                  className="block w-full mt-1 border-2 border-solid border-gray-400 rounded-md focus:border-black focus:outline-none transition-colors duration-500 ease-in-out px-2 py-1"
                />
              </div>
            </div>
            <a href="!#" className="text-xs text-blue hover:underline">
              Forgot Password?
            </a>
            <div className="flex items-center mt-2">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-all duration-500 ease-in-out transform bg-gray-600 rounded-md hover:bg-blue hover:scale-105 focus:outline-none focus:bg-blue">
                Register
              </button>
            </div>
          </form>
          <div className="mt-2 text-grey-600">
            Already have an account?{" "}
            <span>
              <a className="text-blue hover:underline" href="/signin">
                Log in
              </a>
            </span>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 ">OR</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <button
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-blue hover:scale-105 transition duration-500"
            >
              <FcGoogle size={25} />
              <p>Login with Google</p>
            </button>
            <button
              aria-label="Login with GitHub"
              className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-blue hover:scale-105 transition duration-500"
            >
              <FaGithub size={25} />
              <p>Login with GitHub</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
