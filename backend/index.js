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


//Initializing passport
const passport = require("passport")
app.use(passport.initialize())
app.use(passport.session())
require('./services/passport');

//Managing cookies
const cookieSession = require("cookie-session")
app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[process.env.cookieKey]
    })
)


//Importing OAuth routes
const authRoutes = require('./routes/OAuth');
authRoutes(app);

//Set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Use express router
app.use("/", require("./routes/index.js"));

app.listen(PORT, () => {
  console.log("Yay");
});
