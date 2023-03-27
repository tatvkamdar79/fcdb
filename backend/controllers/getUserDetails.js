const utils = require("../utils/response");

module.exports = async (req, res) => {
  if (req.user) utils.sendSuccess(res, "Got User Successfully", req.user, 200);
  else utils.sendError(res, "Please sign in");
};
