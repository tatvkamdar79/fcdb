const Client = require("../models/clientSchema");
const utils = require("../utils/response");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;
const jsonWebToken = require("jsonwebtoken");
const validateClientSchema = require("../validators/clientSchema");

module.exports.signUp = async function (req, res) {
  console.log("Here");
  const { error, data } = validateClientSchema.validate(req.body);
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
  console.log("Hello everyone");
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
        utils.sendError(res, "Invalid credentials");
      } else {
        const token = utils.createJWT({ id: user._id, role: "client" });
        return utils.sendSuccess(res, "User logged in successfully", {
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
  if (req.user) {
    const activeAds = req.user.workingWith.filter((obj) => obj.isAdActive);
    utils.sendSuccess(res, "Ads fetched successfully", activeAds);
  } else {
    utils.sendError(res, "Please login first");
  }
};

module.exports.getPreviousAds = (req, res) => {
  if (req.user) {
    const previousAds = req.user.workingWith.filter((obj) => !obj.isAdActive);
    utils.sendSuccess(res, "Ads fetched successfully", previousAds);
  } else {
    utils.sendError(res, "Please login first");
  }
};

module.exports.getClient = async (req, res) => {
  let client = await Client.findById(req.params.clientId);
  console.log("Params is: " + req.params.clientId + "\n" + client);
  console.log(client);
  if (client) {
    return utils.sendSuccess(res, `Client ${client.name}`, client);
  } else {
    return utils.sendError(res, "No such Client found");
  }
};

// module.exports.createGmeet = async (req, res) => {
//   if (!req.user) {
//     return utils.sendError(res, "Please login first");
//   }

//   const Meeting = require("google-meet-api").meet;
//   let date = req.body.meetDate;
//   let time = req.body.meetTime;
//   let summary = req.body.meetSummary || "Client Freelancer Discussion";
//   let location = "Lite Hain";
//   let description =
//     req.body.meetDescription ||
//     "A general or specific meeting to discuss about the Ad";
//   try {
//     const meetLink = await Meeting({
//       clientId: req.body.clientId,
//       clientSecret: req.body.clientSecret,
//       refreshToken: req.body.clientRefreshToken,
//       date: date,
//       time: time,
//       summary: "Client Freelancer Discussion Session 😉",
//       location: "Your Home HH",
//       description: "Discussion Session",
//     });
//     console.log(meetLink); //result it the final link
//     utils.sendSuccess(res, meetLink, {
//       time: "AAJ",
//       summary: "blablbla",
//       location: "tere ghar bhaiiii",
//     });
//   } catch (err) {
//     utils.sendError(res, "Some error occurred");
//     console.log(err);
//   }
// };
