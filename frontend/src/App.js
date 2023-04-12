import Signup from "./Views/Signup";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import SignUpForm from "./Views/SignUpForm";
import SignInForm from "./Views/SignInForm";
import FreelancerSignInForm from "./Views/Freelancer/FreelancerSignInForm";
// import PostSignUpModal from "./Components/PostSignUpModal";
import Navbar from "./Components/Navbar";
import Landing from "./Views/Landing";
import CategoryPage from "./Views/CategoryPage";
import AdPage from "./Views/AdPage";
import { createContext, useEffect, useState } from "react";
import Home from "./Views/Home";
import { getCookie } from "./Hooks/useCookies";
import axios from "axios";
import Chat from "./Views/Chat";
import AdsInProgress from "./Views/AdsInProgress";
import Socketss from "./Components/Socketss";
import CreateAd from "./Views/Freelancer/CreateAd";
import FreelancerHome from "./Views/Freelancer/FreelancerHome";
import FreelancerAdsInProgress from "./Views/Freelancer/FreelancerAdsInProgress";
import FreelancerMyAds from "./Views/Freelancer/FreelancerMyAds";
import NotFound404Page from "./Views/NotFound404Page";
import { io } from "socket.io-client";
import FreelancerUnconfirmedAds from "./Views/Freelancer/FreelancerUnconfirmedAds";
import FreelancerChat from "./Views/Freelancer/FreelancerChat";

const UserContext = createContext({});
const SocketContext = createContext({});
const ConversationsContext = createContext({});

function App() {
  const [user, setUser] = useState({ loggedIn: false });
  const [socket, setSocket] = useState({});
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    async function getUserDetails() {
      let jwt = getCookie("JWT_AUTH");
      if (jwt.length === 0) {
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
      console.log(fetchedData);
      console.log(response.data);
      fetchedData["loggedIn"] = true;
      setUser(fetchedData);
      setConversations(fetchedData.conversations);
      console.log("fetch", fetchedData);
      setSocket(CreateSocket(fetchedData));
      return;
    }

    if (!user.loggedIn) {
      console.log("Fetching");
      getUserDetails();
      console.log(user);
    }
  }, [user]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <SocketContext.Provider value={{ socket }}>
          <ConversationsContext.Provider
            value={{ conversations, setConversations }}
          >
            <Navbar />
            {/* <Link to={"/home"} className="border-2 border-black px-3">
          Home
          </Link>
          <Link to={"/signin"} className="border-2 border-black px-3">
          Signin
          </Link>{" "}
          <Link to={"/categories/abcd"} className="border-2 border-black px-3">
          abcd
          </Link>
          // <Link to={"/categories/abc"} className="border-2 border-black px-3">
          //   abc
        // </Link> */}
            <Routes>
              <Route path="/sockets" element={<Socketss />} />
              <Route path={"/"} element={<Landing />} />

              <Route
                path={"/categories/:categoryName"}
                element={<CategoryPage />}
              />

              <Route
                path={"/categories/:categoryName/:id"}
                element={<AdPage />}
              />

              {/* Authenticated Routes */}
              <Route element={<UserAuthContext user={user} />}>
                {user.role === "client" ? (
                  <>
                    <Route path={"/home"} element={<Home />} />
                    <Route
                      path={"/categories/:categoryName/:id/chat"}
                      element={<Chat />}
                    />
                    <Route
                      path={"/client/ads-in-progress"}
                      element={<AdsInProgress />}
                    />
                  </>
                ) : (
                  <>
                    <Route path="/home" element={<FreelancerHome />} />
                    <Route
                      path="/freelancer/ads-in-progress"
                      element={<FreelancerAdsInProgress />}
                    />
                    <Route
                      path={"/freelancer/myAds"}
                      element={<FreelancerMyAds />}
                    />
                    <Route
                      path={"/freelancer/createAd"}
                      element={<CreateAd />}
                    />{" "}
                    <Route
                      path={"/freelancer/unconfirmedAds"}
                      element={<FreelancerUnconfirmedAds />}
                    />
                    <Route
                      path={"/freelancer/unconfirmedAds/chat"}
                      element={<FreelancerChat />}
                    />
                  </>
                )}
              </Route>
              {/* Authenticated Routes */}

              {/* Freelancer Authenticated Routes */}

              {/* Freelancer Authenticated Routes */}

              {/* Signup Routes */}
              <Route path={"/signup"} element={<Signup />} />
              <Route
                path={"/signup/client"}
                element={<SignUpForm role={"client"} />}
              />
              <Route
                path={"/signup/freelancer"}
                element={<SignUpForm role={"freelancer"} />}
              />

              {/* Signin Routes */}
              <Route path={"/signin"} element={<SignInForm />} />
              <Route
                path={"/freelancer/signin"}
                element={<FreelancerSignInForm />}
              />
              <Route path="*" element={<NotFound404Page />} />
            </Routes>
          </ConversationsContext.Provider>
        </SocketContext.Provider>
      </UserContext.Provider>
    </>
  );
}

function UserAuthContext({ user }) {
  return user.loggedIn ? <Outlet /> : <Navigate to={"/signin"} />;
}

function CreateSocket(user) {
  const currentUser = user.user;
  const socket = io("http://localhost:8080", {
    auth: { token: currentUser._id, role: user.role },
  });
  console.log("HERE");
  return socket;
}

export default App;
export { UserContext };
export { SocketContext };
export { ConversationsContext };
// const login = async () => {
//   const jwt = getCookie("JWT_AUTH");
//   alert(jwt);
//   if (jwt.length !== 0) {
//     consoxle.log(jwt);
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
