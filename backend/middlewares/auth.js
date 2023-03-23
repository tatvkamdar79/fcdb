const Client = require("../models/clientSchema");
const Freelancer = require("../models/freelancerSchema");
const jsonWebToken = require("jsonwebtoken");
const utils = require("../utils/response");

module.exports.setAuthenticatedUser = async function (req, res, next) {
  console.log(req.headers.authorization);
  console.log("Hello");
  if (!req.headers || !req.headers.authorization) {
    console.log("NO cookie");
    next();
    return;
  }
  let user;
  const token = req.headers.authorization.split(" ")[1];
  const data = jsonWebToken.verify(token, process.env.SECRET_KEY);
  if (data.role == "client") {
    try {
      user = await Client.findById(data.id);
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
  }
  req.user = user;
  req.role = data.role;
  next();
};
