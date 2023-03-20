import Home from "./Views/Landing";
import Signup from "./Views/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./Views/SignUpForm";
import SignInForm from "./Views/SignInForm";
import PostSignUpModal from "./Components/PostSignUpModal";
import Navbar from "./Components/Navbar";
import Landing from "./Views/Landing";

import AdPage from "./Views/CategoryPage";

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
          <Route path={"/categories/:categoryName/:id"} element={<AdPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
