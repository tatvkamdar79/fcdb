require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/mongoose");
const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 8080;

app.set("port", PORT);

// Parsing the request parameters
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./assests"));

//Use express router
app.use("/", require("./routes/index.js"));

app.listen(PORT, () => {
  console.log("Yay");
});
