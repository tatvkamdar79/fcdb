const Freelancer = require("../models/freelancerSchema");
const utils = require("../utils/response");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;
const jsonWebToken = require("jsonwebtoken");

module.exports.signUp = async function (req, res) {
  try {
    const freelancer = await Freelancer.findOne({ email: req.body.email });
    if (!freelancer) {
      try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(req.body);
        const newFreelancer = await Freelancer.create({
          ...req.body,
          password: hashedPassword,
        });
        if (!newFreelancer) {
          utils.sendError(res, "Failed to create, server error");
        } else {
          utils.sendSuccess(res, "User created successfully", {
            userId: newFreelancer._id,
          });
        }
      } catch (err) {
        // utils.sendError(res, "Server error 1", {}, 500);
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
  const userEmail = req.body.email;
  console.log(req.body);
  try {
    const user = await Freelancer.findOne({ email: userEmail });
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
          { id: user._id, role: "freelancer" },
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
