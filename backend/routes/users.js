const express = require("express");
const router = express.Router();
const passport = require("passport");
const googleAuthController = require("../controllers/googleAuthControllers");

router.get(
  "/auth/google/client",
  passport.authenticate("google", {
    scope: ["email"],
    session: false,
    state: "client",
  })
);

router.get(
  "/auth/google/freelancer",
  passport.authenticate("google", {
    scope: ["email"],
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
