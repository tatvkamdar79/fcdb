import Signup from "./Views/Signup";
import {
  Routes,
  Route,
  useNavigate,
  Outlet,
  Navigate,
  Link,
} from "react-router-dom";
import SignUpForm from "./Views/SignUpForm";
import SignInForm from "./Views/SignInForm";
// import PostSignUpModal from "./Components/PostSignUpModal";
import Navbar from "./Components/Navbar";
import Landing from "./Views/Landing";
import CategoryPage from "./Views/CategoryPage";
import AdPage from "./Views/AdPage";
import { createContext, useContext, useEffect, useState } from "react";
import Home from "./Views/Home";
import { ProfilePic } from "./Components/ProfilePic";
import { getCookie, setCookie } from "./Hooks/useCookies";
import axios from "axios";
import Chat from "./Views/Chat";
import CreateAd from "./Views/CreateAd";
import AdsInProgress from "./Views/AdsInProgress";

const UserContext = createContext({});

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ loggedIn: false });

  useEffect(() => {
    async function getUserDetails() {
      let jwt = getCookie("JWT_AUTH");
      if (jwt.length == 0) {
        return;
      }

      const headers = {
        authorization: `Bearer ${jwt}`,
      };
      const response = await axios.get(
        "http://localhost:8080/api/getUserDetails",
        {
          headers,
        }
      );
      console.log("Got data on first fetch", response.data.data.user);
      const fetchedData = response.data.data;
      const messages = response.data.data;
      console.log("messages", messages);
      fetchedData["loggedIn"] = true;
      setUser(fetchedData);
      console.log("fetch", fetchedData);
      return;
    }
    if (!user.loggedIn) {
      getUserDetails();
      console.log(user);
    }
  }, []);

  return (
    <>
      <Navbar />
      <ProfilePic/>
      <Routes>
        <Route path={"/"} element={<Landing />} />
      </Routes>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Link to={"/home"} className="border-2 border-black px-3">
          Home
        </Link>
        <Link to={"/signin"} className="border-2 border-black px-3">
          Signin
        </Link>{" "}
        <Link to={"/categories/abcd"} className="border-2 border-black px-3">
          abcd
        </Link>
        <Link to={"/categories/abc"} className="border-2 border-black px-3">
          abc
        </Link>
        <Routes>
          <Route path={"/"} element={<Landing />} />

          {/* User Authenticated Routes */}
          <Route element={<UserAuthContext user={user} />}>
            <Route path={"/home"} element={<Home />} />
            <Route
              path={"/categories/:categoryName"}
              element={<CategoryPage />}
            />
            <Route path={"/createAd"} element={<CreateAd />} />
            <Route
              path={"/categories/:categoryName/:id"}
              element={<AdPage />}
            />
            <Route
              path={"/categories/:categoryName/:id/chat"}
              element={<Chat />}
            />
            <Route
              path={"/client/ads-in-progress"}
              element={<AdsInProgress />}
            />
          </Route>
          {/* User Authenticated Routes */}

          {/* Signup Routes */}
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/signup/client"} element={<SignUpForm />} />
          <Route path={"/signup/freelancer"} element={<SignUpForm />} />

          {/* Signin Routes */}
          <Route path={"/signin"} element={<SignInForm />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

function UserAuthContext({ user }) {
  return user.loggedIn ? <Outlet /> : <Navigate to={"/signin"} />;
}

export default App;
export { UserContext };

// const login = async () => {
//   const jwt = getCookie("JWT_AUTH");
//   alert(jwt);
//   if (jwt.length !== 0) {
//     console.log(jwt);
//   }
//   const fetchedUser = await getUserDetails();
//   fetchedUser["loggedIn"] = true;
//   setUser(fetchedUser);
//   console.log(user);
//   navigate("/home");
// };
// const logout = () => {
//   const jwt = getCookie("JWT_AUTH");
//   if (jwt.length !== 0) {
//     setCookie("JWT_AUTH", "", 0);
//   }
//   setUser({ loggedIn: false });
//   console.log(user);
// };
// useEffect(() => {
//   async function checkIfLoggedIn() {
//     let jwt = getCookie("JWT_AUTH");
//     console.log(user);
//     if (jwt.length !== 0) {
//       await login();
//     }
//   }
//   let d = checkIfLoggedIn();
// }, []);
