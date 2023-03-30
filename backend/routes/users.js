const express = require("express");
const router = express.Router();
const passport = require("passport");
const googleAuthController = require("../controllers/googleAuthControllers");

router.get(
  "/auth/google",
  passport.authenticate(
    "google",
    { scope: ["email"], session: false, state: "clienthijdahrithik" },
    function (req, res) {
      console.log("In here");
      console.log(req.user);
    }
  )
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/lol", session: false }),
  googleAuthController.handleIncomingUserCallback
);

module.exports = router;
