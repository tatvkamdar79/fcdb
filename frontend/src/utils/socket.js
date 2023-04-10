import { useContext } from "react";
import io from "socket.io-client";
import { UserContext } from "../App";

function CreateSocket() {
  const { user } = useContext(UserContext);
  const currentUser = user.user;
  const socket = io("http://localhost:8080", {
    auth: { token: currentUser._id, role: user.role },
  });
  console.log("HERE");
  return socket;
}

export default CreateSocket;
