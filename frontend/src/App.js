import Signup from "./Views/Signup";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import SignUpForm from "./Views/SignUpForm";
import SignInForm from "./Views/SignInForm";
// import PostSignUpModal from "./Components/PostSignUpModal";
import Navbar from "./Components/Navbar";
import Landing from "./Views/Landing";
import CategoryPage from "./Views/CategoryPage";
import AdPage from "./Views/AdPage";
import { createContext, useContext, useEffect, useState } from "react";
import { read_cookie } from "sfcookies";
import Home from "./Views/Home";
import { ProfilePic } from "./Components/ProfilePic";


const userData = createContext({});
function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({}); //{ name: "TATV" });
  useEffect(() => {
    console.log(document.cookie.split("="));
    if (document.cookie.split("=").length > 0) {
      // api call here
      setUser({ name: "TATV" });
      navigate("/home");
    }
  }, []);
  return (
    <>
      <Navbar />
      <ProfilePic/>
      <Routes>
        <Route path={"/"} element={<Landing />} />
      </Routes>

      {Object.keys(user).length > 0 ? (
        // {/* User Signed In Accesible Routes */}
        <userData.Provider value={user}>
          <Routes>
            <Route path={"/home"} element={<Home />} />
            {/* Individual Category and Ad Page */}
            <Route
              path={"/categories/:categoryName"}
              element={<CategoryPage />}
            />
            <Route
              path={"/categories/:categoryName/:id"}
              element={<AdPage />}
            />
          </Routes>
        </userData.Provider>
      ) : (
        // navigate("/signin")
        <div>Not Logged In</div>
      )}
      <Routes>
        {/* Signup Routes */}
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/signup/client"} element={<SignUpForm />} />
        <Route path={"/signup/freelancer"} element={<SignUpForm />} />

        {/* Signin Routes */}
        <Route path={"/signin"} element={<SignInForm />} />
      </Routes>
    </>
  );
}

export default App;
export { userData };
