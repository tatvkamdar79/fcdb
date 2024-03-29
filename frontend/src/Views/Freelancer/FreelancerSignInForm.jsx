import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCookie, setCookie } from "../../Hooks/useCookies";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SignInForm = ({ role }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const initialFormDetails = {
    email: "",
    password: "",
  };
  const [formDetails, setFormDetails] = useState(initialFormDetails);

  // useEffect(() => {
  //   if (user.loggedIn) {
  //     navigate("/home");
  //   }
  // }, []);

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/home");
    }
  });

  const changeDetails = (e) => {
    let updatedValue = { ...formDetails };
    updatedValue[e.target.name] = e.target.value;
    setFormDetails(updatedValue);
  };

  async function getUserDetails() {
    const jwtToken = getCookie("JWT_AUTH");

    const headers = {
      authorization: `Bearer ${jwtToken}`,
    };
    const response = await axios.get(
      "http://localhost:8080/api/getUserDetails",
      {
        headers,
      }
    );
    console.log(response.data.data.user);
    return response.data.data.user;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formDetails);
    const headers = {
      "content-type": "application/x-www-form-urlencoded",
    };

    const url = "http://localhost:8080/api/freelancer/signin";
    await axios
      .post(url, formDetails, { headers })
      .then(async (response) => {
        if (response.status + 100 >= 300) {
          // console.log(response);
          // code to set jwt and user details in cookies
          setCookie("JWT_AUTH", response.data.data.token, 1);
          console.log("Set cookie for jwt");

          const fetchedUser = await getUserDetails();
          console.log("fetchedUser Signin -> ", fetchedUser);
          setUser({
            user: fetchedUser,
            role: response.data.data.role,
            loggedIn: true,
          });

          navigate("/home");
          // navigate(0);
        }
      })
      .catch((err) => {
        console.log("err", err.response.status);
        // switch (err.response.status) {
        //   case 400:
        //     alert("Invalid Credentials");
        //     break;
        //   case 401:
        //     alert("User Not Found!");
        //     break;
        //   default:
        //     alert("User Not Authenticated");
        // }
      });
  }

  return (
    <div className="w-screen">
      <div className="flex flex-col w-full items-center h-[80vh] pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div className="w-5/6 px-6 py-4 mt-6 overflow-hidden bg-white shadow-lg shadow-gray-400 sm:max-w-lg sm:rounded-lg">
          <div className="text-center p-3">
            <Link to="/">
              <h3 className="text-5xl font-serif font-bold text-green-500">
                FCDB <p className="text-xl underline">Business</p>
              </h3>
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-lg font-semibold text-gray-600 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="email"
                  name="email"
                  value={formDetails.email}
                  onChange={changeDetails}
                  className="block w-full mt-1 p-1 rounded-md shadow-sm border border-gray-500 focus:border-blue focus:ring outline-none focus:ring-blue transition-all duration-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-lg font-semibold text-gray-600 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type="password"
                  name="password"
                  value={formDetails.password}
                  onChange={changeDetails}
                  className="block w-full mt-1 p-1 rounded-md shadow-sm border border-gray-500 focus:border-blue focus:ring outline-none focus:ring-blue transition-all duration-500"
                />
              </div>
            </div>
            <Link href="/" className="text-xs text-blue hover:underline">
              Forgot Password?
            </Link>
            <div className="flex items-center mt-4">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue rounded-md hover:bg-blue focus:outline-none focus:bg-blue">
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-grey-600">
            Create an account?{" "}
            <span>
              <Link className="text-blue hover:underline" to="/signup">
                Sign up
              </Link>
            </span>
          </div>
          <div className="flex items-center w-full my-4">
            <hr className="w-full" />
            <p className="px-3 ">OR</p>
            <hr className="w-full" />
          </div>
          <div className="my-6 space-y-2">
            <a
              href={`http://localhost:8080/api/users/auth/google/freelancer`}
              aria-label="Login with Google"
              type="button"
              className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-blue hover:scale-105 transition duration-500"
            >
              <FcGoogle size={25} />
              <p>Login with Google</p>
            </a>
            {/* <a
              aria-label="Login with GitHub"
              role="button"
              className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current"
              >
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
              </svg>
              <p>Login with GitHub</p>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
