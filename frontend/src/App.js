import Home from "./Views/Home";
import Signup from "./Views/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carousel from "./Components/Carousel";
import SignUpForm from "./Views/SignUpForm";
import PostSignUpModal from "./Components/PostSignUpModal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/signup/client"} element={<SignUpForm />} />
        <Route path={"/test/Carousel"} element={<Carousel />} />

        <Route path={"/signup/client"} element={<SignUpForm />} />
        <Route path={"/signup/freelancer"} element={<SignUpForm />} />
        <Route path={"/test"} element={<PostSignUpModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
