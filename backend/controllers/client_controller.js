const Client = require("../models/clientSchema");
const utils = require("../utils/response");

module.exports.signUp = async function (req, res) {
  try {
    const client = await Client.findOne({ email: req.body.email });
    if (!client) {
      try {
        const newClient = await Client.create(req.body);
        if (!newClient) {
          utils.sendError(res, "Failed to create");
        } else {
          utils.sendSuccess(res, "User created successfully", {
            userId: newClient._id,
          });
        }
      } catch (err) {
        utils.sendError(res, "Server error", {}, 500);
      }
    } else {
      utils.sendError(res, "Failed to create");
    }
  } catch (err) {
    utils.sendError(res, "Server error", {}, 500);
  }
};
