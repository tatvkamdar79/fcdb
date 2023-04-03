import React, { useEffect } from "react";
import createSocket from "../utils/socket";

const Socketss = () => {
  const socket = createSocket();
  useEffect(() => {
    console.log("In here");
    socket.on("recieveMessage", (data) => {
      console.log(`I recievied a lot of ${data}`);
    });
  }, []);

  return <div>Hellooo</div>;
};

export default Socketss;
