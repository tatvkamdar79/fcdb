const Client = require("../models/clientSchema");
const utils = require("../utils/response");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;
const jsonWebToken = require("jsonwebtoken");

module.exports.signUp = async function (req, res) {
  console.log("Here");
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client) {
      const salt = await bcrypt.genSalt();
      console.log(req.body.password);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log(req.body);
      const newClient = await Client.create({
        ...req.body,
        password: hashedPassword,
      });
      if (!newClient) {
        utils.sendError(res, "Failed to create, server error");
      } else {
        utils.sendSuccess(res, "User created successfully", {
          userId: newClient._id,
        });
      }
    } else {
      utils.sendError(res, "Failed to create, User already exists");
    }
  } catch (err) {
    utils.sendError(res, "Server error", {}, 500);
    throw err;
  }
};

module.exports.signIn = async function (req, res) {
  const userEmail = req.body.email;
  try {
    const user = await Client.findOne({ email: userEmail });
    if (!user) {
      utils.sendError(res, "User not found", {}, 401);
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        utils.sendError(res, "Invalid password");
      } else {
        const token = jsonWebToken.sign(
          { id: user._id, role: "client" },
          secretKey
        );
        utils.sendSuccess(res, "User logged in successfully", {
          token: token,
        });
      }
    }
  } catch (err) {
    utils.sendError(res, err);
    throw err;
  }
};

module.exports.getActiveAds = (req, res) => {
  const activeAds = req.user.workingWith.filter((obj) => obj.isAdActive);
  utils.sendSuccess(res, "", activeAds);
};

module.exports.getPreviousAds = (req, res) => {
  const previousAds = req.user.workingWith.filter((obj) => !obj.isAdActive);
  utils.sendSuccess(res, "", previousAds);
};

module.exports.getClient = async (req, res) => {
  let client = await Client.findById(req.params.clientId);
  if (client) {
    utils.sendSuccess(res, `Client ${client.name}`, client);
  } else {
    utils.sendError(res, "No such Client found");
  }
};
