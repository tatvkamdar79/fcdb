const Client = require("../models/clientSchema");
const utils = require("../utils/response");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;
const jsonWebToken = require("jsonwebtoken");
const validateClientSchema = require("../models/clientSchema");

module.exports.signUp = async function (req, res) {
  console.log("Here");
  const { error, data } = validateClientSchema({
    email: req.body.email,
    password: req.body.password,
  });
  if (error) {
    utils.sendError(res, error.details[0].message);
    return;
  }
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
        const token = utils.createJWT({ id: user._id, role: "client" });
        utils.sendSuccess(res, "User logged in successfully", {
          token: token,
          role: "client",
        });
      }
    }
  } catch (err) {
    utils.sendError(res, err);
    throw err;
  }
};

module.exports.getActiveAds = (req, res) => {
  console.log("here", req);
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

module.exports.createGmeet = async (req, res) => {
  const Meeting = require("google-meet-api").meet;
  let date = req.body.meetDate;
  let time = req.body.meetTime;
  let summary = req.body.meetSummary || "Client Freelancer Discussion";
  let location = "Lite Hain";
  let description =
    req.body.meetDescription ||
    "A general or specific meeting to discuss about the Ad";
  Meeting({
    clientId: req.body.clientId,
    clientSecret: req.body.clientSecret,
    refreshToken: req.body.clientRefreshToken,
    date: date,
    time: time,
    summary: "Client Freelancer Discussion Session 😉",
    location: "Your Home HH",
    description: "Discussion Session",
  }).then(function (meetLink) {
    console.log(meetLink); //result it the final link
    utils.sendSuccess(
      res,
      meetLink,
      {
        time: "AAJ",
        summary: "blablbla",
        location: "tere ghar bhaiiii",
      },
      200
    );
  });
};
