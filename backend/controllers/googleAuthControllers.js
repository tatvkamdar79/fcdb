const role = require("../middlewares/auth").roleOfUser;

module.exports.handleIncomingUser = (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  // Find a user
  console.log("Role");
  console.log(role);

  //   console.log(accessToken);
  //   console.log(refreshToken);
  profile.accessToken = accessToken;
  profile.refreshToken = refreshToken;
  done(null, profile);
};

module.exports.handleIncomingUserCallback = (req, res) => {
  //   console.log(req.user);
  //   res.cookie("JWT_AUTH");
  //   console.log(req.user);
  console.log(req.role);
  res.redirect("http://localhost:3000");
};
