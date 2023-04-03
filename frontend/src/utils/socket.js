import React from "react";
import { useContext } from "react";
import io from "socket.io-client";
import { UserContext } from "../App";

function CreateSocket() {
  let userData = useContext(UserContext);
  let { user } = userData;
  let { role } = user;
  console.log(user.user);
  console.log(role);
  // console.log(user.user._id);
  const socket = io("http://localhost:8080", {
    auth: { token: user.user?._id, role: role },
  });
  console.log("HERE");
  return socket;
}

export default CreateSocket;
