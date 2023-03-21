import Home from "./Views/Landing";
import Signup from "./Views/Signup";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./Views/SignUpForm";
import SignInForm from "./Views/SignInForm";
import PostSignUpModal from "./Components/PostSignUpModal";
import Navbar from "./Components/Navbar";
import Landing from "./Views/Landing";
import CategoryPage from "./Views/CategoryPage";
import AdPage from "./Views/AdPage";
import { createContext } from "react";

function App() {
  const ad = createContext({});
  return (
    <>
      <Navbar />

      <Routes>
        <Route path={"/"} element={<Landing />} />
        <Route path={"/home"} element={<Home />} />

        {/* Signup Routes */}
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/signup/client"} element={<SignUpForm />} />
        <Route path={"/signup/freelancer"} element={<SignUpForm />} />

        {/* Signin Routes */}
        <Route path={"/signin"} element={<SignInForm />} />

        {/* Individual Category and Ad Page */}
        <Route path={"/categories/:categoryName"} element={<CategoryPage />} />
        <Route path={"/categories/:categoryName/:id"} element={<AdPage />} />
      </Routes>
    </>
  );
}

export default App;
