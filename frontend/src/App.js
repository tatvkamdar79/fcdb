import Home from "./Views/Home";
import Signup from "./Views/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carousel from "./Components/Carousel";
import SignUpForm from "./Views/SignUpForm";
import PostSignUpModal from "./Components/PostSignUpModal";
import SignInForm from "./Views/SignInForm";
import Admin from "./Views/Admin";
import AdCard from "./Components/AdCard";
import AdPage from "./Views/AdPage";

// import Routing from "./Views/Routing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          // path={"/"}
          path={"/"}
          element={<AdPage />}
        />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/signup/client"} element={<SignUpForm />} />
        <Route path={"/test/Carousel"} element={<Carousel />} />

        <Route path={"/signup/client"} element={<SignUpForm />} />
        <Route path={"/signup/freelancer"} element={<SignUpForm />} />
        <Route path={"/test"} element={<PostSignUpModal />} />
        <Route path={"/signin/client"} element={<SignInForm />} />
        <Route path={"/admin"} element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
