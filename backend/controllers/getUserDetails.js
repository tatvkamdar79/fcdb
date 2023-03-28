const utils = require("../utils/response");
const Conversation = require("../models/conversationSchema");

module.exports = async (req, res) => {
  let result = {
    user: req.user,
    messages: [],
  };
  let conversations = await Conversation.find({
    $or: [{ clientId: req.user._id }, { freelancerId: req.user._id }],
  });
  for (let conversation of conversations) {
    for (let message of conversation.messages) {
      result.messages.push(message);
    }
  }
  if (req.user) utils.sendSuccess(res, "Got User Successfully", result, 200);
  else utils.sendError(res, "Please sign in");
};
