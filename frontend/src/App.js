import Home from "./Views/Landing";
import Signup from "./Views/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./Views/SignUpForm";
import SignInForm from "./Views/SignInForm";
import PostSignUpModal from "./Components/PostSignUpModal";
import Navbar from "./Components/Navbar";
import Landing from "./Views/Landing";
import CategoryPage from "./Views/CategoryPage";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Landing />} />
          <Route path={"/home"} element={<Home />} />

          {/* Signup Routes */}
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/signup/client"} element={<SignUpForm />} />
          <Route path={"/signup/freelancer"} element={<SignUpForm />} />

          {/* Signin Routes */}
          <Route path={"/signin"} element={<SignInForm />} />

          {/* Individual Category Page */}
          <Route path={"/categories/:categoryName"} element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
