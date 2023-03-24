const Client = require("../models/clientSchema");
const utils = require("../utils/response");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;
const jsonWebToken = require("jsonwebtoken");

module.exports.signUp = async function (req, res) {
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client) {
      try {
        const salt = await bcrypt.genSalt();
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
      } catch (err) {
        utils.sendError(res, "Server error 1", {}, 500);
        throw err;
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
  console.log("Reached here");
  const userEmail = req.body.email;
  console.log(req.body);
  try {
    const user = await Client.findOne({ email: userEmail });
    console.log(user);
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
