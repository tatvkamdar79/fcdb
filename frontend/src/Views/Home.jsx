import React, { useContext } from "react";
import { userData } from "../App";

const Home = () => {
  const user = useContext(userData);
  console.log(user);
  return (
    <div>
      <div>Home</div>
    </div>
  );
};

export default Home;
