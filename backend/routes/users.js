const express = require("express");
const router = express.Router();
const passport = require("passport");
const googleAuthController = require("../controllers/googleAuthControllers");

router.get(
  "/auth/google/client",
  passport.authenticate("google", {
    scope: ["email", "profile", "https://www.googleapis.com/auth/calendar"],
    session: false,
    state: "client",
    accessType: "offline",
    prompt: "consent",
  })
);

router.get(
  "/auth/google/freelancer",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
    state: "freelancer",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/lol", session: false }),
  googleAuthController.handleIncomingUserCallback
);

module.exports = router;
