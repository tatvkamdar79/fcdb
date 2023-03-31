const Client = require("../models/clientSchema");
const Freelancer = require("../models/freelancerSchema");
const utils = require("../utils/response");

module.exports.handleIncomingUser = (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  profile.accessToken = accessToken;
  profile.refreshToken = refreshToken;
  done(null, profile);
};

module.exports.handleIncomingUserCallback = async (req, res) => {
  const role = req.query.state;
  const profile = req.user;
  console.log(req.user);
  let newUser = {
    // name: profile.displayName,
    name: "hrithik",
    email: profile.emails[0].value,
    profilePicPath: profile.photos[0].value,
    accessToken: profile.accessToken,
    refreshToken: profile.refreshToken,
  };
  let user = null;
  if (role == "client") {
    user = await Client.findOne({ email: newUser.email });
    if (!user) {
      user = await Client.create(newUser);
    }
  } else {
    user = await Freelancer.findOne({ email: newUser.email });
    if (!user) {
      user = await Freelancer.create(newUser);
    }
  }
  const token = utils.createJWT({ id: user._id, role: role });
  res.cookie("JWT_AUTH", token);
  res.redirect("http://localhost:3000");
};
