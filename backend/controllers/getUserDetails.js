const Client = require("../models/clientSchema");
const Freelancer = require("../models/freelancerSchema");
const jsonWebToken = require("jsonwebtoken");
const utils = require("../utils/response");

module.exports = async (req, res) => {
  let user;
  const token = req.headers.authorization.split(" ")[1];
  const data = jsonWebToken.verify(token, process.env.SECRET_KEY);
  if (data.role == "client") {
    try {
      user = await Client.findById(data.id, (Omit = { password: false }));
    } catch (err) {
      return utils.sendError(res, err);
    }
  } else {
    try {
      user = await Freelancer.findById(data.id);
    } catch (err) {
      return utils.sendError(res, err);
    }
  }
  if (!user) {
    return utils.sendError(res, "User not found");
  } else {
    console.log(typeof user);
    delete user.password;
    console.log(user);

    utils.sendSuccess(res, "Got User Successfully", user, 200);
  }
};
