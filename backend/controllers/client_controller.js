const Client = require("../models/clientSchema");
const utils = require("../utils/response");
const bcrypt = require("bcrypt");
const secretKey = process.env.SECRET_KEY;
const jsonWebToken = require("jsonwebtoken");

module.exports.signUp = async function (req, res) {
  req.body.ifOAuth = true;
  console.log(typeof req.body.ifOAuth);

  if (!req.body.password) {
    const newClient = await Client.create({
      ...req.body,
    });
    return utils.sendSuccess(res, "noice", newClient);
  }
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client) {
      try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(req.body);
        try {
          const newClient = await Client.create({
            ...req.body,
            password: hashedPassword,
          });

          console.log(newClient);
          if (!newClient) {
            utils.sendError(res, "Failed to create");
          } else {
            utils.sendSuccess(res, "User created successfully", {
              userId: newClient._id,
            });
          }
        } catch (e) {
          console.log(e);
        }
      } catch (err) {
        utils.sendError(res, "Server error 1", {}, 500);
      }
    } else {
      utils.sendError(res, "Failed to create 2");
    }
  } catch (err) {
    utils.sendError(res, "Server error 2", {}, 500);
  }
};

module.exports.signIn = async function (req, res) {
  const userEmail = req.body.email;
  console.log(req.user);
  try {
    const user = await Client.findOne({ email: userEmail });
    if (!user) {
      utils.sendSuccess(res, "User not found", { email: userEmail });
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
  }
};
