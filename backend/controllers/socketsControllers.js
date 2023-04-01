const Conversation = require("../models/conversationSchema");

module.exports.createMessage = async (
  message,
  senderId,
  recieverId,
  adId,
  senderRole
) => {
  try {
    const clientId = senderRole == "client" ? senderId : recieverId;
    const freelancerId = senderRole == "freelancer" ? senderId : recieverId;
    const { error, data } = validateConversationSchema({
      adId,
      clientId,
      freelancerId,
    });

    if (error) {
      return utils.sendError(res, error.details[0].message);
    }

    const ad = await Ads.findById(adId);
    if (!ad) {
      return utils.sendError(res, "Ad doesn't exist");
    }
    if (ad.freelancer._id.equals(freelancerId) == false) {
      return utils.sendError(
        res,
        "Ad doesn't belong to the freelancer that you are trying to message"
      );
    }
    let conversation = await Conversation.findOne({
      adId: adId,
      clientId: clientId,
      freelancerId: freelancerId,
    });
    if (conversation.length == 0) {
      conversation = await Conversation.create({
        adId: adId,
        clientId: clientId,
        freelancerId: freelancerId,
      });
    }
    const newMessage = { message: message, sender: senderId };
    conversation.messages.push(newMessage);
    await conversation.save();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
