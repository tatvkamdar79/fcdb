const Freelancer = require("../models/freelancerSchema");
const utils = require("../utils/response");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;
const jsonWebToken = require("jsonwebtoken");
const validateFreelancerSchema = require("../models/freelancerSchema");

module.exports.signUp = async function (req, res) {
  const { error, data } = validateFreelancerSchema({
    email: req.body.email,
    password: req.body.password,
  });
  if (error) {
    utils.sendError(res, error.details[0].message);
    return;
  }
  try {
    const freelancer = await Freelancer.findOne({ email: req.body.email });
    if (!freelancer) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newFreelancer = await Freelancer.create({
        ...req.body,
        password: hashedPassword,
      });
      console.log("New freelancer", newFreelancer);
      if (!newFreelancer) {
        utils.sendError(res, "Failed to create, server error");
      } else {
        utils.sendSuccess(res, "User created successfully", {
          userId: newFreelancer._id,
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
  console.log(req.body);
  try {
    const user = await Freelancer.findOne({ email: userEmail });
    console.log("User is ", user);
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

module.exports.getFreelancer = async (req, res) => {
  let freelancer = await freelancer.findById(req.params.clientId);
  if (freelancer) {
    utils.sendSuccess(res, `freelancer ${freelancer.name}`, freelancer);
  } else {
    utils.sendError(res, "No such freelancer found");
  }
};

module.exports.updateFreelancer = async (req, res) => {
  const freelancer = await Freelancer.findByIdAndUpdate(req.user._id, {
    ...req.body,
  });
  return utils.sendSuccess(res, "Settings updated");
};
