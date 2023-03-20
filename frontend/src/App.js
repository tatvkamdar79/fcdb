import Home from "./Views/Landing";
import Signup from "./Views/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carousel from "./Components/Carousel";
import SignUpForm from "./Views/SignUpForm";
import SignInForm from "./Views/SignInForm";
import AdCard from "./Components/AdCard";
import PostSignUpModal from "./Components/PostSignUpModal";
import Navbar from "./Components/Navbar";
import Landing from "./Views/Landing";
import SignInForm from "./Views/SignInForm";
import AdPage from "./Views/AdPage";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/home"} element={<Home />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/signup/client"} element={<SignUpForm />} />
          <Route path={"/signup/freelancer"} element={<SignUpForm />} />
          <Route path={"/signin"} element={<SignInForm />} />
          <Route path={"/adpage"} element={<AdPage />} />
          // {/* <Route path={"/test"} element={<PostSignUpModal />} /> */}
          <Route path={"/test"} element={<PostSignUpModal />} />
          <Route path={"/category/:categoryName"} element={<Ads />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
