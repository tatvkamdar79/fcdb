import Home from "./Views/Home";
import Signup from "./Views/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carousel from "./Components/Carousel";
import SignUpForm from "./Views/SignUpForm";
import PostSignUpModal from "./Components/PostSignUpModal";
import SignInForm from "./Views/SignInForm";
import Admin from "./Views/Admin";
import AdCard from "./Components/AdCard";

// import Routing from "./Views/Routing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={"/ad"}
          element={
            <AdCard
              ad={{
                img: "https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr",
                pp: "https://play-lh.googleusercontent.com/DTzWtkxfnKwFO3ruybY1SKjJQnLYeuK3KmQmwV5OQ3dULr5iXxeEtzBLceultrKTIUTr",
                description: "I can build full stack web applications",
                username: "Aman Jolly",
                star: 5,
                price: 100,
              }}
            />
          }
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
