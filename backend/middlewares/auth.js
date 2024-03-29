const Client = require("../models/clientSchema");
const Freelancer = require("../models/freelancerSchema");
const Ad = require("../models/adSchema");
const jsonWebToken = require("jsonwebtoken");
const utils = require("../utils/response");

module.exports.setAuthenticatedUser = async function (req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    next();
    return;
  }
  let user;
  const data = utils.decodeJWT(req);
  console.log(data);
  if (data.role == "client") {
    try {
      user = await Client.findById(data.id, { password: 0 });
    } catch (err) {
      return utils.sendError(res, err);
    }
  } else {
    try {
      user = await Freelancer.findById(data.id, { password: 0 }).populate({
        path: "ads",
        model: "ad",
        populate: {
          path: "_id",
        },
      });
      // console.log(user);
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
