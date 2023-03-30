const utils = require("../utils/response");
const Conversation = require("../models/conversationSchema");

module.exports = async (req, res) => {
  let data = [];
  let conversations = await Conversation.find({
    $or: [{ clientId: req.user._id }, { freelancerId: req.user._id }],
  });
  for (let conversation of conversations) {
    let newObj = {
      adId: conversation.adId,
      clientId: conversation.clientId,
      freelancerId: conversation.freelancerId,
    };
    let messages = [];
    for (let message of conversation.messages) {
      messages.push(message);
    }
    newObj["messages"] = messages;
    data.push(newObj);
  }
  let result = {
    user: req.user,
    conversations: data,
    // role:
  };
  if (req.user) utils.sendSuccess(res, "Got User Successfully", result, 200);
  else utils.sendError(res, "Please sign in");
};
