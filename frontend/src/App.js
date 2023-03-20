import Home from "./Views/Landing";
import Signup from "./Views/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carousel from "./Components/Carousel";
import SignUpForm from "./Views/SignUpForm";
import SignInForm from "./Views/SignInForm";

import PostSignUpModal from "./Components/PostSignUpModal";
import Navbar from "./Components/Navbar";
import Landing from "./Views/Landing";

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
          <Route path={"/test/Carousel"} element={<Carousel />} />

          <Route path={"/signup/client"} element={<SignUpForm />} />
          <Route path={"/signup/freelancer"} element={<SignUpForm />} />
          <Route path={"/test"} element={<PostSignUpModal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
