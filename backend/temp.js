require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("./config/passport");
const f = require("./models/freelancerSchema");
const a = require("./models/adSchema");
const c = require("./models/clientSchema");

app.use(cors());

const PORT = process.env.PORT || 8080;

app.set("port", PORT);

// Parsing the request parameters
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./assests"));
app.use(require("./middlewares/auth").setAuthenticatedUser);

//Telling app to use passport
app.use(passport.initialize());
// app.use(passport.session());

//Initializing passport
// const passport = require("passport")
// app.use(passport.initialize())
// app.use(passport.session())
// require('./services/passport');

//Managing cookies
// const cookieSession = require("cookie-session")
// app.use(
//     cookieSession({
//         maxAge:30*24*60*60*1000,
//         keys:[process.env.cookieKey]
//     })
// )

//Importing OAuth routes
// const authRoutes = require('./routes/OAuth');
// authRoutes(app);

//Use express router
app.use("/api", require("./routes/index.js"));

module.exports = app;
