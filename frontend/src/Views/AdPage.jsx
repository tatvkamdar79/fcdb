import React from "react";
import { useLocation } from "react-router";

const AdPage = () => {
  const { state } = useLocation();
  console.log(state);
  return (
    <div>
      <p>{state.id}</p>
      <p>{state.user}</p>
      <p>{state.description}</p>
      <p>{state.price}</p>
    </div>
  );
};

export default AdPage;
