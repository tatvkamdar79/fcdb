import Home from "./Views/Home";
import Signup from "./Views/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSignup from "./Views/ClientSignup";
import Carousel from "./Components/Carousel";
import SignUpForm from "./Views/SignUpForm";
// import Routing from "./Views/Routing";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/signup/client"} element={<ClientSignup />} />
        <Route path={"/test/Carousel"} element={<Carousel/>}/>

        <Route path={"/signup/client"} element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
