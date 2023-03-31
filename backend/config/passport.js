const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const googleAuthController = require("../controllers/googleAuthControllers");

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/users/auth/google/callback",
    },
    googleAuthController.handleIncomingUser
  )
);

module.exports = passport;
