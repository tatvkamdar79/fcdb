import Home from "./Views/Home";
import Signup from "./Views/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSignup from "./Views/ClientSignup";
import { Card } from "./Components/Card";
import { MultipleCards } from "./Components/MultipleCards";
// import Routing from "./Views/Routing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/signup/client"} element={<ClientSignup />} />
        <Route path={"/test"} element={<Card id={1} ServiceName={"Web Development"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink = {"/"} Description={"To explore this service please join us!"}  />} />
        <Route path={"/test/multiple"} element={<MultipleCards id={1} ServiceName={"Web Development"} ImageLink={"https://www.analyticsinsight.net/wp-content/uploads/2020/11/Artificial-Intelligence-5.jpg"} RedirectLink = {"/"} Description={"To explore this service please join us!"} />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
