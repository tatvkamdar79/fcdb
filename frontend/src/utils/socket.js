import io from "socket.io-client";

function createSocket() {
  const socket = io("http://localhost:8080", { auth: { token: "123" } });
  console.log("HERE");
}

export default createSocket;
