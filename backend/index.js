const http = require("http");
const app = require("./temp");
const mongoose = require("mongoose");
const db = require("./config/mongoose").connectToDatabase();
const socketIO = require("socket.io");
const socketControllers = require("./controllers/socketsControllers");

const PORT = 8080;
app.set("port", PORT);

const server = http.createServer(app);
const io = new socketIO.Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const onConnection = (socket) => {
  const userId = socket.handshake.auth.token;
  const userRole = socket.handshake.auth.role;
  console.log(userId);
  socket.join(userId);
  console.log("Hello connected");
  // console.log(userId, userRole);
  console.log(socket.handshake.auth);

  io.to(userId).emit("recieveMessage", "kjhgfghjk", userId, "abcd");
  setTimeout(() => {
    console.log("Transmitting");
    io.to(userId).emit("recieveMessage", "22222kjhgfghjk", userId, "abcd");
  }, 3000);

  socket.on("sendMessage", (message, recieverId, adId) => {
    // setTimeout(() => {
    // }, 5000);
    console.log("Sending from " + userId + " to " + recieverId + " On " + adId);
    socket.to(recieverId).emit("recieveMessage", message, userId, adId);
    io.to(userId).emit("recieveMessageSelf", message, recieverId, adId);
    if (
      socketControllers.createMessage(
        message,
        userId,
        recieverId,
        adId,
        userRole
      ) == true
    ) {
      console.log("Sending data chutiye");
    }
  });

  // socket.on("")
};

io.on("connection", onConnection);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
